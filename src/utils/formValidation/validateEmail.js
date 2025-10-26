export const validateEmail = (formData, formErrors,onBlur) => {
  const email = formData.value.email
  const hasEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!email || email.trim() === '') {
    if (onBlur) formErrors.value.email = 'Please enter your email address'
  } else if (!hasEmailPattern) {
    if (onBlur) formErrors.value.email = 'Please enter a valid email address'
  } else {
    formErrors.value.email = null
  }
}