/*
 * @lc app=leetcode.cn id=37 lang=javascript
 *
 * [37] 解数独
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
let l = console.log;
let ll = console.log;
l = () => {} ;

/* 
思路:  递归 + 回溯
从第一个格子开始遍历每一个空格, 计算该空格可填入数字, 遇到无法填入的空格则撤销操作(回溯), 尝试填入其他数字, 没有其他数字可填就再往回撤销,
以此类推, 直到最后一个空格, 表示数独完成

求出数字填充范围:
1. 行 可填充数
2. 列 可填充数
3. 块 可填充数
> 求交集
*/
var solveSudoku = function(board) {
  function findAvailableNums(board, i, j) { // 还可再优化
    let res = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let k = 0; k < 9; k++) {
      // 行
      if (k !== i && board[k][j] !== '.') { res[board[k][j]] = ''; }
      // 列
      if (k !== j && board[i][k] !== '.') { res[board[i][k]] = ''; }
    }
    if (res.join('').split('').length == 0) {
      return [];
    }
    // 块 不在同一行 同一列 且在同一块
    let colStart = Math.floor(i / 3) * 3, rowStart = Math.floor(j / 3) * 3;
    for (let col = colStart; col < colStart + 3; col++) {
      for (let row = rowStart; row < rowStart + 3; row++) {
        if ((i !== col && j !== row) && board[col][row] !== '.') {
          res[board[col][row]] = '';
        }
      }
    }
    res = res.join('').split('');
    return res;
  }
  function solveBoard(board, col, row) {
    if (row == 9) { row = 0; col = col + 1; } // 换行
    if (col === 9) { return true; } // 递归遍历结束
    if (board[col][row] !== '.') { // 已经是数字 继续下一个
      return solveBoard(board, col, row + 1);
    }
    // 获取可填入数字列表
    let availableNums = findAvailableNums(board, col, row);
    if (!availableNums.length) {
      return false; // 无数字可填 失败
    }

    // 依次尝试填入数字
    for (let i = 0; i < availableNums.length; i++) {
      board[col][row] = availableNums[i];
      if (solveBoard(board, col, row + 1)) {
        return true;
      }
      board[col][row] = '.'; // 失败 回溯
    }

    return false; // 到最后都没能填入数字 失败
  }
  solveBoard(board, 0, 0);
};
// @lc code=end

