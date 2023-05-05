import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class StoreOrders extends withTwind(LitElement) {
  static get properties() {
    return { order: {}, products: [] };
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

    const orderApiManager = new ApiManager("/api/v1/orders");
    this.order = await orderApiManager.getData(id);
    const orderDetailApiManager = new ApiManager(
      "/api/v1/order-details/products"
    );
    this.products = await orderDetailApiManager.getData(id);
  }

  clpCurrencyFormat(amount) {
    if (amount) {
      const currencyFormat = amount.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      return currencyFormat;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.displayOrder();
  }

  render() {
    return html`<div class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div class="max-w-xl">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Tu pedido
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Gracias por preferirnos! A continuación el detalle de tu compra.
          </p>
        </div>

        <div class="mt-16">
          <div class="space-y-20">
            <div>
              <div
                class="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8"
              >
                <dl
                  class="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-2/3 lg:flex-none lg:gap-x-8"
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
                    <dt class="font-medium text-gray-900">Número de orden</dt>
                    <dd class="sm:mt-1">
                      ${this.order && this.order.order_id}
                    </dd>
                  </div>
                  <div
                    class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
                  >
                    <dt>Total</dt>
                    <dd class="sm:mt-1">
                      ${this.order &&
                      this.clpCurrencyFormat(
                        parseInt(this.order.total_amount * 1.19)
                      )}
                    </dd>
                  </div>
                  <div class="flex justify-between pt-6 sm:block sm:pt-0">
                    <dt class="font-medium text-gray-900">Email</dt>
                    <dd class="sm:mt-1">
                      ${this.order && this.order.customer_email}
                    </dd>
                  </div>
                </dl>
                <a
                  href="#"
                  class="hidden mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                >
                  Ver boleta
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
                      Precio unitario
                    </th>
                    <th
                      scope="col"
                      class="hidden py-3 pr-8 font-normal sm:table-cell"
                    >
                      Cantidad
                    </th>

                    <th
                      scope="col"
                      class="hidden py-3 pr-8 font-normal sm:table-cell"
                    >
                      Estado de entrega
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
                >
                  ${this.products &&
                  this.products.map(
                    (product) =>
                      html`<tr>
                        <td class="py-6 pr-8">
                          <div class="flex items-center">
                            <img
                              src="  ${product.image_url}"
                              alt="Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip."
                              class="mr-6 h-16 w-16 rounded object-cover object-center"
                            />
                            <div>
                              <div class="font-medium text-gray-900">
                                ${product.product}
                              </div>
                              <div class="mt-1 sm:hidden">
                                $${product.product}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          ${this.clpCurrencyFormat(
                            parseInt(product.price * 1.19)
                          )}
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          ${product.quantity}
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          Por entregar
                        </td>
                      </tr>`
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> `;
  }
}

customElements.define("store-orders", StoreOrders);
