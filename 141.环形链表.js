/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}
function print(head, pos) {
  const res = [];
  let cur = head;
  let i = 0;
  let posV;
  while (cur) {
    if (i === pos) {
      posV = cur;
    }
    res.push(cur.val);
    cur = cur.next;
    i++;
  }
  console.log(res.join('->'), '---->', posV && posV.val || 'null')
}
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 1. 使用哈希/Set
var hasCycle = function(head) {
  const cache = new Set();
  while (head) {
    if (cache.has(head)) {
      return true;
    }
    cache.add(head);
    head = head.next;
  }
  return false;
};

// 2. 使用快慢指针
var hasCycle2 = function(head) {
  let fast = head, slow = head;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
}

function test() {
  const head = new ListNode(3);
  head.next = new ListNode(2);
  head.next.next = new ListNode(0);
  head.next.next.next = new ListNode(-4);
  head.next.next.next.next = head.next.next.next;
  console.log('hasCycle', hasCycle(head))
}
// test()
    
// @lc code=end
