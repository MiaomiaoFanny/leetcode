/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// O(log(m + n))
/*  思路: 边排序 边找中位数
先计算中位数的第几位数
排序过程中 排到中位数, 计算并返回
 */
var findMedianSortedArrays1 = function(nums1, nums2) {
  let len = nums1.length + nums2.length;
  let k1, k2;
  if ((len & 1) === 0) { // 偶数
    k1 = len / 2;
    k2 = k1 + 1;
  } else { // 奇数时假装是偶数的情况
    k1 = k2 = (len + 1) / 2;
  }
  let p2 = 0, p1 = 0;
  let n = 0, findK1, findK2;
  while (p1 < nums1.length && p2 < nums2.length) {
    n++;
    if (n === k1) {
      findK1 = Math.min(nums1[p1], nums2[p2])
    }
    if (n === k2) {
      findK2 = Math.min(nums1[p1], nums2[p2])
      break;
    }
    if (nums1[p1] < nums2[p2]) {
      p1++;
    } else {
      p2++;
    }
  }
  if (findK2 === undefined) {
    // 其中一个数组已排完, 但未排到中位数
    if (p1 === nums1.length) {
      if (findK1 !== undefined) {
        findK2 = nums2[p2];
      } else {
        findK1 = nums2[p2 + (k1 - n) - 1]; // 索引需要减1
        findK2 = nums2[p2 + (k2 - n) - 1];
      }
    } else {
      if (findK1 !== undefined) {
        findK2 = nums1[p1];
      } else {
        findK1 = nums1[p1 + (k1 - n) - 1];
        findK2 = nums1[p1 + (k2 - n) - 1];
      }
    }
  }
  return (findK1 + findK2) / 2;

};

/*: 将 两个数组分别划分为两部分, 较小值部分相结合, 取边界值
*/
var findMedianSortedArrays2 = function(nums1, nums2) {
  const m = nums1.length, n = nums2.length;
  const k = Math.floor((m + n + 1) / 2);
  if (n === 0) {
    if (((m + n) & 1) === 0) {
      return (nums1[k - 1] + nums1[k]) / 2;
    } else {
      return nums1[k - 1];
    }
  }
  if (m === 0) {
    if (((m + n) & 1) === 0) {
      return (nums2[k - 1] + nums2[k]) / 2;
    } else {
      return nums2[k - 1];
    }
  }
  let i = -1, j, k1, k2;
  while(i < m) {
    j = k - i - 2;
    if (j >= n) { i++; continue; }
    k1 = Math.max(nums1[i] !== undefined ? nums1[i] : -Infinity, nums2[j] !== undefined ? nums2[j] : -Infinity);
    k2 = Math.min(nums1[i + 1] !== undefined ? nums1[i + 1] : Infinity, nums2[j + 1] !== undefined ? nums2[j + 1] : Infinity);
    if (k1 <= k2) {
      if (((m + n) & 1) === 0) { // 偶数
        return (k1 + k2) / 2;
      } else { // 奇数
        return k1;
      }
    }
    i++;
  }
}

/*: 将 两个数组分别划分为两部分, 较小值部分相结合, 取边界值
如何划分, 二分法
*/
var findMedianSortedArrays = function(nums1, nums2) {
  let m = nums1.length, n = nums2.length;
  const k = Math.floor((m + n + 1) / 2);
  if (m < n ) {
    [nums1, nums2] = [nums2, nums1];
    [m, n] = [n, m];
  }
  if (n === 0) {
    if (((m + n) & 1) === 0) {
      return (nums1[k - 1] + nums1[k]) / 2;
    } else {
      return nums1[k - 1];
    }
  }
  /* 
  |0 --- i-1 | i --- m |
  |0 --- j-1 | j --- n |
   */
  let imin = 0, imax = m, i, j;
  while (imin <= imax) {
    i = Math.floor((imax + imin) / 2); // 二分法, 找中间值
    j = k - i;
    if (j !== 0 && i !== m && nums2[j - 1] > nums1[i]) {
      imin++; // i 太小了
    } else if (nums2[j] < nums1[i - 1]) {
      imax--; // i 太大了
    } else {
      // It's OK
      let maxLeft, minRight;
      if (i === 0) { maxLeft = nums2[j - 1]; }
      else if (j === 0) { maxLeft = nums1[i - 1]; }
      else { maxLeft = Math.max(nums1[i - 1], nums2[j - 1]); }
      if (((m + n) & 1) === 1) return maxLeft;

      if (i === m) { minRight = nums2[j]; }
      else if (j === n) { minRight = nums1[i]; }
      else { minRight = Math.min(nums1[i], nums2[j]); }

      return (maxLeft + minRight) / 2;
    }
  }
}
let l = console.log;
// l(findMedianSortedArrays([1, 3, 4, 5], [2])) // 3
// l(findMedianSortedArrays([1, 2, 5, 8], [3, 4, 6, 7, 9])) // 5
// l(findMedianSortedArrays([1, 2, 5, 8], [3, 4, 6, 7])) // 4.5
// l(findMedianSortedArrays([1, 3], [2])) // 2
// l(findMedianSortedArrays([1, 2], [3])) // 2
// l(findMedianSortedArrays([3], [1, 2])) // 2
// l(findMedianSortedArrays([0, 0], [0, 0])) // 0
// l(findMedianSortedArrays([], [1])) // 1
// l(findMedianSortedArrays([], [0])) // 0
// l(findMedianSortedArrays([1], [])) // 1
l = () => {};
// @lc code=end

