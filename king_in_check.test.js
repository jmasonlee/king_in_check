import cases from 'jest-in-case'
import kingInCheck from './king_in_check'
import cloneDeep from 'lodash/cloneDeep'

const emptyBoard =
    [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
    ]

let board

beforeEach(() => {
    board = cloneDeep(emptyBoard)
})

function getPiece(type, rank, file) {
    return {type: type, rank: rank, file: file}
}

const addPieceToBoard = (pieces) => {
    pieces.forEach(piece => board[piece.rank][piece.file] = piece.type)
}

cases('king in check', args => {
    addPieceToBoard(args.pieces)
    expect(kingInCheck(board)).toBe(args.expected)
}, [
    {
        name: 'should return false when K is alone',
        pieces: [getPiece('K', 5, 3)],
        expected: false
    },
    {
        name: 'should return true when K is in check from above in same file',
        pieces: [getPiece('K', 5, 3), getPiece('Q', 2, 3)],
        expected: true
    },
    {
        name: 'should return false when K is in not in check from above in same file',
        pieces: [getPiece('K', 5, 3), getPiece('P', 2, 3)],
        expected: false
    },
    {
        name: 'should return true when king is in check from from northeast',
        pieces: [getPiece('K', 5,3), getPiece('P', 4, 2)],
        expected: true
    },
    {
        name: 'should return false when king is not in check from from northeast',
        pieces: [getPiece('K', 5,3), getPiece('N', 4, 2)],
        expected: false
    },
    {
        name: 'should return true when king is in check from the same rank',
        pieces: [getPiece('K', 5,3), getPiece('R', 5, 2)],
        expected: true
    },
    {
        name: 'should return true when king is in check from a south diagonal',
        pieces: [getPiece('K', 5,3), getPiece('B', 6, 2)],
        expected: true
    },
    {
        name: 'should return false when king is not in check by pawn from a north diagonal',
        pieces: [getPiece('K', 5,3), getPiece('P', 3, 1)],
        expected: false
    },
    {
        name: 'should return false when king is not in check because there is a piece in the way diagonally',
        pieces: [getPiece('K', 5,3), getPiece('B', 3, 1), getPiece('R', 4, 2)],
        expected: false
    },
    {
        name: 'should return false when king is not in check because there is a piece in the way in the same rank',
        pieces: [getPiece('K', 5,3), getPiece('R', 5, 5), getPiece('P', 5, 4)],
        expected: false
    },
    {
        name: 'should return false when king is not in check because there is a piece in the way in the same file',
        pieces: [getPiece('K', 5,3), getPiece('R', 3, 3), getPiece('P', 4, 3)],
        expected: false
    },
    {
        name: 'should return true when king is in check because there is a piece in the way in the same file',
        pieces: [getPiece('K', 5,3), getPiece('R', 3, 3), getPiece('P', 5, 4)],
        expected: true
    },
])