import { LitElement, html } from "lit";
import "./utils-alert.js";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

import { ApiManager } from "../services/ApiManager.js";

export class AdminProductUpdate extends withTwind(LitElement) {
  static properties = {
    data: [],
    dataProduct: "",
    showAlert: { type: Boolean },
  };

  constructor() {
    super();
    this.id = new URLSearchParams(window.location.search).get("id");
    this.showAlert = false;
  }

  closeAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 7000);
  }

  async getProduct() {
    const apiManager = new ApiManager("/api/v1/products/");
    this.dataProduct = await apiManager.getData(this.id);
  }

  async getApiData() {
    const apiManager = new ApiManager("/api/v1/categories/");
    this.data = await apiManager.getAllData();
  }

  async updateApiData(id, postData) {
    const apiManager = new ApiManager("/api/v1/products/");
    try {
      const result = apiManager.updateData(id, postData);
      console.log(result);
      this.showAlert = true;
      this.updateMessageAlert = true;
    } catch (error) {
      this.showAlert = true;
      this.updateMessageAlert = false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const postData = {
      product_id: this.id,
      name: e.target.name.value,
      description: e.target.description.value,
      image_url: "http", //e.target.imageUrl.value,
      sku: e.target.sku.value,
      price: e.target.price.value,
      category_id: e.target.category.value,
      stock: e.target.stock.value,
    };
    this.updateApiData(postData.product_id, postData);
  }

  connectedCallback() {
    super.connectedCallback();
    this.getApiData();
    this.getProduct();
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
   

        <div class="space-y-12">
        ${
          this.showAlert
            ? html`<utils-alert text="Producto actualizado"></utils-alert>`
            : null
        }
          ${this.showAlert ? this.closeAlert() : null}
       
          <div class="pb-5">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
             Información del producto
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
             Esta viendo el producto con ID <span class="text-black"> ${
               this.dataProduct && this.dataProduct.product_id
             }</span> 
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="firstname"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Nombre del Producto</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="name"
                    value= ${this.dataProduct && this.dataProduct.name}
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

            
                <div class="sm:col-span-3">
                  <label
                    for="last-name"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Sku</label
                  >
                  <div class="mt-2">
                    <input
                      type="text"
                      name="sku"
                      value=${this.dataProduct && this.dataProduct.sku}
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
                  </div>

                <div class="col-span-full mt-5">
                  <label
                    for="about"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Descripción</label
                  >
                  <div class="mt-2">
                    <textarea
                      name="description"
                      rows="3"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    >${
                      this.dataProduct && this.dataProduct.description
                    }</textarea>
                  </div>
                </div>

                <div class="col-span-full mt-5">
                  <label
                    for="imageUrl"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Imagen</label
                  >
                  <div
                    class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                  >
                    <div class="text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div class="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Subir un archivo</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1">o arrastra aquí</p>
                      </div>
                      <p class="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF de hasta 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Precio</label
              >
              <div class="mt-2">
                <input
                  name="price"
                  type="number"
                  value=${this.dataProduct && this.dataProduct.price}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3 mt-5">
              <label
                for="country"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Categoría</label
              >
              <div class="mt-2">
                <select
                  name="category"
                  autocomplete="country-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                >
                <option value="">Seleccione</option>
               ${
                 this.data &&
                 this.data.map(
                   (item) =>
                     html`<option value="${item.category_id}">
                       ${item.name}
                     </option>`
                 )
               }
       
                </select>
              </div>
               <div class="sm:col-span-4 mt-5">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Stock</label
              >
              <div class="mt-2">
                <input
                  name="stock"
                  type="number"
                  value=${this.dataProduct && this.dataProduct.stock}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required 
                />
              </div>
            </div>
            </div>         
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
          type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Modificar
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define("admin-product-update", AdminProductUpdate);
