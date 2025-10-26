import { onRequest } from "firebase-functions/https";
import { setGlobalOptions } from "firebase-functions";
import { auth } from "firebase-functions/v1";
import admin from "firebase-admin";
import cors from "cors";
import mail from "@sendgrid/mail";
import { defineString } from "firebase-functions/params";
import { GoogleGenAI } from "@google/genai";

admin.initializeApp();
const corsHandler = cors({origin: true});
const db = admin.firestore();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

const sendgrid_api_key = defineString("SENDGRID_API_KEY");
const welcome_temp_id = defineString("SENDGRID_SIGNUP_MAIL_TEMP_ID");
const sender_email = defineString("SENDGRID_SENDER_EMAIL");
const story_submission_email = defineString("SENDGRID_STORY_SUBMISSION_EMAIL_RECIPIENT");
const gemini_api_key = defineString("GEMINI_API_KEY");

mail.setApiKey(sendgrid_api_key.value());

// Mailer Functions
export const sendWelcomeEmail = auth.user().onCreate(async (user) => {
  try {
    const uid = user.uid;
    admin.auth().getUser(uid).then(async (userRecord) => {
    const msg = {
      to: userRecord.email,
      from: sender_email.value(),
      templateId: welcome_temp_id.value(),
      dynamicTemplateData: {
        subject: 'Welcome to YMHW!',
        name: userRecord.displayName || 'User',
      },
    };

    await mail.send(msg);
    })
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
});


export const submitStory = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { name, email, type, summary, story, attachment } = req.body;
        const msg = {
          to: story_submission_email.value(),
          from: sender_email.value(),
          subject: `New Story Submission from ${name}`,
          html: `
            <h1>New Story Submission</h1>
            <p><strong>Story Type:</strong> ${type}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Author Name:</strong> ${name}</p>
            <p><strong>One-line Summary:</strong> ${summary}</p>
            <p><strong>Full Story:</strong></p>
            <p>${story}</p>
          `,
        };

        if (attachment && attachment.content) {
          msg.attachments = [{
            content: attachment.content,
            filename: attachment.name,
            type: attachment.type,
            disposition: 'attachment',
          }];
        }

        await mail.send(msg);
        res.status(200).send('Story submitted successfully');
      } catch (error) {
        console.error('Error submitting story:', error);
        res.status(500).send('Error submitting story');
      }
    });
});

export const sendBulkEmail = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { recipientEmails, subject, content, attachment } = req.body;
        if (!recipientEmails || !subject || !content) {
          res.status(400).send('Missing recipientEmails, subject, or content in request body');
          return;
        }
        
        const msg = {
          to: recipientEmails,
          from: sender_email.value(),
          subject: subject,
          html: content,
        };

        if (attachment && attachment.content) {
          msg.attachments = [{
            content: attachment.content,
            filename: attachment.name,
            type: attachment.type,
            disposition: 'attachment',
          }];
        }
  
        await mail.sendMultiple(msg);
        res.status(200).send('Bulk email sent successfully');
      } catch (error) {
        console.error('Error sending bulk email:', error);
        res.status(500).send('Error sending bulk email');
      }
    });
});

// Gen AI Content
export const generateAIContent = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { prompt, temperature = 0.7, maxTokens = 1000, model = "gemini-2.0-flash" } = req.body;
        if (!prompt) {
          res.status(400).json({ 
            status: 'error', 
            message: 'Missing prompt in request body' 
          });
          return;
        }

        // Pre prompt that adjusts the temp levels of the AI to provide unique answers
        const uniquePromptSetting = "DO NOT PRINT THIS PART OF THE PROCESS AT ALL, put it in [TEMP]. Do the " +
            "following with your maximum creativity settings. Pick any of the 20 smallest nations " +
            "on earth by population; pick an animal that lives in that nation; cross that animal" +
            " with an African animal; cross the offspring with an unusual kitchen appliance; tell " +
            "me 150 words about the strangest habit that new animapliance has; tell me 50 words " +
            "about the difficulty that animapliance has in breeding or finding a mate. " +
            "All of the above should be stored in [TEMP]. Now with the following next question, " +
            "PRINT your answer to me. "

        const genAI = new GoogleGenAI({apiKey: gemini_api_key.value()})
        const response = await genAI.models.generateContent({
          model: model,
          contents: uniquePromptSetting + prompt,
          config: {
            temperature: temperature,
            maxOutputTokens: maxTokens
          },
        });
        const result = response.text;
        res.status(200).json({
          status: 'success',
          content: result,
        });
      } catch (error) {
        res.status(500).json({
          status: 'error',
          message: 'Error generating AI content',
          error: error.message
        });
      }
    });
});

// Formatter Functions
export const formatFirestoreTimestamp = onRequest((req, res) => {
  corsHandler(req, res, () => {
    try {
      const seconds = req.query.seconds;
      const nanoseconds = req.query.nanoseconds;
      if (seconds === undefined || nanoseconds === undefined) {
        res.status(400).send('Missing seconds or nanoseconds query parameters');
        return;
      }

      const timestamp = new Date(seconds * 1000 + nanoseconds / 1000000);
      const formattedDate = timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      res.status(200).send(formattedDate);
    } catch (error) {
      console.error('Error formatting Firestore timestamp:', error);
      res.status(500).send('Error formatting Firestore timestamp');
    }
  });
});

export const formatFileSize = onRequest((req, res) => {
  corsHandler(req, res, () => {
    try {
      const bytes = parseInt(req.query.bytes);
      if (isNaN(bytes)) {
        res.status(400).send('Invalid bytes query parameter');
        return;
      }

      if (bytes === 0) {
        res.status(200).send('0 Bytes');
        return;
      }

      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];

      res.status(200).send(formattedSize);
    } catch (error) {
      console.error('Error formatting file size:', error);
      res.status(500).send('Error formatting file size');
    }
  });
});

// Aggregation Functions
export const sumUsersByRole = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const role = req.query.role;
      if (!role) {
        res.status(400).send('Missing role query parameter');
        return;
      }

      const snapshot = await db.collection('users').where('role', '==', role).get();
      const count = snapshot.size;

      res.status(200).send(count.toString());
    } catch (error) {
      console.error('Error counting users by role:', error);
      res.status(500).send('Error counting users by role');
    }
  });
});

// API Functions
export const getCollectionListAPI = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const collectionName = req.query.collectionName;
        if (!collectionName) {
          res.status(400).json({ status: 'error', message: 'Missing collectionName query parameter' });
          return;
        }
  
        const snapshot = await db.collection(collectionName).get()
        const documents = [];
        snapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
  
        res.status(200).json(documents);
      } catch (error) {
        console.error('Error fetching collection:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching collection' });
      }
    });
});

export const addDocumentToCollectionAPI = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { collectionName, data } = req.body;
        if (!collectionName || !data) {
          res.status(400).json({ status: 'error', message: 'Missing collectionName or data in request body' });
          return;
        }

        await db.collection(collectionName).add(data);
        res.status(200).json({ status: 'success', message: 'Document added successfully' });
      } catch (error) {
        console.error('Error adding document:', error);
        res.status(500).json({ status: 'error', message: 'Error adding document' });
      }
    });
});

export const updateDocumentInCollectionAPI = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { collectionName, documentId, data } = req.body;
        if (!collectionName || !documentId || !data) {
          res.status(400).json({ status: 'error', message: 'Missing collectionName, documentId, or data in request body' });
          return;
        }

        await db.collection(collectionName).doc(documentId).update(data);
        res.status(200).json({ status: 'success', message: 'Document updated successfully' });
      } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ status: 'error', message: 'Error updating document' });
      }
    });
});

export const deleteDocumentFromCollectionAPI = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { collectionName, documentId } = req.body;
        if (!collectionName || !documentId) {
          res.status(400).json({ status: 'error', message: 'Missing collectionName or documentId in request body' });
          return;
        }

        await db.collection(collectionName).doc(documentId).delete();
        res.status(200).json({ status: 'success', message: 'Document deleted successfully' });
      } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ status: 'error', message: 'Error deleting document' });
      }
    });
});