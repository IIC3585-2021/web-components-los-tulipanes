const template = document.createElement("template");
template.innerHTML = `
  <style>
    h3 {
        color: red;
    }
  </style>
  <div class="todo-item">
    <p class="todo-item-text">HOLA</p>
    <button class='delete-todo'>delete</button>
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