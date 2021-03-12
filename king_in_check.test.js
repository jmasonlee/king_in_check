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
    }
])