/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
/* 182/182 cases passed (1388 ms)
Your runtime beats 5.12 % of javascript submissions
Your memory usage beats 17.71 % of javascript submissions (49.7 MB)
*/
var coinChange1 = function(coins, amount) {
  let len = coins.length;
  let T = [];
  coins.sort((a, b) => a - b)
  return getTV(len - 1, amount);
  function getTV(i, j) {
    if (T[i] && T[i][j] !== undefined) return T[i][j];
    let res = 0;
    if (j === 0) {
      if (!T[i]) T[i] = []; T[i][j] = res;
      return res;
    }
    if (i === 0) {
      res = j % coins[i] === 0 ? j / coins[i] : -1;
      if (!T[i]) T[i] = []; T[i][j] = res;
      return res;
    }
    res = Infinity;
    for (let k = Math.floor(j / coins[i]); k >= 0; k--) {
      let tmp = getTV(i - 1, j - (coins[i] * k))
      if (tmp !== -1) {
        res = Math.min(res, k + tmp);
      }
    }
    if (res === Infinity) res = -1;
    if (!T[i]) T[i] = []; T[i][j] = res;
    return res;
  }
};

/* 暴力递归回溯 Time Limit Exceeded 加上缓存之后 勉强通过
时间复杂度: O(S^n)
空间复杂度: O(n)
 */
var coinChange11 = function(coins, amount) {
  let T = [];
  return countCoin(0, amount);
  function countCoin(i, sum) {
    if (sum === 0) return 0;
    T[i] = T[i] || [];
    if (T[i][sum] !== undefined) return T[i][sum];
    if (i < coins.length && sum > 0) {
      let maxVal = sum / coins[i];
      let minCost = Number.MAX_VALUE;
      // 计算所有可能的情况
      for (let x = 0; x <= maxVal; x++) {
        if (sum >= x * coins[i]) {
          let res = countCoin(i + 1, sum - x * coins[i]);
          if (res != -1)
            minCost = Math.min(minCost, res + x);
        }
      }
      T[i][sum] = (minCost == Number.MAX_VALUE) ? -1 : minCost;
      return (minCost == Number.MAX_VALUE) ? -1 : minCost;
    }
    T[i][sum] = -1;
    return -1;
  }
};

/* 思路: F[S] 为获得金额S所需最少硬币数
再往前 取出一个硬币 计算剩余金额所需最小硬币数, 类推, 直到 <=0
递推公式 F[S] = F[S - coins[i]] + 1
coins[i]: 遍历每一个硬币, 并区最小值
 [186, 419, 83, 408], 6249 为例
 F[6249] = 1 + Math.min(F[6249 - 186], F[6249 - 419], F[6249 - 83], F[6249 - 408])
 182 / 182 cases passed(196 ms)
 Your runtime beats 26.22 % of javascript submissions
 Your memory usage beats 52.08 % of javascript submissions(40.4 MB)
 时间复杂度: O(Sn) 一共需要计算S个面额的最小硬币数, 每个面额需要计算n次
 空间复杂度: O(S) 需要一个长度为S的数组F来缓存结果
 自上而下 先考虑大的, 后推到到小的
 */
var coinChange2 = function(coins, amount) {
  return countCoin(amount)
  function countCoin(sum, F = []) {
    if (sum === 0) return 0;
    if (sum < 0) return -1;
    if (F[sum] !== undefined) return F[sum];
    let min = Number.MAX_VALUE;
    for(let i = 0; i < coins.length; i++) {
      // F[sum] = F[sum - coins[i]] + 1, 求 F[sum - coins[i]]
      let res = countCoin(sum - coins[i], F)
      if (res >= 0) {
        min = Math.min(min, 1 + res);
      }
    }
    F[sum] = (min === Number.MAX_VALUE) ? -1 : min;
    return F[sum];
  }
}

/* 自下而上
先计算小的, 后计算大的
首先组成初始的dp表, dp[0] = 0, 其余默认为无穷大
182 / 182 cases passed(108 ms)
Your runtime beats 79.69 % of javascript submissions
Your memory usage beats 98.96 % of javascript submissions(36.9 MB) 时间复杂度: O(Sn) 一共需要计算S个面额的最小硬币数, 每个面额需要计算n次
空间复杂度: O(S) 需要一个长度为S的数组F来缓存结果
 */
var coinChange = function(coins, amount) {
  let dp = Array(amount+1).fill(Infinity);
  dp[0] = 0
  for(let sum = 1; sum <= amount; sum++) {
    for(let i = 0; i < coins.length; i++) {
      if (sum >= coins[i]) {
        dp[sum] = Math.min(dp[sum], dp[sum - coins[i]] + 1)
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// let l = console.log;
// l(coinChange([1, 2, 5], 11)) // 20
// l(coinChange([186, 419, 83, 408], 6249)) // 20
// l(coinChange([94, 91, 377, 368, 207, 40, 415, 61], 9662)) // 25
// l = () => {}
// @lc code=end

