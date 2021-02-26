export const isInSameRank = (p1, p2) => {
    return p1.rank === p2.rank
}

export const isInSameFile = (p1, p2) => {
    return p1.file === p2.file
}

export const isOnSameDiagonal = (p1, p2) => {
    const set = new Set()
    set.add(Math.abs(p1.rank - p2.rank))
    set.add(Math.abs(p1.file - p2.file))
    return set.size === 1
}

export const pawnCanAttack = (p1, pawn) => {
    const set = new Set()
    set.add(pawn.rank - p1.rank)
    set.add(Math.abs(pawn.file - p1.file))
    return set.size === 1
}