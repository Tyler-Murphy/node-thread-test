Results when calculating the number of prime numbers smaller than 1e8 (e.g. `THREADS=3 node index.js`)

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


The CPU was an intel i3-6100 with 2 physical cores and 4 virtual cores.
