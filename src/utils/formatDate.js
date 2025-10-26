export const formatFirestoreTimestamp = (date) => {
  const timestamp = new Date(date.seconds * 1000 + date.nanoseconds / 1000000)

  return timestamp.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
