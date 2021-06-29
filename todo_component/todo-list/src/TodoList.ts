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
      <h2>Lit Todo List!</h2>
      <ul>
        ${this.todos.map((todo, index) => {
          return html`<todo-item
            .title=${todo}
            .callback=${() => this.removeItem.bind(this)(index)}
          ></todo-item>`;
        })}
      </ul>
      <form>
        <input type="text" .value=${this.input} @input=${this.handleChange} />
        <button @click=${this.onClick}>Ingresar</button>
      </form>
    `;
  }
}
