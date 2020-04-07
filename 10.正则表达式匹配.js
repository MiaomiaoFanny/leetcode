/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
/* 思路: 递归
从头开始一次匹配字符串, 分析 . a .* a* 情况的匹配
447 / 447 cases passed(84 ms)
Your runtime beats 83.05 % of javascript submissions
Your memory usage beats 50 % of javascript submissions(35.8 MB)
 */
var isMatch1 = function(s, p) {
  if (!p && !s) return true;
  if (!p ) return false;
  let regs = p.split('').reduce((res, c) => (c === '*' ? res.push(res.pop() + '*') : res.push(c)) && res, []);
  let dp = Array(s.length+1)
  for(let i = 0; i < dp.length; i++) {
    dp[i] = Array(regs.length + 1).fill('');
  }
  // l(dp, dp.length, s.length + 1)
  let res = toMatch(0, 0);
  l(['isMatch1'], s+'/'+p, dp, '>', res);
  return res;
  function toMatch(si, pi) {
    if (dp[si][pi] !== '') return dp[si][pi];
    let char = s[si];
    let reg = regs[pi];
    let ret = false;
    if(char && !reg) {
      ret = false;
    } else if(!char) {
      ret = true;
      for(let i = pi; i < regs.length; i++) {
        if (regs[i][1] !== '*') ret = false;
      }
    } else if (reg.length === 1 && reg !== '.') { // a
      ret = char === reg && toMatch(si + 1, pi + 1)
    } else if (reg === '.') { // .
      ret = toMatch(si + 1, pi + 1)
    } else if (reg === '.*') { // .*
      ret = toMatch(si + 1, pi) || // 匹配多个
             toMatch(si + 1, pi + 1) || // 匹配1个
             toMatch(si, pi + 1); // 匹配0个
    } else if (reg.length === 2 && reg[1] === '*') { // a*
      if (char === reg[0]) {
        ret = toMatch(si + 1, pi) || // 匹配多个
          toMatch(si + 1, pi + 1) || // 匹配1个
          toMatch(si, pi + 1); // 匹配0个
      } else {
        ret = toMatch(si, pi + 1); // 匹配0个
      }
    }
    dp[si][pi] = ret;
    // l([si, pi], [char, reg], '>', ret);
    return ret;
  }
};
/* 
思路: dp表
dp[i][j] 表示前i个s 与 前i个p匹配的匹配结果
边界值: dp[0][0] = true, dp[i][0] = false 第一列其余全为false 任何字符串匹配空 都为 false
第一行只有符合偶数位全为*才为false 空字符串只匹配 x* 
其他
根据reg = p[j-1] char = s[i-1的值判断
* reg === '.' || reg === char 当前字符已匹配, 只需要看 pd[i-1][j-1]是否匹配
* reg === '*'
  * 当前字符不匹配当前正则
    * 验证不匹配正则的结果
  * 当前字符能匹配当前正则
    * 验证不匹配正则的结果 ||
    * 匹配一次的结果 ||
    * 匹配多次的结果

447/447 cases passed (76 ms)
Your runtime beats 94.99 % of javascript submissions
Your memory usage beats 44.44 % of javascript submissions (36.4 MB)
 */
var isMatch = function(s, p) {
  if (!p && !s) return true;
  if (!p ) return false;
  let dp = Array(s.length + 1)
  for(let i = 0; i < dp.length; i++) {
    dp[i] = [];
    for (let j = 0; j < p.length + 1; j++) {
      let char = s[i - 1] || '';
      let reg = p[j - 1] || '';
      if(i == 0 && j === 0) { dp[i][j] = true; continue; }
      if(j === 0) { dp[i][j] = false; continue; } // |
      if(i === 0) { // 只有偶数位置全部是*才匹配
        dp[i][j] = !!dp[i][j-2] && reg === '*' && (j % 2) === 0;
      } else if(reg === char || reg === '.') {
        dp[i][j] = dp[i - 1][j - 1];
      } else if(reg === '*') {
        reg = p[j - 2];
        if (char === reg || '.' === reg) { // 当前字符与此正则(x*)匹配 s(##x)  p(##x*)  c!==x
          // 例如: s(##x)  p(##x*)
          dp[i][j] = dp[i][j - 2] || // (左2)不匹配(x*) 只看 s(##x)/p(##) 是否匹配
                     dp[i][j - 1] || // (左1)匹配一个x 只看 s(##x)/p(##x) 是否匹配
                     dp[i - 1][j]; // (上)匹配多个 s(##)/p(##x*) 是否匹配 若能匹配 s(##)后多加个x也无妨
                     
        } else if (char !== reg) { // 当前字符与此正则(x*)不匹配 s(##c)  p(##x*)  c!==x
          // 例如: s(##c)  p(##x*)
          dp[i][j] = dp[i][j - 2]; // 一定不匹配(x*) 只看 s(##c)/p(##) 是否匹配
        }
      } else {
        dp[i][j] = false;
      }
    }
  }
  return !!dp[s.length][p.length];
};
let l = console.log
// l(isMatch('', 'p*')); // false
// l(isMatch1('', '.*')); // true
// l(isMatch1('', 's*')); // true
// l(isMatch1('', 'm')); // true
// l(isMatch1('', 'mis*')); // true
// l(isMatch('aa', 'a*')); // true
// l(isMatch('ab', '.*')); // true
// l(isMatch('aab', 'c*a*b')); // true
// l(isMatch('mississippi', 'mis*is*p*.')); // false
l = () => {}
// @lc code=end

