export const fileToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1]) // Remove data URL prefix
    reader.readAsDataURL(file)
  })
}