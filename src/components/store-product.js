import { LitElement, html } from "lit";
import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import "./utils-notification.js";

const withTwind = install(config);

export class StoreProduct extends withTwind(LitElement) {
  static get properties() {
    return {
      products: { type: Array },
      userId: { type: String },
      productAdded: { type: String },
      showNotification: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.userId = "";
    this.val = localStorage.getItem("authToken");
    this.itemsInCart = () => {
      const currentCart = localStorage.getItem("cart");
      const parsedCurrentCart = JSON.parse(currentCart);
      if (currentCart && currentCart.length > 0) {
        return parsedCurrentCart;
      } else {
        return [];
      }
    };
    this.cart = this.itemsInCart();
    this.productAdded = "";
    this.showNotification = false;
  }

  addToCart(productId) {
    this.addToCartLS(productId);

    this.productAdded = this.cart.filter(
      (item) => item.product_id === productId
    );

    window.dispatchEvent(new CustomEvent("cart-updated"));
    this.showNotification = true;
  }

  addToCartLS(productId) {
    const product = this.products.filter(
      (item) => item.product_id === productId
    );

    const productInCart = this.cart.find(
      (item) => item.product_id == product[0].product_id
    );

    if (productInCart) {
      const quantity = productInCart.quantity + 1;
      this.cart = this.cart.filter(
        (item) => item.product_id !== productInCart.product_id
      );
      this.cart.push({ ...product[0], quantity });
    } else {
      this.cart.push({ ...product[0], quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify([...this.cart]));
  }

  closeNotification() {
    this.showNotification = false;
  }

  render() {
    return html` ${
      this.showNotification
        ? html`<utils-notification
            text="${this.productAdded && this.productAdded[0].name}"
            @close=${this.closeNotification}
          >
            ></utils-notification
          >`
        : null
    }
      <div class="grid md:grid-cols-3 xl:md:grid-cols-4  gap-3 z-30">
     
        ${
          this.products &&
          this.products.map(
            (item) =>
              html` <div
                class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div
                  class="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96"
                >
                  <img
                    src="${item.image_url}"
                    alt="Front of plain black t-shirt."
                    class="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div class="flex flex-1 flex-col space-y-2 p-4">
                  <h3 class="text-sm font-medium text-gray-900">
                    <a href="/carrito/1">${item.name} </a>
                  </h3>
                  <p class="text-sm text-gray-500">${item.description}</p>
                  <div class="flex flex-1 flex-col justify-end">
                    <p class="text-sm italic text-gray-500">
                      ${item.categoryName}
                    </p>
                    <p class="text-base font-medium text-gray-900">
                      $${item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                    <button
                      id="add-to-cart${item.product_id}"
                      @click=${() => this.addToCart(item.product_id)}
                      class="mt-5 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>`
          )
        }
      </div>
    </div>`;
  }
}
customElements.define("store-product", StoreProduct);
