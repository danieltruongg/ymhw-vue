export const validateStoryType = (formData, formErrors, onBlur) => {
  const storyType = formData.value.storyType
  if (!storyType || storyType.trim() === '') {
    if (onBlur) formErrors.value.storyType = 'Please select a story type'
  } else {
    formErrors.value.storyType = null
  }
}