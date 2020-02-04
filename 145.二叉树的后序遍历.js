/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
var postorderTraversal1 = function(root) {
  if(!root) {
    return [];
  }
  return postorderTraversal(root.left).concat(postorderTraversal(root.right)).concat([root.val])
};
var postorderTraversal1 = function (root, res = []) {
  if (root) {
    postorderTraversal(root.left, res);
    postorderTraversal(root.right, res);
    res.push(root.val);
  }
  return res;
};

// 思路: 迭代 BFS 宽度优先搜索 上>下 左>右
// [1,2,3,4,5,6,null,7,8,9]
// 期望 下>上 左>右
// 相反 上>下 右>左 > 得出结果 再反转
// 时间复杂度: O(N) 每个节点恰好访问一次 (N=节点个数, 树的大小)
// 空间复杂度: O(N) 最坏情况保存整棵树
var postorderTraversal = function (root) {
  if (root === null) {
    return [];
  }
  const res = [];
  const cache = [root];
  while(cache.length) {
    const node = cache.pop();
    res.push(node.val);
    // 先入栈后出栈, 为了记住获取其左右节点
    if (node.left) {
      cache.push(node.left); // 左先入右后入, 为了右先出左后出 右>左
    }
    if (node.right) {
      cache.push(node.right);
    }
  }
  return res.reverse();
}

// 左右中
// @lc code=end

