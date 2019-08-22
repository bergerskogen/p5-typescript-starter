// Array of Index/Check Indices List

const rightCheckList = [
  { index: 2, toCheck: [3] },
  { index: 1, toCheck: [2, 3] },
  { index: 0, toCheck: [1, 2, 3] },
  { index: 6, toCheck: [7] },
  { index: 5, toCheck: [6, 7] },
  { index: 4, toCheck: [5, 6, 7] },
  { index: 10, toCheck: [11] },
  { index: 9, toCheck: [10, 11] },
  { index: 8, toCheck: [9, 10, 11] },
  { index: 14, toCheck: [15] },
  { index: 13, toCheck: [14, 15] },
  { index: 12, toCheck: [13, 14, 15] }
];

const leftCheckList = [
  { index: 1, toCheck: [0] },
  { index: 2, toCheck: [1, 0] },
  { index: 3, toCheck: [2, 1, 0] },
  { index: 5, toCheck: [4] },
  { index: 6, toCheck: [5, 4] },
  { index: 7, toCheck: [6, 5, 4] },
  { index: 9, toCheck: [8] },
  { index: 10, toCheck: [9, 8] },
  { index: 11, toCheck: [10, 9, 8] },
  { index: 13, toCheck: [12] },
  { index: 14, toCheck: [13, 12] },
  { index: 15, toCheck: [14, 13, 12] }
];

const upCheckList = [
  { index: 4, toCheck: [0] },
  { index: 8, toCheck: [4, 0] },
  { index: 12, toCheck: [8, 4, 0] },
  { index: 5, toCheck: [1] },
  { index: 9, toCheck: [5, 1] },
  { index: 13, toCheck: [9, 5, 1] },
  { index: 6, toCheck: [2] },
  { index: 10, toCheck: [6, 2] },
  { index: 14, toCheck: [10, 6, 2] },
  { index: 7, toCheck: [3] },
  { index: 11, toCheck: [7, 3] },
  { index: 15, toCheck: [11, 7, 3] }
];

const downCheckList = [
  { index: 8, toCheck: [12] },
  { index: 4, toCheck: [8, 12] },
  { index: 0, toCheck: [4, 8, 12] },
  { index: 9, toCheck: [13] },
  { index: 5, toCheck: [9, 13] },
  { index: 1, toCheck: [5, 9, 13] },
  { index: 10, toCheck: [14] },
  { index: 6, toCheck: [10, 14] },
  { index: 2, toCheck: [6, 10, 14] },
  { index: 11, toCheck: [15] },
  { index: 7, toCheck: [11, 15] },
  { index: 3, toCheck: [7, 11, 15] }
];
