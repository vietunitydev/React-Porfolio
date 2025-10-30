# Responsive Design Techniques Guide

## Tổng Quan

Document này giải thích chi tiết các kỹ thuật responsive design được áp dụng trong project, với các ví dụ thực tế từ code.

---

## 📐 Tailwind CSS Breakpoints

### Breakpoints Mặc Định

```css
sm:  640px   /* Mobile landscape, Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Small laptops, Large tablets */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

### Cách Hoạt Động

```jsx
// Mobile-first approach
className="text-sm sm:text-base md:text-lg lg:text-xl"
//          ↓        ↓            ↓            ↓
//        <640px   640px+       768px+      1024px+
```

---

## Kỹ Thuật 1: Mobile-First Approach

### Khái Niệm
Thiết kế cho mobile trước, sau đó scale lên cho màn hình lớn hơn.

### Ví Dụ Trong Project

#### Case 1: Hero Section Avatar
```jsx
// File: HeroSection.jsx
<div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full">
  <img src="/images/me.jpg" alt="avatar"/>
</div>
```

**Giải thích:**
- **Mobile (<640px):** Avatar 24x24 (96px)
- **Tablet (640-767px):** Avatar 32x32 (128px)
- **Desktop (768px+):** Avatar 40x40 (160px)

#### Case 2: Heading Text
```jsx
// File: ProjectsPage.jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
  My Projects
</h1>
```

**Giải thích:**
- **Mobile:** `text-2xl` = 24px
- **Tablet:** `text-3xl` = 30px
- **Desktop:** `text-4xl` = 36px

---

## Kỹ Thuật 2: Conditional Display (Hide/Show)

### Khái Niệm
Ẩn/hiện elements dựa trên kích thước màn hình.

### Ví Dụ Trong Project

#### Case 1: Hamburger Menu
```jsx
// File: Layout.jsx
<button className="fixed top-4 left-4 z-50 lg:hidden">
  {/* Menu button chỉ hiện trên mobile/tablet */}
</button>
```

**Giải thích:**
- `lg:hidden` → Ẩn khi ≥1024px (desktop)
- Visible khi <1024px (mobile/tablet)

#### Case 2: Project Grid vs Swipe
```jsx
// File: ProjectHighlights.jsx

{/* Mobile: Swipeable single item */}
<div className="md:hidden mb-8">
  {/* Swipe container - chỉ hiện trên mobile */}
</div>

{/* Desktop: Grid layout */}
<div className="hidden md:grid grid-cols-2 lg:grid-cols-3">
  {/* Grid - chỉ hiện trên desktop */}
</div>
```

**Giải thích:**
- **Mobile (<768px):** Hiện swipeable container
- **Desktop (≥768px):** Hiện grid layout

---

## Kỹ Thuật 3: Responsive Spacing

### Khái Niệm
Điều chỉnh padding, margin, gap theo màn hình.

### Ví Dụ Trong Project

#### Case 1: Container Padding
```jsx
// File: ProjectDetail.jsx
<div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
  {/* Content */}
</div>
```

**Giải thích:**
- **Mobile:** `px-4` (16px), `py-6` (24px)
- **Tablet:** `px-6` (24px), `py-8` (32px)

#### Case 2: Gap Between Elements
```jsx
// File: TechStack.jsx
<div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6">
  {/* Icons */}
</div>
```

**Giải thích:**
- **Mobile:** `gap-3` (12px)
- **Tablet:** `gap-4` (16px)
- **Desktop:** `gap-6` (24px)

---

## Kỹ Thuật 4: Responsive Grid Layout

### Khái Niệm
Thay đổi số cột trong grid dựa trên màn hình.

### Ví Dụ Trong Project

#### Case 1: Screenshot Grid
```jsx
// File: ProjectDetail.jsx
const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
};

<div className={`grid ${gridCols[columns]} gap-3 sm:gap-4`}>
  {screenshots.map(...)}
</div>
```

**Giải thích:**
- **Mobile:** 1 cột
- **Tablet:** 2 cột
- **Desktop:** 2-3 cột (tùy config)

#### Case 2: Related Posts
```jsx
// File: BlogDetail.jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
  {relatedPosts.map(...)}
</div>
```

**Giải thích:**
- **Mobile:** 1 cột
- **Desktop:** 2 cột

---

## Kỹ Thuật 5: Responsive Flex Direction

### Khái Niệm
Thay đổi hướng sắp xếp elements (row/column).

### Ví Dụ Trong Project

#### Case 1: Project Card
```jsx
// File: ProjectCard.jsx (Version cũ - đã đổi)
<div className="flex flex-col sm:flex-row">
  <div className="w-full sm:w-64">Image</div>
  <div className="flex-1">Content</div>
</div>
```

**Giải thích:**
- **Mobile:** `flex-col` (xếp dọc)
- **Desktop:** `flex-row` (xếp ngang)

#### Case 2: Blog Footer Tags
```jsx
// File: BlogDetail.jsx
<div className="flex flex-col sm:flex-row items-start sm:items-center">
  <div className="flex items-center gap-2">Tags:</div>
  <div className="flex flex-wrap gap-2">{tags}</div>
</div>
```

---

## Kỹ Thuật 6: Responsive Text & Icons

### Khái Niệm
Scale text size và icon size theo màn hình.

### Ví Dụ Trong Project

#### Case 1: Icon Sizing
```jsx
// File: ContactFooter.jsx
<a className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
</a>
```

**Giải thích:**
- **Mobile:** Button 48x48px, Icon 20x20px
- **Tablet:** Button 56x56px, Icon 24x24px
- **Desktop:** Button 64x64px, Icon 28x28px

#### Case 2: Text Truncation
```jsx
// File: ProjectCard.jsx
<h3 className="text-sm sm:text-base md:text-lg lg:text-xl line-clamp-2">
  {project.title}
</h3>
<p className="text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
  {project.description}
</p>
```

**Giải thích:**
- Title: Responsive font size + giới hạn 2 dòng
- Description: Responsive font + 2 dòng mobile, 3 dòng desktop

---

## Kỹ Thuật 7: Responsive Transform (Slide/Translate)

### Khái Niệm
Di chuyển elements ra khỏi/vào viewport.

### Ví Dụ Trong Project

#### Case 1: Sidebar Menu
```jsx
// File: Layout.jsx
<div className={`fixed top-0 left-0 h-full w-80 transition-transform ${
  isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
}`}>
  <Header />
</div>
```

**Giải thích:**
- **Mobile (closed):** `-translate-x-full` (ẩn ngoài màn hình bên trái)
- **Mobile (open):** `translate-x-0` (hiện trong viewport)
- **Desktop:** `lg:translate-x-0` (luôn hiện)

**Animation CSS:**
```css
.transition-transform {
  transition: transform 0.3s ease-in-out;
}
```

---

## Kỹ Thuật 8: Responsive Line Clamping

### Khái Niệm
Giới hạn số dòng text hiển thị.

### Ví Dụ Trong Project

#### Case 1: Project Description
```jsx
// File: ProjectCard.jsx
<p className="line-clamp-2 sm:line-clamp-3">
  {project.description}
</p>
```

**Giải thích:**
- **Mobile:** Hiện tối đa 2 dòng
- **Desktop:** Hiện tối đa 3 dòng
- Tự động thêm "..." khi vượt quá

---

## Kỹ Thuật 9: Touch-Optimized Sizing

### Khái Niệm
Đảm bảo elements đủ lớn để tap trên mobile (≥44x44px).

### Ví Dụ Trong Project

#### Case 1: Social Icons
```jsx
// File: ContactFooter.jsx
<a className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl">
  {/* 48x48px trên mobile = touch-friendly */}
</a>
```

#### Case 2: Dot Indicators
```jsx
// File: ProjectHighlights.jsx
<button className={`w-2 h-2 rounded-full ${
  index === currentIndex ? 'bg-purple-400 w-6' : 'bg-gray-600'
}`} />
```

**Giải thích:**
- Inactive dot: 8x8px (nhỏ)
- Active dot: 24x8px (elongated, dễ tap)

---

## Kỹ Thuật 10: Swipe Gesture Detection

### Khái Niệm
Detect touch gestures để navigate giữa các items.

### Ví Dụ Trong Project

#### Implementation
```jsx
// File: ProjectHighlights.jsx
useEffect(() => {
  if (!isMobile || !scrollContainerRef.current) return;

  const container = scrollContainerRef.current;
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Minimum 50px to trigger
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentIndex < projects.length - 1) {
        scrollToIndex(currentIndex + 1); // Swipe left → next
      } else if (diff < 0 && currentIndex > 0) {
        scrollToIndex(currentIndex - 1); // Swipe right → prev
      }
    }
  };

  container.addEventListener('touchstart', handleTouchStart);
  container.addEventListener('touchmove', handleTouchMove);
  container.addEventListener('touchend', handleTouchEnd);

  return () => {
    container.removeEventListener('touchstart', handleTouchStart);
    container.removeEventListener('touchmove', handleTouchMove);
    container.removeEventListener('touchend', handleTouchEnd);
  };
}, [isMobile, currentIndex, projects.length]);
```

**Giải thích:**
1. Track touch start position (X coordinate)
2. Track touch move position
3. Calculate diff khi touch end
4. Nếu diff > threshold (50px) → navigate
5. Positive diff = swipe left → next item
6. Negative diff = swipe right → prev item

---

## Kỹ Thuật 11: CSS Snap Scrolling

### Khái Niệm
Tự động snap elements vào vị trí khi scroll.

### Ví Dụ Trong Project

#### Implementation
```jsx
// File: ProjectHighlights.jsx
<div
  ref={scrollContainerRef}
  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
>
  {projects.map((project) => (
    <div className="flex-shrink-0 w-full snap-center px-2">
      {/* Project card */}
    </div>
  ))}
</div>
```

**CSS Support:**
```css
/* File: responsive.css */
.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-center {
  scroll-snap-align: center;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

**Giải thích:**
- `scroll-snap-type: x mandatory` → Bắt buộc snap theo trục X
- `scroll-snap-align: center` → Snap vào center của container
- `scrollbar-hide` → Ẩn scrollbar cho UI đẹp hơn

---

## Kỹ Thuật 12: Responsive Component Logic

### Khái Niệm
Thay đổi logic render dựa trên screen size.

### Ví Dụ Trong Project

#### Implementation
```jsx
// File: ProjectHighlights.jsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

return (
  <>
    {isMobile ? (
      <SwipeableContainer /> // Mobile component
    ) : (
      <GridLayout /> // Desktop component
    )}
  </>
);
```

**Giải thích:**
1. Track screen width với useState
2. Listen resize event
3. Render khác biệt dựa trên isMobile

---

## Kỹ Thuật 13: Keep Aspect Ratio on Scale

### Khái Niệm
Giữ nguyên form nhưng scale nhỏ lại trên mobile.

### Ví Dụ Trong Project

#### Case: Project Card
```jsx
// File: ProjectCard.jsx
<div className="flex h-32 sm:h-40 md:h-48">
  {/* Image: Fixed aspect ratio */}
  <div className="relative overflow-hidden w-32 sm:w-48 md:w-64">
    <img src={screenshot} className="w-full h-full object-cover" />
  </div>
  
  {/* Content: Flex-1 fills remaining */}
  <div className="p-3 sm:p-4 md:p-6 flex-1">
    <h3 className="text-sm sm:text-base md:text-lg">Title</h3>
    <p className="text-xs sm:text-sm">Description</p>
  </div>
</div>
```

**Giải thích:**
- Container height: 32→40→48 (scale đều)
- Image width: 32→48→64 (giữ tỷ lệ)
- Content padding: 3→4→6 (scale đều)
- Font size: xs→sm→base→lg (scale đều)
- **Kết quả:** Form giữ nguyên, chỉ scale nhỏ hơn

**Tỷ lệ scale:**
```
Mobile (320px):  Container 128px × Text 14px → Ratio 9:1
Tablet (768px):  Container 160px × Text 16px → Ratio 10:1
Desktop (1280px): Container 192px × Text 18px → Ratio 10.7:1
```

---

## 📊 So Sánh Kỹ Thuật

| Kỹ Thuật | Use Case | Performance | Complexity |
|----------|----------|-------------|------------|
| Mobile-First | Text, Spacing | ⭐⭐⭐⭐⭐ | ⭐ Easy |
| Hide/Show | Layout | ⭐⭐⭐⭐⭐ | ⭐ Easy |
| Grid Layout | Cards, Images | ⭐⭐⭐⭐ | ⭐⭐ Medium |
| Flex Direction | Navigation, Forms | ⭐⭐⭐⭐⭐ | ⭐ Easy |
| Transform | Menu, Sidebar | ⭐⭐⭐⭐ | ⭐⭐ Medium |
| Swipe Gesture | Carousel, Gallery | ⭐⭐⭐ | ⭐⭐⭐ Hard |
| CSS Snap | Smooth scroll | ⭐⭐⭐⭐ | ⭐⭐ Medium |
| Component Logic | Complex UI | ⭐⭐⭐ | ⭐⭐⭐ Hard |

---

## 🎯 Best Practices Trong Project

### 1. Consistent Breakpoints
```jsx
// Luôn dùng breakpoints nhất quán
sm:  // Small changes
md:  // Medium changes  
lg:  // Major layout changes
```

### 2. Touch-Friendly Targets
```jsx
// Minimum 44x44px cho buttons/links
className="w-12 h-12 sm:w-14 sm:h-14"
```

### 3. Progressive Enhancement
```jsx
// Start mobile → add features cho larger screens
className="text-sm sm:text-base lg:text-lg"
```

### 4. Performance First
```jsx
// Dùng CSS thay vì JS khi có thể
className="hidden md:block" // ✅ Fast
vs
{isMobile && <Component />} // ❌ Slower
```

### 5. Semantic Scaling
```jsx
// Scale có ý nghĩa, không random
padding:  4 → 6 → 8   (1.5x ratio)
text:     sm → base → lg
```

---

## Testing Checklist

### Desktop (≥1024px)
- [ ] Layout displays correctly
- [ ] No horizontal scroll
- [ ] Hover effects work
- [ ] Grid displays properly

### Tablet (768-1023px)
- [ ] Mid-size adjustments work
- [ ] Touch targets adequate
- [ ] Content readable

### Mobile (<768px)
- [ ] All features accessible
- [ ] Swipe gestures work
- [ ] Text readable (min 14px)
- [ ] No layout breaks
- [ ] Touch targets ≥44px

### Cross-Browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Device-Specific Considerations

### iPhone SE (375px)
```jsx
// Smallest common device
px-4  // 16px padding
text-sm // 14px text
w-12 h-12 // 48px touch target
```

### iPad (768px)
```jsx
// Tablet sweet spot
px-6  // 24px padding
text-base // 16px text
w-14 h-14 // 56px touch target
```

### Desktop (1280px+)
```jsx
// Full experience
px-8  // 32px padding
text-lg // 18px text
w-16 h-16 // 64px button (hover required)
```

---

## 💡 Tips & Tricks

### 1. Use rem for Accessibility
```jsx
// User có thể zoom text
font-size: 1rem; // ✅ Scales with browser
font-size: 16px;  // ❌ Fixed
```

### 2. Test on Real Devices
```bash
# Chrome DevTools tốt, nhưng không thay thế real device
# Test trên ít nhất 1 Android + 1 iOS
```

### 3. Optimize Images
```jsx
// Dùng responsive images
<img 
  src="small.jpg"
  srcSet="small.jpg 640w, medium.jpg 768w, large.jpg 1024w"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 4. Consider Landscape Mode
```jsx
// Không chỉ portrait
@media (orientation: landscape) and (max-height: 500px) {
  // Adjust for landscape phones
}
```

---

## 🎓 Summary

### Key Takeaways

1. **Mobile-First** → Thiết kế cho mobile trước
2. **Progressive Enhancement** → Thêm features cho larger screens
3. **Touch-Optimized** → Buttons ≥44x44px
4. **Performance** → Dùng CSS over JS
5. **Semantic Scaling** → Scale có logic, không random
6. **Real Testing** → Test trên real devices

### Files Áp Dụng Đầy Đủ

- ✅ Layout.jsx - Transform, Hide/Show
- ✅ HeroSection.jsx - Mobile-first sizing
- ✅ ProjectHighlights.jsx - Swipe, Snap, Grid
- ✅ BlogPreview.jsx - Swipe, Snap, Grid
- ✅ ProjectCard.jsx - Keep aspect ratio scale
- ✅ ProjectDetail.jsx - Responsive spacing, grid
- ✅ BlogDetail.jsx - Text sizing, layout
- ✅ ContactFooter.jsx - Touch targets

---

**Version:** 1.0  
**Last Updated:** October 2025  
**Project:** Portfolio Website Responsive Design