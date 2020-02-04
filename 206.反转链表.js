/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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

function ListNode(val) {
  this.val = val;
  this.next = null;
}
function print(head) {
  const res = [];
  let cur = head;
  while (cur) {
    res.push(cur.val);
    cur = cur.next;
  }
  res.push('null');
  console.log(res.join('->'))
}
// 迭代
var reverseList2 = function (head) {
  if (head === null) {
    return head;
  }
  let cur = head;
  let pre = null;
  let cache;
  let newHead;
  while (cur) {
    cache = cur.next; // 缓存下一个节点 next
    newHead = cur;
    newHead.next = pre; // 更改当前节点的指向, 会直接断开旧的链接, 因此需要提前缓存下一个节点

    // 指针前移
    pre = cur;
    cur = cache; // 从缓存中获取下一个节点
  }
  return newHead;
};

var reverseList2 = function (head) {
  let cur = head;
  let pre = null;
  while (cur) {
    [cur.next, pre, cur] = [pre, cur, cur.next];
  }
  return pre;
};
// 递归
var reverseList = function(head, pre) {
  if (!head) {
    return pre || null;
  }
  return reverseList(head.next, head, (head.next = pre));
}

function test() {
  const head = new ListNode(1);
  head.next = new ListNode(2);
  head.next.next = new ListNode(3);
  head.next.next.next = new ListNode(4);
  head.next.next.next.next = new ListNode(5);
  print(head);
  print(reverseList(head))
}
// test()
// @lc code=end

