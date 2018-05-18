/**
 * @file
 * Forecast shadow bookings.
 */

'use strict'

class Shadow {
  constructor (domNode) {
    this.domNode = domNode
    this.tag = '@shadow'
  }

  setShadows (nodes) {
    for (let node of nodes) {
      const icon = node.querySelector('.icon')
      icon.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
      if (this.domNode.querySelector('.tooltip').textContent.toLowerCase().includes(this.tag)) {
        node.classList.add('shadow-booking')
        node.classList.remove('gray', 'orange', 'red', 'green', 'aqua', 'blue', 'purple', 'magenta')
      }
      icon.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
    }
  }

  observe () {
    new MutationObserver((mutations) => {
      const nodes = mutations.filter((mutation) => {
        return mutation.type === 'childList' && [...mutation.target.classList].includes('has-notes')
      }).reduce((nodes, mutation) => {
        nodes.push(mutation.target)
        return nodes
      }, [])
      this.setShadows(nodes)
    }).observe(this.domNode, {
      childList: true,
      subtree: true
    })
  }
}

const shadowBookings = new Shadow(document.body)
shadowBookings.observe()
