/* eslint-disable unicorn/prefer-dom-node-remove */
/* eslint-disable unicorn/prefer-dom-node-append */
export const itIsSupportsSafeJustifyContent = (() => {
  if (typeof window === 'undefined') {
    return true
  }
  // Create parent and child elements
  const parent = document.createElement('div')
  const child = document.createElement('div')

  // Style the parent element
  parent.style.boxSizing = 'border-box'
  parent.style.background = 'red'
  parent.style.display = 'flex'
  parent.style.flexFlow = 'column'
  parent.style.justifyContent = 'safe center'
  parent.style.overflow = 'auto'
  parent.style.width = '100px'
  parent.style.height = '100px'
  parent.style.position = 'fixed'
  parent.style.top = '-100px'
  parent.style.left = '0'
  parent.style.visibility = 'hidden' // Make it invisible but still render

  // Style the child element
  child.style.background = 'blue'
  child.style.flex = '0 0 auto'
  child.style.boxSizing = 'border-box'
  child.style.width = '200px'
  child.style.height = '200px'

  // Append child to parent
  parent.appendChild(child)
  document.body.appendChild(parent)

  // Check if the child is centered within the parent
  const parentRect = parent.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()

  // Should be true
  const childAtTop = childRect.y === parentRect.y

  // Clean up
  document.body.removeChild(parent)

  return childAtTop
})()
