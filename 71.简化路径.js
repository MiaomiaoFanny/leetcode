/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
  const pArr = path.split('/');
  const res = [];
  for(let i = 0; i < pArr.length; i++) {
    const folder = pArr[i];
    if(folder === '..') {
      res.pop();
    } else if(folder && folder !== '.'){
      res.push(folder);
    }
  }
  return '/' + res.join('/');
    
};
// @lc code=end

