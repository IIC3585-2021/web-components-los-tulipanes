const template = document.createElement("template");
template.innerHTML = `
  <style>
    h3 {
        color: red;
    }

    .todo-item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0.5rem 2rem;
    }

    .delete-todo {
      background-color: #f44336;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      font-size: 2rem;
      font-weight: bold;
      padding: 0em 1em;
      margin-right: 2em;
    }
    
  </style>
  <div class="todo-item">
    <p class="todo-item-text">HOLA</p>
    <button class='delete-todo'>-</button>
  </div>
`;

class todoItem extends HTMLElement {
    constructor() {
      super();
      this._text = ''
      this._root = this.attachShadow({ 'mode': 'open' });
      console.log(this)
    }

    connectedCallback() {
        console.log(this)
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.$item = this.shadowRoot.querySelector('.todo-item');
        this.$removeButton = this.shadowRoot.querySelector('.delete-todo');
        this.$text = this.shadowRoot.querySelector('.todo-item-text');
        this.$removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
        });
        
        this._render();
    }

    static get observedAttributes() {
        return ['text'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this._text = newValue;
    }

    set index(value) {
        this._index = value;
    }

    get index() {
        return this._index;
    }

    _render() {
        console.log(this)
        if (!this.$item) return;
        this.$text.textContent = this._text;
    }
}

window.customElements.define('todo-item', todoItem);