/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

/* (自己想出来的)
思路: horse > ros
从第一个字符开始依次操作
如果相同 则表示已经放好, OK 继续下一个字符
如果不同, 有三种操作方法
  1. 删除
  2. 替换
  3. 修改
剩余的子串依照同样的方法处理, 直到子串完全相同
 1146/1146 cases passed (508 ms)
Your runtime beats 5.06 % of javascript submissions
Your memory usage beats 9.52 % of javascript submissions (50.8 MB)
*/
var minDistance1 = function (word1, word2) {
  let cache = {};
  if(word1 === word2) return 0;
  return countDistance(word1, word2)
  function countDistance(str1, str2) {
    if(str1 === str2) return 0;
    if(str1 === '') return str2.length;
    if(str2 === '') return str1.length;
    if (cache[str1 + '-' + str2] !== undefined) return cache[str1 + '-' + str2];
    if(str1[0] === str2[0]) {
      return countDistance(str1.substr(1), str2.substr(1));
    }

    let res = 1 + Math.min(
      countDistance(str1.substr(1), str2), // 删除 horse > orse (ros)
      countDistance(str1.substr(1), str2.substr(1)), // 替换 horse > rorse (ros)
      countDistance(str1, str2.substr(1)), // 插入 horse > rhorse (ros)
    );
    cache[str1 + '-' + str2] = res
    return res;
  }
};

/* 同等思路, 减少字符串操作 substr
1146 / 1146 cases passed(208 ms)
Your runtime beats 8.23 % of javascript submissions
Your memory usage beats 9.52 % of javascript submissions(44.5 MB)
 */
var minDistance11 = function (word1, word2) {
  if(word1 === word2) return 0;
  let cache = {};
  return countDistance(0, 0)
  // i, j 表示 word1, word2 当前需要转换的字符位置
  function countDistance(i, j) {
    if(i === word1.length && j === word2.length) {
      l([i, j], 0)
      return 0;
    }
    if (cache[i + '-' + j] !== undefined) {
      return cache[i + '-' + j];
    }
    if(i === word1.length) {
      l([i, j], word2.length - j)
      cache[i + '-' + j] = word2.length - j
      return cache[i + '-' + j];
    }
    if(j === word2.length) {
      l([i, j], word1.length - i)
      cache[i + '-' + j] = word1.length - i
      return cache[i + '-' + j];
    }
    if(word1[i] === word2[j]) {
      return countDistance(i + 1, j + 1);
    }

    let res = 1 + Math.min(
      countDistance(i + 1, j), // 删除 horse > orse (ros)
      countDistance(i + 1, j + 1), // 替换 horse > rorse (ros)
      countDistance(i, j + 1), // 插入 horse > rhorse (ros)
    );
    cache[i + '-' + j] = res
    l([i, j], res)
    return res;
  }
};

/* 利用dp表: 动态规划 */
var minDistance = function (word1, word2) {
  let len1 = word1.length;
  let len2 = word2.length;
  let dp = Array(len1 + 1);
  for(let i = 0; i < dp.length; i++) {
    dp[i] = Array(len2 + 1);
    dp[i][0] = i;
  }
  dp[0] = [...Array(len2 + 1).keys()]
  for(let i = 1; i <= len1; i++) {
    for(let j = 1; j <= len2; j++) {
      if(word1[i-1] === word2[j-1]) {
        dp[i][j] = dp[i - 1][j - 1]; // 理解
      } else {
        // 替换(dp[i - 1][j - 1]) 原计划一顿操作后 发现前后分别多了一个字符 > 替换
        // 删除(dp[i - 1][j]) 原计划一顿操作后 发现初始字符多了一个字符 > 删掉
        // 插入(dp[i][j - 1]) 原计划一顿操作后 发现目标字符多了一个字符 > 插入
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[len1][len2];
}
// let l = console.log
// l(minDistance('horse', 'ros')) // 3   45 / 17
// l(minDistance('intention', 'execution')) // 5  220 / 79
// l = () => {}
// @lc code=end

