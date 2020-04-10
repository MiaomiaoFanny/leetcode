/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
/* DP表:
dp[i][j]表示s从索引i到所有j之间的字串是不是回文
i不能小于j, 求dp表中为true的个数
判断 pd[i][j]结果:
* i === j > true
* j - i === 1
  相邻字符 只要s[i] === s[j]
* j - i > 1
  不相邻字符
  s[i] === s[j] 且 dp[i+1][j-1]为true
130 / 130 cases passed(104 ms)
Your runtime beats 52.08 % of javascript submissions
Your memory usage beats 45.45 % of javascript submissions(64 MB)
时间复杂度 O(n^2 / 2)
 */
var countSubstrings1 = function(s) {
  if(!s) return 0;
  let len = s.length;
  if(len === 1) return 1;
  let n = 0;
  const dp = Array(len)
  for(let i = dp.length - 1; i >= 0; i--) {
    dp[i] = [];
    for(let j = dp.length - 1; j >= i; j--) {
      if (s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
        n++;
      }
    }
  }
  return n;
};

// 马拉车算法:
var countSubstrings = function(s) {
}

// @lc code=end

