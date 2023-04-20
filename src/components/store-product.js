import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

export class StoreProduct extends withTwind(LitElement) {
  static properties = {
    data: [],
  };

  constructor() {
    super();
    this.totalProductInCart = JSON.parse(localStorage.getItem("cart"));
    this.cart = new Set([...this.totalProductInCart]);
  }

  async fetchData() {
    try {
      const response = await fetch("http://localhost:4000/api/v1/products/");
      if (response.ok) {
        const data = await response.json();
        this.data = data;
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  saveToCart(id) {
    console.log(this.totalProductInCart);
    const product = this.data.filter((item) => item.product_id === id);
    this.cart.add(product[0]);
    localStorage.setItem("cart", JSON.stringify([...this.cart]));
  }

  render() {
    return html` <div class="grid grid-cols-3 gap-3">
      ${this.data &&
      this.data.map(
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
                  $${item.price}
                </p>
                <button
                  id="add-to-cart${item.product_id}"
                  @click=${() => this.saveToCart(item.product_id)}
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
