// Array of Index/Check Indices List

const leftCheckList = [
  { index: 0, toCheck: [1, 2, 3] },
  { index: 1, toCheck: [2, 3] },
  { index: 2, toCheck: [3] },
  { index: 4, toCheck: [5, 6, 7] },
  { index: 5, toCheck: [6, 7] },
  { index: 6, toCheck: [7] },
  { index: 8, toCheck: [9, 10, 11] },
  { index: 9, toCheck: [10, 11] },
  { index: 10, toCheck: [11] },
  { index: 12, toCheck: [13, 14, 15] },
  { index: 13, toCheck: [14, 15] },
  { index: 14, toCheck: [15] }
];

const rightCheckList = [
  { index: 3, toCheck: [2, 1, 0] },
  { index: 2, toCheck: [1, 0] },
  { index: 1, toCheck: [0] },
  { index: 7, toCheck: [6, 5, 4] },
  { index: 6, toCheck: [5, 4] },
  { index: 5, toCheck: [4] },
  { index: 11, toCheck: [10, 9, 8] },
  { index: 10, toCheck: [9, 8] },
  { index: 9, toCheck: [8] },
  { index: 15, toCheck: [14, 13, 12] },
  { index: 14, toCheck: [13, 12] },
  { index: 13, toCheck: [12] }
];
