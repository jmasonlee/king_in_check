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
        name: 'should return false when king is alone on board',
        expected: false,
        pieces: [getPiece('K', 0, 4)]
    },
    {
        name: 'should return true when rook is in same rank as king',
        expected: true,
        pieces: [getPiece('K', 0, 4), getPiece('R', 0, 2)]
    },
    {
        name: 'should return false when pawn is in same rank as king',
        expected: false,
        pieces: [getPiece('K', 0, 4), getPiece('P', 0, 1)]
    },
    {
        name: 'should return true when queen is in same rank as king',
        expected: true,
        pieces: [getPiece('K', 0, 4), getPiece('Q', 0, 3)]
    },
    {
        name: 'should return false when bishop is in same rank as king',
        expected: false,
        pieces: [getPiece('K', 0, 4), getPiece('B', 0, 5)]
    },
    {
        name: 'should return true when bishop is on same diagonal as king',
        expected: true,
        pieces: [getPiece('K', 0, 4), getPiece('B', 1, 5)]
    },
    {
        name: 'should return false when bishop is on same diagonal, but another piece is in the way',
        expected: false,
        pieces: [getPiece('K', 0, 4), getPiece('R', 1, 5), getPiece('B', 2, 6)]
    }
])