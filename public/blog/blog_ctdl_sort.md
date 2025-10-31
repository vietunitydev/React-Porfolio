## Các thuật toán sắp xếp

Hôm nay chúng ta sẽ cùng tìm hiểu về các thuật toán sắp xếp và phân tích điểm mạnh, yếu và trường hợp áp dụng của nó.

## 1. Nhóm sắp xếp cơ bản (Elementary Sort)
### 1.1 Bubble Sort, sắp sếp nổi bọt - O(n²)  
Sắp xếp nổi bọt xuất phát từ việc phần tử lớn nhất "nổi dần" lên cuối mảng sau mỗi lượt duyệt, giống như bong bóng khí nổi lên mặt nước.  
**Cách hoạt động:**
1. Duyệt qua mảng nhiều lần
2. Ở mỗi lượt, so sánh cặp phần tử liền kề (arr[j], arr[j+1])
3. Nếu arr[j] > arr[j+1], hoán đổi chúng.
4. Sau lượt thứ nhất, phần tử lớn nhất nằm ở cuối mảng -> không cần xét lại phần tử đó ở lượt sau.
5. Lặp lại cho đến khi không còn hoán đổi nào.

Code python:
```Python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        # tối ưu: nếu không swap => dừng
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

print(bubble_sort([5, 3, 8, 4, 2]))
# Output: [2, 3, 4, 5, 8]
```
### 1.2 Selection Sort, Sắp xếp chọn lựa - O(n²)
Thuật toán này dựa trên nguyên tắc : "Mỗi vòng lặp, tìm phần tử nhỏ nhất trong phần chưa được sắp xếp và đưa nó lên đầu."  
**Cách hoạt động:**
1. Tìm phần tử nhỏ nhất từ toàn bộ mảng
2. Đổi vị trí của phần tử nhỏ nhất tìm được và phần tử đầu tiên
3. Lặp lại quy trình đó, với vị trí xuất phát là i+1 so với vị trí duyệt trước đó

Code python:
```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr

print(selection_sort([5, 3, 8, 4, 2]))
# Output: [2, 3, 4, 5, 8]
```

### 1.3 Insertion Sort, Sắp xếp chèn - O(n²), tốt nhất O(n)
Thuật toán này mô phỏng cách bạn xếp bài trên tay: "Lấy từng lá bài (phần tử) và chèn nó vào đúng vị trí trong phần các lá đã được sắp."  
**Cách hoạt động:**
1. Bỏ qua phần tử đầu tiên coi như đã sắp xếp
2. Lấy phần tử thứ 2 so sánh với phần tử đầu tiên, nếu nhỏ hơn chèn lên trước phần tử đầu tiên.
3. Lặp lại quy trình này, lấy phần tử tại i, so sánh với các phần tử j từ i-1 -> 0, tại vị trí j nếu a[j] > a[i], ta gán a[j+1] = a[j]. Nếu gặp a[j] <= a[i] ta dừng lặp và gán a[j+1] = a[i] ban đầu.

Ví dụ: [2, 3, 8, 4, 5, 8]  
1. i = 3, a[i] = 4.
2. ta lặp j = i-1 -> 0.   
với j = 2 a[1] = 8 > 4 -> ta gán a[2] = 8.  
với j = 1 a[0] = 3 < 4 -> ta dừng và gán a[1] = 4.
3. ta thu được, [2, 3, 4, 8, 5, 8]  

Code python:
```Python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # dịch chuyển phần tử lớn hơn key sang phải
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

print(insertion_sort([5, 3, 8, 4, 2]))
# Output: [2, 3, 4, 5, 8]
```

### 1.4 Shell Sort - O(n log² n)
Shell Sort là một phiên bản nâp cấp hơn của **Insertion Sort**
Ý tưởng chính của thuật toán: Thay vì chèn từng phần tử vào đúng vị trí ngay từ đầu như Insertion Sort, ta so sánh và chèn các phần tử cách nhau 1 khoảng (gap), rồi giảm dần khoảng cách cho đến khi gap = 1   
Ngắn gọn:
1. Insertion Sort chèn phần tử liền kề -> chậm nết phần tử cách xa.
2. Shell Sort cho phép các phần tử "nhảy xa hơn" để đến gần vị trí đúng nhanh hơn.

**Cách hoạt động:**
1. Giả sử: [5, 3, 8, 4, 2, 1]
2. Chọn gap = n/2 = 3. So sánh các phần tử cách nhau 3 vị trí -> [4, 2, 1, 5, 3, 8]
3. Chọn gap = n/2 = 1.5 = 1. Thực hiện Insertion Soft trên toàn mảng.

Code python:
```Python
def shell_sort(arr):
    n = len(arr)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            # Dịch chuyển phần tử theo khoảng cách gap
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2  # Giảm khoảng cách
    return arr

print(shell_sort([5, 3, 8, 4, 2, 1]))
# Output: [1, 2, 3, 4, 5, 8]
```

## 2. Nhóm sắp xếp chia để trị (Divide & Conquer)
### 2.1 Merge Sort O(n log n)
Thuật toán merge sort dựa trên tư tưởng chia để trị, cụ thể nó sẽ chia nhỏ dữ liệu ban đầu thành các phần nhỏ hơn, sau đó sắp xếp và trộn nó lại.  
- Merge Sort = Chia nhỏ + Sắp từng phần + Trộn lại.  

Ví dụ: [5, 3, 8, 4, 2, 7, 1, 6]  
1. Bước 1: Chia  
Chia đôi liên tục cho đến khi chỉ còn 1 phần tử:
```text
[5, 3, 8, 4]    [2, 7, 1, 6]
[5, 3] [8, 4]   [2, 7] [1, 6]
[5] [3] [8] [4] [2] [7] [1] [6]
```
2. Bước 2: Trị (sắp xếp từng mảng con 1 phần tử → 2 phần tử)  
```text
[3,5] [4,8] [2,7] [1,6]
```
3. Bước 3: Trộn dần lại
```text
[3,4,5,8] [1,2,6,7]
→ [1,2,3,4,5,6,7,8] ✅
```
Code Python: 
```text
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    # trộn hai mảng con
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # nối phần còn lại (nếu có)
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([5, 3, 8, 4, 2, 7, 1, 6]))
# 👉 Output: [1, 2, 3, 4, 5, 6, 7, 8]
```

#### Chứng minh độ phức tạp thuật toán:  
**Cách 1:**  
Merge Sort chia đôi liên tục, ta nhận được 1 cây nhị phân, có log(n) tầng. (n/2^k = 1 -> k=log(n))  
Ở mỗi tầng, khối lượng công việc thực hiện là n. Trong merge sort, công việc chủ yếu đến từ bước merge.
- Khi gộp hai mảng con kích thước m, chi phí là O(m) (phải duyệt qua mọi phần tử 1 lần).
- Ở tầng nào thì tổng kích thước các mảng cần merge = n ⇒ tổng chi phí tầng đó = O(n).

Không quan trọng bạn có 2 mảng to hay 8 mảng nhỏ — tổng số phần tử được “duyệt qua” để merge mỗi tầng luôn là n.

**Cách 2:**  
Ta có ở mỗi lần mergeSort = mergeSort(n/2) + mergeSort(n/2) + merge(a,b)   
Vì mỗi lần merge tốn n công việc (duyệt qua toàn bộ phần tử)  
-> T(n) = 2T(n/2) + n (1)  
Ta có: T(n/2) = 4T(n/4) + n (2)

Từ (1) và (2) ta có công thức tổng quát => T(n) = 2^k . T(n/2^k) + kn  
Công thức luôn đúng với mọi k, ta thay k = log2(n) (đây là số tầng)  
-> T(n) = n.T(1) + log2(n).n, Áp dụng quy tắc cộng -> **T(n) = log2(n)n**
### 2.2 Quick Sort O(n log n), xấu nhất O(n²)
Quick Sort, người anh em của Merge Sort nhưng thực tế thường nhanh hơn và được dùng nhiều hơn trong thư viện chuẩn (C, C++, Java, Python, v.v.).  
Về tư tưởng, QuickSort cũng dựa trên chia để trị, nhưng khác MergeSort về cách chia.   
**Cách hoạt động:**
1. Chọn phần tử làm chốt (pivot)
2. Phân chia mảng:
- các phần tử nhỏ hơn pivot đưa sang trái
- các phần tử lớn hơn pivot đưa sang phải
3. Gọi đệ quy sắp xếp hai nửa (trái, phải)
4. Ghép lại (pivot đứng giữa → không cần merge như Merge Sort)
   
**Ví dụ:**
1. Ta có mảng ``` [8, 3, 1, 7, 0, 10, 2] ```
2. Chọn pivot. Giả sử pivot = 7.  
Phân hoạch: ``` [3, 1, 0, 2] | 7 | [8, 10] ```
3. Đệ quy sắp xếp từng nửa
- Trái ``` [3, 1, 0, 2] → [0, 1, 2, 3] ```
- Phải ``` [8, 10] → [8, 10] ```
4. Ghép lại : ``` [0, 1, 2, 3] + [7] + [8, 10] = [0, 1, 2, 3, 7, 8, 10] ```

**Code python:**
```Python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr)//2]     # chọn pivot ở giữa
    left  = [x for x in arr if x < pivot]
    mid   = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + mid + quick_sort(right)

print(quick_sort([8, 3, 1, 7, 0, 10, 2]))
# Output: [0, 1, 2, 3, 7, 8, 10]
```
**Quy tắc chọn pivot:**
- Chọn pivot tốt → cây đệ quy cân bằng → log n tầng → n log n.
- Chọn pivot tệ → cây lệch → n tầng → n².
### 2.3 Heap Sort - O(n log n)
Heap sort là một thuật toán sắp xếp cổ điển nhưng cực kì mạnh, nó luôn chạy O(nlog(n)) trong mọi trường hợp, không cần bộ nhớ phụ như Merge sort.  
**Ý tưởng:**
Heap Sort = Dựng cây Heap + Trích phần tử lớn nhất liên tục
1. Xây dựng Max-Heap từ mảng (mỗi nút lớn hơn hai con).
2. Đưa phần tử lớn nhất (root) về cuối mảng.
4. Giảm kích thước heap, và heapify lại để phần tử lớn nhất kế tiếp nổi lên.
5. Lặp lại cho đến khi mảng được sắp xếp.

**Ví dụ:**
1. Mảng ban đầu: ```[4, 10, 3, 5, 1]```
2. Xây cây Heap: Biến cây thoả mãn: cha ≥ con
```
       10
      /  \
     5    3
    / \
   4   1
```
-> Mảng Heap tương ứng : ```Mảng heap tương ứng: [10, 5, 3, 4, 1]```
3. Đưa max (10) về cuối ```Swap 10 - 1```  
   → Giảm kích thước heap còn 4, heapify lại phần còn ```[1, 5, 3, 4]```  
   → ```[5, 4, 3, 1, 10]```
4. Lặp lại  
   Swap 5 ↔ 1 → ```[1, 4, 3, 5, 10]``` → heapify ```[1, 4, 3] → [4, 1, 3, 5, 10]```  
   Swap 4 ↔ 3 → ```[3, 1, 4, 5, 10]``` → heapify ```[3,1] → [3,1,4,5,10]```  
   Swap 3 ↔ 1 → ```[1,3,4,5,10]```  
   ✅ Kết quả cuối cùng: ```[1, 3, 4, 5, 10]```

**Code python:**
```Python
def heapify(arr, n, i):
    largest = i
    left = 2*i + 1
    right = 2*i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)

    # 1. Xây dựng max heap
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)

    # 2. Trích phần tử lớn nhất
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)

arr = [4, 10, 3, 5, 1]
heap_sort(arr)
print(arr)
# Output: [1, 3, 4, 5, 10]
```

## 3. Nhóm sắp xếp theo đếm & phân phối (Non-Comparison)
3.1 Counting Sort O(n + k)

3.2 Bucket Sort O(n + k)

3.3 Radix Sort O(n * k)

## 4. TỔNG KẾT CÁC THUẬT TOÁN SẮP XẾP

### Tổng quan
Phần này giúp bạn hệ thống lại toàn bộ các thuật toán sắp xếp đã học, so sánh ưu – nhược điểm, và nêu rõ trường hợp áp dụng phù hợp nhất trong thực tế.

### Bảng tổng hợp

| Nhóm | Thuật toán | Độ phức tạp (Tốt / TB / Xấu) | Ổn định | Bộ nhớ phụ | Đặc điểm chính | Trường hợp áp dụng |
|-------|-------------|-------------------------------|----------|--------------|----------------|--------------------|
| **Cơ bản (Elementary Sort)** | **Bubble Sort** | O(n) / O(n²) / O(n²) | ✅ | O(1) | Dễ hiểu, mô phỏng so sánh liền kề | Minh họa học thuật, dữ liệu nhỏ |
|  | **Selection Sort** | O(n²) / O(n²) / O(n²) | ❌ | O(1) | Mỗi vòng chọn min, ít swap | Khi cần sắp xếp tại chỗ, không yêu cầu ổn định |
|  | **Insertion Sort** | O(n) / O(n²) / O(n²) | ✅ | O(1) | Mô phỏng xếp bài, tốt khi gần sắp | Dữ liệu nhỏ hoặc gần có thứ tự |
|  | **Shell Sort** | O(n log² n) / O(n^1.25–n^1.5) / O(n²) | ❌ | O(1) | Cải tiến Insertion Sort với gap | Khi cần sắp nhanh hơn insertion, ít RAM |
| **Chia để trị (Divide & Conquer)** | **Merge Sort** | O(n log n) / O(n log n) / O(n log n) | ✅ | O(n) | Chia nhỏ, trộn lại, ổn định | Dữ liệu lớn, cần ổn định |
|  | **Quick Sort** | O(n log n) / O(n log n) / O(n²) | ❌ | O(log n) | Pivot chia đôi, đệ quy, nhanh nhất thực tế | Dữ liệu ngẫu nhiên, hiệu năng cao |
|  | **Heap Sort** | O(n log n) / O(n log n) / O(n log n) | ❌ | O(1) | Dựa trên cây Heap, ổn định về thời gian | Khi cần tốc độ ổn định, ít bộ nhớ |
| **Theo đếm & phân phối (Non-Comparison)** | **Counting Sort** | O(n + k) | ✅ | O(k) | Đếm tần suất giá trị | Dữ liệu nguyên, phạm vi nhỏ |
|  | **Bucket Sort** | O(n + k) | ✅ | O(n + k) | Chia dữ liệu thành nhóm (bucket) | Khi dữ liệu phân bố đều |
|  | **Radix Sort** | O(n × k) | ✅ | O(n + k) | Sắp theo từng chữ số (Counting con) | Dữ liệu có độ dài cố định (mã, số điện thoại...) |

## 🔹 So sánh nhanh theo tiêu chí

| Tiêu chí | Thuật toán nổi bật |
|-----------|--------------------|
| **Nhanh nhất thực tế** | Quick Sort (pivot ngẫu nhiên / median-of-three) |
| **Ổn định nhất** | Merge Sort, Insertion Sort, Counting / Radix Sort |
| **Ít bộ nhớ nhất** | Heap Sort, Quick Sort |
| **Phù hợp dữ liệu nhỏ** | Insertion Sort, Shell Sort |
| **Phù hợp dữ liệu lớn** | Merge Sort, Heap Sort, Quick Sort |
| **Phù hợp dữ liệu số nguyên, phạm vi hẹp** | Counting Sort, Radix Sort |
| **Phù hợp dữ liệu phân bố đều** | Bucket Sort |

### Ứng dụng thực tế (Case Study)

| Lĩnh vực | Tình huống thực tế | Thuật toán khuyên dùng |
|-----------|---------------------|--------------------------|
| **CSDL (Database)** | Sắp xếp bản ghi theo nhiều tiêu chí (VD: tên, ngày sinh) | Merge Sort (ổn định, dễ song song hóa) |
| **Game / Realtime Stats** | Dữ liệu nhỏ, thay đổi liên tục | Insertion Sort (nhanh khi gần sắp) |
| **Xử lý log / file cực lớn** | Dữ liệu không thể load hết vào RAM | Merge Sort (External Sort) |
| **Machine Learning / AI** | Chuẩn hóa, sắp đặc trưng đầu vào | Quick Sort (in-place, tốc độ cao) |
| **Phần mềm nhúng / giới hạn bộ nhớ** | Sắp thứ tự sensor, tín hiệu | Heap Sort (ít RAM, ổn định) |
| **Xử lý ảnh / pixel** | Sắp giá trị điểm ảnh | Counting Sort, Radix Sort |
| **Ứng dụng tài chính** | Dữ liệu lớn, cần ổn định thứ tự | Merge Sort, Radix Sort |

### Kết luận

- Không có **thuật toán sắp xếp “tốt nhất tuyệt đối”**, mà là **phù hợp nhất với từng tình huống**.
- Gợi ý chọn nhanh:
    - **Dữ liệu nhỏ hoặc gần sắp xếp:** `Insertion` / `Shell Sort`
    - **Dữ liệu lớn, cần ổn định:** `Merge Sort`
    - **Dữ liệu lớn, cần tốc độ cao, ít RAM:** `Quick Sort` hoặc `Heap Sort`
    - **Dữ liệu số nguyên / phạm vi hẹp:** `Counting`, `Radix`
    - **Dữ liệu phân bố đều:** `Bucket Sort`
