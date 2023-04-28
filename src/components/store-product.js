import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class StoreProduct extends withTwind(LitElement) {
  static get properties() {
    return { products: [], userId: { type: String } };
  }

  constructor() {
    super();
    this.userId = "";
    this.productos = [];
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
  }

  async valTk() {
    try {
      const authData = new ApiManager("/api/v1/auth/valtk");
      const valtk = await authData.valTk(this.val);
      this.userId = valtk.success && valtk.payload.userId;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCardDB(productId) {
    await this.valTk();

    console.log(this.userId);

    // const apiManager = new ApiManager("/api/v1/shoppingCart");
    // const getResult = await apiManager.getData(userId);
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

  addToCart(productId) {
    localStorage.getItem("log") === "true"
      ? this.addToCardDB(productId)
      : this.addToCartLS(productId);
  }

  async getAllProducts() {
    try {
      const apiManager = new ApiManager("/api/v1/products");
      this.products = await apiManager.getAllData();
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.getAllProducts();
  }

  render() {
    console.log(this.productos);
    return html` <div class="grid md:grid-cols-3 xl:md:grid-cols-4  gap-3">
      ${this.products &&
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
                <p class="text-sm italic text-gray-500">Rojo</p>
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
      )}
    </div>`;
  }
}
customElements.define("store-product", StoreProduct);
