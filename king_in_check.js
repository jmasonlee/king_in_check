

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

const isInCheckFromNE = pieces => {
  const king = pieces.find(p => p.type ='K')
  const piecesInNE = pieces.filter(p=>{
    let rankDif = p.rank - king.rank
    let fileDif = p.file - king.file
    return rankDif === fileDif && rankDif < 0  && fileDif < 0
  })
  const closestPieceInNE = piecesInNE.reduce((p, closest) => {
    let rankDif = p.rank - king.rank
  })
  return checkablePositions.NE.filter(p => pieces.includes(p)) > 0
  
}

const getPiecesFromBoard = board => {
return board.flat().map((s,index)=>{
  return s ? { type: s, rank: Math.floor(index/8), file: index%8 } : ''
}).filter(s=>s!=='')
}

export default board => {
  const pieces = getPiecesFromBoard(board)
  const checkablePieces = isInCheckFromNE(pieces)
  return checkablePieces
} 