import cases from 'jest-in-case'
import createBoard from './createBoard'
import kingInCheck from './king_in_check'

cases('king in check', args => {
    const board = createBoard(args.pieces)
    expect(kingInCheck(board)).toEqual(args.expectedResult)
}, [
    {
        name: 'it should return false when board is empty', 
        pieces: [],
        expectedResult: false
    },
    {
      name: 'it should return true when king is in check by queen',
      pieces: [{type: 'K', rank: 3, file: 'b'}, {type: 'Q', rank: 3, file: 'c'}],
      expectedResult: true
    }
])