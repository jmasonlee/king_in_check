import cases from "jest-in-case";
import kingInCheck from './king_in_check'

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


const kingInCheckByQueenInTheSameRankBoard = [
    ['','','','','','','',''],
    ['','K','Q','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','','']
]

cases(
    "king in check",
    (args) => {
        expect(kingInCheck(args.board)).toBe(args.expectedResult);
    },
    [{
        name: "should return false when board is empty",
        board: emptyBoard,
        expectedResult: false,
    }, 
    {
        name: "should return true when King is in check by Queen in the same rank",
        board: kingInCheckByQueenInTheSameRankBoard,
        expectedResult: true
    }
    ]
);