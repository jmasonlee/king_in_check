export const square = board => {
  return board.replace(/\s+/g, '').split('')
}
export default board => {
  const squares = board.split()
  const kingIndex = squares.indexOf('K')
  return false
}