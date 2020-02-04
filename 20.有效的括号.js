/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = [];
  for(let i = 0; i < s.length; i++) {
    if ('({['.indexOf(s[i]) != -1) {
      stack.push(s[i]);
    } else {
      const L = stack.pop();
      const R = s[i];
      if (L=== undefined
        || L==='(' && R!==')'
        || L==='{' && R!=='}'
        || L==='[' && R!==']'
      ) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
// @lc code=end

