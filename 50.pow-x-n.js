/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// 递归 二分法
var myPow = function(x, n) {
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    return 1 / myPow(x, n * -1);
  }
  // 零填充右位移 除以2的1次方 同时 取整
  const mid = myPow(x, n >>> 1);
  // 和1按位与可取得最后位为 1 或 0
  if (n & 1) {
    return mid * mid * x;
  }
  return mid * mid;
};
// @lc code=end

