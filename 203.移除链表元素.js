/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  let cur = head;
  let pre = null;
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next;
    }
    pre = cur;
    cur = cur.next;
  }
};
// @lc code=end

