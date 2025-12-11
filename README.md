# Daniel Oriazowan - Senior Frontend Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

## 🚀 A Decade-Defining Portfolio

This is not just another portfolio website—it's a **masterpiece of modern web engineering**, meticulously crafted to showcase 15+ years of frontend excellence. Every pixel, every animation, every interaction has been designed and engineered to perfection.

### ✨ Features

#### 🎨 **Design Excellence (The "Architect" Update)**
- **High-End Editorial Layouts**: Asymmetrical grid systems and massive typography
- **Smooth Scrolling**: Implemented `lenis` for weighted, premium scroll feel
- **Parallax Galleries**: Sticky-stacking project cards for immersive storytelling
- **Ambient Depth**: Computed noise textures and fluid gradient blobs
- **Cinematic Motion**: Complex Framer Motion sequences with scroll-driven transforms
- **Responsive Design**: Perfect on all devices from mobile to 4K displays
- **Modern Typography**: Space Grotesk (Display) & Inter (Body) hierarchy

#### ⚡ **Performance**
- **Core Web Vitals Optimized**: LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Hardware Acceleration**: CSS transforms optimized for GPU
- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic route-based code splitting
- **SEO Perfect Score**: Comprehensive meta tags, Open Graph, and structured data

#### 🛠️ **Technical Excellence**
- **Type Safety**: 100% TypeScript with strict mode
- **Component Architecture**: Reusable, maintainable component library
- **Accessibility**: WCAG AA compliant with semantic HTML
- **Analytics**: Vercel Analytics and Speed Insights integrated
- **Modern Stack**: Latest Next.js 16 with App Router

### 🏗️ **Architecture**

```
daniel-orz/
├── app/
│   ├── layout.tsx          # Root layout with SEO & fonts
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles & utilities
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── magnetic-button.tsx
│   │   ├── reveal-text.tsx
│   │   ├── bento-card.tsx
│   │   ├── glass-card.tsx
│   │   └── skill-badge.tsx
│   ├── sections/           # Page sections
│   │   ├── navigation.tsx
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── experience-section.tsx
│   │   └── contact-section.tsx
│   └── providers/
│       └── theme-provider.tsx
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

### 📦 **Tech Stack**

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4.0, Custom CSS Variables |
| **Animation** | Framer Motion |
| **Font Loading** | Next/Font with Google Fonts |
| **Analytics** | Vercel Analytics & Speed Insights |
| **Theme** | next-themes |
| **Icons** | Lucide React |

### 🚀 **Getting Started**

#### Prerequisites
- Node.js 18+ and npm/yarn
- Git

#### Installation

```bash
# Clone the repository
git clone https://github.com/danieloriazowan/portfolio.git

# Navigate to project
cd daniel-orz

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

#### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

### 🎯 **Key Sections**

1. **Hero Section**: Dynamic introduction with animated gradients and professional image
2. **About Section**: Comprehensive skills showcase with bento grid and stats
3. **Projects Section**: Featured case studies with hover interactions and tech stacks
4. **Experience Section**: Detailed work history with achievements
5. **Testimonials Section**: Social proof from industry leaders
6. **Contact Section**: Multiple contact methods and compelling CTA

### 🔧 **Customization**

#### Updating Personal Information

1. **Contact Details**: Edit `components/sections/hero-section.tsx` and `components/sections/contact-section.tsx`
2. **Experience**: Modify the `experiences` array in `components/sections/experience-section.tsx`
3. **Skills**: Update skill arrays in `components/sections/about-section.tsx`
4. **SEO Metadata**: Edit `app/layout.tsx` metadata

#### Changing Colors

The design system uses CSS variables. Edit `app/globals.css`:

```css
:root {
  --primary: 199 89% 48%;      /* Blue */
  --secondary: 271 91% 65%;    /* Purple */
  --accent: 25 95% 53%;        /* Orange */
}
```

#### Adding Animations

Use Framer Motion for consistent animations:

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Your content
</motion.div>
```

### 📱 **Responsive Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **4K**: > 1440px

### 🌐 **Deployment**

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### 📊 **Performance Metrics**

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Speed Index**: < 2.5s

### 🎨 **Design Highlights**

- **Glassmorphism**: Frosted glass effect on cards
- **Bento Grids**: Modern content organization
- **Gradient Text**: Eye-catching animated gradients
- **Magnetic Buttons**: Interactive hover effects
- **Reveal Animations**: Staggered text animations
- **Mesh Gradients**: Dynamic background patterns

### 🔒 **SEO & Performance**

- ✅ Schema.org structured data (Person schema)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Semantic HTML5
- ✅ Optimized images with Next/Image
- ✅ Sitemap.xml (auto-generated)
- ✅ robots.txt
- ✅ Core Web Vitals optimized

### 📄 **License**

© 2025 Daniel Oriazowan. All rights reserved.

### 🤝 **Contact**

- **Email**: doriazowan@gmail.com
- **Phone**: +234 802 638 1777
- **LinkedIn**: [Daniel Oriazowan](https://linkedin.com/in/daniel-oriazowan)
- **GitHub**: [@danieloriazowan](https://github.com/danieloriazowan)

---

**Built with** ❤️ **using Next.js, TypeScript, Tailwind CSS & Framer Motion**

**Crafted to impress** 🚀 **the biggest companies in the world**
