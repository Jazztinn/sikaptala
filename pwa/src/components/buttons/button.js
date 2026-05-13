/**
 * Button Component
 * Handles button initialization and interactions
 */

export class Button {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.element.addEventListener('click', (e) => {
      this.handleClick(e);
    });

    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.element.click();
      }
    });
  }

  handleClick(event) {
    // Add ripple effect
    this.createRipple(event);

    // Emit custom event
    const clickEvent = new CustomEvent('btn:click', {
      detail: { element: this.element },
      bubbles: true,
      cancelable: true
    });
    this.element.dispatchEvent(clickEvent);
  }

  createRipple(event) {
    const circle = document.createElement('span');
    const diameter = Math.max(this.element.clientWidth, this.element.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = event.clientX - this.element.offsetLeft - radius + 'px';
    circle.style.top = event.clientY - this.element.offsetTop - radius + 'px';
    circle.classList.add('ripple');

    const ripple = this.element.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }

    this.element.appendChild(circle);
  }

  disable() {
    this.element.disabled = true;
    this.element.setAttribute('aria-disabled', 'true');
  }

  enable() {
    this.element.disabled = false;
    this.element.setAttribute('aria-disabled', 'false');
  }

  setText(text) {
    const label = this.element.querySelector('.btn-label');
    if (label) {
      label.textContent = text;
    }
  }

  setText(text) {
    const label = this.element.querySelector('.btn-label');
    if (label) {
      label.textContent = text;
    }
  }

  getText() {
    const label = this.element.querySelector('.btn-label');
    return label ? label.textContent : '';
  }

  isDisabled() {
    return this.element.disabled;
  }
}

/**
 * Initialize all buttons on the page
 */
export function initButtons() {
  const buttons = document.querySelectorAll('[data-component="button"]');
  buttons.forEach((btn) => new Button(btn));
}
