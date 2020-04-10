/*
 * @lc app=leetcode.cn id=120 lang=javascript
 *
 * [120] 三角形最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal1 = function(triangle) {
  return count(triangle[triangle.length - 1], triangle.length - 2)
  function count(arr, row) {
    if (row === -1) return arr[0];
    let tmp = [];
    for(let i = 0; i < triangle[row].length; i++) {
      tmp.push(Math.min(arr[i], arr[i+1]) + triangle[row][i]);
    }
    return count(tmp, row - 1);
  }
};

/* 动态规划DP, 自下而上
[
  [2],
  [3, 4],
  [6, 5, 7],
  [4, 1, 8, 3]
]
由第四行 求得第3行的最小值结果为 [7, 6, 10] 6+1 5+1 7+3
由新的第3行 求得第2行的最小值结果为 [9, 10] 3+6 4+6
由新的第2行 求得第1行的最小值结果为 [11] 2+9  路径 2 3 5 1
*/
var minimumTotal = function(triangle) {
  let len = triangle.length;
  for(let i = len - 1; i > 0; i--) {
    for(let j = 0; j < triangle[i - 1].length; j++) {
      triangle[i-1][j] += Math.min(triangle[i][j], triangle[i][j+1])
    }
  }
  return triangle[0][0];
}

// @lc code=end

