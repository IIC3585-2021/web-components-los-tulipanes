// const styles = `
// h1 {
//   color: #ff6d39;
// }
// `;

// const sheet = new CSSStyleSheet();
// sheet.replaceSync(styles);


const template = document.createElement("template");
template.innerHTML = /*html*/ `
<div class="card">
  <img src="https://www.dropbox.com/s/e928cht0h5crcn4/shoe.png?raw=1" alt="shoe">
</div>
<div class="right">
  <div class="product-info">
    <div class="details">
      <h3>Temporada Verano</h3>
      <h2 id="title"></h2>
      <h2 id="discount"></h2>
      <h1 id="discount-price"></h1>
      <h4 class="dis">Normal: <span id="normal-price" class="dis">$50.000</span></h4>
    </div>
    <h4 class="rating">Rating: &#11088;<span id="star-rating"></span>
  </div>
</div>
`;


class todoList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 'holi'
    // this.attachShadow({ mode: "open" });
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
    // this.shadowRoot.adoptedStyleSheets = [sheet];

    // const sheet = new CSSStyleSheet();
    // sheet.replaceSync(styles);
  }

  static get observedAttributes() {
    // Retornamos listas con los atributos que queremos observar.
    return ["title", "discount", "star-rating"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      // Cambiamos el contenido del tag con id 'title' en el shadow DOM.
      this.shadowRoot.querySelector("#title").textContent = newValue;
    } else if (name === "discount") {
      this.shadowRoot.querySelector("#discount").textContent = `-${newValue}%`;
      const discount = (100 - newValue) / 100;
      const normalPrice = parseInt(
        this.shadowRoot
          .querySelector("#normal-price")
          .textContent.replace(/[^0-9,-]+/g, "")
      );
      const newPrice = (normalPrice * discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      this.shadowRoot.querySelector("#discount-price").textContent = `$${newPrice}`;
    } else if (name === "star-rating") {
      this.shadowRoot.querySelector("#star-rating").textContent = newValue;
    }
  }
}

window.customElements.define('todo-list', todoList);