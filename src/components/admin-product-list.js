import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class AdminTable extends withTwind(LitElement) {
  static properties = {
    data: [],
  };

  async fetchData() {
    try {
      const apiManager = new ApiManager("/api/v1/products");
      this.data = await apiManager.getAllData();
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

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
                    <th
                      scope="col"
                      class="hidden py-3 pr-8 font-normal sm:table-cell"
                    >
                      Stock
                    </th>
                    <th scope="col" class="w-0 py-3 text-right font-normal">
                      Info
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
                >
                  ${this.data &&
                  this.data.map(
                    (item) =>
                      html`<tr>
                        <td class="py-6 pr-8">
                          <div class="flex items-center">
                            <img
                              src="${item.image_url}"
                              class="mr-6 h-16 w-16 rounded object-cover object-center"
                            />
                            <div>
                              <div class="font-medium text-gray-900">
                                ${item.name}
                              </div>
                              <div class="mt-1 sm:hidden">
                                ${item.price.toLocaleString(
                                  "es-CL",
                                  this.options
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          $${item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          ${item.category_id}
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          ${item.stock}
                        </td>
                        <td
                          class="whitespace-nowrap py-6 text-right font-medium"
                        >
                          <protected-link
                            text="Ver"
                            href="/dashboard/product-update?id=${item.product_id}"
                          ></protected-link>
                        </td>
                      </tr>`
                  )}

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
