/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路： 游标遇不同, 则赋值右移 
var removeDuplicates = function(nums) {
  if (nums.length <= 1) {
    return nums.length;
  }
  let pivot = 0;
  for(let i = 1; i < nums.length; i++) {
    if (nums[pivot] !== nums[i]) {
      nums[++pivot] = nums[i];
    }
  }
  return pivot + 1;
};
// @lc code=end

