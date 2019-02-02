# 小结
### 如何测试防抖函数
非常幸运，已经有人给出了解决方案：[看stackoverfow](https://stackoverflow.com/questions/52224447/jest-unit-test-for-a-debounce-function)，
[还有jest文档](https://jestjs.io/docs/en/timer-mocks)  
思路就是用jest mock定时器函数

### 关于原生拓展的争议
是否需要提供将这些函数作为如Array.prototype
