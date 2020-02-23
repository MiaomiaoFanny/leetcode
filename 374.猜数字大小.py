# The guess API is already defined for you.
# @param num, your guess
# @return -1 if my number is lower, 1 if my number is higher, otherwise return 0
# def guess(num):
import math

# 二分法
class Solution(object):
    def guessNumber(self, n):
        """
        :type n: int
        :rtype: int
        """
        left = 0
        right = n
        while left <= right:
            myGuess = left + ((right - left) // 2)
            flag = guess(myGuess)
            if flag == 0:
                return myGuess
            if flag == -1:
                right = myGuess - 1
            elif flag == 1:
                left = myGuess + 1
