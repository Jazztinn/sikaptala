/**
 * Card Component
 * Handles card initialization and interactions
 */

export class Card {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.setupAccessibility();
  }

  setupAccessibility() {
    // Ensure card has proper role if interactive
    if (!this.element.getAttribute('role')) {
      this.element.setAttribute('role', 'region');
    }
  }

  getTitle() {
    const titleElement = this.element.querySelector('.card-title');
    return titleElement ? titleElement.textContent : '';
  }

  setTitle(title) {
    const titleElement = this.element.querySelector('.card-title');
    if (titleElement) {
      titleElement.textContent = title;
    }
  }

  getContent() {
    const bodyElement = this.element.querySelector('.card-body');
    return bodyElement ? bodyElement.innerHTML : '';
  }

  setContent(html) {
    const bodyElement = this.element.querySelector('.card-body');
    if (bodyElement) {
      bodyElement.innerHTML = html;
    }
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }

  remove() {
    this.element.remove();
  }
}

/**
 * Initialize all cards on the page
 */
export function initCards() {
  const cards = document.querySelectorAll('[data-component="card"]');
  cards.forEach((card) => new Card(card));
}
