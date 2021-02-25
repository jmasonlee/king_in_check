export const isInSameRank = (piece1, piece2) => {
  return piece1.rank === piece2.rank
}

export const isInSameFile = (piece1, piece2) => {
  return piece1.file === piece2.file
}

export const isOnSameDiagonal = (piece1, piece2) => {
   return useSetToDetermineValidityOfDiagonalAttack(Math.abs(piece1.rank - piece2.rank), piece1, piece2)
}