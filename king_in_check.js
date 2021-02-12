export default board => {

  const getRankIndex = piece => {
    return board.findIndex(r => r.includes(piece))
  }

  const kingIsInSameRankAsAttacker = () => {
    const kingRankIndex = getRankIndex('K')
    const attackerRankIndex = getRankIndex('Q')
    return kingRankIndex === attackerRankIndex
  }

  const getFileIndex = piece => {
    return board[getRankIndex(piece)].findIndex(f => f === piece)
  }

  const kingIsInSameFileAsAttacker = () => {
    const kingFileIndex = getFileIndex('K')
    const attackerFileIndex = getFileIndex('Q')
    return kingFileIndex === attackerFileIndex
  }

  function getIndexDiff(indexFn) {
    const kingIndex = indexFn('K')
    const attackerIndex = indexFn('Q')
    return Math.abs(kingIndex - attackerIndex)
  }

  const kingIsOnSameDiagonalAsAttacker = () => {
    const rankIndexDiff = getIndexDiff(getRankIndex)
    const fileIndexDiff = getIndexDiff(getFileIndex);

    return fileIndexDiff === rankIndexDiff
  }

  return kingIsInSameRankAsAttacker() || kingIsInSameFileAsAttacker() || kingIsOnSameDiagonalAsAttacker()
}