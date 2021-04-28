function isOnDiagonal(piece) {
    return Math.abs(piece.fileDiff) === Math.abs(piece.rankDiff)
}

const KING = 'K'
const EMPTY = ' '

const getFileFromIndex = (index) => {
    return index % 8
}

const getRankFromIndex = (index) => {
    return Math.floor(index / 8)
}

const getRelativeLocationToKing = (king, s, index) => {
    return {
            type: s,
            rankDiff: getRankFromIndex(index) - king.rank,
            fileDiff: getFileFromIndex(index) - king.file
        }
}

const getKing = board => {
    let index = board.flat().indexOf(KING)
    return {
        type: KING,
        file: getFileFromIndex(index),
        rank: getRankFromIndex(index)
    }
}

export const getPiecesFromBoard = board => {
    const king = getKing(board)

    return board.flat().map((s,index) => getRelativeLocationToKing(king, s, index))
}

export default board => {
    const canCheckFrom = {
        STRAIGHT_LINE: ['Q', 'R'],
        DIAGONAL: ['Q', 'B'],
        NORTH_DIAGONAL: ['Q', 'B', 'P'],
        PAWN: ['P'],
        SOUTH_DIAGONAL: ['Q', 'B'],
        KN: ['N']
    }


    const canPawnAttack = piece => {
        const isNextToKing = Math.abs(piece.rankDiff) === 1 && Math.abs(piece.fileDiff) === 1
        const isNorthOfKing = piece.rankDiff < 0

        return canCheckFrom.PAWN.includes(piece.type) &&
            isNextToKing &&
            isNorthOfKing
    }

    const getInStraightLineFromKing = piece => piece.fileDiff === 0 || piece.rankDiff === 0

    function findPiecesOnTheSameVector(onTheSameVector) {
        return pieces.filter(p => onTheSameVector(p))
    }

    const canAttackFromStraightLine = piece => {
        const isInStraightLineFromKing = getInStraightLineFromKing(piece)
        const piecesOnTheSameVector = findPiecesOnTheSameVector(getInStraightLineFromKing)
        const findPiecesOnCorrectHalf = piecesOnTheSameVector.filter(p => p.type !== EMPTY && Math.sign(p.rankDiff) === Math.sign(piece.rankDiff) && Math.sign(p.fileDiff) === Math.sign(piece.fileDiff))
        return isInStraightLineFromKing
            && canCheckFrom.STRAIGHT_LINE.includes(piece.type)
            && findPiecesOnCorrectHalf.filter(p => Math.abs(p.fileDiff) < Math.abs(piece.fileDiff) || Math.abs(p.rankDiff) < Math.abs(piece.rankDiff)).length == 0
    }

    const canAttackFromDiagonal = (piece) => {
        const isOnDiagonalFromKing = isOnDiagonal(piece)

        const findPiecesOnTheSameVector = pieces.filter(p => isOnDiagonal(p))

        const findPiecesOnCorrectHalf = findPiecesOnTheSameVector.filter(p => p.type !== EMPTY && Math.sign(p.rankDiff) === Math.sign(piece.rankDiff) && Math.sign(p.fileDiff) === Math.sign(piece.fileDiff))

        return isOnDiagonalFromKing && canCheckFrom.DIAGONAL.includes(piece.type) && findPiecesOnCorrectHalf.filter(p => Math.abs(p.fileDiff) < Math.abs(piece.fileDiff)).length == 0
    }

    const pieceAttackPatterns = {
        'Q': (piece) => canAttackFromStraightLine(piece) || canAttackFromDiagonal(piece),
        'R': (piece) => canAttackFromStraightLine(piece),
        'B': (piece) => canAttackFromDiagonal(piece),
        'N': () => false,
        'K': () => false,
        'P': (piece) => canPawnAttack(piece),
        ' ': () => false
    }

    const pieces = getPiecesFromBoard(board)

    return pieces.filter(p => 
        pieceAttackPatterns[p.type](p)
    ).length > 0
}