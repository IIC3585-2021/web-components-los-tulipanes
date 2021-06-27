const styles = /*css*/ `
h1 {
  color: #ff6d39;
  font-family: "muli";
  font-weight: bold;
  font-size: 35px;
  margin: 0;
}

h3 {
  color: #ffffff;
  font-family: "muli";
  margin-top: 84px;
  font-size: 20px;
  font-weight: 500;
}

h2 {
  display: inline-block;
  color: #ffffff;
  font-family: "muli";
  margin-top: 0;
  font-weight: 800;
  font-size: 29px;
}

h4 {
  display: inline-block;
  color: #ffffff;
  font-family: "muli";
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
}

h4.dis {
  display: inline-block;
  color: #ffffff;
  font-family: "muli";
  font-weight: 400;
  margin-top: 0px;
  font-size: 17px;
}

span.dis {
  display: inline-block;
  color: #ffffff;
  font-family: "muli";
  font-weight: 400;
  font-size: 17px;
  text-decoration: line-through #ea3201;
}

#discount {
  /* Aca poner el descuento */
  display: inline-block;
  margin: 0 0 0 10px;
  float: right;
  padding: 3px;
  font-size: 15px;
  background-color: #ff6d39;
  border-radius: 3px;
}

.foot {
  color: #ffffff;
  font-family: "muli";
  margin-top: 10px;
  margin-right: 50px;
  font-weight: 500;
  font-size: 20px;
  float: left;
  transition: 0.3s all ease;
}

#star-rating {
  color: #ffffff;
  font-family: "muli";
  margin-top: 20px;
  margin-right: 50px;
  font-weight: 500;
  font-size: 20px;
  transition: 0.3s all ease;
}

h4.rating {
  display: inline-block;
  color: #ffffff;
  font-family: "muli";
  margin-top: 20px;
  margin-right: 50px;
  font-weight: 500;
  font-size: 20px;
  float: left;
  transition: 0.3s all ease;
}

.foot i:nth-child(1) {
  margin-left: 0;
  margin-right: 15px;
}

.foot:hover {
  color: #f76b39;
  cursor: pointer;
}

.card {
  content: "";
  height: 395px;
  width: 330px;
  display: flex;
  align-items: center;
  background-color: #ff6d39;
  margin-left: 93px;
  border-radius: 0% 50% 50% 0%;
  position: absolute;
  z-index: 5;
}

.card img {
  margin-left: -88px;
  margin-top: 60px;
}

.right {
  content: "";
  height: 395px;
  width: 570px;
  background-color: #2a2f40;
  z-index: 3;
  margin-left: 200px;
}

.product-info {
  position: absolute;
  margin-left: 245px;
  height: 394px;
  width: 305px;
  z-index: 10;
}
`;

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

// HTML TEMPLATE
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

// CUSTOM ELEMENTS
window.customElements.define(
  "sell-item",
  class extends HTMLElement {
    constructor() {
      super();

      // SHADOW DOM
      // Atachamos shadow root a sell-item, mode: open permite acceder a el desde el DOM.
      this.attachShadow({ mode: "open" });
      // Agregamos nodo el template al shadow root como una copia.
      // Importante que sea una copia para que no haga conflicto si reutilizo el componente.
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      // Para adoptar estilos de forma eficiente.
      this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    // Función necesaria para observar cambios de atributos
    static get observedAttributes() {
      // Retornamos listas con los atributos que queremos observar.
      return ["title", "discount", "star-rating"];
    }

    // LifeCycle component
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
);
