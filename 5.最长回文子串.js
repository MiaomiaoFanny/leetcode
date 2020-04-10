/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
/* 时间复杂度过高 */
var longestPalindrome1 = function(s) {
  if(!s) return '';
  const len = s.length;
  if(len === 1) {
    return s;
  }
  let maxStr = s[0];
  for(let i = 0; i < len - 1; i++) {
    for(let j = len - 1; j > i; j--) {
      if (s[i] === s[j]) {
        // 判断是否回文
        let k = 1;
        let isValid = true;
        while(i + k <= j - k) {
          if (s[i + k] != s[j - k]) {
            isValid = false;
            break;
          }
          k++;
        }
        if(isValid) {
          if(j + 1 - i > maxStr.length) {
            maxStr = s.substring(i, j + 1)
          }
        }
      }
    }
  }
  return maxStr;
};
var longestPalindrome11 = function (s) {
  if (!s) return '';
  const len = s.length;
  if (len === 1) {
    return s;
  }
  let maxStr = s[0];
  for (let i = 0; i < len - 1; i++) {
    for (let j = len - 1; j > i; j--) {
      if (s[i] === s[j]) {
        let s = s.substring(i, j + 1);
        // 判断是否回文
        let k = 1;
        let isValid = true;
        while (i + k <= j - k) {
          if (s[i + k] != s[j - k]) {
            isValid = false;
            break;
          }
          k++;
        }
        if (isValid) {
          if (j + 1 - i > maxStr.length) {
            maxStr = s.substring(i, j + 1)
          }
        }
      }
    }
  }
  return maxStr;
};

/*
dp表: 求出所有的回文子串, 同时保存最长子串
dp[i][j] 表示s从索引i到所有j之间的字串是不是回文
必须先求短再求长
103/103 cases passed (256 ms)
Your runtime beats 50.37 % of javascript submissions
Your memory usage beats 28.85 % of javascript submissions (72.4 MB)
*/
var longestPalindrome2 = function (s) {
  if(!s) return '';
  let len = s.length;
  if(len === 1) return s;
  let max = 1;
  let res = s[0];
  const dp = Array(len)
  for(let i = dp.length - 1; i >= 0; i--) {
    dp[i] = [];
    for(let j = dp.length - 1; j >= i; j--) {
      if (s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
        if (j + 1 - i > max) {
          max = j + 1 - i;
          res = s.substring(i, j + 1)
        }
      }
    }
  }
  return res;
};
/* 
插入法
例子 S = 'abaaba' 在每个字符两边插入'#'
T    = # a # b # a # a # b # a #
P[i] = 0 1 0 3 0 1 6 1 0 3 0 1 0 表示以T[i]为中心的最长回文长度
103 / 103 cases passed(144 ms)
Your runtime beats 64.29 % of javascript submissions
Your memory usage beats 76.92 % of javascript submissions(36.5 MB) 
*/
var longestPalindrome3 = function (s) {
  if(!s) return '';
  let len = s.length;
  if(len === 1) return s;
  if(len === 2) return s[0] === s[1] ? s : s[0];
  let T = '#' + (s.split('').join('#')) + '#'
  let max = 1;
  let pos = 0;
  len = s.length * 2 + 1;
  let P = Array(len);
  for(let i = 0; i < len; i++) {
    if(i < 2) {
      P[i] = i;
      continue;
    }
    let n = 0;
    for (let j = 1; i - j >= 0 && i + j < len; j++) {
      if(T[i - j] != T[i + j]) {
        break;
      }
      n++;
    }
    P[i] = n;
    if (n > max) {
      max = n;
      pos = i;
      if (len - i < max) { // 稍微优化 不可能有更长的字串时, 直接结束
        break;
      }
    }
  }
  l(P);
  if(max === 1) return s[0]
  return T.substring(pos - max, pos + max).replace(/#/g, '');
}

/*
优化1: 代码中不实际 生成 T P 节省空间
103 / 103 cases passed(112 ms)
Your runtime beats 71.03 % of javascript submissions
Your memory usage beats 100 % of javascript submissions(35 MB)
*/
var longestPalindrome33 = function (s) {
  if(!s) return '';
  let len = s.length;
  if(len === 1) return s;
  if(len === 2) return s[0] === s[1] ? s : s[0];
  let max = 1;
  let pos = 0;
  len = s.length * 2 + 1;
  for(let i = 0; i < len; i++) {
    if(i < 2) {
      continue;
    }
    let n = 0;
    // l(`T[${i}] = ${i%2 ===0 ? '#' : s[(i - 1) / 2]}`)
    for (let j = 1; i - j >= 0 && i + j < len; j++) {
      if((i - j) % 2 === 0) {
        n++
      } else if (s[(i - j - 1) / 2] === s[(i + j - 1) / 2]) { // 计算s中字符的下标
        n++;
      } else {
        break;
      }
    }
    if (n > max) {
      max = n;
      pos = i;
      if(len - i < max) { // 稍微优化 不可能有更长的字串时, 直接结束
        break;
      }
    }
  }
  if(max === 1) return s[0]
  let L = pos - max, R = pos + max,
    start = L / 2, end = (R - 2) / 2
  return s.substring(start, end + 1);
}

/* 优化2: 更快的算出P[i]
时间复杂度得到优化
Manacher
103 / 103 cases passed(84 ms)
Your runtime beats 93.4 % of javascript submissions
Your memory usage beats 99.04 % of javascript submissions(35.3 MB)
*/
var longestPalindrome333 = function (s) {
  if(!s) return '';
  let len = s.length;
  if(len === 1) return s;
  if(len === 2) return s[0] === s[1] ? s : s[0];
  let max = 1;
  let pos = 0;
  len = s.length * 2 + 1;
  let P = Array(len);
  let center = 0;
  for(let i = 0; i < len; i++) {
    if(i < 2) {
      P[i] = i;
      center = i;
      continue;
    }
    let n = 0;
    let ii = 2 * center - i;
    let R = center + P[center];
    // l(i, [L, ii, [center], i, R], P[ii], P[center]);
    if(i < R && ii >= 0 && P[ii] < R - i) {
      // 对应的位置的最长回文字串半径 在以i为中心的圆 右边界不超过其共同所在的回文子串的有边界, 则是对称的， 所以相同
      n = P[ii];
    } else {
      if(i >= R || ii < 0) {
        // 对应位置在圆边界外
        n = 0;
      } else {
        // 对应位置在边界内, 但 超过边界, 从右边界之后检测
        n = R - i
      }
      for (let j = n + 1; i - j >= 0 && i + j < len; j++) {
        if ((i - j) % 2 === 0 ||
          s[(i - j - 1) / 2] === s[(i + j - 1) / 2]
        ) {
          n++
        } else {
          break;
        }
      }
    }
    P[i] = n;
    if (n > max) {
      max = n;
      pos = i;
      center = pos;
    }
  }
  // l(P);
  if(max === 1) return s[0]
  let L = pos - max, R = pos + max,
    start = L / 2, end = (R - 2) / 2
  return s.substring(start, end + 1);
}
let l = console.log;
// l(longestPalindrome('abaabac'))
// [ 0, 1, 0, 3, 0, 1, 6, 1, 0, 3, 0, 1, 0, 1, 0 ]
// l(longestPalindrome('babcbabcbaccba'))
// [ 0, 1, 0, 3, 0, 1, 0, 7, 0, 1, 0, 9, 0, 1, 0, 5, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0 ]
// l(longestPalindrome('babad'))
// l(longestPalindrome('cbbd'))
// l(longestPalindrome('abacab'))
l = () => {};

// @lc code=end

