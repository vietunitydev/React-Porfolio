# Theme Switching Implementation Guide

## Tổng quan
Hướng dẫn chi tiết về cách triển khai chức năng đổi theme (Dark/Light mode) cho React application sử dụng Context API và Tailwind CSS.

---

## Bước 1: Tạo Theme Context

### File: `ThemeContext.jsx`

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'vi');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, language, setLanguage }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
```

**Chức năng:**
- Quản lý state cho theme và language
- Lưu preferences vào localStorage
- Apply theme class vào document root
- Provide context cho toàn bộ app

---

## Bước 2: Wrap App với ThemeProvider

### File: `App.jsx`

```jsx
import { ThemeProvider } from './components/context/ThemeContext.jsx';

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <Routes>
                        {/* Your routes */}
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};
```

---

## Bước 3: Update Header Component

### File: `Header.jsx`

**Import useTheme hook:**
```jsx
import { useTheme } from '../context/ThemeContext.jsx';
```

**Sử dụng trong component:**
```jsx
const Header = () => {
    const { theme, setTheme, language, setLanguage } = useTheme();
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };
    
    // Apply theme to styles
    return (
        <aside className={`fixed left-0 top-0 h-screen w-80 
            ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} 
            border-r flex flex-col shadow-xl`}>
            {/* Component content */}
        </aside>
    );
};
```

---

## Bước 4: Apply Theme to Components

### Pattern chung cho mọi component:

```jsx
import { useTheme } from '../context/ThemeContext.jsx';

const ComponentName = () => {
    const { theme } = useTheme();
    
    return (
        <div className={`
            ${theme === 'dark' ? 'bg-gray-800/50 text-white' : 'bg-white text-gray-900'}
        `}>
            {/* Component content */}
        </div>
    );
};
```

---

## Bước 5: Theme Color Mapping

### Dark Mode Colors:
```jsx
// Backgrounds
bg-gray-900, bg-gray-800, bg-gray-800/50
bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900

// Text
text-white, text-gray-300, text-gray-400

// Borders
border-gray-700, border-gray-700/50, border-gray-800

// Hover States
hover:bg-gray-700, hover:border-gray-600
```

### Light Mode Colors:
```jsx
// Backgrounds
bg-white, bg-gray-50, bg-gray-100
bg-gradient-to-br from-gray-50 via-white to-gray-50

// Text
text-gray-900, text-gray-700, text-gray-600

// Borders
border-gray-200, border-gray-300

// Hover States
hover:bg-gray-200, hover:border-gray-300
```

### Accent Colors (giữ nguyên cho cả 2 themes):
```jsx
// Purple
bg-purple-600, text-purple-400, border-purple-500

// Cyan/Blue
text-cyan-400, text-blue-400

// Green
text-green-400
```

---

## Bước 6: Component-specific Implementation

### Layout Components:

**Layout.jsx:**
```jsx
const Layout = ({ children }) => {
    const { theme } = useTheme();
    
    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}>
            <Header />
            <main className="ml-80 min-h-screen">
                {children}
            </main>
        </div>
    );
};
```

### Page Components:

**HomePage.jsx, BlogPage.jsx, ProjectsPage.jsx:**
```jsx
const HomePage = () => {
    const { theme } = useTheme();
    
    return (
        <div className={`${theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`}>
            {/* Page content */}
        </div>
    );
};
```

### Card Components:

**ProjectCard.jsx, BlogCard.jsx:**
```jsx
const Card = ({ data }) => {
    const { theme } = useTheme();
    
    return (
        <div className={`
            ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} 
            backdrop-blur-sm rounded-xl 
            border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'}
            hover:${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}
            shadow-lg
        `}>
            {/* Card content */}
        </div>
    );
};
```

### Navigation Components:

**NavButton.jsx:**
```jsx
const NavButton = ({ icon: Icon, text, isActive, theme }) => {
    return (
        <button className={`
            w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors
            ${isActive
                ? 'bg-purple-600 text-white'
                : theme === 'dark' 
                    ? 'text-gray-300 hover:bg-gray-700/50'
                    : 'text-gray-700 hover:bg-gray-100'
            }
        `}>
            <Icon size={15} />
            <span>{text}</span>
        </button>
    );
};
```

---

## Bước 7: Special Cases

### Prose Styling (for blog content):
```jsx
<div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
    {/* Markdown content */}
</div>
```

### Conditional Icons:
```jsx
{theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
```

### Shadow Effects:
```jsx
// Dark mode: Darker shadows
shadow-xl, shadow-2xl

// Light mode: Lighter shadows
shadow-lg, shadow-md
```

---

## Bước 8: Testing Checklist

### Components cần test:
- [ ] Header (sidebar)
- [ ] Navigation buttons
- [ ] All pages (Home, Projects, Blogs)
- [ ] Card components
- [ ] Detail pages
- [ ] Forms and inputs
- [ ] Modals and overlays

### Test scenarios:
1. Toggle theme button hoạt động
2. Theme persist sau khi reload page
3. Tất cả text đọc được (contrast đủ)
4. Borders visible trong cả 2 themes
5. Hover states hoạt động tốt
6. Images/screenshots display tốt
7. No flash of unstyled content (FOUC)

---

## Bước 9: Best Practices

### 1. **Consistent Color Usage:**
```jsx
// ❌ Không tốt
className="text-gray-400"

// ✅ Tốt
className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
```

### 2. **Component Structure:**
```jsx
// Import theme hook ở đầu file
import { useTheme } from '../context/ThemeContext.jsx';

// Destructure theme trong component
const { theme } = useTheme();

// Apply theme styles conditionally
```

### 3. **Reusable Theme Classes:**
```jsx
// Tạo helper functions nếu cần
const getCardClasses = (theme) => `
    ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'}
    backdrop-blur-sm rounded-xl shadow-lg
`;
```

### 4. **Performance:**
- Chỉ destructure `theme` khi cần
- Không re-render không cần thiết
- Use memo cho heavy components nếu cần

---

## Bước 10: Troubleshooting

### Issue: Theme không persist sau reload
**Solution:** Kiểm tra localStorage đang hoạt động đúng trong useEffect

### Issue: Flash of wrong theme on load
**Solution:** Thêm inline script trong index.html để set theme trước khi React load

### Issue: Một số components không đổi theme
**Solution:** Đảm bảo đã import và sử dụng useTheme hook

### Issue: Colors không contrast đủ
**Solution:** Review color mapping và test với accessibility tools

---

## File Structure Tổng Kết

```
src/
├── components/
│   ├── context/
│   │   └── ThemeContext.jsx          ✅ Theme provider
│   ├── common/
│   │   ├── Header.jsx                ✅ Theme toggle button
│   │   └── NavButton.jsx             ✅ Theme-aware nav
│   ├── home/
│   │   ├── HeroSection.jsx           ✅ Theme support
│   │   ├── ProjectHighlights.jsx     ✅ Theme support
│   │   ├── BlogPreview.jsx           ✅ Theme support
│   │   ├── TechStack.jsx             ✅ Theme support
│   │   └── ContactFooter.jsx         ✅ Theme support
│   ├── projects/
│   │   ├── ProjectCard.jsx           ✅ Theme support
│   │   └── ProjectDetail.jsx         ✅ Theme support
│   └── blogs/
│       ├── BlogCard.jsx              ✅ Theme support
│       └── BlogDetail.jsx            ✅ Theme support
├── pages/
│   ├── HomePage.jsx                  ✅ Theme support
│   ├── ProjectsPage.jsx              ✅ Theme support
│   └── BlogPage.jsx                  ✅ Theme support
├── layout/
│   └── Layout.jsx                    ✅ Theme support
└── App.jsx                           ✅ ThemeProvider wrapper
```

---
## Quick Reference

### Import Theme:
```jsx
import { useTheme } from '../context/ThemeContext.jsx';
```

### Use Theme:
```jsx
const { theme } = useTheme();
```

### Toggle Theme:
```jsx
const { setTheme } = useTheme();
setTheme(prev => prev === 'dark' ? 'light' : 'dark');
```

### Apply Styles:
```jsx
className={`${theme === 'dark' ? 'dark-classes' : 'light-classes'}`}
```

---

**Last Updated:** October 30, 2025
**Version:** 1.0
**Status:** ✅ Production Ready