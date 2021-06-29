import { customElement, html, LitElement, property } from 'lit-element';

export class TodoItem extends LitElement {
  @property() title: string = '';

  @property({ type: Function }) callback: () => void = () => {};

  render() {
    return html` <div>
      <h4>${this.title}</h4>
      <button @click=${this.callback}>Remove</button>
    </div>`;
  }
}
