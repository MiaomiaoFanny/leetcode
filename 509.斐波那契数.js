/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
// // 递归 O(2^N) | O(N)
// var fib = function(N) {
//   if (N === 1 || N === 0) {
//     return N;
//   }
//   return fib(N-1) + fib(N-2);
// };

// // 递归 + 缓存
// var memorize = function(N, cache) {
//   if (cache[N]) {
//     return cache[N]
//   } else {
//     cache[N] = memorize(N-1, cache) + memorize(N-2, cache)
//     return cache[N]
//   }
// }
// var fib = function(N) {
//   if (N === 1 || N === 0) {
//     return N;
//   }
//   const cache = {};
//   return memorize(N, cache);
// };

// // 递推 O(n) | O(N)
// var fib = function(N) {
//   if (N === 1 || N === 0) {
//     return N;
//   }
//   const res = [0, 1];
//   for (let i = 2; i <= N; i++) {
//     res[i] = res[i-1] + res[i-2];
//   }
//   return res[N];
// };

// 替换 前移 O(N) | O(1)
var fib = function(N) {
  if (N === 1 || N === 0) {
    return N;
  }
  let pre2 = 0, pre1 = 1, cur;
  let i = 2;
  while (i <= N) {
    cur = pre2 + pre1;
    pre2 = pre1;
    pre1 = cur;
    i++;
  }
  return cur
};
// 通项公式 不会。。。
// 矩阵相乘法 不会。。。
// !!!感觉需要补一下 高中数学 和 高数 ！

/*
0 1 1 2 3 5 8
- - 
*/
// @lc code=end

