import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class StoreOrders extends withTwind(LitElement) {
  static get properties() {
    return { orders: {}, products: [] };
  }

  constructor() {
    super();
    this.dateFormat = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };
  }

  async displayOrders() {
    const urlParams = new URL(window.location.href);
    const id = urlParams.search.split("?")[1];
    console.log(id);
    const orderApiManager = new ApiManager("/api/v1/orders");
    const orders = await orderApiManager.getAllData();
    this.orders = orders.filter((order) => order.user_id == id);
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
    this.displayOrders();
  }

  render() {
    return html`<div class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div class="max-w-xl">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Mis Pedidos
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Revisa el estado de tus pedidos.
          </p>
        </div>

        ${this.orders &&
        this.orders.map(
          (order) =>
            html`<div class="mt-8">
              <div class="space-y-20">
                <div>
                  <div
                    class="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8"
                  >
                    <dl
                      class="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8"
                    >
                      <div class="flex justify-between sm:block">
                        <dt class="font-medium text-gray-900">
                          Fecha de compra
                        </dt>
                        <dd class="sm:mt-1">
                          ${new Date(order.createdAt).toLocaleDateString(
                            "es-ES",
                            this.dateFormat
                          )}
                        </dd>
                      </div>
                      <div class="flex justify-between pt-6 sm:block sm:pt-0">
                        <dt class="font-medium text-gray-900">
                          Número de pedido
                        </dt>
                        <dd class="sm:mt-1">${order.order_id}</dd>
                      </div>
                      <div
                        class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
                      >
                        <dt>Total de la compra</dt>
                        <dd class="sm:mt-1">
                          ${this.clpCurrencyFormat(
                            parseInt(order.total_amount * 1.19)
                          )}
                        </dd>
                      </div>
                    </dl>
                    <a
                      href=${`/order?${order.order_id}`}
                      class="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                    >
                      Ver detalle
                    </a>
                  </div>
                </div>
              </div>
            </div>`
        )}
      </div>
    </div> `;
  }
}

customElements.define("store-orders", StoreOrders);
