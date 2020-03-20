/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 利用位运算 x ^ y ^ y = x  (y ^ y = 0, x ^ 0 = x)
var singleNumber = function(nums) {
  if (nums.length === 0) return undefined;
  let n = nums[0];
  for(let i = 1; i < nums.length; i++) {
    n = n ^ nums[i];
  }
  return n
};

// @lc code=end

