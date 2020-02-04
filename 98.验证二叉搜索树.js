/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
// 思路: 中序遍历 > 升序 左中右
var isValidBST1 = function(root) {
  const res = [];
  const cache = [];
  while (root || cache.length) {
    if (root) {
      cache.push(root);
      root = root.left;
    } else {
      root = cache.pop();
      if (res.length && res[res.length - 1] >= root.val) {
        return false;
      }
      res.push(root.val);
      root = root.right
    }
  }
  return true;
};

// 思路: 递归 边界值
var isValidBST = function(root, min, max) {
  if (root === null) {
    return true;
  }

  if ((min !== undefined && root.val <= min)
  || (max !== undefined && root.val >= max)) {
    return false;
  }
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

// @lc code=end

