/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 * @return {number}
 */
// 思路: 递归 分别计算左边节点 和 右边节点的最大长度, 取长的一方 + 1;
var maxDepth1 = function(root) {
  if (root === null) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// 思路: 迭代 BFS 宽度搜索优先 一层一层遍历
var maxDepth = function(root) {
  if (root === null) {
    return 0;
  }
  let depth = 0;
  const stack = [[root]];
  while (stack.length) {
    let floor = stack.pop();
    depth++; // 每次迭代一层
    let nextFloor = [];
    while (floor.length) {
      // 所有子节点组成一个数组再入栈
      let floorItem = floor.pop();
      if(floorItem.left) {
        nextFloor.push(floorItem.left);
      }
      if (floorItem.right) {
        nextFloor.push(floorItem.right);
      }
    }
    if (nextFloor.length) {
      stack.push(nextFloor);
    }
  }
  return depth;
}
// 思路: 迭代 遍历每个节点同时记录深度 一层一层遍历
var maxDepth = function(root) {
  if (root === null) {
    return 0;
  }
  let depth = 0;
  const stack = [[1, root]];
  while (stack.length) {
    const [curDepth, root] = stack.pop();
    depth = Math.max(depth, curDepth);
    if (root.left) {
      stack.push([curDepth + 1, root.left])
    }
    if (root.right) {
      stack.push([curDepth + 1, root.right])
    }
  }
  return depth;
}
// @lc code=end

