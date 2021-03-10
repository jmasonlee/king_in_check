const isOnSameDiagonal = (p1, p2) =>{
    console.log(p1)
    console.log(p2)
 let rankDiff = Math.abs(p1.rank - p2.rank)
 let fileDiff = Math.abs(p1.file - p2.file)
 console.log(p1.rank)
 console.log(fileDiff)
 return fileDiff === rankDiff
}

const map = {
 'K': () => false,
 'R': () => true,
 'Q': () => true,
 'P': () => false,
 'B': (king, bishop) => isOnSameDiagonal(king, bishop),
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

const checkInCheck = (piecesOnBoard, result=false) => {
  const king = piecesOnBoard.filter(p => p.type === 'K')[0]
  return piecesOnBoard.findIndex(piece => map[piece.type](king, piece)) !== -1
}

export default board => {
 let piecesOnBoard = getPiecesOnBoard(board);
 return checkInCheck(piecesOnBoard)
}