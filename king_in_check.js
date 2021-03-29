export default board => {
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

    function getPieceIfPresent(king) {
        return (s, index) => {
            return s ?
                {
                    type: s,
                    rank: getRankFromIndex(index) - king.rank,
                    file: getFileFromIndex(index) - king.file
                } : ''
        }
    }

    const filterRelevantPieces = () => s => s !== '' && s !== KING

    const getPiecesFromBoard = board => {
        const king = getKing(board)
        return board.flat().map(getPieceIfPresent(king)).filter(filterRelevantPieces())
    }

    const isOnDiagonalFromKing = piece => piece.file === piece.rank

    const isNorthOfKing = piece => piece.rank < 0

    const canAttackFromNorthDiagonal = piece => {
        return isNorthOfKing(piece) && isOnDiagonalFromKing(piece) && canCheckFrom.NORTH_DIAGONAL.includes(piece.type)
    }

    const isInStraightLineFromKing = piece => piece.file === 0

    const canAttackFromN = piece => {
        return isNorthOfKing(piece)
            && isInStraightLineFromKing(piece)
            && canCheckFrom.STRAIGHT_LINE.includes(piece.type)
    }


    const pieces = getPiecesFromBoard(board)

    return pieces.length > 1 && pieces.filter(p => canAttackFromNorthDiagonal(p) || canAttackFromN(p)).length > 0
}