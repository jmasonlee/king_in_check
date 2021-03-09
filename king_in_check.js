const isOnSameDiagonal = (p1, p2) =>{
 let rankDiff = Math.abs(p1.rank - p2.rank)
 let fileDiff = Math.abs(p1.file - p2.file)
 return fileDiff === rankDiff
}

const map = {
 'K': () => false,
 'R': () => true,
 'Q': () => true,
 'P': () => false,
 'B': isOnSameDiagonal,
 'N': () => false
}

const getPiecesOnBoard = board => {
  let pieces = []
  board.forEach( (rank, index) => {
    let rankP = rank.filter(s => s !== '') || []
    rankP.forEach(piece => {
      pieces.push({type: piece, rank: index, file: rank.indexOf(piece)})
    })
  })

  return pieces
}

export default board => {
 let piecesOnBoard = getPiecesOnBoard(board);
 const king = piecesOnBoard.filter(p => p.type === 'K')
 let result = false
 piecesOnBoard.forEach(piece => { result = result || map[piece.type](king, piece)})
 return result;
}