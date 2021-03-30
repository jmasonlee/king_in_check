export default board => {
  const EMPTY_SQUARE = '';
  const KING = 'K'
  const canCheckFrom = {
    STRAIGHT_LINE: ['Q', 'R'],
    NORTH_DIAGONAL: ['Q', 'B', 'P'],
    SOUTH_DIAGONAL: ['Q', 'B'],
    KN: ['N']
  }
  const getFileFromIndex = (index) => {
    return index % 8
  }

  const getRankFromIndex = (index) => {
    return Math.floor(index / 8)
  }

  const getKing = board => {
    let index = board.flat().indexOf(KING)
    return {
      file: getFileFromIndex(index),
      rank: getRankFromIndex(index)
    }
  }

  const getPieceIfPresent = king => (s, index) => {
    return s ?
      {
        type: s,
        rank: getRankFromIndex(index) - king.rank,
        file: getFileFromIndex(index) - king.file
      } : EMPTY_SQUARE
  };

  const filterRelevantPieces = () => {
    return s => s !== EMPTY_SQUARE && s !== KING;
  }

  const getPiecesFromBoard = board => {
    const king = getKing(board)
    return board.flat().map(getPieceIfPresent(king)).filter(filterRelevantPieces())
  }

  const isOnDiagonalFromKing = piece => piece.file === piece.rank

  const isNorthOfKing = piece => piece.rank < 0

  const canAttackFromNorthDiagonal = piece => {
    return isNorthOfKing(piece) && isOnDiagonalFromKing(piece) && canCheckFrom.NORTH_DIAGONAL.includes(piece.type)
  }

  const isInStraightLineFromKing = piece => piece.file === 0 || piece.rank === 0

  const canAttackFromStraightLine = piece => {
    return isInStraightLineFromKing(piece)
      && canCheckFrom.STRAIGHT_LINE.includes(piece.type)
  }

  const pieces = getPiecesFromBoard(board)

  return pieces.length > 1 && pieces.filter(p => canAttackFromNorthDiagonal(p) || canAttackFromStraightLine(p)).length > 0
}