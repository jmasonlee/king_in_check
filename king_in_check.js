function getPieceRank(board, piece) {
    return board.find(r => r.includes(piece));
}

function kingIsInSameRankAsAttackingPiece(board) {
    const kingRank = getPieceRank(board, 'K')
    return kingRank.includes('Q');
}

function getPieceFileIndex(board, piece) {
    return getPieceRank(board, piece).indexOf(piece);
}

function kingIsInSameFileAsAttackingPiece(board) {
    const kingFile = getPieceFileIndex(board, 'K')
    const queenFile = getPieceFileIndex(board, 'Q')
    return kingFile == queenFile;
}

function kingIsOnDiagonalFromAttackingPiece(board) {
    const kingRankIndex = board.findIndex(r => r.includes('K'))
    const queenRankIndex = board.findIndex(r => r.includes('Q'))
    const rankIndexDiff = Math.abs(kingRankIndex - queenRankIndex)

    const kingFileIndex = getPieceFileIndex(board, 'K')
    const queenFileIndex = getPieceFileIndex(board, 'Q')
    const fileIndexDiff = Math.abs(kingFileIndex - queenFileIndex)

    return rankIndexDiff === fileIndexDiff;
}

export default board => {
    return kingIsInSameRankAsAttackingPiece(board) || kingIsInSameFileAsAttackingPiece(board) || kingIsOnDiagonalFromAttackingPiece(board);
}