import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class AdminProductRanking extends withTwind(LitElement) {
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
      const apiManager = new ApiManager("/api/v1/products/ranking/product");
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
            Productos mas vendidos
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Registro de los productos mas demandados.
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
                          class="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                        >
                         Posición
                        </th>
                 
                        <th
                          scope="col"
                          class="hidden py-3 pr-8 font-normal sm:table-cell"
                        >
                      Vendidos
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
                    >
                      ${
                        this.data &&
                        this.data.map(
                          (item, i) =>
                            html`<tr>
                              <td class="py-6 pr-8">
                                <div class="flex items-center">
                                  <img
                                    src="${item.image_url}"
                                    class="mr-6 h-16 w-16 rounded object-cover object-center"
                                  />
                                  <div>${item.name}</div>
                                </div>
                              </td>
                              <td class="hidden py-6 pr-8 sm:table-cell">
                                ${i + 1}
                              </td>
                              <td class="hidden py-6 pr-8 sm:table-cell">
                                ${item.quantity}
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

customElements.define("admin-ranking", AdminProductRanking);
