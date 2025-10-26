export const validateContent = (formData, formErrors, onBlur) => {
  const content = formData.value.content
  if (!content || content.trim() === '') {
    if (onBlur) formErrors.value.content = 'Please enter the content for your story'
  } else {
    formErrors.value.content = null
  }
}