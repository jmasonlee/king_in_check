import createBoard from './createBoard'
describe("create board", () => {
  it("should return an empty board when no pieces are passed", () => {
    expect(createBoard([])).toMatchSnapshot();
  });

  it('should return a board with pieces in their location', () => {
    expect(createBoard([{type: 'K', rank: '2', file:'c'}])).toMatchSnapshot()
  });
});
