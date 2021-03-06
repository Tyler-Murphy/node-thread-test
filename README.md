## Results

These tests calculated the number of prime numbers smaller than 1e8.

#### AWS a1.metal instance with a 16 core ARM processor:

| Threads | Duration (s) |
|---------|--------------|
|       1 |          169 |
|       2 |           86 |
|       3 |           57 |
|       4 |           43 |
|       5 |           35 |
|       6 |           29 |
|       7 |           26 |
|       8 |           23 |
|       9 |           20 |
|      10 |           18 |
|      11 |           17 |
|      12 |           16 |
|      13 |           15 |
|      14 |           14 |
|      15 |           13 |
|      16 |           13 |

![graph of results](https://docs.google.com/spreadsheets/d/e/2PACX-1vRIKlEJ-22sCsePFyKDdosjgT6XW8vRmnztdJscrG9ginfd1C-k_WO_z7VQvfudzb8d7uDwE7HLcaTh/pubchart?oid=1711523320&format=image)

#### Intel i3-6100 with 2 physical cores and 4 virtual cores:

| Threads | Duration (s) | Peak Memory (MB) |
|---------|--------------|------------------|
| 1       | 55           | 43               |
| 2       | 28           | 51               |
| 3       | 29           | 59               |
| 4       | 30           | 67               |
| 5       | 30           | 75               |
| 6       | 30           | 83               |
| 7       | 30           | 91               |
| 8       | 30           | 99               |
| 16      | 30           | 162              |
| 32      | 30           | 289              |
