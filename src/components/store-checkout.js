import { LitElement, html } from "lit";
import { v4 as uuidv4 } from "uuid";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);

export class StoreCheckout extends withTwind(LitElement) {
  static get properties() {
    return {
      cartItems: { type: Array },
      totalCart: { type: Number },
      shippingAmount: { type: Number },
      iva: { type: Number },
      totalOrderAmount: { type: Number },
      username: { type: String },
      userId: { type: String },
      userEmail: { type: String },
      totalAmount: { type: Number },
    };
  }

  constructor() {
    super();
    this.username = "";
    this.userId = 0;
    this.userEmail = "";
    this.cartItems = [];
    this.totalCart = 0;
    this.shippingAmount = 0;
    this.iva = 0;
    this.totalOrderAmount = 0;
    this.maxItemsPerProduct = 8;
    this.totalAmount = 0;
  }

  lsCart() {
    const lsCartItems = localStorage.getItem("cart");
    const parsedCart = JSON.parse(lsCartItems);
    this.cartItems = parsedCart;
    this.calculateTotalCart();
  }

  calculateTotalCart() {
    const totalCart =
      this.cartItems &&
      this.cartItems.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
    this.totalCart = totalCart;
    this.calculateShipping(totalCart);
    this.calculateIva(totalCart);
    this.calculateTotalOrder();
  }

  calculateShipping(totalCart) {
    this.shippingAmount =
      this.cartItems && this.cartItems.length > 0 && totalCart < 30000
        ? 2500
        : 0;
  }

  calculateIva(totalCart) {
    this.iva = totalCart * 0.19;
  }

  calculateTotalOrder() {
    this.totalOrderAmount = this.shippingAmount + this.iva + this.totalCart;
  }

  deleteItemToCart(itemId) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product_id !== itemId
    );
    this.calculateTotalCart();
    localStorage.setItem("cart", JSON.stringify([...this.cartItems]));
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

  changeQuantity(newQuantity, productId) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const index = cart.findIndex((item) => item.product_id === productId);
    if (index !== -1) {
      cart[index].quantity = parseInt(newQuantity);
      this.cartItems = cart;
      this.calculateTotalCart();
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  selectOptions(stock, quantity) {
    let maxItems =
      stock <= this.maxItemsPerProduct ? stock : this.maxItemsPerProduct;
    const options = [];
    for (let i = 1; i <= maxItems; i++) {
      if (i === quantity) {
        options.push(html`<option value=${i} selected>${i}</option>`);
      } else {
        options.push(html`<option value=${i}>${i}</option>`);
      }
    }
    return options;
  }

  async valTk() {
    const tk = localStorage.getItem("authToken");
    if (tk !== null) {
      try {
        const apiManager = new ApiManager("/api/v1/auth/valtk");
        const result = await apiManager.valTk(tk);

        if (result.success) {
          this.username = result.payload.nombre;
          this.userId = result.payload.userId;
          this.userEmail = result.payload.email;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.userId = 0;
      this.username = "";
      this.userEmail = "";
    }
  }

  async submitHandle(e) {
    e.preventDefault();

    if (this.cartItems.length > 0) {
      const orderApiManager = new ApiManager("/api/v1/orders");
      const orderDetailApiManager = new ApiManager("/api/v1/order-details");

      const formData = {
        name: `${e.target.firstname.value} ${e.target.lastname.value}`,
        lastname: e.target.lastname.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        shippingAddress: `${e.target.address.value} Nº${e.target.apartment.value}, ${e.target.county.value}, ${e.target.city.value}, Región ${e.target.region.value}`,
        postalCode: e.target.postalcode.value,
      };

      let allProducts = [];
      await Promise.all(
        this.cartItems.map(async (item) => {
          const productApiManager = new ApiManager("/api/v1/products");
          const productItem = await productApiManager.getData(item.product_id);
          allProducts.push(productItem);
        })
      );
      this.totalAmount = allProducts.reduce((acc, cur, index) => {
        return acc + cur.price * this.cartItems[index].quantity;
      }, 0);

      const newOrder = await orderApiManager.addData({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: formData.shippingAddress,
        customer_postalcode: formData.postalCode,
        total_amount: this.totalAmount,
        user_id: this.userId !== 0 ? this.userId : 1,
        guest_id: this.userId !== 0 ? null : uuidv4(),
        coupon_discount_id: 1,
        payment_method_id: 1,
        shipping_method: 1,
        tax_id: 1,
        status: "payment pending",
      });

      const orderDetailPromises = this.cartItems.map(async (item) => {
        const productApiManager = new ApiManager("/api/v1/products");

        const productItem = await productApiManager.getData(item.product_id);
        const addOrderDetail = await orderDetailApiManager.addData({
          order_id: newOrder.order_id,
          product_id: item.product_id,
          price: productItem.price,
          quantity: item.quantity,
        });
        return addOrderDetail;
      });

      const orderDetailResults = await Promise.all(orderDetailPromises);
      const allOrderDetailsAdded = orderDetailResults.every((result) => result);

      if (allOrderDetailsAdded) {
        localStorage.removeItem("cart");
        window.location.href = `/orders?${newOrder.order_id}`;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.lsCart();
    this.valTk();
  }

  render() {
    return html`<div class="bg-gray-50">
      <div
        class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <h2 class="sr-only">Checkout</h2>

        <form
          class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          @submit=${this.submitHandle}
        >
          <div>
            <div>
              <h2 class="text-lg font-medium text-gray-900">
                Información de contacto
              </h2>

              <div class="mt-4">
                <label
                  for="email-address"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <div class="mt-1">
                  <input
                    type="email"
                    name="email"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value=${this.userEmail && this.userEmail}
                    required
                  />
                </div>
              </div>
            </div>

            <div class="mt-10 border-t border-gray-200 pt-10">
              <h2 class="text-lg font-medium text-gray-900">Datos de envío</h2>

              <div
                class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
              >
                <div>
                  <label
                    for="firstname"
                    class="block text-sm font-medium text-gray-700"
                    >Nombre</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="firstname"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="lastname"
                    class="block text-sm font-medium text-gray-700"
                    >Apellido</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="lastname"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label
                    for="address"
                    class="block text-sm font-medium text-gray-700"
                    >Dirección</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="address"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label
                    for="apartment"
                    class="block text-sm font-medium text-gray-700"
                    >Casa/Depto/Of/etc.</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="county"
                    class="block text-sm font-medium text-gray-700"
                    >Comuna</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="county"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Ciudad</label
                  >
                  <div class="mt-1">
                    <select
                      name="city"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    >
                      <option>Selecciona</option>
                      <option>Valparaiso</option>
                      <option>Viña</option>
                      <option>Santiago</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    for="region"
                    class="block text-sm font-medium text-gray-700"
                    >Región</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="region"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="postal-code"
                    class="block text-sm font-medium text-gray-700"
                    >Código postal</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="postalcode"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700"
                    >Teléfono</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="phone"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10 border-t border-gray-200 pt-10 hidden">
              <fieldset>
                <legend class="text-lg font-medium text-gray-900">
                  Forma de entrega
                </legend>

                <div
                  class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                >
                  <label
                    class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  >
                    <input
                      type="radio"
                      name="delivery-method"
                      value="Standard"
                      class="sr-only"
                      aria-labelledby="delivery-method-0-label"
                      aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1"
                    />
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <span
                          id="delivery-method-0-label"
                          class="block text-sm font-medium text-gray-900"
                          >Estandar</span
                        >
                        <span
                          id="delivery-method-0-description-0"
                          class="mt-1 flex items-center text-sm text-gray-500"
                          >4–10 dáas</span
                        >
                        <span
                          id="delivery-method-0-description-1"
                          class="mt-6 text-sm font-medium text-gray-900"
                          >$0</span
                        >
                      </span>
                    </span>

                    <svg
                      class="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span
                      class="pointer-events-none absolute -inset-px rounded-lg border-2"
                      aria-hidden="true"
                    ></span>
                  </label>

                  <label
                    class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  >
                    <input
                      type="radio"
                      name="delivery-method"
                      value="Express"
                      class="sr-only"
                      aria-labelledby="delivery-method-1-label"
                      aria-describedby="delivery-method-1-description-0 delivery-method-1-description-1"
                    />
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <span
                          id="delivery-method-1-label"
                          class="block text-sm font-medium text-gray-900"
                          >Express</span
                        >
                        <span
                          id="delivery-method-1-description-0"
                          class="mt-1 flex items-center text-sm text-gray-500"
                          >2 días</span
                        >
                        <span
                          id="delivery-method-1-description-1"
                          class="mt-6 text-sm font-medium text-gray-900"
                          >$4.500</span
                        >
                      </span>
                    </span>

                    <svg
                      class="h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span
                      class="pointer-events-none absolute -inset-px rounded-lg border-2"
                      aria-hidden="true"
                    ></span>
                  </label>
                </div>
              </fieldset>
            </div>

            <!-- Pago -->

            <div class="mt-10 border-t border-gray-200 pt-10 hidden">
              <h2 class="text-lg font-medium text-gray-900">Pago</h2>
            </div>
          </div>

          <!--  Resumen del pedido -->
          <div class="mt-10 lg:mt-0">
            ${this.cartItems && this.cartItems.length > 0
              ? html`<h2 class="text-lg font-medium text-gray-900">
                    Resumen del pedido
                  </h2>

                  <div
                    class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm"
                  >
                    <h3 class="sr-only">Items en el carrito</h3>
                    <ul role="list" class="divide-y divide-gray-200">
                      ${this.cartItems &&
                      this.cartItems.map(
                        (item) =>
                          html`<li class="flex px-4 py-6 sm:px-6">
                    <input class="hidden" type="text" value=${
                      item.product_id
                    } name="product_id">
                      <div class="flex-shrink-0">
                        <img
                          src="${item.image_url}"
                          alt="Front of men&#039;s Basic Tee in black."
                          class="w-20 rounded-md"
                        />
                      </div>

                      <div class="ml-6 flex flex-1 flex-col">
                        <div class="flex">
                          <div class="min-w-0 flex-1">
                            <h4 class="text-sm">
                              <a
                                href="#"
                                class="font-medium text-gray-700 hover:text-gray-800"
                                >${item.name}</a
                              >
                            </h4>
                            <p class="mt-1 text-sm text-gray-500">${
                              item.categoryName
                            }</p>
                            <p class="mt-1 text-sm text-gray-500"></p>
                          </div>

                          <div class="ml-4 flow-root flex-shrink-0">
                            <button
                             type="button"
                              @click=${() =>
                                this.deleteItemToCart(item.product_id)}
                              class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            >
                              <span class="sr-only">Remove</span>
                              <svg
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div class="flex flex-1 items-end justify-between pt-2">
                          <p class="mt-1 text-sm font-medium text-gray-900">
                            ${this.clpCurrencyFormat(parseInt(item.price))} c/u
                          </p>

                          <div class="ml-4">
                            <label for="quantity" class="sr-only"
                              >Quantity</label
                            >
                            <select
                              id="quantity"
                              name="quantity"
                               @change =${(e) =>
                                 this.changeQuantity(
                                   e.target.value,
                                   item.product_id
                                 )}
                              class="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                           ${this.selectOptions(item.stock, item.quantity)}
                          </select>
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>`
                      )}
                    </ul>
                    <dl
                      class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6"
                    >
                      <div class="flex items-center justify-between">
                        <dt class="text-sm">Subtotal</dt>
                        <dd class="text-sm font-medium text-gray-900">
                          ${this.clpCurrencyFormat(this.totalCart)}
                        </dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-sm">Costo de envío</dt>
                        <dd class="text-sm font-medium text-gray-900">
                          ${this.shippingAmount
                            ? this.clpCurrencyFormat(this.shippingAmount)
                            : "$0"}
                        </dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-sm">IVA</dt>
                        <dd class="text-sm font-medium text-gray-900">
                          ${this.clpCurrencyFormat(this.iva)}
                        </dd>
                      </div>
                      <div
                        class="flex items-center justify-between border-t border-gray-200 pt-6"
                      >
                        <dt class="text-base font-medium">Total</dt>
                        <dd class="text-base font-medium text-gray-900">
                          ${this.clpCurrencyFormat(this.totalOrderAmount)}
                        </dd>
                      </div>
                    </dl>

                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div class="text-right w-full">
                        <button
                          type="submit"
                          class=" rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          style="width:100%"
                        >
                          Confirmar pedido
                        </button>
                      </div>
                    </div>
                  </div>`
              : html`<div class="text-center mt-24">
                    No existen productos selecionados
                  </div>
                  <div class="mt-3 text-center ">
                    <a
                      href="/"
                      type="submit"
                      class="w-64 rounded-md border border-transparent text-center bg-indigo-200 px-1 py-2 text-base font-medium text-indigo-600 shadow-sm hover:bg-indigo-300"
                    >
                      Continuar comprando
                    </a>
                  </div>`}
          </div>
        </form>
      </div>
    </div>`;
  }
}

customElements.define("store-checkout", StoreCheckout);
