const canCheckFrom = {
    STRAIGHT_LINE: ['Q', 'R'],
    NORTH_DIAGONAL: ['Q', 'B', 'P'],
    SOUTH_DIAGONAL: ['Q', 'B'],
    KN: ['N']
}
const getFileFromIndex = (index) => {
    return index % 8
}

const getRankFromIndex = (index) => {
    return Math.floor(index / 8)
}

const getKing = board => {
  return {
    index: board.flat().indexOf('K'),
    file: getFileFromIndex(board.flat().indexOf('K')),
    rank: getRankFromIndex(board.flat().indexOf('K'))
  }
}

const getPiecesFromBoard = board => {
  const king = getKing(board)

    return board.flat().map((s, index) => {
        return s ?
            {
                type: s,
                rank: getRankFromIndex(index) - king.rank,
                file: getFileFromIndex(index) - king.file
            } : ''
    }).filter(s => s !== '' && s !== 'K')
}

const isOnDiagonalFromKing = piece => piece.file === piece.rank

function isNorthOfKing(piece) {
    return piece.rank < 0
}

const canAttackFromNorthDiagonal = piece => {
    return isNorthOfKing(piece) && isOnDiagonalFromKing(piece) && canCheckFrom.NORTH_DIAGONAL.includes(piece.type)
}

function isInStraightLineFromKing(piece) {
    return piece.file === 0
}

const canAttackFromN = piece => {
    return isNorthOfKing(piece)
        && isInStraightLineFromKing(piece)
        && canCheckFrom.STRAIGHT_LINE.includes(piece.type)
}

export default board => {
    const pieces = getPiecesFromBoard(board)

    return pieces.length > 1 && pieces.filter(p => canAttackFromNorthDiagonal(p) || canAttackFromN(p)).length > 0
}