import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class AdminTable extends withTwind(LitElement) {
  static properties = {
    data: [],
    showAlert: { type: Boolean },
  };

  constructor() {
    super();
    this.showAlert = false;
  }

  closeAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 7000);
  }

  async getAllProducts() {
    try {
      const apiManager = new ApiManager("/api/v1/products");
      this.data = await apiManager.getAllData();
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  async deleteProduct(id) {
    if (confirm("¿Estás seguro(a) de que deseas eliminar este producto?")) {
      try {
        const apiManager = new ApiManager("/api/v1/products/");
        await apiManager.deleteData(id);
        this.showAlert = true;
        this.getAllProducts();
      } catch (error) {
        this.showAlert = false;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.getAllProducts();
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
            Revisa los productos en stock.
          </p>
        </div>

        <div class="mt-4">
          ${
            this.showAlert
              ? html`<utils-alert text="Producto eliminado"></utils-alert>`
              : null
          }
          ${this.showAlert ? this.closeAlert() : null}
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
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
                    >
                      ${
                        this.data &&
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
                              <protected-link class="font-medium text-gray-900"
                               text="${
                                 item.name
                               }"  href="/dashboard/product-update?id=${
                              item.product_id
                            }" >
                              </protected-link>
                              <div class="mt-1 sm:hidden">
                                $${item.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
                          ${item.categoryName}
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          ${item.stock}
                        </td>
                        <td
                          class="whitespace-nowrap py-6 text-right font-medium"
                        >
                       <div class="flex">
                          <protected-link
                            href="/dashboard/product-update?id=${
                              item.product_id
                            }"
                            svgCode='<svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-4 h-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                /></svg>'>
                                 </protected-link>
                          <div class="ml-2">
                          <button @click="${() =>
                            this.deleteProduct(item.product_id)}">
                        ${html`<svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 text-red-400"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>`}
                        </button>
                        </div>
                        <div>
                        </td>
                      </tr>`
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> `;
  }
}

customElements.define("admin-table", AdminTable);
