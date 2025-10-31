## Các thuật toán sắp xếp

Hôm nay chúng ta sẽ cùng tìm hiểu về các thuật toán sắp xếp và phân tích điểm mạnh, yếu và 
trường hợp áp dụng của nó.

## 1. Nhóm sắp xếp cơ bản (Elementary Sort)
### 1.1 Bubble Sort, sắp sếp nổi bọt - O(n²)  
Sắp xếp nổi bọt xuất phát từ việc phần tử lớn nhất "nổi dần" lên cuối mảng sau mỗi lượt duyệt, 
giống như bong bóng khí nổi lên mặt nước.  
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
1.2 Selection Sort O(n²)


1.3 Insertion Sort O(n²), tốt nhất O(n)

1.4 Shell Sort O(n log² n)

## 2. Nhóm sắp xếp chia để trị (Divide & Conquer)
2.1 Merge Sort O(n log n)

2.2 Quick Sort O(n log n), xấu nhất O(n²)

2.3 Heap Sort - O(n log n)


## 3. Nhóm sắp xếp theo đếm & phân phối (Non-Comparison)
3.1 Counting Sort O(n + k)

3.2 Bucket Sort O(n + k)

3.3 Radix Sort O(n * k)