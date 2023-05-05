import { LitElement, html } from "lit";
import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class StoreFilter extends withTwind(LitElement) {
  static get properties() {
    return {
      categories: { type: Array },
      products: { type: Array },
      resultProducts: { type: Array },
    };
  }

  constructor() {
    super();
    this.categories = [];
    this.products = [];
    this.resultProducts = [];
    this.countCartItems = 0;
    this.totalCountCartItems = 0;
  }

  async getCategoriesCount() {
    const apiManager = new ApiManager("/api/v1/products/count");
    this.categories = await apiManager.getData(1);
  }

  async queryProducts() {
    const apiManager = new ApiManager("/api/v1/products/");
    const result = await apiManager.getAllData();
    this.resultProducts = result;
  }

  async handleEvent(e) {
    const value = e.target.value;
    if (e.target.checked) {
      let checkboxFilteredProducts = this.resultProducts.filter(
        (item) => item.categoryName === value
      );
      this.products = [...this.products, ...checkboxFilteredProducts];
    } else {
      this.products = this.products.filter(
        (item) => item.categoryName !== value
      );
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    this.getCategoriesCount();
    await this.queryProducts();
  }

  render() {
    return html`<div class="bg-white">
      <div>
        <div class="relative z-40 hidden" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-black bg-opacity-25"></div>

          <div class="fixed inset-0 z-40 flex">
            <div
              class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
            >
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  type="button"
                  class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span class="sr-only">Cerrar menu</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Filtros -->
              <form class="mt-4 border-t border-gray-200">
                <div class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <button
                      type="button"
                      class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                      aria-controls="filter-section-mobile-0"
                      aria-expanded="false"
                    >
                      <span class="font-medium text-gray-900">Color</span>
                    </button>
                  </h3>
                </div>
              </form>
            </div>
          </div>
        </div>

        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24"
          >
            <div class=" pb-10">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                Nuevos Productos
              </h1>
              <p class="mt-4 text-base text-gray-500">
                Conoce nuestra nueva línea toda temporada para que luzcas como
                quieres cuando quieras!
              </p>
            </div>

            <div class="flex items-center hidden">
              <div class="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    id="menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    Ordenar
                    <svg
                      class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    <a
                      href="#"
                      class="font-medium text-gray-900 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                      >Menor precio</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section aria-labelledby="products-heading" class="pb-24 pt-6">
            <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <!-- Filtros -->
              <form class="hidden lg:block">
                <div class="border-b border-gray-200 py-6">
                  <h3 class="-my-3 flow-root">
                    <div
                      class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                    >
                      <span class="font-medium text-gray-900">Categorías</span>
                    </div>
                  </h3>
                  <div class="pt-6" id="filter-section-0">
                    <div class="space-y-4">
                      ${this.categories &&
                      this.categories.map(
                        (item) =>
                          html` <div class="flex items-center">
                            <input
                              id="category-${item.name}"
                              name="category-${item.name}"
                              value=${item["category.name"]}
                              type="checkbox"
                              class="h-4
                                w-4 rounded border-gray-300 text-indigo-600
                                focus:ring-indigo-500"
                              @change=${this.handleEvent}
                            />
                            <label
                              for="category-${item.name}"
                              class="ml-3 text-sm text-gray-600"
                              >${item[
                                "category.name"
                              ]}(${item.total_productos})</label
                            >
                          </div>`
                      )}
                    </div>
                  </div>
                </div>
              </form>

              <!-- Productos-->
              <div class="lg:col-span-3">
                <store-product
                  .products="${this.products.length === 0
                    ? this.resultProducts
                    : this.products}"
                ></store-product>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div> `;
  }
}

customElements.define("store-filter", StoreFilter);
