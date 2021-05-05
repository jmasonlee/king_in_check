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
  // expect(square(board).indexOf('K')).toBe(0)
});

cases('King in Check', args => {
    expect(kingInCheck(args.board)).toBe(args.result)
  },
  [{
    name: 'king alone is not in check',
    board:
      board,
    result: false
  },
    // {
    //   name: 'king can be checked from piece in straight line',
    //   board:
    //     `
    //   ________
    //   ___R____
    //   ________
    //   ___K____
    //   ________
    //   ________
    //   ________
    //   ________
    //   `,
    //   result: true
    // }
  ]
)