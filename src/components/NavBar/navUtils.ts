export function isActive(href: string, currentPath: string): boolean {
  // Handle external links
  if (href.startsWith('http')) {
    return false;
  }

  // Exact match for root path
  if (href === '/' && currentPath === '/') {
    return true;
  }

  // For non-root paths, match exactly (no trailing slash normalization needed for Astro)
  if (href !== '/' && currentPath === href) {
    return true;
  }

  return false;
}