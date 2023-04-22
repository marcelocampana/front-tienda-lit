import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

export class AdminTable extends withTwind(LitElement) {
  render() {
    return html`<div class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div class="max-w-xl">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            Productos
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Revisa los productos disponibles en stock.
          </p>
        </div>

        <div class="mt-16">
          <h2 class="sr-only">Recent orders</h2>

          <div class="space-y-20">
            <div>
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
                      Categoría
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
                            Machined Pen and Pencil Set
                          </div>
                          <div class="mt-1 sm:hidden">$70.000</div>
                        </div>
                      </div>
                    </td>
                    <td class="hidden py-6 pr-8 sm:table-cell">$70.00</td>
                    <td class="hidden py-6 pr-8 sm:table-cell">
                      Delivered Jan 25, 2021
                    </td>
                    <td class="whitespace-nowrap py-6 text-right font-medium">
                      <a href="#" class="text-indigo-600"
                        >Ver<span class="hidden lg:inline">Producto</span
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

customElements.define("admin-table", AdminTable);
