import { css, customElement, html, LitElement, property } from 'lit-element';

export class TodoItem extends LitElement {
  static styles = css`
    .todo-button-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 0.5rem 2rem;
    }

    h3 {
      font-family: 'Courier New', monospace;
    }

    .todo-button {
      background-color: #f44336;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      font-size: 2rem;
      font-weight: bold;
      padding: 0em 1em;
    }
  `;

  @property() title: string = '';

  @property({ type: Function }) callback: () => void = () => {};

  render() {
    return html` <div class="todo-button-container">
      <h3>${this.title}</h3>
      <button class="todo-button" @click=${this.callback}>-</button>
    </div>`;
  }
}
