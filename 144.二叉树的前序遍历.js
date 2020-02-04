/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
var preorderTraversal = function(root) {
  if (root === null) {
    return [];
  }
  return [root.val].concat(preorderTraversal(root.left)).concat(preorderTraversal(root.right))
};
var preorderTraversal1 = function (root, res = []) {
  if (root) {
    res.push(root.val);
    preorderTraversal(root.left, res);
    preorderTraversal(root.right, res);
  }
  return res;
};

// 思路: 迭代 利用节点的跳转规律
var preorderTraversal2 = function(root) {
  const res = [];
  const rights = [];
  while (root) {
    res.push(root.val); // 由于是先遍历, 所以可以立马push
    if (root.right) { // 缓存右节点
      rights.push(root.right);
    }
    if (root.left) { // 只要有左节点, 就一直往左
      root = root.left;
    } else { // 没有左节点就跳回到右节点
      root = rights.pop();
    }
  }
  return res;
}
// 老师的解法
var preorderTraversal2 = function(root) {
  const res = [], stack = [];
  let cur = root;
  while (cur || stack.length) {
    // 先遍历所有的左节点, 储存当前节点
    while (cur) {
      res.push(cur.val)
      stack.push(cur) // 储存当前节点, 以便后续遍历右节点
      cur = cur.left
    }
    // 后遍历右节点
    cur = stack.pop().right
  }
  return res;
}

// 中左右
// @lc code=end

