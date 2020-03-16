/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
// 思路: 暴力循环法, 计算每一种可能情况, 选择最大容量
var maxArea1 = function(height) {
  let maxSum = 0;
  for(let left = 0; left < height.length - 1; left++) {
    for(let right = left + 1; right < height.length; right++) {
      let tmpSum = (right - left) * Math.min(height[left], height[right]);
      if(tmpSum > maxSum) {
        maxSum = tmpSum;
      }
    }
  }
  return maxSum;
};

// 思路: 双指针法 头尾两个指针计算面积后分别往中间移动, 每次仅移动较短的一边
// 原理: 对于较短指针来说, 当前求得的面积已经是其能达到的最大面积,
// 不需要再进行其他计算, 因此向中间移动
var maxArea = function(height) {
  let left = 0, right = height.length, maxSum = 0, tmpSum;
  while(left < right) {
    tmpSum = (right - left) * Math.min(height[left], height[right]);
    if (tmpSum > maxSum) {
      maxSum = tmpSum;
    }
    height[left] < height[right] ? left++ : right--;
  }
  return maxSum;
}
// @lc code=end

