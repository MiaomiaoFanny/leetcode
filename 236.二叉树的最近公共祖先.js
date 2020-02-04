/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
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


// 思路: 迭代 (参考老师的写法)
var lowestCommonAncestor1 = function(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  return left === null ? right : right == null ? left : root;
};


function findParents(root, p, res) {
  if (root === null || root === p) {
    return root;
  }
  const left = findParents(root.left, p, res);
  const right = findParents(root.right, p, res);
  if (left || right) {
    res.push(root);
  }
  return left || right;
}

// 思路: 分别找到 p 和 q 的 所有祖先, 再找到第一个不同的祖先
var lowestCommonAncestor = function (root, p, q) {
  const pParents = [], qParents = [];
  findParents(root, p, pParents);
  findParents(root, q, qParents);
  pParents.unshift(p);
  qParents.unshift(q);
  let pNode, qNode, res;
  while (pParents.length && qParents.length) {
    pNode = pParents.pop();
    qNode = qParents.pop();
    if (pNode.val != qNode.val) {
      return res;
    }
    res = pNode;
  }
  return res;
}

// @lc code=end

