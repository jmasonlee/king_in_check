import cases from 'jest-in-case'
import king_in_check from './king_in_check'

const kingInCheckByQueenInSameRank = [
  ['', '', '', '', '', '', '', ''],
  ['', 'K', '', '', '', '', 'Q', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '']
]

const kingInCheckByQueenInSameFile = [
  ['', '', '', '', '', '', '', ''],
  ['', 'K', '', '', '', '', '', ''],
  ['', 'Q', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '']
]

const kingNotInCheck = [
  ['', '', '', '', '', '', '', ''],
  ['', 'K', '', '', '', '', '', ''],
  ['', '', '', 'Q', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '']
]
cases('king_in_check', args => {
  console.log(king_in_check)
  expect(king_in_check(args.board)).toBe(args.expectedResult)
}, [{
  name: 'it should return true when king is checked by queen in same rank',
  board: kingInCheckByQueenInSameRank,
  expectedResult: true
}, {
  name: 'it should return false when king is not in check by queen',
  board: kingNotInCheck,
  expectedResult: false
},
  {
    name: 'it should return true when king is checked by queen in same file',
    board: kingInCheckByQueenInSameFile,
    expectedResult: true
  }])