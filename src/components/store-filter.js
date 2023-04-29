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
    console.log(this.resultProducts);
    return html`<div class="bg-white">
      <div>
        <!--
      Mobile filter dialog

      Off-canvas menu for mobile, show/hide based on off-canvas menu state.
    -->
        <div class="relative z-40 hidden" role="dialog" aria-modal="true">
          <!--
        Off-canvas menu backdrop, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
          <div class="fixed inset-0 bg-black bg-opacity-25"></div>

          <div class="fixed inset-0 z-40 flex">
            <!--
          Off-canvas menu, show/hide based on off-canvas menu state.

          Entering: "transition ease-in-out duration-300 transform"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
            <div
              class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
            >
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close menu</span>
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

              <!-- Filters -->
              <form class="mt-4">
                <div class="border-t border-gray-200 pt-4 pb-4">
                  <fieldset class="hidden">
                    <legend class="w-full px-2">
                      <!-- Expand/collapse section button -->
                      <button
                        type="button"
                        class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-0"
                        aria-expanded="false"
                      >
                        <span class="text-sm font-medium text-gray-900"
                          >Color</span
                        >
                        <span class="ml-6 flex h-7 items-center">
                          <!--
                        Expand/collapse icon, toggle classes based on section open state.

                        Open: "-rotate-180", Closed: "rotate-0"
                      -->
                          <svg
                            class="rotate-0 h-5 w-5 transform"
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
                        </span>
                      </button>
                    </legend>
                    <div class="px-4 pt-4 pb-2" id="filter-section-0">
                      <div class="space-y-6">
                          <!-- checkbox-->
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div class="border-t border-gray-200 pt-4 pb-4">
                  <fieldset>
                    <legend class="w-full px-2">
                      <!-- Expand/collapse section button -->
                      <button
                        type="button"
                        class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-1"
                        aria-expanded="false"
                      >
                        <span class="text-sm font-medium text-gray-900"
                          >Category</span
                        >
                        <span class="ml-6 flex h-7 items-center">
                          <!--
                        Expand/collapse icon, toggle classes based on section open state.

                        Open: "-rotate-180", Closed: "rotate-0"
                      -->
                          <svg
                            class="rotate-0 h-5 w-5 transform"
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
                        </span>
                      </button>
                    </legend>
                    <div class="px-4 pt-4 pb-2" id="filter-section-1">
                      <div class="space-y-6">
                             <!-- Checkbox -->
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div class="border-t border-gray-200 pt-4 pb-4">
                  <fieldset>
                    <legend class="w-full px-2">
                      <!-- Expand/collapse section button -->
                      <button
                        type="button"
                        class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-2"
                        aria-expanded="false"
                      >
                        <span class="text-sm font-medium text-gray-900"
                          >Sizes</span
                        >
                        <span class="ml-6 flex h-7 items-center">
                          <!--
                        Expand/collapse icon, toggle classes based on section open state.

                        Open: "-rotate-180", Closed: "rotate-0"
                      -->
                          <svg
                            class="rotate-0 h-5 w-5 transform"
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
                        </span>
                      </button>
                    </legend>
                    <div class="px-4 pt-4 pb-2" id="filter-section-2">
                      <div class="space-y-6">
                             <!-- checkboxs -->
                      </div>
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>
          </div>
        </div>

        <main
          class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div class="border-b border-gray-200 pb-10">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900">
              Nuevos Productos
            </h1>
            <p class="mt-4 text-base text-gray-500">
           Conoce nuestra nueva línea toda temporada para que te veas como quieras cuando quieras!
            </p>
          </div>

          <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 class="sr-only">Filters</h2>

              <!-- Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. -->
              <button type="button" class="inline-flex items-center lg:hidden">
                <span class="text-sm font-medium text-gray-700">Filters</span>
                <svg
                  class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
                  />
                </svg>
              </button>

              <div class="hidden lg:block">
                <form class="space-y-10 divide-y divide-gray-200">

                 <div class="pt-10">
                    <fieldset id="category">
                      <legend class="block text-sm font-medium text-gray-900">
                        Categorías
                      </legend>
                      <div class="space-y-3 pt-6">     
                        ${
                          this.categories &&
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
                          )
                        }


                       
                    </fieldset>
                  </div>

                  <div class="hidden">
                    <fieldset>
                      <legend class="block text-sm font-medium text-gray-900">
                        Color
                      </legend>
                      <div class="space-y-3 pt-6">
                                <!-- checkbox -->
                      </div>
                    </fieldset>
                  </div>

                 

                  <div class="pt-10">
                    <fieldset class="hidden">
                      <legend class="block text-sm font-medium text-gray-900">
                        Tallas
                      </legend>
                      <div class="space-y-3 pt-6">
                               <!-- Checkbox-->
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </aside>

            <!-- Product grid -->
          <div class="md:col-span-2 xl:col-span-3" > 
   <store-product .products="${
     this.products.length === 0 ? this.resultProducts : this.products
   }"></store-product>      
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>`;
  }
}

customElements.define("store-filter", StoreFilter);
