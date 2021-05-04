export default (board) => {
    const KING = "K"
    const EMPTY = " "

    board = board.flat()
    const getFileFromIndex = (index) => {
        return index % 8
    }

    const getRankFromIndex = (index) => {
        return Math.floor(index / 8)
    }

    const getRelativeLocationToKing = (s, index) => {
        const kingIndex = board.indexOf(KING)
        return {
            type: s,
            rankDiff: getRankFromIndex(index) - getRankFromIndex(kingIndex),
            fileDiff: getFileFromIndex(index) - getFileFromIndex(kingIndex)
        }
    }

    const getPiecesFromBoard = () => {
        return board
            .map((s, index) => getRelativeLocationToKing(s, index))
    }

    const isInStraightLine = (piece) =>
        piece.fileDiff === 0 || piece.rankDiff === 0

    const isOnDiagonal = (piece) =>
        Math.abs(piece.fileDiff) === Math.abs(piece.rankDiff)

    const canPawnAttack = (piece) => {
        const isNextToKing =
            Math.abs(piece.rankDiff) === 1 && Math.abs(piece.fileDiff) === 1
        const isNorthOfKing = piece.rankDiff < 0
        return isNextToKing && isNorthOfKing
    }

    const canKnightAttack = (piece) => {
        const set = new Set([Math.abs(piece.rankDiff), Math.abs(piece.fileDiff)])
        return set.has(1) && set.has(2)
    }

    const findBlockingPieces = (isOnVector, piece) => {
        return pieces.filter(
            (p) =>
                isOnVector(p) &&
                p.type !== EMPTY &&
                Math.sign(p.rankDiff) === Math.sign(piece.rankDiff) &&
                Math.sign(p.fileDiff) === Math.sign(piece.fileDiff) &&
                (Math.abs(p.fileDiff) < Math.abs(piece.fileDiff) ||
                    Math.abs(p.rankDiff) < Math.abs(piece.rankDiff))
        )
    }

    const canAttack = (piece, isOnVector) => {
        const blockingPieces = findBlockingPieces(isOnVector, piece)

        return isOnVector(piece) && blockingPieces.length == 0
    }

    const pieceAttackPatterns = {
        "Q": (piece) =>
            canAttack(piece, isInStraightLine) || canAttack(piece, isOnDiagonal),
        "R": (piece) => canAttack(piece, isInStraightLine),
        "B": (piece) => canAttack(piece, isOnDiagonal),
        "N": (piece) => canKnightAttack(piece),
        "K": () => false,
        "P": (piece) => canPawnAttack(piece),
        " ": () => false
    }

    const pieces = getPiecesFromBoard()

    return pieces.filter((p) => pieceAttackPatterns[p.type](p)).length > 0
};
