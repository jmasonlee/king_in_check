export default board => {
    console.log(board)
    const flatBoard = board.flat()
    const kingIndex = flatBoard.indexOf('K')
    console.log(kingIndex)
    const rankIndex = Math.floor(kingIndex/8)
    const fileIndex = kingIndex%8
    console.log(rankIndex)
    console.log(fileIndex)
    return false
}