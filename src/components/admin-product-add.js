import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

import { ApiManager } from "../services/ApiManager.js";

export class AdminProductAdd extends withTwind(LitElement) {
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

  async getApiData() {
    const apiManager = new ApiManager("/api/v1/categories/");
    this.data = await apiManager.getAllData();
  }

  async addApiData(postData) {
    try {
      const apiManager = new ApiManager("/api/v1/products/");
      const result = apiManager.addData(postData);
      console.log(await result);
      this.showAlert = true;
    } catch (error) {
      this.showAlert = false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const postData = {
      name: e.target.name.value,
      description: e.target.description.value,
      image_url: e.target.imageUrl.value,
      sku: e.target.sku.value,
      price: e.target.price.value,
      category_id: e.target.category.value,
      stock: e.target.stock.value,
    };
    this.addApiData(postData);
  }

  connectedCallback() {
    super.connectedCallback();
    this.getApiData();
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <div class="space-y-12">
          ${this.showAlert
            ? html`<utils-alert text="Producto agregado"></utils-alert>`
            : null}
          ${this.showAlert ? this.closeAlert() : null}

          <div class="pb-5">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Productos
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              Esta informacion será pública
            </p>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Nombre del Producto</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="sku"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Sku</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="sku"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="col-span-full mt-5">
              <label
                for="description"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Descripción</label
              >
              <div class="mt-2">
                <textarea
                  name="description"
                  rows="3"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                ></textarea>
              </div>
            </div>

            <div class="sm:col-span-4 my-4">
              <label
                for="imageUrl"
                class="block text-sm font-medium leading-6 text-gray-900"
                >URL Imagen</label
              >
              <div class="mt-2">
                <input
                  name="imageUrl"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="price"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Precio</label
              >
              <div class="mt-2">
                <input
                  name="price"
                  type="number"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div class="sm:col-span-3 mt-5">
              <label
                for="category"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Categoría</label
              >
              <div class="mt-2">
                <select
                  name="category"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                >
                  <option value="">Seleccione</option>
                  ${this.data &&
                  this.data.map(
                    (item) =>
                      html`<option value="${item.category_id}">
                        ${item.name}
                      </option>`
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:col-span-4 mt-1">
          <label
            for="stock"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Stock</label
          >
          <div class="mt-2">
            <input
              name="stock"
              type="number"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Agregar producto
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define("admin-product-add", AdminProductAdd);
