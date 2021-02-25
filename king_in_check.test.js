import {isInSameFile, isInSameRank, isOnSameDiagonal, pawnCanAttack} from "./king_in_check";

describe('functions', () => {
  it('should return true if piece is in same rank as king', () => {
    const king = {
      type: 'K',
      rank: 1,
      file: 4
    }
    const piece = {
      type: 'P',
      rank: 1,
      file: 2
    }
    expect(isInSameRank(king, piece)).toBe(true)
  })

  it('should return false if piece is not in same rank as king', function () {
    const king = {
      type: 'K',
      rank: 0,
      file: 4
    }
    const piece = {
      type: 'P',
      rank: 1,
      file: 2
    }
    expect(isInSameRank(king, piece)).toBe(false)
  });

  it('should return true if piece is in same file as king', function () {
    const king = {
      type: 'K',
      rank: 0,
      file: 4
    }
    const piece = {
      type: 'P',
      rank: 1,
      file: 4
    }
    expect(isInSameFile(king, piece)).toBe(true)
  });

  it('should return false if piece is not in same file as king', function () {
    const king = {
      type: 'K',
      rank: 0,
      file: 4
    }
    const piece = {
      type: 'P',
      rank: 0,
      file: 2
    }
    expect(isInSameFile(king, piece)).toBe(false)
  });

  it('should return true if piece is on same diagonal as king', function () {
    const king = {
      type: 'K',
      rank: 0,
      file: 0
    }
    const piece = {
      type: 'P',
      rank: 1,
      file: 1
    }
    expect(isOnSameDiagonal(king, piece)).toBe(true)
  });
  it('should return false if piece is not on same diagonal as king', function () {
    const king = {
      type: 'K',
      rank: 3,
      file: 0
    }
    const piece = {
      type: 'P',
      rank: 1,
      file: 1
    }
    expect(isOnSameDiagonal(king, piece)).toBe(false)
  });
  it('should return true if pawn can attack king', () => {
    const king = {
      type: 'K',
      rank: 4,
      file: 3
    }
    const pawn = {
      type: 'P',
      rank: 5,
      file: 4
    }
    expect(pawnCanAttack(pawn, king)).toBe(true)
  })

  it('should return false if pawn cannot attack king', () => {
    const king = {
      type: 'K',
      rank: 4,
      file: 3
    }
    const pawn = {
      type: 'P',
      rank: 3,
      file: 4
    }
    expect(pawnCanAttack(pawn, king)).toBe(false)
  })
})