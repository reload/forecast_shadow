/**
 * @file
 * Forecast shadow bookings.
 */

'use strict';

class Shadow {
  constructor(domNode) {
    this.domNode = domNode;
  }

  // Throttling to prevent event mayhem.
  throttle(callback, wait, context = this) {
    let timeout = null;
    let callbackArgs = null;

    const later = () => {
      callback.apply(context, callbackArgs);
      timeout = null;
    }

    return () => {
      if (!timeout) {
        callbackArgs = arguments;
        timeout = setTimeout(later, wait);
      }
    }
  }

  // Find and alter shadow bookings.
  doShadows() {
    const forecastUrl = 'forecastapp.com';
    const bodyClasses = document.querySelector('body').className;
    const checkClass = new RegExp('ember-application');
    const isApp = checkClass.test(bodyClasses);
    if (isApp && (window.location.href.indexOf(forecastUrl) > -1)) {
      const assignments = document.querySelectorAll('.ember-view.assignment.has-notes');
      if (assignments.length > 0) {
        assignments.forEach((assignment) => {
          assignment.classList.remove('gray', 'orange', 'red', 'green', 'aqua', 'blue', 'purple', 'magenta');
          assignment.classList.add('gray');
        });
      }
    }
  }

  // Check for dom changes.
  observe() {
    const targetNode = this.domNode;
    const observerConfig = {
      attributes: false,
      childList: true,
      characterData: true,
      subtree: true,
    };
    const self = this;
    return new Promise((resolve) => {
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach((mutation) => {
          self.doShadows();
        });
        resolve(mutations);
      });
      observer.observe(targetNode, observerConfig);
    });
  }
}

// Start observing.
const shadowBookings = new Shadow(document.body);
shadowBookings.observe();
