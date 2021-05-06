export const square = board => {
    return board.replace(/\s+/g, '').split('')
}
export default board => {
    const squares = square(board)
    const pieces = squares.map((s, index) => {
        return {
            type: s,
            index
        }
    }).filter(s => s.type != '_')
    const kingIndex = squares.indexOf('K')
    return pieces.length > 1
}