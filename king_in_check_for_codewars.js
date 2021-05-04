const KING = "♔";
const EMPTY = " ";

const getFileFromIndex = (index) => {
  return index % 8;
};

const getRankFromIndex = (index) => {
  return Math.floor(index / 8);
};

const getRelativeLocationToKing = (king, s, index) => {
  return {
    type: s,
    rankDiff: getRankFromIndex(index) - king.rank,
    fileDiff: getFileFromIndex(index) - king.file,
  };
};

const getKing = (board) => {
  let index = board.flat().indexOf(KING);
  return {
    type: KING,
    file: getFileFromIndex(index),
    rank: getRankFromIndex(index),
  };
};

const getPiecesFromBoard = (board) => {
  const king = getKing(board);

  return board
    .flat()
    .map((s, index) => getRelativeLocationToKing(king, s, index));
};

const kingIsInCheck = (board) => {
  const isInStraightLine = (piece) =>
    piece.fileDiff === 0 || piece.rankDiff === 0;

  const isOnDiagonal = (piece) =>
    Math.abs(piece.fileDiff) === Math.abs(piece.rankDiff);

  const canPawnAttack = (piece) => {
    const isNextToKing =
      Math.abs(piece.rankDiff) === 1 && Math.abs(piece.fileDiff) === 1;
    const isNorthOfKing = piece.rankDiff < 0;

    return isNextToKing && isNorthOfKing;
  };

  const canKnightAttack = (piece) => {
    const set = new Set();
    set.add(Math.abs(piece.rankDiff));
    set.add(Math.abs(piece.fileDiff));
    return set.has(1) && set.has(2);
  };

  const findBlockingPieces = (isOnVector, piece) => {
    return pieces.filter(
      (p) =>
        isOnVector(p) &&
        p.type !== EMPTY &&
        Math.sign(p.rankDiff) === Math.sign(piece.rankDiff) &&
        Math.sign(p.fileDiff) === Math.sign(piece.fileDiff) &&
        (Math.abs(p.fileDiff) < Math.abs(piece.fileDiff) ||
          Math.abs(p.rankDiff) < Math.abs(piece.rankDiff))
    );
  };

  const canAttack = (piece, isOnVector) => {
    const blockingPieces = findBlockingPieces(isOnVector, piece);

    return isOnVector(piece) && blockingPieces.length == 0;
  };

  const pieceAttackPatterns = {
    "♛": (piece) =>
      canAttack(piece, isInStraightLine) || canAttack(piece, isOnDiagonal),
    "♜": (piece) => canAttack(piece, isInStraightLine),
    "♝": (piece) => canAttack(piece, isOnDiagonal),
    "♞": (piece) => canKnightAttack(piece),
    "♔": () => false,
    "♟": (piece) => canPawnAttack(piece),
    " ": () => false,
  };

  const pieces = getPiecesFromBoard(board);

  return pieces.filter((p) => pieceAttackPatterns[p.type](p)).length > 0;
};
