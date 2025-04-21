# Dito's Bartender - Professional Mobile Bartending Services

<p align="center">
  <img src="public/favicon.svg" alt="Dito's Bartender Logo" width="150" height="150">
</p>

<p align="center">
  <a href="https://ditosbartender.vercel.app">Live Site</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#seo-optimization">SEO</a> •
  <a href="#license">License</a>
</p>

## Overview

Dito's Bartender offers premium mobile bartending services for all types of events in Dunedin, FL and surrounding areas. Specializing in custom cocktails, themed bars, and unique experiences, we provide professional bartending services for weddings, corporate events, private parties, and more.

This repository contains the code for the official Dito's Bartender website, built with modern web technologies for optimal performance, SEO, and user experience.

## Features

- 🍹 Comprehensive showcase of mobile bartending services
- 🖼️ Dynamic gallery of past events and signature drinks
- 📱 Fully responsive design for all device sizes
- ✉️ Integrated contact form with instant email notifications
- 🔍 SEO-optimized for improved search engine visibility
- 🌐 Social media integration and sharing capabilities
- 🚀 High-performance architecture with optimized assets
- 📊 Analytics integration for visitor tracking

## Tech Stack

This website is built with the following technologies:

- **Framework**: [Astro](https://astro.build/) - Fast static site generation with minimal JavaScript
- **UI Components**: [React](https://reactjs.org/) - For interactive UI components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Astro Icon](https://github.com/natemoo-re/astro-icon) - Easy icon integration
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) validation
- **Email Service**: [EmailJS](https://www.emailjs.com/) - Client-side email sending
- **Analytics**: Google Analytics 4
- **SEO**: Custom meta tags, structured data, and sitemap generation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (preferred) or npm

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/thejasondev/ditos-bartender.git
   cd ditos-bartender
   ```

2. Install dependencies

   ```sh
   pnpm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   PUBLIC_GA_MEASUREMENT_ID=your_ga_id
   ```

4. Start the development server

   ```sh
   pnpm dev
   ```

5. Open your browser and visit `http://localhost:4321`

## Project Structure

```
/
├── public/             # Static assets
│   ├── favicon/        # Favicon files
│   ├── images/         # Image assets
│   └── videos/         # Video assets
├── src/
│   ├── assets/         # Optimized assets
│   ├── components/     # Reusable UI components
│   │   └── home/       # Homepage-specific components
│   ├── layouts/        # Layout templates
│   ├── pages/          # Page routes
│   ├── styles/         # Global styles
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript types
└── package.json
```

## Available Commands

| Command            | Description                       |
| ------------------ | --------------------------------- |
| `pnpm dev`         | Starts the development server     |
| `pnpm build`       | Builds the production site        |
| `pnpm preview`     | Previews the build locally        |
| `pnpm lighthouse`  | Runs Lighthouse performance tests |
| `pnpm check-links` | Checks for broken links           |
| `pnpm analyze`     | Analyzes bundle size              |

## Deployment

This website is deployed on [Vercel](https://vercel.com/) with continuous deployment from the main branch. Every push to the main branch will trigger a new build and deployment.

### Environment Variables

Ensure the following environment variables are set in your Vercel project settings:

- `PUBLIC_EMAILJS_SERVICE_ID`
- `PUBLIC_EMAILJS_TEMPLATE_ID`
- `PUBLIC_EMAILJS_PUBLIC_KEY`
- `PUBLIC_GA_MEASUREMENT_ID`

## SEO Optimization

The website implements best practices for SEO, including:

- Semantic HTML structure
- Optimized meta tags and descriptions
- Open Graph and Twitter Card integration
- Structured data with Schema.org markup
- XML sitemap generation
- Optimized images with proper alt texts
- Responsive design for all devices
- Google Search Console and Analytics integration

## Browser Support

The website supports the following browsers:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## License

© 2025 Dito's Bartender. All rights reserved.

## Contact

For inquiries about the website, please contact the development team at [thejasondev@cloud.com](mailto:thejasondev@icloud.com).

For business inquiries, please contact Dito's Bartender at [ditosbartender@gmail.com](mailto:ditosbartender@gmail.com).

---

<p align="center">
  Made by <a href="https://thejasondev.vercel.app">Jason Guerra</a>
</p>