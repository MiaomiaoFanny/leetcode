/*
 * @lc app=leetcode.cn id=179 lang=javascript
 *
 * [179] 最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */

// 思路: 快速排序, 原地快排, 大小比较使用字符串进行比较
var largestNumber = function(nums) {
  quickSort(nums);
  if (nums[0] === 0) { return '0'; }
  return nums.join('');
};
//  排序算法(原地快排)
function quickSort(nums, left = 0, right = nums.length - 1) {
  if (nums.length <= 1) { return; }
  if (left >= right) { return; }
  let pivot = right;
  let middle = left;
  for(let i = left; i < right; i ++) {
    // 比较方法(运用字符串比较)
    if (('' + nums[i] + nums[pivot]) > ('' + nums[pivot] + nums[i])) {
      [nums[middle], nums[i]] = [nums[i], nums[middle]];
      middle ++;
    }
  }
  [nums[middle], nums[pivot]] = [nums[pivot], nums[middle]];
  quickSort(nums, left, middle - 1);
  quickSort(nums, middle + 1, right);
}
// @lc code=end

