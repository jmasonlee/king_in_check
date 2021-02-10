import cases from 'jest-in-case'
import king_in_check from './king_in_check'

const kingAndQueenInSameRank = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', 'K', 'Q', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
]

const queenNotAttacking = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', 'Q', '', ''],
    ['', '', '', 'K', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
]

const kingAndQueenInSameFile = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', 'Q', '', '', '', ''],
    ['', '', '', 'K', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
];

let queenOnDiagonalToKing = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', 'K', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', 'Q', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
];
cases('king_in_check', args => {
    expect(king_in_check(args.board)).toBe(args.expectedResult)
}, [{
    name: 'should return true if queen is in same rank as king',
    board: kingAndQueenInSameRank,
    expectedResult: true
}, {
    name: 'should return false if queen is on board, but king is not in check',
    board: queenNotAttacking,
    expectedResult: false
}, {
    name: 'should return true if queen is in same file as king',
    board: kingAndQueenInSameFile,
    expectedResult: true
}, {
    name: 'should return true if queen can attack from a diagonal',
    board: queenOnDiagonalToKing,
    expectedResult: true
}])