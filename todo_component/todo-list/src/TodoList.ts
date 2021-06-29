import { html, css, LitElement, property, state } from 'lit-element';

export class TodoList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--todo-list-text-color, #000);
    }
  `;

  @property({ type: [String] }) todos: string[] = [];
  @property() input: string = '';

  onClick(e: Event) {
    e.preventDefault();
    this.todos.push(this.input);
    this.input = '';
  }

  handleChange(e: { target: { value: string } }) {
    this.input = e.target.value;
  }

  removeItem(index: number) {
    this.todos.splice(index, 1);
    this.requestUpdate();
  }

  render() {
    return html`
      <h1 style="font-family: 'Courier New', monospace;">Lit Todo List!</h1>
      <ul style="padding: 5px;">
        ${this.todos.map((todo, index) => {
          return html`<todo-item
            .title=${todo}
            .callback=${() => this.removeItem.bind(this)(index)}
          ></todo-item>`;
        })}
      </ul>
      <form>
        <input style="padding: 5px; font-size: 16px;" type="text" .value=${this.input} @input=${this.handleChange} />
        <button style="background-color: #4CAF50;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        align-items: end;"
        @click=${this.onClick}>Ingresar</button>
      </form>
    `;
  }
}
