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
    const canPawnAttack = piece => {
        const isNextToKing = Math.abs(piece.rankDiff) === 1 && Math.abs(piece.fileDiff) === 1
        const isNorthOfKing = piece.rankDiff < 0

        return isNextToKing && isNorthOfKing
    }

    const isInStraightLine = piece => piece.fileDiff === 0 || piece.rankDiff === 0

    const findPiecesOnCorrectHalf = (pieces, piece) => {
        return pieces.filter(p => 
            p.type !== EMPTY && 
            Math.sign(p.rankDiff) === Math.sign(piece.rankDiff) &&
            Math.sign(p.fileDiff) === Math.sign(piece.fileDiff) &&
            (Math.abs(p.fileDiff) < Math.abs(piece.fileDiff) || Math.abs(p.rankDiff) < Math.abs(piece.rankDiff)))
    }

    const canAttackFromStraightLine = piece => {
        return canAttack(piece, isInStraightLine)
    }

    const canAttackFromDiagonal = (piece) => {
        return canAttack(piece, isOnDiagonal)
    }

    const canAttack = (piece, isOnVector) => {
        const piecesOnTheSameVector = pieces.filter(p => isOnVector(p))

        const piecesOnCorrectHalf = findPiecesOnCorrectHalf(piecesOnTheSameVector, piece)

        return piecesOnTheSameVector.includes(piece) && 
                piecesOnCorrectHalf.length == 0
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