import { routeNames } from '@/router'

const youthMentalTopics = {
  label: 'Explore Mental Health Topics',
  route_name: routeNames.youthMentalTopics.main,
}
const youthMentalTopicsAnxiety = {
  label: 'Anxiety',
  route_name: routeNames.youthMentalTopics.anxiety,
}
const youthMentalTopicsDepression = {
  label: 'Depression',
  route_name: routeNames.youthMentalTopics.depression,
}
const youthMentalTopicsSelfHarm = {
  label: 'Self-Harm',
  route_name: routeNames.youthMentalTopics.selfHarm,
}

const youthWellbeingTopics = {
  label: 'Explore Wellbeing Topics',
  route_name: routeNames.youthWellbeingTopics.main,
}
const youthWellbeingTopicsBuildingConfidence = {
  label: 'Building Confidence',
  route_name: routeNames.youthWellbeingTopics.buildingConfidence,
}
const youthWellbeingTopicsLearningSkills = {
  label: 'Learning Skills',
  route_name: routeNames.youthWellbeingTopics.learningSkills,
}
const youthWellbeingTopicsEatingWell = {
  label: 'Eating Well',
  route_name: routeNames.youthWellbeingTopics.eatingWell,
}

const youthSupport = {
  label: 'Get Support',
  route_name: routeNames.youthSupport.main,
}
const youthSupportCall = {
  label: 'Call Us',
  route_name: routeNames.youthSupport.call,
}
const youthSupportChat = {
  label: 'Chat with Us',
  route_name: routeNames.youthSupport.chat,
}
const youthSupportForum = {
  label: 'Forum',
  route_name: routeNames.youthSupport.forum,
}

const youthStories = {
  label: 'Listen to Stories',
  route_name: routeNames.youthStories.main,
}

const youthMentalTopicDropdownItems = {
  label: 'Explore Mental Health Topics',
  items: [youthMentalTopicsAnxiety, youthMentalTopicsDepression, youthMentalTopicsSelfHarm],
  route_name: youthMentalTopics.route_name,
}

const youthWellbeingTopicDropdownItems = {
  label: 'Explore Wellbeing Topics',
  items: [
    youthWellbeingTopicsBuildingConfidence,
    youthWellbeingTopicsLearningSkills,
    youthWellbeingTopicsEatingWell,
  ],
  route_name: youthWellbeingTopics.route_name,
}

const youthSupportDropdownItems = {
  label: 'Get Support',
  items: [youthSupportCall, youthSupportChat, youthSupportForum],
  route_name: youthSupport.route_name,
}

export {
  youthMentalTopicDropdownItems,
  youthWellbeingTopicDropdownItems,
  youthSupportDropdownItems,
  youthMentalTopics,
  youthWellbeingTopics,
  youthSupport,
  youthStories,
}
