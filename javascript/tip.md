# 这是tip

### Array.reduce
reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。

```js
[0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
});
```

| callback     |previousValue |currentValue|index|array|return value|
| ------------ |:--------: |:---:|:---:|:----------:|:----:|
|first call    |0	    |1	  |1	|[0,1,2,3,4] |	1 |
|second call    |1	    |2	  |2	|[0,1,2,3,4] |	3 |
|third call     |3	    |3	  |3	|[0,1,2,3,4] |	6 |
|fourth call    |6	    |4	  |4	|[0,1,2,3,4] |	10|

reduce 的返回值是回调函数最后一次被调用的返回值（10）。
