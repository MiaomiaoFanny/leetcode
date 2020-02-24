/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function backtrack(list, temp, nums) {
  if (temp.length === nums.length) {
    return list.push([...temp]);
  }
  for(let i = 0; i < nums.length; i++) {
    if(~temp.indexOf(nums[i])) continue;
    temp.push(nums[i]);
    backtrack(list, temp, nums); // 递归
    temp.pop(); // 回溯
  }
}
// 递归 + 回溯 全排列
var permute = function(nums) {
  let list = [];
  backtrack(list, [], nums);
  return list;
};

// @lc code=end

