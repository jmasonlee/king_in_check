import cases from "jest-in-case";
import kingInCheck from "./king_in_check";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

function getPieceRank(piece) {
  return piece.rank - 1;
}

function getPieceFile(piece) {
  return files.indexOf(piece.file);
}

const createBoard = (pieces = []) => {
  const file = () => Array(8).fill("");
  const board = Array(8).fill(file());

  pieces.forEach((piece) => {
    const rank = getPieceRank(piece);
    const file = getPieceFile(piece);
    board[rank][file] = piece.type;
  });

  return board;
};

describe("createBoard", () => {
  it("should create an empty board when no pieces are provided", () => {
    const providedValue = JSON.stringify(createBoard().flat());
    const expectedValue = JSON.stringify(
      Array(8).fill(Array(8).fill("")).flat()
    );
    expect(providedValue).toEqual(expectedValue);
  });
  it("should create a board with the provided pieces at the correct location", () => {
    const piece = {
      type: "K",
      rank: "4",
      file: "a",
    };

    const board = createBoard([piece]);

    expect(board).toMatchSnapshot()
  });
});


cases(
  "kingInCheck",
  (args) => {
    const board = createBoard(args.pieces);
    expect(kingInCheck(board)).toEqual(args.result);
  },
  [
    {
      name: "should return false when board is empty",
      pieces: [],
      result: false,
    },
    {
      name: 'should return true when king is in check by queen',
      pieces: [{type: 'K', rank: '4', file: 'b'}, {type: 'Q', rank: '4', file: 'c'}],
      result: true
    }
  ]
);
