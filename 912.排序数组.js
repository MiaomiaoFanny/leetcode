/*
 * @lc app=leetcode.cn id=912 lang=javascript
 *
 * [912] 排序数组
 * 排序算法 知乎 https://zhuanlan.zhihu.com/p/42541704
 */

 
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
/* 1. 冒泡排序 bubble sort
遍历数组 每个位置上与后一个位置对比, 总是使得小的在前 大的在后
每遍历一次拍好一个数
每次遍历长度减一
直到遍历长度降为1 结束

遍历次数为 nums.length-1 + nums.length-2 + nums.length-3 + ... + 1
10 / 10 cases passed(5396 ms)
Your runtime beats 13.09 % of javascript submissions
Your memory usage beats 100 % of javascript submissions(38.7 MB)
时间复杂度: O(N^2)
空间复杂度: O(1)
*/
var bubbleSort = function(nums) {
  if (nums.length === 1) { return nums; }
  for (let len = nums.length - 1; len > 0; len--) { // 每次循环长度减一
    for(let i = 0; i < len; i++) {
      if (nums[i] > nums[i + 1]) {
        // [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        nums[i] = nums[i] ^ nums[i + 1]; // 优化位运算进行数据交换:
        nums[i + 1] = nums[i] ^ nums[i + 1];
        nums[i] = nums[i] ^ nums[i + 1];
      }
    }
  }
  return nums;
};

/* 2. 快速排序 quick sort (利用递归)
取第一个数 分别与剩余数进行对比, 比它小的放在左边, 大的放在右边
再分别对左右数组进行快速排序
将数组连接 结束
10 / 10 cases passed(120 ms)
Your runtime beats 76.77 % of javascript submissions
Your memory usage beats 8.1 % of javascript submissions(54.4 MB)
时间复杂度:
空间复杂度:
*/
var quickSort1 = function(nums) {
  if (nums.length <= 1) { return nums; }
  const mid = nums[0], left = [], right = [];
  for(let i = 1; i < nums.length; i++) {
    if (nums[i] > mid) {
      right.push(nums[i]);
    } else {
      left.push(nums[i]);
    }
  }
  return [...quickSort1(left), mid, ...quickSort1(right)];
}

/* 10/10 cases passed (116 ms)
Your runtime beats 79.97 % of javascript submissions
Your memory usage beats 57.57 % of javascript submissions (41 MB)
*/
// 少占用内存空间的快速排序 原地快排
function quickSort2(nums, left = 0, right = nums.length - 1) {
  if (nums.length <= 1) { return nums; }
  if (left >= right) { return; }
  let pivot = right; // 取最右数字作为比较的轴
  let middle = left;
  for(let i = left; i < right; i ++) {
    if (nums[i] < nums[pivot]) {
      [nums[middle], nums[i]] = [nums[i], nums[middle]]; // 将较小的数依次堆在左边
      middle ++; // 当前中间位置 (表示待放入较小数字的位置)
    }
  }
  [nums[middle], nums[pivot]] = [nums[pivot], nums[middle]]; // 将轴放置在中间位置
  // 此时已经排好 middle 位置的数
  quickSort2(nums, left, middle - 1);
  quickSort2(nums, middle + 1, right);
  return nums;
}

/* 3. 选择排序 selection sort 最笨拙方法 不稳定
每次从待排序的元素中选出最小, 堆放在起始位置
直到待排序元素长度为0
10 / 10 cases passed(1752 ms)
Your runtime beats 30.94 % of javascript submissions
Your memory usage beats 74.32 % of javascript submissions(40.5 MB)
 */
var selectionSort = function(nums) {
  if (nums.length <= 1) { return nums; }
  let putIndex = 0;
  while (putIndex < nums.length) {
    let smallIndex = putIndex;
    for (let i = putIndex + 1; i < nums.length; i++) {
      if (nums[smallIndex] > nums[i]) {
        smallIndex = i;
      }
    }
    // 交换
    [nums[putIndex], nums[smallIndex]] = [nums[smallIndex], nums[putIndex]];
    putIndex++;
  }
  return nums;
}

/* 4. 插入排序 Insertion sort 稳定 适用于少量数据
每一步将数字插入到已排好的序列中, 直到将全部数据插入完成
10 / 10 cases passed(812 ms)
Your runtime beats 35.43 % of javascript submissions
Your memory usage beats 75.4 % of javascript submissions(40.4 MB)
 */
var InsertionSort = function(nums) {
  if (nums.length <= 1) { return nums; }
  for(let i = 1; i < nums.length; i++) {
    let cur = nums[i];
    let j = i - 1; // 已排好序的数组长度
    // 难点: 插如何入数字
    for(; j >= 0; j--) {
      if (cur >= nums[j] ) { break; }
      nums[j+1] = nums[j]; // 比要插入的数大的均后移
    }
    nums[j + 1] = cur; // 插入当前数
  }
  return nums;
}

/* 5. 归并排序 merge sort 稳定 分治法 递归调用
将数组一分为二, 分为两个等长数组,
每个数组进行合并, 规则为: 分别比较元素, 小的先放大的后放
最后再将这两个等长数组进行合并

将已经有序的两个数组合并, 得到一个完全有序的数组

先将每一个最小粒度的子序列有序, 再将子序列合并, 最终得到一个全部有序的数组
https://baike.baidu.com/item/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F
 */
var mergeSort = function(nums) {
  if (nums.length <= 1) { return nums; }
  const mid = Math.floor(nums.length / 2);
  const left = nums.slice(0, mid);
  const right = nums.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
  // return merge2(mergeSort(left), mergeSort(right));

}
// 两个数组合并, 小数放前 大数放后
function merge(left, right) {
  const res = [];
  let li = 0, ri = 0;
  while (li < left.length && ri < right.length) {
    if(left[li] < right[ri]) {
      res.push(left[li]);
      li++;
    } else {
      res.push(right[ri]);
      ri++;
    }
  }
  if (ri == right.length) {
    return res.concat(left.slice(li));
  } else {
    return res.concat(right.slice(ri));
  }
}
// 性能不如上面的merge
function merge2(left, right) {
  let result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left[0])
      left.splice(0, 1)
    } else {
      result.push(right[0]),
      right.splice(0, 1)
    }
  }
  return result.concat(left).concat(right)
}

var sortArray = function(nums) {
  // return bubbleSort(nums);
  // return quickSort1(nums);
  // return quickSort2(nums);
  // return selectionSort(nums);
  // return InsertionSort(nums);
  return mergeSort(nums);
}
// const l = console.log;
// l(sortArray([5, 2, 3, 1]))
// l(sortArray([5, 1, 1, 2, 0, 0]))
// l(merge([5, 9, 3, 1], [8, 4, 5, 2, 6, 0]))
// @lc code=end

