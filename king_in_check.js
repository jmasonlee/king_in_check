const findAllPieces = board => {
  return board.flat().map((square, index) => {
      if(square != '') {
        return {type: square, rank: Math.floor(index/8), file: index%8 }
      }
      return ''
  }).filter(piece => piece !== '')

}

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

export default board => {
  let pieces = findAllPieces(board)
  return pieces.length > 1
} 