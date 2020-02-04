/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 思路: 递归
var inorderTraversal = function(root) {
  if(!root) {
    return [];
  }
  return inorderTraversal(root.left).concat([root.val]).concat(inorderTraversal(root.right));
};
var inorderTraversal1 = function (root, res = []) {
  if (root) {
    inorderTraversal(root.left, res);
    res.push(root.val);
    inorderTraversal(root.right, res);
  }
  return res;
};
// 思路: 迭代
var inorderTraversal = function (root) {
  const res = [];
  const cache = [];
  while (root || cache.length) {
    if(root) {
      cache.push(root); // 缓存当前节点
      root = root.left; // 走到最左
    } else { // 想象成没有左节点, \\中右中右的形式跳转
      root = cache.pop();
      res.push(root.val);
      root = root.right;
    }
  }
  return res
}

// 左中右
// @lc code=end

