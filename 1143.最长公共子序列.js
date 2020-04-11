/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
/* 递归法: DP 表
分别从后往前遍历, 找到相同的字符, 表示该字符一定在lcs最长公共子序列中,
继续往前找,
如果不相等, 至少有一个不在lcs, 至少放弃一个,
尝试分别放弃, 取递归后求得的最大长度
37 / 37 cases passed(1616 ms)
Your runtime beats 6.15 % of javascript submissions
Your memory usage beats 20 % of javascript submissions(177.6 MB)
 */
var longestCommonSubsequence1 = function(text1, text2) {
  let hash = {};
  return dp(text1.length - 1, text2.length - 1)
  function dp(i, j) {
    if(hash[i+'-'+j] !== undefined) return hash[i+'-'+j]
    if (i === -1 || j === -1) {
      hash[i + '-' + j] = 0;
      return 0;
    }
    if (text1[i] === text2[j]) {
      let res = dp(i - 1, j - 1) + 1;
      hash[i + '-' + j] = res;
      return res;
      // return dp(i - 1, j - 1) + 1;
    }
    let res = Math.max(dp(i - 1, j), dp(i, j - 1))
    hash[i + '-' + j] = res;
    return res;
    // return Math.max(dp(i - 1, j), dp(i, j - 1))
  }
};

/* DP
递推
37 / 37 cases passed(108 ms)
Your runtime beats 33.54 % of javascript submissions
Your memory usage beats 40 % of javascript submissions(57.1 MB)
*/
var longestCommonSubsequence = function(text1, text2) {
  if(!text1 || !text2) return 0;
  let len1 = text1.length + 1;
  let len2 = text2.length + 1;
  const dp = Array(len1)
  for(let i = 0; i <= len1; i++) {
    dp[i] = [];
    for(let j = 0; j <= len2; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
        continue;
      }
      let c1 = text1[i - 1], c2 = text2[j - 1];
      if(c1 === c2) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        //! 例如 ##a/**b的结果是 ##a/** 和 ##/**b 中大的那一个
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[len1 - 1][len2 - 1]
}

let l = console.log;
// l(longestCommonSubsequence('abcde', 'ahce')); // 3
// l(longestCommonSubsequence('abcdegh', 'ahcebcg')); // 4
// l(longestCommonSubsequence('ahce', 'abcde')); // 3
// l(longestCommonSubsequence('abc', 'def')); // 0
// l(longestCommonSubsequence('pmjghexybyrgzczy', 'hafcdqbgncrcbihkd')); // 4
l = () => {};
// @lc code=end

