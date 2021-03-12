

const checkablePositions = {
  N: ['Q', 'R'],
  NW: ['Q', 'B', 'P'],
  W: ['Q', 'R'],
  SW: ['Q', 'B'],
  S: ['Q', 'R'],
  SE: ['Q', 'B'],
  E: ['Q', 'R'],
  NE: ['Q', 'B', 'P'],
  KN: ['N']
}


const getPiecesFromBoard = board => {
  const getRankFromIndex = (index) => {
    return Math.floor(index / 8);
  }

  const getFileFromIndex = (index) => {
    return index % 8;
  }

  const kingIndex = board.flat().indexOf('K')
  const kingFile = getFileFromIndex(kingIndex)
  const kingRank = getRankFromIndex(kingIndex)

  return board.flat().map((s, index) => {
    return s ?
      {
        type: s,
        rank: getRankFromIndex(index) - kingRank,
        file: getFileFromIndex(index) - kingFile
      } : ''
  }).filter(s => s !== '' && s !== 'K')
}

const canAttackFromNE = piece => {
  return piece.rank < 0 && piece.file < 0 && piece.file === piece.rank && checkablePositions.NE.includes(piece.type)
}
const canAttackFromN = piece => {
  return piece.rank < 0
    && piece.file === 0
    && piece.file !== piece.rank
    && checkablePositions.N.includes(piece.type)
}

export default board => {
  const pieces = getPiecesFromBoard(board)

  return pieces.length > 1 && pieces.filter(p => canAttackFromNE(p) || canAttackFromN(p)).length > 0
}