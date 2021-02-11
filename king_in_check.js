export default board => {
  const getPieceRankIndex = piece => {
    return board.findIndex(r => r.includes(piece))
  }

  const getPieceFileIndex = piece => {
    return board[getPieceRankIndex(piece)].findIndex()
  }

  const kingIsInSameRankAsQueen = () => {
    return getPieceRankIndex('K') === getPieceRankIndex('Q')
  }

  return kingIsInSameRankAsQueen(board)
}