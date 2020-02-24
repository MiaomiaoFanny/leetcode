/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */

function placeQueen(board, n, i, j, placed, res) {
  // 终止条件: 放完棋子 > 保存结果
  if (placed == n) {
    res.push(board.map(v => v.join('')));
    return;
  }
  if (j == n) { j = 0; i++; } // 换行
  if (i !== placed) { return; } // 终止条件: 上一行没放棋子
  if (i == n) { return; } // 终止条件: 移动结束

  // 判断此处是否能放棋子 查看横竖对角线是否有旗子
  let available = true;
  for(let k = 0; k < n; k++) {
    if (k !== j && board[i][k] === 'Q') { // 列
      available = false;
      break;
    }
    if (k !== i) {
      if (board[k][j] === 'Q' || // 行
        board[k][j - (i - k)] === 'Q' || // 反斜线 \  (i-k) = (j-h)
        board[k][j + (i - k)] === 'Q') // 正斜线 /    (i-k) = (h-j)
      {
        available = false;
        break;
      }
    }
  }
  if (available) {
    board[i][j] = 'Q';
    placed++;
    // 放置下一行棋子
    placeQueen(board, n, i + 1, j <= 1 ? j + 2 : 0, placed, res);
    board[i][j] = '.'; // 回溯
    placed--;
  }
  // 放置下一个棋子
  placeQueen(board, n, i, j + 1, placed, res);
}
/* 
递归思路:
  每次递归试图在指定位置放置旗子
  判断能放则 已放置旗子数+1, 下次递归位置下移一行
  判断不能放则 递归相邻的下一个位置
  放完旗子后进行回溯, 将旗子撤掉 位置变回'.', 已放旗子数-1
能放旗子的判断条件:
  分别判断当前面板上 在 行列斜线上是否已有旗子

临时变量: 记录已放置的旗子数量, 直到放完
 */
var solveNQueens1 = function(n) {
  if (n <= 1) { return [['Q']] }
  if (n <= 3) { return []; }
  let res = [];
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(Array(n).fill('.'));
  }
  placeQueen(board, n, 0, 0, 0, res);
  return res;
}
var solveNQueens2 = function(n) {
  let result = [];
  function dfs(cols) {
    let row = cols.length;
    if (row === n) return result.push(cols.map(col => '.'.repeat(col) + 'Q' + '.'.repeat(n - col -1)));
    for (let col = 0; col < n; col++) {
      if(cols.some((exCol, exRow) => (exCol === col || exRow - exCol === row - col || exRow + exCol === row + col))) continue;
      dfs(cols.concat(col))
    }
  }
  dfs([]);
  return result;
};

var solveNQueens3 = function (n) {
  if (!n || n < 0) {
    return
  }
  n = Math.floor(n)
  let res = []
  backtracking(0, n, [])
  return res

  function isValidPosition(proposedRow, proposedCol, currSolution) {
    for (let i = 0; i < proposedRow; i++) {
      let oldRow = i
      let oldCol = currSolution[oldRow]

      let diagonal = proposedRow - oldRow
      if (proposedCol === oldCol ||
        (proposedCol === oldCol + diagonal) ||
        (proposedCol === oldCol - diagonal)) {
        return false
      }
    }
    return true
  }

  function backtracking(row, n, curr) {
    if (row === n) {
      res.push(curr.map(col => '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1)))
      return
    }

    for (let c = 0; c < n; c++) {
      if (isValidPosition(row, c, curr)) {
        curr[row] = c
        backtracking(row + 1, n, curr)
      }
    }
  }
};

/* 
递归思路:
  按行放置旗子
  每次递归使用数组形式保存已存放旗子的分布
  每一次递归都在每一行放置一个旗子, 知道放完
可放置旗子的条件(满足无法攻击的条件):
1. 行不能相同
2. 列不能相同
3. 行-列不能相同
4. 行+列不能相同
临时变量 保存已有布局:
  [] 记录已放旗子的位置 索引表示行, 值表示列
*/
var solveNQueens = function (n) {
  /* col: 即将放置旗子的行
  board: 已经放置好的旗子分布
   */
  function find(col, board = []) {
    // 终止条件: 旗子放完
    if (col === n) {
      // 保存结果
      ret.push(board.map((rowIndex) => '.'.repeat(rowIndex) + 'Q' + '.'.repeat(n - rowIndex - 1)));
      return;
    }
    
    // 放置旗子 row: 列 col: 行
    for(let row = 0; row < n; row++) {
      let isInvalid = board.some((rowIndex, colIndex) => {
        return rowIndex === row ||
          rowIndex - colIndex === row - col ||
          rowIndex + colIndex === row + col;
      })
      if (isInvalid) { continue }
      find(col+1, [...board, row]);
    }
  }
  let ret = [];
  find(0);
  return ret;
}

// @lc code=end

