// const styles = `
// h1 {
//   color: #ff6d39;
// }
// `;

// const sheet = new CSSStyleSheet();
// sheet.replaceSync(styles);

const template = document.createElement("template");
template.innerHTML = `
  <style>
    h3 {
      color: coral;
    }
  </style>
  <div class="todo-list">
    <h1>TODO</h1>
    <h3></h3>
    <ul id="list-container"></ul>
    <form>
      <input id="todoInput" type="text" />
      <button id='newTodo'></button>
    </form>
  </div>
`;


class todoList extends HTMLElement {
  constructor() {
    super();
    this._list = []
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('name');

  }

    addTodo(e) {
      e.preventDefault()
      const input = this.shadowRoot.querySelector('#todoInput')
      this._list.push(input.value);
      input.value = ""
      this._render()
    }

    connectedCallback() {
      this.shadowRoot.querySelector('#newTodo').addEventListener('click', (e) => this.addTodo(e))
      this.$listContainer = this.shadowRoot.querySelector('#list-container');
      const input = this.shadowRoot.querySelector('#todoInput')
      input.addEventListener('onSubmit', this.addItem.bind(this));
      this._render();
    }
    
    addItem(e) {
      this._list.push({ text: e.detail, checked: false, });
      this._render();
    }

    removeItem(e) {
      this._list.splice(e.detail, 1);
      this._render();
    }

    _render() {
      if (!this.$listContainer) return;
      this.$listContainer.innerHTML = '';
      console.log(this._list)
      this._list.forEach((item, index) => {
        let $item = document.createElement('todo-item');
        $item.setAttribute('text', item);
        $item.index = index;
        $item.addEventListener('onRemove', this.removeItem.bind(this));
        this.$listContainer.appendChild($item);
      });
  }
}

window.customElements.define('todo-list', todoList);

//   static get observedAttributes() {
//     // Retornamos listas con los atributos que queremos observar.
//     return ["title", "discount", "star-rating"];
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     if (name === "title") {
//       // Cambiamos el contenido del tag con id 'title' en el shadow DOM.
//       this.shadowRoot.querySelector("#title").textContent = newValue;
//     } else if (name === "discount") {
//       this.shadowRoot.querySelector("#discount").textContent = `-${newValue}%`;
//       const discount = (100 - newValue) / 100;
//       const normalPrice = parseInt(
//         this.shadowRoot
//           .querySelector("#normal-price")
//           .textContent.replace(/[^0-9,-]+/g, "")
//       );
//       const newPrice = (normalPrice * discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
//       this.shadowRoot.querySelector("#discount-price").textContent = `$${newPrice}`;
//     } else if (name === "star-rating") {
//       this.shadowRoot.querySelector("#star-rating").textContent = newValue;
//     }
//   }
// }

