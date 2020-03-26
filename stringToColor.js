export const stringToColor = (str) => {
  let hash = 0
  let color = '#'

  str.split('').forEach(i => hash = str.charCodeAt(i) + ((hash << 5) - hash))

  Array(3).fill().forEach((_, i) => {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).slice(-2);
  })

  return color
}
