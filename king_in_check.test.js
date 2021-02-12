import cases from 'jest-in-case'
import king_in_check from './king_in_check'


let kingInCheckFromQueenInSameRank =
  [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', 'K', '', '', 'Q', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
  ]

let kingInCheckDiagonally = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', 'K', '', '', '', '', ''],
  ['', '', '', 'Q', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '']
]

let kingNotInCheck =
  [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', 'K', '', '', '', '', ''],
    ['', '', '', '', 'Q', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
  ]
let kingInCheckFromQueenInSameFile =
  [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', 'K', '', '', '', '', ''],
    ['', '', 'Q', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
  ]
cases('king_in_check', args => {
  expect(king_in_check(args.board)).toBe(args.expected)
}, [
  {
    name: 'should return true if king is in same rank as queen',
    board: kingInCheckFromQueenInSameRank,
    expected: true
  },
  {
    name: 'should return false if king is not in check by queen',
    board: kingNotInCheck,
    expected: false
  },
  {
    name: 'should return true if king is in same file as queen',
    board: kingInCheckFromQueenInSameFile,
    expected: true
  },
  {
    name: 'should return true in king is in check by queen diagonally',
    board: kingInCheckDiagonally,
    expected: true
  }
])