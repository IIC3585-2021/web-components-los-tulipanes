import { customElement, html, LitElement, property } from 'lit-element';

export class TodoItem extends LitElement {
  @property() title: string = '';

  @property({ type: Function }) callback: () => void = () => {};

  render() {
    return html` <div style="color:blue; display:inline-block">
      <h3 style="font-family: 'Courier New', monospace;
      ">${this.title}</h3>
      <div style="display: flex; align-items: right">
        <button style="background-color: #f44336;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;"
        @click=${this.callback}>Remove</button>
      </div>
    </div>`;
  }
}
