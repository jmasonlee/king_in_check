import cases from 'jest-in-case'
import kingInCheck, {getPiecesFromBoard} from './king_in_check'
import cloneDeep from 'lodash/cloneDeep'

const emptyBoard =
    [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
    ]

let board

beforeEach(() => {
    board = cloneDeep(emptyBoard)
})


function convertBoard(board) {
  board = board.trim()
  board = board.replace(/ /g, '')
  board = board.replace(/_/g, ' ')
  board = board.split('\n')
  for (let i = 0; i < 8; i++) {
    board[i] = [...board[i]]
  }
  return board
}

cases(
  "It can tell if a board is in check",
  (args) => {
    let board = convertBoard(args.board);
    expect(kingInCheck(board)).toBe(args.check);
  },
  [
    {
      name: "returns false when attacking piece is blocked",
      board: `
     ________
     ___Q____
     ___P____
     ___K____
     ________
     ________
     ________
     ________
    `,
      check: false,
    },
    {
      name: "returns false when king is alone",
      board: `
     ________
     ________
     ________
     ___K____
     ________
     ________
     ________
     ________
    `,
      check: false,
    },
    {
      name: "returns true when king is in check from above in the same file",
      board: `
     ________
     ________
     ___Q____
     ___K____
     ________
     ________
     ________
     ________
    `,
      check: true,
    },
    {
      name:
        "returns false when king is not in check from above in the same file",
      board: `
     ________
     ________
     ___P____
     ___K____
     ________
     ________
     ________
     ________
    `,
      check: false,
    },
    {
      name: "returns true when king is in check from NE",
      board: `
     ________
     ________
     __P_____
     ___K____
     ________
     ________
     ________
     ________
    `,
      check: true,
    },
    {
      name: "returns false when king is not in check from NE",
      board: `
     ________
     ________
     __N_____
     ___K____
     ________
     ________
     ________
     ________
    `,
      check: false,
    },
    {
      name: "returns true when king is in check from same rank",
      board: `
     ________
     ________
     ________
     ___K_R__
     ________
     ________
     ________
     ________
    `,
      check: true,
    },
    {
      name: "returns true when king is in check from south diagonal",
      board: `
     ________
     ________
     ________
     ___K____
     ________
     _____B__
     ________
     ________
    `,
      check: true,
    },
    {
      name:
        "returns false when king is not in check from pawn on north diagonal",
      board: `
     ________
     _P______
     ________
     ___K____
     ________
     ________
     ________
     ________
    `,
      check: false,
    },
    {
      name:
        `should return false when king is not in check because there is a piece in the way diagonally`,
      board: `
     ________
     ________
     ________
     ___K____
     ____R___
     _____B__
     ________
     ________
    `,
      check: false,
    },
    {
      name:
        `should return false when king is not in check because there is a piece in the way in the same rank`,
      board: `
     ________
     ________
     ________
     ___K__PR
     ________
     ________
     ________
     ________
    `,
      check: false,
    },
    {
      name:
        `should return false when king is not in check because there is a piece in the way in the same file`,
      board: `
     ________
     ________
     ________
     ___K____
     ___P____
     ________
     ___R____
     ________
    `,
      check: false,
    },
    {
      name:
        `should return true when king is in check by knight`,
      board: `
     ________
     ________
     ________
     ___K____
     ________
     ____N___
     ________
     ________
    `,
      check: true,
    }
  ]
)

function getPiece(type, rank, file) {
    return {type: type, rank: rank, file: file}
}

const addPieceToBoard = (pieces) => {
    pieces.forEach(piece => board[piece.rank][piece.file] = piece.type)
}