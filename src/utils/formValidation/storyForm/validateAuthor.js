export const validateAuthor = (formData, formErrors, onBlur) => {
  const author = formData.value.author
  if (!author || author.trim() === '') {
    if (onBlur) formErrors.value.author = 'Please enter your name'
  } else {
    formErrors.value.author = null
  }
}