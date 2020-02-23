/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  if (x === 0 || x === 1) {
    return x;
  }
  let start = 0, end = x, mid, ret;
  while (start < end) {
    mid = start + (end - start) / 2;
    ret = x / mid;
    if (~~ret === ~~mid) {
      break;
    }
    if (ret < mid) {
      start = ret;
      end = mid;
    } else {
      start = mid;
      end = ret;
    }
  }
  return ~~ret;
};

// @lc code=end

