/**
 * @file
 * Forecast shadow bookings.
 */

'use strict'

class Shadow {
  constructor (domNode) {
    this.buttons = []
    this.domNode = domNode
    this.tag = '@shadow'
  }

  setShadows (nodes) {
    let i = 0
    const interval = setInterval(() => {
      if (i === nodes.length) {
        clearInterval(interval)
        return
      }

      const node = nodes[i++]
      const icon = node.querySelector('.icon')
      icon.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
      if (this.domNode.querySelector('.tooltip').textContent.toLowerCase().includes(this.tag)) {
        node.classList.add('shadow-booking')
        node.classList.remove('gray', 'orange', 'red', 'green', 'aqua', 'blue', 'purple', 'magenta')
      }
      icon.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
    }, 100)
  }

  updateListener () {
    this.setShadows(document.querySelectorAll('.has-notes'))
  }

  addUpdateListeners (buttons) {
    buttons.forEach(button => {
      if (!this.buttons.includes(button)) {
        this.buttons.push(button)
        button.addEventListener('click', this.updateListener.bind(this))
      }
    })
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

      const buttons = mutations.filter((mutation) => {
        return mutation.type === 'childList' && [...mutation.target.classList].includes('test-submit')
      }).reduce((buttons, mutation) => {
        buttons.push(mutation.target)
        return buttons
      }, [])
      this.addUpdateListeners(buttons)
    }).observe(this.domNode, {
      childList: true,
      subtree: true
    })
  }
}

const shadowBookings = new Shadow(document.body)
shadowBookings.observe()
