import cases from 'jest-in-case'
import king_in_check from './king_in_check'

const kingInCheckByQueenInSameFile = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', 'K', 'Q', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
]

const kingInCheckByRookInSameFile = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', 'K', '', '', '', '', 'R'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
]

cases('king_in_check', args => {
    expect(king_in_check(args.board)).toEqual(args.expectedResult)
}, [
    {
        name: 'should return true when Queen is in same file',
        board: kingInCheckByQueenInSameFile,
        expectedResult: true
    },
    {
        name: 'should return true when Rook is in same file',
        board: kingInCheckByRookInSameFile,
        expectedResult: true
    }
])