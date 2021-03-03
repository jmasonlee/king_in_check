const map = {
 'K': false,
 'R': true,
 'Q': true,
 'P': false,
 'B': false,
 'N': false
}

const isOnS

export default board => {
 let piecesOnBoard = board.flat().filter(o => o !== '');
 let result = false
 piecesOnBoard.forEach(piece => { result = result || map[piece]})
 return result;
}