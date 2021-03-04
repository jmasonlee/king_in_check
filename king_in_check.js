const map = {
 'K': () => false,
 'R': () => true,
 'Q': () => true,
 'P': () => false,
 'B': isOnSameDiagonal,
 'N': () => false
}

const isOnSameDiagonal = (p1, p2) =>{
 let rankDiff = Math.abs(p1.rank - p2.rank)
 let fileDiff = Math.abs(p1.file - p2.file)
 return fileDiff === rankDiff
}

export default board => {
 let piecesOnBoard = board.flat().filter(o => o !== '');
 let result = false
 piecesOnBoard.forEach(piece => { result = result || map[piece]()})
 return result;
}