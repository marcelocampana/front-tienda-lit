import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

export class Home4 extends withTwind(LitElement) {
  render() {
    return html`<div
      class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div
        class="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96"
      >
        <img
          src="https://tailwindui.com/img/ecommerce-images/home-page-01-image-card-01.jpg"
          alt="Front of plain black t-shirt."
          class="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div class="flex flex-1 flex-col space-y-2 p-4">
        <h3 class="text-sm font-medium text-gray-900">
          <a href="/carrito/1">image </a>
        </h3>
        <p class="text-sm text-gray-500">description</p>
        <div class="flex flex-1 flex-col justify-end">
          <p class="text-sm italic text-gray-500">Rojo</p>
          <p class="text-base font-medium text-gray-900">$1500</p>
          <form method="post" action="/api/cart/add">
            <input type="hidden" name="product_id" value="1" />
            <button
              type="submit"
              class="mt-5 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Agregar al carrito
            </button>
          </form>
        </div>
      </div>
    </div>`;
  }
}
customElements.define("component-home4", Home4);
