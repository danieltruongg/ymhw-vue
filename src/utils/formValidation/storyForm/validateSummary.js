export const validateSummary = (formData, formErrors, onBlur) => {
  const summary = formData.value.summary
  if (!summary || summary.trim() === '') {
    if (onBlur) formErrors.value.summary = 'Please enter a one line summary for the story'
  } else {
    formErrors.value.summary = null
  }
}