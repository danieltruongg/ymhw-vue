export const validateSignupPassword = (formData, formErrors, onBlur) => {
  const password = formData.value.password
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password)
  const hasSpace = /\s/.test(password)
  const minLength = 8
  if (!password || password.trim() === '') {
    if (onBlur) formErrors.value.password = 'Please enter a password'
  } else if (password.length < minLength) {
    if (onBlur) formErrors.value.password = `Password must be at least ${minLength} characters long`
  } else if (!hasUpperCase) {
    if (onBlur) formErrors.value.password = 'Password must contain at least one uppercase letter'
  } else if (!hasLowerCase) {
    if (onBlur) formErrors.value.password = 'Password must contain at least one lowercase letter'
  } else if (!hasNumber) {
    if (onBlur) formErrors.value.password = 'Password must contain at least one number'
  } else if (!hasSpecialChar) {
    if (onBlur) formErrors.value.password = 'Password must contain at least one special character'
  } else if (hasSpace) {
    if (onBlur) formErrors.value.password = 'Password must not contain spaces'
  } else {
    formErrors.value.password = null
  }
}

export const validateSignupConfPassword = (formData, formErrors, onBlur) => {
  const confPassword = formData.value.confPassword
  if (!confPassword || confPassword.trim() === '') {
    if (onBlur) formErrors.value.confPassword = 'Please reconfirm the password'
  } else if (confPassword !== formData.value.password) {
    if (onBlur) formErrors.value.confPassword = 'Passwords do not match'
  } else {
    formErrors.value.confPassword = null
  }
}

export const validateLoginPassword = (formData, formErrors, onBlur) => {
  const password = formData.value.password

  if (!password || password.trim() === '') {
    if (onBlur) formErrors.value.password = 'Please enter your password'
  } else {
    formErrors.value.password = null
  }
}