#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

async function getSearchableContent() {
  const searchData = [];

  try {
    // 1. Scan for Astro pages (excluding API routes and search-results)
    const pageFiles = await glob('src/pages/**/*.astro');

    for (const filePath of pageFiles) {
      if (filePath.includes('/api/') || filePath.includes('search-results')) continue;

      try {
        const fullPath = path.resolve(filePath);
        const content = await fs.promises.readFile(fullPath, 'utf-8');
        const fileName = path.basename(filePath, '.astro');

        // Extract frontmatter (basic parsing)
        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
        let title = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        let description = '';
        let tags = [];

        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];

          const titleMatch = frontmatter.match(/title:\s*['\"]([^'\"]+)['\"]/);
          if (titleMatch) title = titleMatch[1];

          const descMatch = frontmatter.match(/description:\s*['\"]([^'\"]+)['\"]/);
          if (descMatch) description = descMatch[1];

          const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
          if (tagsMatch) {
            tags = tagsMatch[1].split(',').map(tag => tag.trim().replace(/['\"]/g, ''));
          }
        }

        const textContent = content
          .replace(/---[\s\S]*?---/, '')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\{[^}]*\}/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        let url = filePath
          .replace(/^src[\/\\]pages[\/\\]/, '')
          .replace(/\.astro$/, '')
          .replace(/[\/\\]index$/, '')
          .replace(/\\/g, '/');

        if (!url.startsWith('/')) {
          url = '/' + url;
        }

        if (url === '/index' || url === '/') {
          url = '/';
        }

        searchData.push({
          title,
          description: description || `Learn more about ${title.toLowerCase()}`,
          content: textContent.substring(0, 500),
          category: 'pages',
          url,
          date: 'Updated recently',
          tags: tags.length > 0 ? tags : [fileName, 'page'],
          type: 'page'
        });
      } catch (error) {
        console.warn(`Could not process page: ${filePath}`, error);
      }
    }

    // 2. Scan for Markdown content (if any)
    const mdFiles = await glob('src/content/**/*.md');
    for (const filePath of mdFiles) {
      try {
        const fullPath = path.resolve(filePath);
        const content = await fs.promises.readFile(fullPath, 'utf-8');

        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
        let title = path.basename(filePath, '.md');
        let description = '';
        let tags = [];
        let publishDate = 'Recently';

        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];

          const titleMatch = frontmatter.match(/title:\s*['\"]([^'\"]+)['\"]/);
          if (titleMatch) title = titleMatch[1];

          const descMatch = frontmatter.match(/description:\s*['\"]([^'\"]+)['\"]/);
          if (descMatch) description = descMatch[1];

          const dateMatch = frontmatter.match(/date:\s*['\"]?([^'\"]+)['\"]?/);
          if (dateMatch) publishDate = dateMatch[1];

          const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
          if (tagsMatch) {
            tags = tagsMatch[1].split(',').map(tag => tag.trim().replace(/['\"]/g, ''));
          }
        }

        const textContent = content
          .replace(/---[\s\S]*?---/, '')
          .replace(/[#*`]/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        const url = path.basename(filePath, '.md');

        searchData.push({
          title,
          description: description || textContent.substring(0, 150),
          content: textContent.substring(0, 500),
          category: 'blog',
          url,
          date: publishDate,
          tags: tags.length > 0 ? tags : ['blog', 'post'],
          type: 'blog'
        });
      } catch (error) {
        console.warn(`Could not process markdown: ${filePath}`, error);
      }
    }

    // 3. Add manual high-value pages
    const manualPages = [
      {
        title: 'Search Results',
        description: 'Find anything on our website with powerful search functionality',
        content: 'search results find discover explore website content',
        category: 'pages',
        url: '/search-results',
        date: 'Updated recently',
        tags: ['search', 'results', 'find', 'discover'],
        type: 'page'
      }
    ];

    searchData.push(...manualPages);
  } catch (error) {
    console.error('Error scanning content:', error);
  }

  return searchData;
}

async function buildIndex() {
  const data = await getSearchableContent();
  const outPath = path.resolve('src', 'search-index.json');
  await fs.promises.writeFile(outPath, JSON.stringify(data, null, 2));
  console.log(`Search index generated with ${data.length} entries.`);
}

buildIndex();
