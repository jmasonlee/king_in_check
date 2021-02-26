import cases from 'jest-in-case'
import {isInSameRank, isInSameFile, isOnSameDiagonal, pawnCanAttack} from './king_in_check'

cases('king in check', args => {
    const king = {type: 'K', rank: args.kingRank, file: args.kingFile}
    const piece = {type: args.pieceType, rank: args.pieceRank, file: args.pieceFile}
    expect(args.functionToTest(king, piece)).toBe(args.expected)
}, [
    {
        name: 'will return true if in same rank',
        kingRank: 3,
        kingFile: 4,
        pieceRank: 3,
        pieceFile: 2,
        expected: true,
        functionToTest: isInSameRank
    },
    {
        name: 'will return false if not in same rank',
        kingRank: 4,
        kingFile: 2,
        pieceRank: 3,
        pieceFile: 2,
        expected: false,
        functionToTest: isInSameRank
    },
    {
        name: 'will return true if in same file',
        kingRank: 4,
        kingFile: 2,
        pieceRank: 3,
        pieceFile: 2,
        expected: true,
        functionToTest: isInSameFile
    },
    {
        name: 'will return false if not in same file',
        kingRank: 4,
        kingFile: 0,
        pieceRank: 3,
        pieceFile: 2,
        expected: false,
        functionToTest: isInSameFile
    },
    {
        name: 'will return true if on same diagonal',
        kingRank: 4,
        kingFile: 4,
        pieceRank: 3,
        pieceFile: 3,
        expected: true,
        functionToTest: isOnSameDiagonal
    },
    {
        name: 'will return false if not on same diagonal',
        kingRank: 5,
        kingFile: 4,
        pieceRank: 3,
        pieceFile: 3,
        expected: false,
        functionToTest: isOnSameDiagonal
    },
    {
        name: 'will return true if pawn can attack King',
        kingRank: 4,
        kingFile: 3,
        pieceType: 'P',
        pieceRank: 5,
        pieceFile: 4,
        expected: true,
        functionToTest: pawnCanAttack
    }
])