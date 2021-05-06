import cases from 'jest-in-case'
import kingInCheck, {square} from './king_in_check'

const board = `
K_______
________
________
________
________
________
________
________
`;

it(`returns a array of squares`, () => {
  expect(Array.isArray(square(board))).toBe(true)
  expect(square(board).length).toBe(64)
  expect(square(board).indexOf('K')).toBe(0)
});

//Test case TODOs
// A piece can't attack if it's blocked
// A queen can attack on diagonal
// A queen can attack on straight line
// A bishop can attack on diagonal
// A bishop can't attack on straight line
// A rook can't attack on diagonal
// A knight attacks in an L
// A knight can't attack when not in an L
// A pawn can attack from one north diagonal square away
// A pawn can not attack from anywhere that's not one north diagonal

cases('King in Check', args => {
    expect(kingInCheck(args.board)).toBe(args.result)
  },
  [{
    name: 'king alone is not in check',
    board:
      board,
    result: false
  },
    {
      name: 'king can be checked from piece in straight line',
      board:
        `
      ________
      ___R____
      ________
      ___K____
      ________
      ________
      ________
      ________
      `,
      result: true
    },
    {
      name: 'king can not be checked from piece in straight line if attacking piece is blocked',
      board:
          `
      ________
      ___R____
      ___P____
      ___K____
      ________
      ________
      ________
      ________
      `,
      result: false
    }
  ]
)