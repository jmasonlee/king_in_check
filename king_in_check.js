function isOnDiagonal(piece) {
    return Math.abs(piece.fileDiff) === Math.abs(piece.rankDiff)
}

export default board => {
    const EMPTY_SQUARE = ''
    const KING = 'K'
    const canCheckFrom = {
        STRAIGHT_LINE: ['Q', 'R'],
        DIAGONAL: ['Q', 'B'],
        NORTH_DIAGONAL: ['Q', 'B', 'P'],
        PAWN: ['P'],
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
            type: KING,
            file: getFileFromIndex(index),
            rank: getRankFromIndex(index)
        }
    }

    const getPieceIfPresent = king => (s, index) => {
        return s ?
            {
                type: s,
                rankDiff: getRankFromIndex(index) - king.rank,
                fileDiff: getFileFromIndex(index) - king.file
            } : EMPTY_SQUARE
    }

    const filterRelevantPieces = () => {
        return s => s !== EMPTY_SQUARE && s.type !== KING
    }

    const getPiecesFromBoard = board => {
        const king = getKing(board)
        return board.flat().map(getPieceIfPresent(king)).filter(filterRelevantPieces())
    }

    const canPawnAttack = piece => {
        const isNextToKing = Math.abs(piece.rankDiff) === 1 && Math.abs(piece.fileDiff) === 1
        const isNorthOfKing = piece.rankDiff < 0

        return canCheckFrom.PAWN.includes(piece.type) &&
            isNextToKing &&
            isNorthOfKing
    }

    const canAttackFromStraightLine = piece => {
        const isInStraightLineFromKing = piece.fileDiff === 0 || piece.rankDiff === 0

        return isInStraightLineFromKing
            && canCheckFrom.STRAIGHT_LINE.includes(piece.type)
    }

    const canAttackFromDiagonal = (piece, pieces) => {
        const isOnDiagonalFromKing = isOnDiagonal(piece)
        const findPiecesOnTheSameVector = pieces.filter(p => isOnDiagonal(p))
        const findPiecesOnCorrectHalf = findPiecesOnTheSameVector.filter(p => Math.sign(p.rankDiff) === Math.sign(piece.rankDiff) && Math.sign(p.fileDiff) === Math.sign(piece.fileDiff))
        return isOnDiagonalFromKing && canCheckFrom.DIAGONAL.includes(piece.type) && findPiecesOnCorrectHalf.filter(p => p.fileDiff < piece.fileDiff).length > 0
    }

    const pieceAttackPatterns = {
        'Q': (piece, pieces) => canAttackFromStraightLine(piece, pieces) || canAttackFromDiagonal(piece, pieces),
        'R': (piece, pieces) => canAttackFromStraightLine(piece, pieces),
        'B': (piece, pieces) => canAttackFromDiagonal(piece, pieces),
        'N': () => false,
        'P': (piece, pieces) => canPawnAttack(piece)
    }
    const pieces = getPiecesFromBoard(board)

    return pieces.filter(p => pieceAttackPatterns[p.type](p, pieces)).length > 0
}