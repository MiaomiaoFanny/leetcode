/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

function backtrack(board, word, cur, col, row) {
  if (cur === word.length) {
    return true;
  }
  let target = word[cur];
  let left = [board[col] && board[col][row - 1], [col, (row - 1)]],
    right =  [board[col] && board[col][row + 1], [col, (row + 1)]],
    top =    [board[col - 1] && board[col - 1][row], [(col - 1), row]],
    bottom = [board[col + 1] && board[col + 1][row], [(col + 1), row]];
  let arr = [left, right, top, bottom];
  for(let i = 0; i < arr.length; i++) {
    if (arr[i][0] === target) {
      // 找到目标字母
      cur++;
      board[arr[i][1][0]][arr[i][1][1]] = null;
      if (backtrack(board, word, cur, arr[i][1][0], arr[i][1][1])) {
        return true;
      }
      // 回溯 继续找
      cur--;
      board[arr[i][1][0]][arr[i][1][1]] = target;
    }
  }
  return false;
}
var exist1 = function (board, word) {
  // 找第一个字母
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== word[0]) continue;
      board[i][j] = null;
      if (backtrack(board, word, 1, i, j)) {
        return true;
      }
      board[i][j] = word[0];
    }
  }
  return false;
  // return backtrack(board, word, 0, []);
};

/* 
1. 找规律, 如何实现, 相似步骤
2. 找终止条件
3. 考虑约束条件, 临时变量, 中间状态
*/
var exist = function (board, word) {
  const col = board.length, row = board[0].length;
  for(let i = 0; i < col; i++) {
    for(let j = 0; j < row; j++) {
      if (find(i, j, 0)) {
        return true;
      }
    }
  }
  function find(i, j, cur) {
  // 终止条件: 越界
    if (i >= col || i < 0) return false;
    if (j >= row || j < 0) return false;

    let letter = board[i][j];
    // 终止条件: 没有找到字母
    if (letter !== word[cur]) return false;

    // 终止条件: 找到最后一个字母
    if (cur === word.length-1) return true;

    board[i][j] = null; // 置空 避免重复
    // 找到下一个字母
    let findNext = find(i - 1, j, cur + 1) ||
                   find(i + 1, j, cur + 1) ||
                   find(i, j - 1, cur + 1) ||
                   find(i, j + 1, cur + 1);
    board[i][j] = letter;
    return findNext;
  }
  return false;
}
// @lc code=end

