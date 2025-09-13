# ProjectCard Component Usage

## How to Use the ProjectCard Component

The `ProjectCard.astro` component is a reusable card component that integrates with your global brand colors and design system.

### Basic Usage

```astro
---
import ProjectCard from '@components/Cards/ProjectCard.astro';
---

<ProjectCard
  imageUrl="/images/project-example.jpg"
  imageAlt="Project Screenshot"
  tag="Web Application"
  title="E-Commerce Platform"
  description="A modern e-commerce solution built with the latest technologies to deliver exceptional user experiences and drive business growth."
  plusUrl="/projects/ecommerce"
  downloadUrl="/downloads/case-study.pdf"
  copyUrl="https://yoursite.com/projects/ecommerce"
  shareUrl="https://yoursite.com/projects/ecommerce"
/>
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `imageUrl` | string | ✅ | - | URL of the project image |
| `imageAlt` | string | ❌ | "Project Image" | Alt text for the image |
| `tag` | string | ✅ | - | Category/type tag for the project |
| `title` | string | ✅ | - | Project title |
| `description` | string | ✅ | - | Project description |
| `plusUrl` | string | ❌ | "#" | URL for the "open" action |
| `downloadUrl` | string | ❌ | "#" | URL for download action |
| `copyUrl` | string | ❌ | "#" | URL to copy to clipboard |
| `shareUrl` | string | ❌ | "#" | URL for social sharing |
| `className` | string | ❌ | "" | Additional CSS classes |

### Features

- **Responsive Design**: Adapts to mobile and desktop layouts
- **Global Brand Colors**: Uses your design system variables
- **Interactive Actions**: Download, copy link, and social sharing
- **Glassmorphic Design**: Modern transparent background effect
- **Hover Effects**: Smooth animations and state changes

### Integration with Brand Colors

The component automatically uses these design system variables:

- `--color-primary` - Tag background and button hover states
- `--color-secondary` - Title and button text color
- `--color-background` - Image container background
- `--color-text-primary` - Description text
- `--color-white` - Tag text and button hover text
- `--radius-lg` - Border radius for rounded corners
- `--shadow-lg`, `--shadow-xl` - Drop shadows
- `--transition-base` - Smooth transitions

### Example in a Page

```astro
---
// src/pages/projects.astro
import Layout from '@layouts/Layout.astro';
import ProjectCard from '@components/Cards/ProjectCard.astro';
---

<Layout title="Projects">
  <main>
    <section class="projects-grid">
      <ProjectCard
        imageUrl="/images/project-1.jpg"
        tag="E-Commerce"
        title="Online Store Platform"
        description="Revolutionary shopping experience with advanced search, personalized recommendations, and seamless checkout process."
        plusUrl="/projects/store"
        downloadUrl="/assets/store-case-study.pdf"
        copyUrl="https://yoursite.com/projects/store"
        shareUrl="https://yoursite.com/projects/store"
      />

      <ProjectCard
        imageUrl="/images/project-2.jpg"
        tag="Mobile App"
        title="Fitness Tracking App"
        description="Comprehensive fitness solution with workout tracking, nutrition planning, and community features."
        plusUrl="/projects/fitness"
        copyUrl="https://yoursite.com/projects/fitness"
        shareUrl="https://yoursite.com/projects/fitness"
      />
    </section>
  </main>
</Layout>

<style>
  .projects-grid {
    display: grid;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
```

### Customization

You can customize the component's appearance by:

1. **Updating Brand Colors**: Modify variables in `src/styles/tokens/variables.css`
2. **Adding Custom Classes**: Use the `className` prop
3. **Overriding Styles**: Create specific CSS rules that target the component

This component is fully integrated with your design system and will automatically adapt to any brand color changes you make in your configuration.