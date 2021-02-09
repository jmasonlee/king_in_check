const pieces = {
    KING: 'K',
    QUEEN: 'Q',
    ROOK: 'R'
}

function findKingFile (board) {
    return board.find(f => f.includes(pieces.KING));
}

function isPieceInSameFileAsKing(board) {
    const kingFile = findKingFile(board)
    return [pieces.QUEEN, pieces.ROOK].some( p => kingFile.indexOf(p) >= 0)
}

export default board => {
    return isPieceInSameFileAsKing(board)
}