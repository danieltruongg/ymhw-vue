export const validateUsername = (formData, formErrors, onBlur) => {
  const username = formData.value.username
  const hasSpace = /\s/.test(username)
  const hasSpecialChar = /[^a-zA-Z0-9_-]/.test(username)
  const minLength = 3
  if (!username || username.trim() === '') {
    if (onBlur) formErrors.value.username = 'Please enter a username'
  } else if (username.length < minLength) {
    if (onBlur) formErrors.value.username = `Username must be at least ${minLength} characters long`
  } else if (hasSpace) {
    if (onBlur) formErrors.value.username = `Username must not contain spaces`
  } else if (hasSpecialChar) {
    if (onBlur)
      formErrors.value.username = `Username must not contain any special characters except for - and _`
  } else {
    formErrors.value.username = null
  }
}