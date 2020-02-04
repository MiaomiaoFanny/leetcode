/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 思路: 递归
var lowestCommonAncestor = function(root, p, q) {
  if (root == null || root === p || root === q) {
    return root;
  }

  // p q 均比root 小, 往左边找
  if (p.val < root.val && q.val < root.val ) {
    return lowestCommonAncestor(root.left, p, q);
  }
  // p q 均比root 大, 往右边找
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  return root;
}


// 思路: 迭代, p q的祖先节点一定是从根节点开始, 到某个节点后分道扬镳
// 利用二叉搜索树的特性, 只要p q不在某个节点的同一边, 之后他们的祖先节点一定会分道扬镳, 得出这个节点一定是最近公共祖先
var lowestCommonAncestor2 = function (root, p, q) {
  while (root && root !== p && root !== q) {
    if (p.val <= root.val && q.val <= root.val) {
      root = root.left;
    } else if (p.val >= root.val && q.val >= root.val) {
      root = root.right;
    } else {
      return root;
    }
  }
  return root;
}
// @lc code=end

