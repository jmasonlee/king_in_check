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

    const canAttackFromDiagonal = piece => {
        const isOnDiagonalFromKing = Math.abs(piece.fileDiff) === Math.abs(piece.rankDiff)

        return isOnDiagonalFromKing && canCheckFrom.DIAGONAL.includes(piece.type)
    }

    const pieceAttackPatterns = {
        'Q': piece => canAttackFromStraightLine(piece) || canAttackFromDiagonal(piece),
        'R': piece => canAttackFromStraightLine(piece),
        'B': piece => canAttackFromDiagonal(piece),
        'N': () => false,
        'P': piece => canPawnAttack(piece)
    }
    const pieces = getPiecesFromBoard(board)

    return pieces.filter(p => pieceAttackPatterns[p.type](p)).length > 0
}