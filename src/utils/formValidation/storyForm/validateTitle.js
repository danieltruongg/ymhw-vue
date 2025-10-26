export const validateTitle = (formData, formErrors, onBlur) => {
  const title = formData.value.title
  if (!title || title.trim() === '') {
    if (onBlur) formErrors.value.title = 'Please enter a title for your story'
  } else {
    formErrors.value.title = null
  }
}