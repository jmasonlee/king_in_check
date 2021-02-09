import cases from 'jest-in-case'
import king_in_check from './king_in_check'

const emptyBoard = [
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','','']
]

cases('king_in_check', args => {
    expect(king_in_check(args.board)).toEqual(args.expectedResult)
}, [{
    name: 'should return false when board is empty',
    board: emptyBoard,
    expectedResult: false
}])