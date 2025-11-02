# Các Thuật Toán Tìm Kiếm (Search Algorithms)

Hôm nay chúng ta cùng tìm hiểu **các thuật toán tìm kiếm** phổ biến, phân tích **điểm mạnh (pros), điểm yếu (cons)** và **trường hợp áp dụng (use cases)**. Phần trình bày là **tiếng Việt**, kèm thuật ngữ **tiếng Anh trong ngoặc** để tiện tra cứu.

---

## 1. Tìm kiếm tuyến tính (Linear Search)
**Ý tưởng (Idea):** Duyệt tuần tự từng phần tử trong mảng/danh sách và so sánh với khóa cần tìm.  
**Độ phức tạp (Time):** O(n); **Bộ nhớ (Space):** O(1)  
**Ưu điểm (Pros):** Dễ cài đặt, không yêu cầu sắp xếp dữ liệu.  
**Nhược điểm (Cons):** Chậm với dữ liệu lớn.  
**Dùng khi (Use when):** Dữ liệu nhỏ, hoặc cấu trúc không cho phép sắp xếp/đánh chỉ mục.

**Code (Python):**
```python
def linear_search(arr, x):
    for i, v in enumerate(arr):
        if v == x:
            return i
    return -1
```

---

## 2. Tìm kiếm nhị phân (Binary Search)
**Ý tưởng:** Với **mảng đã sắp xếp**, so sánh phần tử giữa (mid) rồi rẽ trái/phải.  
**Độ phức tạp:** O(log n); **Bộ nhớ:** O(1) (bản iterative)  
**Ưu:** Rất nhanh trên dãy đã sắp xếp.  
**Nhược:** Cần sắp xếp trước; khó áp dụng nếu dữ liệu cập nhật liên tục.  
**Dùng khi:** Dữ liệu tĩnh/ít thay đổi, có thể sắp xếp.

**ASCII minh hoạ:**
```
[ L .......... M .......... R ]
         x < a[M] → tìm bên trái
         x > a[M] → tìm bên phải
```

**Code (Python):**
```python
def binary_search(arr, x):
    l, r = 0, len(arr) - 1
    while l <= r:
        m = (l + r) // 2
        if arr[m] == x:
            return m
        if arr[m] < x:
            l = m + 1
        else:
            r = m - 1
    return -1
```

---

## 3. Tìm kiếm nội suy (Interpolation Search)
**Ý tưởng:** Ước lượng vị trí cần tìm dựa trên **giá trị** của khóa, hiệu quả khi dữ liệu **phân bố đều**.  
**Độ phức tạp:** Trung bình O(log log n); tệ nhất O(n)  
**Ưu:** Nhanh hơn Binary Search trong dãy gần như đều.  
**Nhược:** Kém hiệu quả khi phân bố lệch; yêu cầu dữ liệu số và có thứ tự.  
**Dùng khi:** Dãy số đã sắp xếp, phân bố xấp xỉ đều (ví dụ ID tăng đều).

**Công thức vị trí (Position):**
```
pos = low + ( (x - a[low]) * (high - low) ) // (a[high] - a[low])
```

**Code (Python):**
```python
def interpolation_search(a, x):
    low, high = 0, len(a) - 1
    while low <= high and a[low] <= x <= a[high]:
        if a[high] == a[low]:
            return low if a[low] == x else -1
        pos = low + (x - a[low]) * (high - low) // (a[high] - a[low])
        if a[pos] == x:
            return pos
        if a[pos] < x:
            low = pos + 1
        else:
            high = pos - 1
    return -1
```

---

## 4. Tìm kiếm theo bước nhảy (Jump Search)
**Ý tưởng (Idea):** Nhảy theo **bước m = ⌊√n⌋**, khi vượt quá khóa thì quay lại **tìm tuyến tính** trong block.  
**Độ phức tạp:** O(√n)  
**Ưu:** Ít so sánh hơn linear trên dãy đã sắp xếp.  
**Nhược:** Vẫn kém hơn Binary Search; cần dãy đã sắp xếp.  
**Dùng khi:** Mảng đã sắp xếp nhưng không tiện dùng binary (ràng buộc đặc thù).

**Code (Python):**
```python
import math

def jump_search(a, x):
    n = len(a)
    step = int(math.sqrt(n)) or 1
    prev = 0
    while prev < n and a[min(n-1, prev + step - 1)] < x:
        prev += step
    for i in range(prev, min(prev + step, n)):
        if a[i] == x:
            return i
    return -1
```

---

## 5. Tìm kiếm Fibonacci (Fibonacci Search)
**Ý tưởng:** Giống binary nhưng dùng **số Fibonacci** để chia nhỏ khoảng tìm kiếm.  
**Độ phức tạp:** O(log n)  
**Ưu:** Hạn chế phép so sánh trong một số mô hình truy cập.  
**Nhược:** Triển khai phức tạp hơn; cần mảng đã sắp xếp.  
**Dùng khi:** Đọc/ghi bộ nhớ có chi phí đặc thù, muốn tối ưu số lần so sánh.

**Code (Python):**
```python
def fibonacci_search(a, x):
    n = len(a)
    # Khởi tạo số Fibonacci nhỏ nhất >= n
    f2, f1 = 0, 1
    f = f1 + f2
    while f < n:
        f2, f1 = f1, f
        f = f1 + f2

    offset = -1
    while f > 1:
        i = min(offset + f2, n - 1)
        if a[i] < x:
            f, f1, f2 = f1, f2, f - f1
            offset = i
        elif a[i] > x:
            f, f1, f2 = f2, f1 - f2, f - f1
        else:
            return i
    if f1 and offset + 1 < n and a[offset + 1] == x:
        return offset + 1
    return -1
```

---

## 6. Tìm kiếm theo hàm băm (Hash-based Lookup)
**Ý tưởng:** Ánh xạ khóa → **chỉ mục** bằng **hàm băm (hash function)**; xử lý va chạm (chaining, open addressing).  
**Độ phức tạp:** Trung bình O(1); tệ nhất O(n) (nhiều va chạm)  
**Ưu:** Truy cập cực nhanh, phù hợp tra cứu/lưu đệm (caching).  
**Nhược:** Tốn bộ nhớ; phụ thuộc chất lượng hàm băm/chiến lược va chạm.  
**Dùng khi:** Bảng tra cứu (symbol table), dictionary/set, cache.

**Minh hoạ:**
```
 key --hash()--> bucket_id --(chaining/open addressing)--> vị trí dữ liệu
```

**Code (Python - dùng dict tích hợp):**
```python
phone = {"alice": "0901", "bob": "0902"}
print(phone.get("bob"))  # O(1) trung bình
```

---

## 7. Tìm kiếm trên cây (Tree Search: BST, AVL, B-Tree)
**Ý tưởng:** Mỗi nút tách không gian khóa; so sánh tại nút → đi trái/phải (BST), hoặc theo nhiều nhánh (B-Tree).  
**Độ phức tạp:** Trung bình O(log n); tệ nhất O(n) với BST lệch; **AVL/Red-Black** cân bằng lại để đảm bảo O(log n).  
**Ưu:** Tìm/chen/xoá đều O(log n) khi cân bằng; có thứ tự (in-order).  
**Nhược:** Cài đặt phức tạp hơn mảng; quản lý cân bằng.  
**Dùng khi:** Cấu trúc **động**, cần thứ tự, cần tìm kiếm + cập nhật cân bằng.

**ASCII BST:**
```
        (8)
       /   \
     (3)   (10)
     / \      \
   (1) (6)    (14)
       / \     /
     (4) (7) (13)
```

**Code (Python - tìm trong BST):**
```python
class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def bst_search(root, x):
    cur = root
    while cur:
        if x == cur.key: return cur
        cur = cur.left if x < cur.key else cur.right
    return None
```

---

## 8. Tìm kiếm trên đồ thị (Graph Search: BFS, DFS)
**Ý tưởng:** Duyệt đồ thị để tìm đỉnh/đường đi.

### 8.1. BFS (Breadth-First Search)
- **Tư tưởng:** Duyệt theo **tầng/lớp** (level-order) từ đỉnh nguồn.
- **Độ phức tạp:** O(V + E)
- **Ưu:** Tìm được đường đi ngắn nhất với **trọng số cạnh bằng nhau**.
- **Nhược:** Tốn bộ nhớ hàng đợi với đồ thị rất lớn.

**ASCII BFS:**
```
Level 0:    S
Level 1:  A   B
Level 2: C D E F
```

**Code (Python):**
```python
from collections import deque

def bfs(adj, s):
    visited = {s}
    q = deque([s])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj.get(u, []):
            if v not in visited:
                visited.add(v)
                q.append(v)
    return order
```

### 8.2. DFS (Depth-First Search)
- **Tư tưởng:** Đi càng sâu càng tốt trước khi quay lui (backtrack).
- **Độ phức tạp:** O(V + E)
- **Ưu:** Đơn giản, hữu ích cho phát hiện chu trình, topological sort.
- **Nhược:** Không đảm bảo đường đi ngắn nhất.

**Code (Python):**
```python
def dfs(adj, u, visited=None, order=None):
    if visited is None: visited = set()
    if order is None: order = []
    visited.add(u)
    order.append(u)
    for v in adj.get(u, []):
        if v not in visited:
            dfs(adj, v, visited, order)
    return order
```

---

## 9. Tìm kiếm tối ưu đường đi (Shortest-Path / Heuristic Search)
### 9.1. Dijkstra (Dijkstra's Algorithm)
**Ý tưởng:** Tính **khoảng cách ngắn nhất** từ nguồn đến mọi đích với **trọng số không âm** bằng hàng đợi ưu tiên (priority queue).  
**Độ phức tạp:** O(E log V) với heap.  
**Ưu:** Tối ưu chính xác với trọng số không âm.  
**Nhược:** Không dùng cho cạnh âm; không tận dụng heuristic.  
**Dùng khi:** Bản đồ, mạng máy tính, định tuyến chi phí không âm.

**Code (Python):**
```python
import heapq

def dijkstra(adj, s):
    dist = {s: 0}
    pq = [(0, s)]
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist.get(u, float('inf')): 
            continue
        for v, w in adj.get(u, []):
            nd = d + w
            if nd < dist.get(v, float('inf')):
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist
```

### 9.2. A* (A-star Search)
**Ý tưởng:** Kết hợp **chi phí đã đi** g(n) + **hàm ước lượng** h(n) (heuristic) để dẫn đường đến đích.
- **Điều kiện tối ưu:** h(n) **chấp nhận được** (admissible) và **nhất quán** (consistent).  
  **Độ phức tạp:** Tùy heuristic; thực tế rất nhanh nếu heuristic tốt.  
  **Ưu:** Tìm đường nhanh, tối ưu (nếu h phù hợp).  
  **Nhược:** Phụ thuộc mạnh vào heuristic; tốn bộ nhớ open/closed set.  
  **Dùng khi:** Tìm đường trong **bản đồ lưới (grid)**, game AI, lập lịch.

**ASCII lưới (grid) minh hoạ A\* đơn giản:**
```
S . . # .
. # . # .
. # . . .
. . . # G
S: start, G: goal, #: chướng ngại
A* ưu tiên ô có f(n)=g(n)+h(n) nhỏ nhất
```

**Code (Python - demo trên lưới Manhattan):**
```python
import heapq

def astar(grid, start, goal):
    R, C = len(grid), len(grid[0])
    def h(a, b):  # Manhattan
        return abs(a[0]-b[0]) + abs(a[1]-b[1])

    openpq = [(h(start, goal), 0, start, None)]
    best_g = {start: 0}
    parent = {}

    while openpq:
        f, g, u, p = heapq.heappop(openpq)
        if u in parent:  # đã đóng
            continue
        parent[u] = p
        if u == goal:
            # reconstruct
            path = []
            cur = u
            while cur is not None:
                path.append(cur)
                cur = parent[cur]
            return list(reversed(path))

        for du, dv in [(1,0),(-1,0),(0,1),(0,-1)]:
            r, c = u[0]+du, u[1]+dv
            v = (r, c)
            if 0 <= r < R and 0 <= c < C and grid[r][c] != '#':
                ng = g + 1
                if ng < best_g.get(v, float('inf')):
                    best_g[v] = ng
                    heapq.heappush(openpq, (ng + h(v, goal), ng, v, u))
    return None
```

---

## 10. (Tuỳ chọn) Tìm kiếm tam phân trên hàm đơn đỉnh (Ternary Search on Unimodal Function)
**Ý tưởng:** Tối ưu **hàm đơn đỉnh (unimodal)** trên đoạn bằng cách chia 3 phần và loại 1/3 kém hơn.  
**Độ phức tạp:** O(log n) số bước; áp dụng trong **tối ưu hoá** hơn là tìm giá trị trong mảng.  
**Dùng khi:** Tối ưu hàm (ví dụ tìm cực đại/cực tiểu) khi hàm đơn đỉnh.

**Code (Python - trên khoảng liên tục):**
```python
def ternary_search_max(f, l, r, eps=1e-6):
    while r - l > eps:
        m1 = l + (r - l) / 3
        m2 = r - (r - l) / 3
        if f(m1) < f(m2):
            l = m1
        else:
            r = m2
    return (l + r) / 2
```

---

## Tổng kết so sánh & Case áp dụng (Summary & Use Cases)

| Thuật toán (Algorithm) | Sắp xếp cần? (Sorted?) | Thời gian TB (Avg Time) | Bộ nhớ (Space) | Ưu (Pros) | Nhược (Cons) | Case áp dụng (Use cases) |
|---|---|---|---|---|---|---|
| Tuyến tính (Linear) | Không | O(n) | O(1) | Cực đơn giản, không giả định dữ liệu | Chậm với n lớn | Dữ liệu nhỏ, dữ liệu không sắp xếp |
| Nhị phân (Binary) | Có | O(log n) | O(1) | Rất nhanh trên dãy tĩnh | Cần sắp xếp, kém linh hoạt khi cập nhật | Từ điển, log tìm kiếm nhị phân |
| Nội suy (Interpolation) | Có (gần đều) | O(log log n) | O(1) | Nhanh với phân bố đều | Tệ khi lệch phân bố | Dãy số ID tăng đều |
| Bước nhảy (Jump) | Có | O(√n) | O(1) | Ít so sánh hơn tuyến tính | Kém hơn nhị phân | Một số hệ thống hạn chế phép so sánh |
| Fibonacci | Có | O(log n) | O(1) | Tối ưu so sánh trong vài mô hình | Phức tạp hơn binary | Hệ thống bộ nhớ/IO đặc thù |
| Hàm băm (Hash) | Không | O(1) | O(n) | Truy cập siêu nhanh | Tốn bộ nhớ, va chạm | Dictionary, symbol table, cache |
| Cây (BST/AVL/B-Tree) | Không | O(log n) | O(n) | Cập nhật + tìm kiếm cân bằng | Triển khai phức tạp | CSDL, index cây, tập dữ liệu động |
| BFS | Không | O(V+E) | O(V) | Đường đi ngắn nhất khi w=1 | Tốn RAM | Tìm theo tầng, khoảng cách nhỏ nhất |
| DFS | Không | O(V+E) | O(V) | Đơn giản, nhiều ứng dụng | Không tối ưu đường đi | Chu trình, topo sort, liệt kê |
| Dijkstra | Không (w≥0) | O(E log V) | O(V) | Ngắn nhất chính xác | Không xử lý w âm | Định tuyến bản đồ, mạng |
| A* | Không | Tuỳ heuristic | O(V) | Nhanh & tối ưu (h tốt) | Phụ thuộc heuristic | AI pathfinding, lập lịch |
| Ternary (unimodal) | N/A | O(log n) | O(1) | Tối ưu hoá mượt | Không áp cho mảng thường | Bài toán tối ưu đơn đỉnh |

**Gợi ý lựa chọn (Quick picks):**
- **Không sắp xếp / dữ liệu nhỏ →** Tuyến tính (Linear).
- **Đã sắp xếp / truy vấn nhiều →** Nhị phân (Binary), Nội suy (Interpolation) nếu phân bố đều.
- **Tra cứu khoá nhanh →** Bảng băm (Hash).
- **Dữ liệu động có thứ tự →** Cây cân bằng (AVL/Red-Black) hoặc **B-Tree** (CSDL/đĩa).
- **Trên đồ thị:**
    - w=1 → **BFS**,
    - w≥0 → **Dijkstra**,
    - có **đích cụ thể** và **heuristic tốt** → **A***.

---

**Mẹo học nhanh:** Luôn hỏi 3 điều: *dữ liệu đã sắp xếp chưa?*; *có cập nhật thường xuyên không?*; *cần đường đi/tra cứu hay chỉ kiểm tra tồn tại?* → Từ đó chọn thuật toán phù hợp.