if (typeof window !== 'undefined') {
  const supportsContainerQueries = 'container' in document.documentElement.style
  if (!supportsContainerQueries) {
    // @ts-expect-error no types
    import(`https://cdn.jsdelivr.net/npm/container-query-polyfill@1/dist/container-query-polyfill.modern.js`)
  }
}

export {}
