// TODO:
// 双向链表 next prev
// 跳表

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class NodeLinkList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  append(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let cur = this.head;
      while(cur.next) {
        cur = cur.next;
      }
      cur.next = node;
    }
    this.length += 1;
    this.print('append');
  }
  removeAt(index) {
    if (this.head === null || index > this.length - 1) {
      this.print('removeAt:' + index);
      return;
    }
    let cur = this.head;
    if (index === 0) {
      this.head = this.head.next;
    } else {
      let i = 0;
      let pre = null;
      while(i < index) {
        pre = cur
        cur = cur.next;
        i++;
      }
      pre.next = cur.next;
      cur.next = null;
    }
    this.length -= 1;
    this.print('removeAt:' + index);
    return cur.element
  }
  insert(element, index) {
    const node = new Node(element);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let cur = this.head;
      let pre;
      let i = 0;
      while (i < index && cur) {
        pre = cur
        if (cur.next === null) {
          break;
        }
        cur = cur.next;
        i++;
      }
      node.next = cur.next;
      cur.next = node
    }
    this.length += 1;
    this.print('insert:' + index);
  }
  print(tag) {
    let cur = this.head;
    const res = [];
    while(cur !== null) {
      res.push(cur.element);
      cur = cur.next;
    }
    res.push('null');
    console.log(tag, res.join('==>'), '(', this.length, ')');
    return res.join('==>');
  }
}

const nodeLink = new NodeLinkList();
nodeLink.append('1');
nodeLink.append('2');
nodeLink.append('3');
nodeLink.append('4');
// nodeLink.removeAt(0);
// nodeLink.removeAt(2);
nodeLink.insert('0', 0);
nodeLink.insert('11', 1);
nodeLink.insert('7', 7);
nodeLink.insert('99', 99);

