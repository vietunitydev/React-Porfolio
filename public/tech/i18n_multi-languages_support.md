# i18n + useTranslation Implementation Guide

## 📖 Giới thiệu

### i18n là gì?
- **i18n** = "internationalization" (18 chữ cái giữa "i" và "n")
- Là quá trình làm cho ứng dụng hỗ trợ nhiều ngôn ngữ
- Cho phép dễ dàng thêm/thay đổi ngôn ngữ mà không cần sửa code

### useTranslation là gì?
- Là React Hook từ thư viện `react-i18next`
- Dùng để lấy function dịch text trong component
- Tự động re-render khi đổi ngôn ngữ

### Lợi ích:
- ✅ Tất cả text được quản lý tập trung
- ✅ Dễ dàng thêm ngôn ngữ mới
- ✅ Professional và scalable
- ✅ Tự động re-render khi đổi ngôn ngữ
- ✅ Có thể dùng với TypeScript
- ✅ Industry standard practice

---

## 🚀 Bước 1: Cài đặt thư viện

```bash
npm install i18next react-i18next
# hoặc
yarn add i18next react-i18next
```

---

## 📁 Bước 2: Tạo cấu trúc thư mục

```
src/
├── i18n/
│   ├── locales/
│   │   ├── vi.json          # Tiếng Việt
│   │   └── en.json          # English
│   └── config.js            # i18n configuration
├── components/
│   └── context/
│       └── ThemeContext.jsx
└── App.jsx
```

---

## 🌐 Bước 3: Tạo Translation Files

### File: `src/i18n/locales/vi.json`

```json
{
  "header": {
    "name": "Doan Quoc Viet",
    "title": "Sinh viên Công nghệ phần mềm tại PTIT",
    "home": "TRANG CHỦ",
    "projects": "DỰ ÁN",
    "blogs": "BLOG",
    "archives": "LƯU TRỮ",
    "about": "GIỚI THIỆU",
    "themeDark": "Chuyển sang chế độ sáng",
    "themeLight": "Chuyển sang chế độ tối",
    "languageSwitch": "Switch to English"
  },
  "hero": {
    "title": "Unity | Fullstack Game Developer",
    "description": "Sinh viên CNTT năm 4 tại PTIT với {{years}}+ năm kinh nghiệm Unity. Đam mê tạo ra trải nghiệm game immersive và giải quyết các thách thức kỹ thuật. Mục tiêu trở thành Senior Fullstack Game Developer.",
    "yearsExperience": "Năm Kinh Nghiệm",
    "projectsCompleted": "Dự Án Hoàn Thành"
  },
  "projects": {
    "title": "Dự Án",
    "featured": "Dự Án Nổi Bật",
    "viewAll": "Xem Tất Cả Dự Án",
    "notFound": "Không Tìm Thấy Dự Án",
    "backToProjects": "Quay Lại Dự Án",
    "overview": "Tổng Quan Dự Án",
    "mainResponsibilities": "Trách Nhiệm Chính",
    "teamSize": "Quy Mô Team",
    "duration": "Thời Gian",
    "platform": "Nền Tảng",
    "features": "Tính Năng Game",
    "inGameFeatures": "Tính năng trong game:",
    "technology": "Công Nghệ Game",
    "designPatterns": "Design Pattern:",
    "technologies": "Công Nghệ:",
    "screenshots": "Ảnh Chụp Màn Hình",
    "description": "Dưới đây là một số game và dự án tôi đã làm việc. Mỗi dự án thể hiện các khía cạnh khác nhau của phát triển game và các thách thức kỹ thuật tôi đã giải quyết."
  },
  "blogs": {
    "title": "Blogs",
    "myBlog": "Blog Của Tôi",
    "viewAll": "Xem Tất Cả Blog",
    "readMore": "Đọc Thêm",
    "notFound": "Không Tìm Thấy Bài Viết",
    "backToBlog": "Quay Lại Blog",
    "moreArticles": "Bài Viết Khác",
    "tags": "Tags:",
    "views": "lượt xem",
    "description": "Những hiểu biết về phát triển game, hướng dẫn kỹ thuật, và hành trình của tôi với tư cách là Unity developer. Học từ các dự án thực tế và best practices trong ngành."
  },
  "techStack": {
    "title": "Tech Stack",
    "programmingLanguages": "Ngôn Ngữ Lập Trình",
    "frameworks": "Công Nghệ & Frameworks",
    "databases": "Cơ Sở Dữ Liệu",
    "tools": "Công Cụ & Khác"
  },
  "contact": {
    "title": "Kết Nối",
    "subtitle": "Với Tôi",
    "description": "Hãy cùng hợp tác và tạo ra điều tuyệt vời",
    "email": "Email",
    "copyright": "Doan Quoc Viet. Mọi quyền được bảo lưu."
  },
  "about": {
    "title": "Về Tôi",
    "subtitle": "Hành trình từ sinh viên đến nhà phát triển game chuyên nghiệp",
    "careerGoal": "Mục Tiêu Nghề Nghiệp",
    "careerGoalText": "Phấn đấu trở thành Senior Fullstack Game Developer trong 4 năm tới, kết hợp chuyên môn sâu về Unity với kỹ năng phát triển backend mạnh mẽ.",
    "workExperience": "Kinh Nghiệm Làm Việc",
    "achievements": "Thành Tựu Chính",
    "education": "Học Vấn",
    "description": "Sinh viên Công nghệ Thông tin năm 4 tại PTIT với niềm đam mê mạnh mẽ về phát triển game. Với 2 năm kinh nghiệm thực tế với Unity Engine, tôi đã đóng góp vào nhiều dự án thương mại từ indie games đến các sản phẩm quy mô lớn.",
    "description2": "Tôi thích giải quyết các thách thức kỹ thuật phức tạp và hợp tác với các team đa chức năng để tạo ra trải nghiệm game chất lượng cao thu hút người chơi."
  },
  "common": {
    "loading": "Đang tải...",
    "error": "Đã có lỗi xảy ra",
    "tryAgain": "Thử lại",
    "year": "năm",
    "month": "tháng",
    "day": "ngày"
  }
}
```

### File: `src/i18n/locales/en.json`

```json
{
  "header": {
    "name": "Doan Quoc Viet",
    "title": "Software Engineering student at PTIT",
    "home": "HOME",
    "projects": "PROJECTS",
    "blogs": "BLOGS",
    "archives": "ARCHIVES",
    "about": "ABOUT",
    "themeDark": "Switch to Light Mode",
    "themeLight": "Switch to Dark Mode",
    "languageSwitch": "Chuyển sang Tiếng Việt"
  },
  "hero": {
    "title": "Unity | Fullstack Game Developer",
    "description": "Fourth-year IT student at PTIT with {{years}}+ years of Unity experience. Passionate about creating immersive gameplay experiences and solving technical challenges. Aiming to become a Senior Fullstack Game Developer.",
    "yearsExperience": "Years Experience",
    "projectsCompleted": "Projects Completed"
  },
  "projects": {
    "title": "Projects",
    "featured": "Featured Projects",
    "viewAll": "View All Projects",
    "notFound": "Project Not Found",
    "backToProjects": "Back to Projects",
    "overview": "Project Overview",
    "mainResponsibilities": "Main Responsibilities",
    "teamSize": "Team Size",
    "duration": "Duration",
    "platform": "Platform",
    "features": "Game Features",
    "inGameFeatures": "In-game Features:",
    "technology": "Game Technology",
    "designPatterns": "Design Pattern:",
    "technologies": "Technologies:",
    "screenshots": "Screenshots",
    "description": "Here are some of the games and projects I've worked on. Each project showcases different aspects of game development and technical challenges I've solved."
  },
  "blogs": {
    "title": "Blogs",
    "myBlog": "My Blog",
    "viewAll": "View All Blogs",
    "readMore": "Read More",
    "notFound": "Blog Post Not Found",
    "backToBlog": "Back to Blog",
    "moreArticles": "More Articles",
    "tags": "Tags:",
    "views": "views",
    "description": "Insights about game development, technical tutorials, and my journey as a Unity developer. Learn from real-world projects and industry best practices."
  },
  "techStack": {
    "title": "Tech Stack",
    "programmingLanguages": "Programming Languages",
    "frameworks": "Technologies & Frameworks",
    "databases": "Databases",
    "tools": "Tools & Other"
  },
  "contact": {
    "title": "Connect",
    "subtitle": "With Me",
    "description": "Let's collaborate and create something amazing together",
    "email": "Email",
    "copyright": "Doan Quoc Viet. All rights reserved."
  },
  "about": {
    "title": "About Me",
    "subtitle": "My journey from student to professional game developer",
    "careerGoal": "Career Goal",
    "careerGoalText": "Aiming to become a Senior Fullstack Game Developer within the next four years, combining deep Unity expertise with robust backend development skills.",
    "workExperience": "Work Experience",
    "achievements": "Key Achievements",
    "education": "Education",
    "description": "Fourth-year Information Technology student at PTIT with a strong passion for game development. With 2 years of hands-on experience in Unity Engine, I've contributed to multiple commercial projects ranging from indie games to large-scale team productions.",
    "description2": "I thrive on solving complex technical challenges and collaborating with cross-functional teams to deliver polished, high-quality gaming experiences that engage players."
  },
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "tryAgain": "Try Again",
    "year": "year",
    "month": "month",
    "day": "day"
  }
}
```

---

## ⚙️ Bước 4: Setup i18n Configuration

### File: `src/i18n/config.js`

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './locales/vi.json';
import en from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en }
    },
    lng: localStorage.getItem('language') || 'vi', // default language
    fallbackLng: 'vi', // fallback language
    interpolation: {
      escapeValue: false // React already escapes by default
    },
    react: {
      useSuspense: false // Disable suspense for now
    }
  });

// Listen for language changes and save to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
```

---

## 🎯 Bước 5: Update ThemeContext

### File: `src/components/context/ThemeContext.jsx`

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const { i18n } = useTranslation();

    // Apply theme to document
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Set language function
    const setLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const value = {
        theme,
        setTheme,
        language: i18n.language,
        setLanguage
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
```

---

## 📦 Bước 6: Update App.jsx

### File: `src/App.jsx`

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ProjectDetail from './components/projects/ProjectDetail.jsx';
import BlogDetail from './components/blogs/BlogDetail.jsx';
import { ThemeProvider } from "./components/context/ThemeContext.jsx";
import './i18n/config'; // Import i18n configuration

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/blogs" element={<BlogPage />} />
                        <Route path="/blogs/:slug" element={<BlogDetail />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;
```

---

## 🔧 Bước 7: Update Components

### Header.jsx

```jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Code, BookOpen, Sun, Moon, Github, Linkedin, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NavButton from './NavButton.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, setTheme, language, setLanguage } = useTheme();
    const { t } = useTranslation();

    const path = location.pathname.split('/')[1] || 'home';

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        const newLang = language === 'vi' ? 'en' : 'vi';
        setLanguage(newLang);
    };

    return (
        <aside className={`fixed left-0 top-0 h-screen w-80 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r flex flex-col shadow-xl`}>
            {/* Profile Section */}
            <div className={`p-8 text-center border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 mb-4">
                    <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center overflow-hidden`}>
                        <img src={"me.jpg"} alt={"avatar"}/>
                    </div>
                </div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {t('header.name')}
                </h1>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} italic`}>
                    {t('header.title')}
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
                <div className="space-y-2">
                    <NavButton
                        onClick={() => navigate('/')}
                        icon={Home}
                        text={t('header.home')}
                        isActive={path === 'home' || path === ''}
                        theme={theme}
                    />
                    <NavButton
                        onClick={() => navigate('/projects')}
                        icon={Code}
                        text={t('header.projects')}
                        isActive={path === 'projects'}
                        theme={theme}
                    />
                    <NavButton
                        onClick={() => navigate('/blogs')}
                        icon={BookOpen}
                        text={t('header.blogs')}
                        isActive={path === 'blogs'}
                        theme={theme}
                    />
                    <NavButton
                        onClick={() => navigate('/archives')}
                        icon={BookOpen}
                        text={t('header.archives')}
                        isActive={path === 'archives'}
                        theme={theme}
                    />
                    <NavButton
                        onClick={() => navigate('/about')}
                        icon={BookOpen}
                        text={t('header.about')}
                        isActive={path === 'about'}
                        theme={theme}
                    />
                </div>
            </nav>

            {/* Social Links & Controls */}
            <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex justify-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors`}
                        title={theme === 'dark' ? t('header.themeDark') : t('header.themeLight')}
                    >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors text-sm font-semibold`}
                        title={t('header.languageSwitch')}
                    >
                        {language === 'vi' ? 'EN' : 'VI'}
                    </button>

                    {/* GitHub */}
                    <a
                        href="https://github.com/vietunitydev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors`}
                        title="GitHub"
                    >
                        <Github size={15} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/doanviet27204/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors`}
                        title="LinkedIn"
                    >
                        <Linkedin size={15} />
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://facebook.com/doanviet.027"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} flex items-center justify-center hover:text-white transition-colors`}
                        title="Facebook"
                    >
                        <Facebook size={15} />
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Header;
```

### HeroSection.jsx

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext.jsx';

const HeroSection = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    
    return (
        <section className="flex items-center justify-center px-6 py-10">
            <div className="max-w-5xl mx-auto text-center">
                {/* Avatar */}
                <div className="mb-8 relative inline-block">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-1 shadow-2xl">
                        <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center overflow-hidden`}>
                            <img src={"me.jpg"} alt={"avatar"}/>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
                
                <h2 className={`text-2xl md:text-1xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mb-6 font-semibold`}>
                    {t('hero.title')}
                </h2>

                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg md:text-1xl leading-relaxed max-w-2xl mx-auto mb-8`}>
                    {t('hero.description', { years: 2 })}
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-8 mb-2 flex-wrap">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400">2+</div>
                        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                            {t('hero.yearsExperience')}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400">10+</div>
                        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                            {t('hero.projectsCompleted')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
```

### ProjectHighlights.jsx

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Users, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext.jsx';

const ProjectHighlights = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useTranslation();

    // ... featured projects data ...

    return (
        <section className="max-w-7xl mx-auto px-20 py-10">
            <div className="text-center mb-16">
                <h2 className={`text-2xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                    {t('projects.featured')}
                </h2>
            </div>

            {/* Projects grid ... */}

            <div className="text-center">
                <button
                    onClick={() => navigate('/projects')}
                    className={`group ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm border-2 border-purple-600 text-purple-400 px-4 py-1.5 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 text-sm font-semibold inline-flex items-center gap-2 shadow-lg`}
                >
                    {t('projects.viewAll')}
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </section>
    );
};

export default ProjectHighlights;
```

---

## 🎨 Bước 8: Pattern sử dụng useTranslation

### 1. Dịch text đơn giản:
```jsx
const { t } = useTranslation();
{t('header.home')}  // → "HOME" hoặc "TRANG CHỦ"
```

### 2. Dịch với biến (Interpolation):
```jsx
{t('hero.description', { years: 2 })}
// vi.json: "...với {{years}}+ năm kinh nghiệm..."
// → "...với 2+ năm kinh nghiệm..."
```

### 3. Dịch với số nhiều (Pluralization):
```json
{
  "items": "{{count}} mục",
  "items_other": "{{count}} mục"
}
```
```jsx
{t('items', { count: 5 })}
```

### 4. Lấy ngôn ngữ hiện tại:
```jsx
const { i18n } = useTranslation();
const currentLanguage = i18n.language; // 'vi' hoặc 'en'
```

### 5. Đổi ngôn ngữ:
```jsx
const { i18n } = useTranslation();
i18n.changeLanguage('en');
```

---

## 📋 Checklist Implementation

### Setup Phase:
- [ ] Install i18next và react-i18next
- [ ] Tạo folder structure (i18n/locales/)
- [ ] Tạo vi.json
- [ ] Tạo en.json
- [ ] Tạo config.js
- [ ] Import config trong App.jsx

### Component Updates:
- [ ] Update ThemeContext với i18n
- [ ] Update Header
- [ ] Update HeroSection
- [ ] Update ProjectHighlights
- [ ] Update BlogPreview
- [ ] Update TechStack
- [ ] Update ContactFooter
- [ ] Update ProjectsPage
- [ ] Update BlogPage
- [ ] Update ProjectDetail
- [ ] Update BlogDetail

### Testing:
- [ ] Test toggle language button
- [ ] Test language persist sau reload
- [ ] Test tất cả text đã được dịch
- [ ] Test với cả 2 themes (dark/light)
- [ ] Test navigation với cả 2 ngôn ngữ

---

## 💡 Best Practices

### 1. Organize translations by feature:
```json
{
  "header": { ... },
  "hero": { ... },
  "projects": { ... },
  "blogs": { ... }
}
```

### 2. Use meaningful keys:
```jsx
// ❌ Bad
{t('text1')}

// ✅ Good
{t('hero.description')}
```

### 3. Keep translations consistent:
```json
// Use same key structure for both languages
// vi.json
{
  "projects.title": "Dự Án"
}

// en.json
{
  "projects.title": "Projects"
}
```

### 4. Use interpolation for dynamic content:
```jsx
// ❌ Bad
{`${name} - ${t('greeting')}`}

// ✅ Good
{t('greeting', { name })}
```

### 5. Lazy load translations nếu cần:
```javascript
// For large apps with many languages
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });
```

---

## 🔍 Debugging Tips

### Check current language:
```jsx
const { i18n } = useTranslation();
console.log('Current language:', i18n.language);
```

### Check if translation exists:
```jsx
const { t } = useTranslation();
console.log(t('header.home', { defaultValue: 'Home' }));
```

### Debug missing translations:
```javascript
i18n.init({
  debug: true, // Enable in development
  // ... other options
});
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Translation không hiển thị
**Solution:** Kiểm tra key có đúng trong JSON file không

### Issue 2: Language không persist
**Solution:** Kiểm tra localStorage và i18n config

### Issue 3: Component không re-render khi đổi ngôn ngữ
**Solution:** Đảm bảo đã dùng useTranslation hook

### Issue 4: Nested object không dịch được
**Solution:** Sử dụng dot notation: `t('projects.title')`

---

## 📊 So sánh Before/After

### Before (Hard-coded):
```jsx
❌ <h1>Doan Quoc Viet</h1>
❌ <button>TRANG CHỦ</button>
❌ const text = language === 'vi' ? 'Trang chủ' : 'Home';
```

### After (i18n):
```jsx
✅ <h1>{t('header.name')}</h1>
✅ <button>{t('header.home')}</button>
✅ <p>{t('hero.description', { years: 2 })}</p>
```

---

## 🎯 Next Steps

### Sau khi implement:
1. ✅ Test thoroughly với cả 2 ngôn ngữ
2. ✅ Add more languages nếu cần (ja, ko, zh...)
3. ✅ Consider TypeScript for type safety
4. ✅ Add translation management tool (i18next-parser)
5. ✅ Setup CI/CD để validate translations

### Advanced Features:
- Context-specific translations
- Namespace support for large apps
- Translation backend API
- Translation memory
- Automated translation workflows

---

## 📚 Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Translation Management Tools](https://locize.com/)

---

**Last Updated:** October 30, 2025  
**Version:** 1.0  
**Status:** ✅ Ready for Implementation