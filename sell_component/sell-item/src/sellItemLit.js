import { LitElement, html } from "lit-element";

class SellIetmLit extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      discount: { type: Number },
      star_rating: { type: Number },
    };
  }

  constructor() {
    super();
    this.title = "";
    this.discount = 0;
    this.star_rating = 0;
    this.normal_price = 50000;
  }

  getDiscountPrice() {
    const discountDiff = (100 - this.discount) / 100;
    return (this.normal_price * discountDiff)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  parsePrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    return html`
        <style>
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
        </style>
        
        <div class="card">
            <img src="https://www.dropbox.com/s/e928cht0h5crcn4/shoe.png?raw=1" alt="shoe">
        </div>
        <div class="right">
            <div class="product-info">
                <div class="details">
                    <h3>Temporada Verano</h3>
                    <h2 id="title">${this.title}</h2>
                    <h2 id="discount">-${this.discount}%</h2>
                    <h1 id="discount-price">${this.getDiscountPrice()}</h1>
                    <h4 class="dis">Normal: <span id="normal-price" class="dis">$${this.parsePrice(
                      this.normal_price
                    )}</span></h4>
                </div>
                <h4 class="rating">Rating: &#11088;<span id="star-rating">${
                  this.star_rating
                }</span>
            </div>
        </div>
      `;
  }
}

window.customElements.define("sell-item-lit", SellIetmLit);
