const files = "abcdefgh".split('')

const getFileIndex = file => files.indexOf(file)
const getRankIndex = rank => rank - 1

export default pieces => {
  const board = Array(8)
    .fill("")
    .map((rank) => {
      return Array(8).fill("");
    });
  
  pieces.forEach(piece => {
    board[getRankIndex(piece.rank)][getFileIndex(piece.file)] = piece.type
  });
  return board;
};