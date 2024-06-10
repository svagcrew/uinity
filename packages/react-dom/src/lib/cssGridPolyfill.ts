if (typeof window !== 'undefined') {
  const supportsGrids = 'grid' in document.documentElement.style
  if (!supportsGrids) {
    // @ts-expect-error no types
    import(`https://cdn.jsdelivr.net/gh/FremyCompany/css-grid-polyfill@1.1.0/bin/css-polyfills.min.js`)
  }
}

export {}
