/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
 */
var findNextBeforeMe = function(head, cur) {
  if (cur === cur.next) {
    return true;
  }
  // 遍历表头到当前节点, 看能否找到我的下个节点
  while(head && head !== cur) {
    if (head === cur.next) {
      return true;
    }
    head = head.next;
  }
  return false;
}
// 暴力法, 回过头找
var detectCycle1 = function(head) {
  let cur = head;
  while (cur && cur.next) {
    if (findNextBeforeMe(head, cur)) { // 有标记说明是已经遍历过的链表, 存在循环
      return cur.next;
    }
    // cur.mark = true; // 给循环过的节点做标记
    cur = cur.next;
  }
  return null;
};

// 快慢指针, 找到交汇点继续
var detectCycle = function (head) {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      while (head && slow) {
        if (head === slow) {
          return slow;
        }
        head = head.next;
        slow = slow.next;
      }
      return null;
    }
  }
  return null;
}

// @lc code=end

