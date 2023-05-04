import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class StoreOrders extends withTwind(LitElement) {
  static get properties() {
    return { order: {} };
  }

  constructor() {
    super();
    this.dateFormat = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
  }

  async displayOrder() {
    const urlParams = new URL(window.location.href);
    const id = urlParams.search.split("?")[1];

    const apiManager = new ApiManager("/api/v1/orders");
    this.order = await apiManager.getData(id);
  }

  connectedCallback() {
    super.connectedCallback();
    this.displayOrder();
  }

  render() {
    console.log(this.order);
    return html`<div class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div class="max-w-xl">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Tu pedido
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Estos son los productos que compraste con nosotros!
          </p>
        </div>

        <div class="mt-16">
          <h2 class="sr-only">Recent orders</h2>

          <div class="space-y-20">
            <div>
              <h3 class="sr-only">
                Order placed on
                <time datetime="2021-01-22">January 22, 2021</time>
              </h3>

              <div
                class="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8"
              >
                <dl
                  class="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8"
                >
                  <div class="flex justify-between sm:block">
                    <dt class="font-medium text-gray-900">Fecha de compra</dt>
                    <dd class="sm:mt-1">
                      <time datetime="2021-01-22"
                        >${this.order &&
                        new Date(this.order.createdAt).toLocaleDateString(
                          "es-ES",
                          this.dateFormat
                        )}</time
                      >
                    </dd>
                  </div>
                  <div class="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt class="font-medium text-gray-900">Numero de orden</dt>
                    <dd class="sm:mt-1">
                      ${this.order && this.order.order_id}
                    </dd>
                  </div>
                  <div
                    class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
                  >
                    <dt>Total</dt>
                    <dd class="sm:mt-1">
                      $ ${this.order && this.order.total_amount}
                    </dd>
                  </div>
                </dl>
                <a
                  href="#"
                  class="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                >
                  Ver boleta
                  <span class="sr-only">de pedido L438501</span>
                </a>
              </div>

              <table class="mt-4 w-full text-gray-500 sm:mt-6">
                <caption class="sr-only">
                  Productos
                </caption>
                <thead
                  class="sr-only text-left text-sm text-gray-500 sm:not-sr-only"
                >
                  <tr>
                    <th
                      scope="col"
                      class="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                    >
                      Producto
                    </th>
                    <th
                      scope="col"
                      class="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      class="hidden py-3 pr-8 font-normal sm:table-cell"
                    >
                      Estado
                    </th>
                    <th scope="col" class="w-0 py-3 text-right font-normal">
                      Info
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
                >
                  <tr>
                    <td class="py-6 pr-8">
                      <div class="flex items-center">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg"
                          alt="Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip."
                          class="mr-6 h-16 w-16 rounded object-cover object-center"
                        />
                        <div>
                          <div class="font-medium text-gray-900">
                            Polera de mujer rosada
                          </div>
                          <div class="mt-1 sm:hidden">$23.800</div>
                        </div>
                      </div>
                    </td>
                    <td class="hidden py-6 pr-8 sm:table-cell">$70.000</td>
                    <td class="hidden py-6 pr-8 sm:table-cell">
                      Entegado Ene 25, 2023
                    </td>
                    <td
                      class="whitespace-nowrap py-6 text-right font-medium hidden"
                    >
                      <a href="#" class="text-indigo-600"
                        >View<span class="hidden lg:inline">Product</span
                        ><span class="sr-only"
                          >, Machined Pen and Pencil Set</span
                        ></a
                      >
                    </td>
                  </tr>

                  <!-- More products... -->
                </tbody>
              </table>
            </div>

            <!-- More orders... -->
          </div>
        </div>
      </div>
    </div> `;
  }
}

customElements.define("store-orders", StoreOrders);
