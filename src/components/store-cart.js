import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

export class StoreCart extends withTwind(LitElement) {
  static get properties() {
    return {
      cartItems: { type: Array },
      totalCart: { type: Number },
      shippingAmount: { type: Number },
      iva: { type: Number },
      totalOrderAmount: { type: Number },
    };
  }

  constructor() {
    super();
    this.cartItems = [];
    this.totalCart = 0;
    this.shippingAmount = 0;
    this.iva = 0;
    this.totalOrderAmount = 0;
    this.maxItemsPerProduct = 8;
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

  connectedCallback() {
    super.connectedCallback();
    this.lsCart();
  }

  render() {
    return html`<div class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carrito
        </h1>
        <form
          class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
        >
          <section aria-labelledby="cart-heading" class="lg:col-span-7">
            <h2 id="cart-heading" class="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              class="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              ${this.cartItems &&
              this.cartItems.map(
                (item) =>
                  html`<li class="flex py-6 sm:py-10">
                    <div class="flex-shrink-0">
                      <img
                        src="${item.image_url}"
                        alt="Front of men&#039;s Basic Tee in sienna."
                        class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div
                      class="ml-4 flex flex-1 flex-col justify-between sm:ml-6"
                    >
                      <div
                        class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                      >
                        <div>
                          <div class="flex justify-between">
                            <h3 class="text-sm">
                              <a
                                href="#"
                                class="font-medium text-indigo-700 hover:text-indigo-800"
                                >${item.name}</a
                              >
                            </h3>
                          </div>
                          <div class="mt-1 flex text-sm">
                            <p class="text-gray-500">${item.categoryName}</p>

                            <p
                              class="ml-4 border-l border-gray-200 pl-4 text-gray-500 hidden"
                            >
                              Large
                            </p>
                          </div>
                          <p class="mt-1 text-sm  text-gray-900">
                         <div class="text-sm"> ${
                           item.price &&
                           this.clpCurrencyFormat(parseInt(item.price))
                         } c/u </div>
                         <div class="text-sm font-medium mt-1">    
                            ${this.clpCurrencyFormat(
                              parseInt(item.price && item.price * item.quantity)
                            )} total</div>
                   
                          </p>
                        </div>

                        <div class="mt-4 sm:mt-0 sm:pr-9">
                          <label for="quantity-0" class="sr-only"
                            >Quantity, Basic Tee</label
                          >
                          <select
                            id="quantity-0"
                            name="quantity-0"
                            @change =${(e) =>
                              this.changeQuantity(
                                e.target.value,
                                item.product_id
                              )}
                            class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            ${this.selectOptions(item.stock, item.quantity)}
                          </select>

                          <div class="absolute right-0 top-0">
                            <button
                              type="button"
                              @click=${() =>
                                this.deleteItemToCart(item.product_id)}
                              class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span class="sr-only">Remove</span>
                              <svg
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                        <svg
                          class="h-5 w-5 flex-shrink-0 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>En stock</span>
                      </p>
                    </div>
                  </li>`
              )}
            </ul>
            ${this.cartItems && this.cartItems.length === 0
              ? html`<div class="text-xl text-gray-600 text-center mt-24">
                  El carrito está vacío :(
                </div>`
              : null}
          </section>

          <!-- Order summary -->
          <section
            aria-labelledby="summary-heading"
            class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
              Resumen del pedido
            </h2>

            <dl class="mt-6 space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-sm text-gray-600">Subtotal</dt>
                <dd class="text-sm font-medium text-gray-900">
                  ${this.clpCurrencyFormat(this.totalCart)}
                </dd>
              </div>
              <div
                class="flex items-center justify-between border-t border-gray-200 pt-4"
              >
                <dt class="flex items-center text-sm text-gray-600">
                  <span>Costo de envío</span>
                  <a
                    href="#"
                    class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span class="sr-only"
                      >Learn more about how shipping is calculated</span
                    >
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  ${this.clpCurrencyFormat(this.shippingAmount)}
                </dd>
              </div>
              <div
                class="flex items-center justify-between border-t border-gray-200 pt-4"
              >
                <dt class="flex text-sm text-gray-600">
                  <span>IVA</span>
                  <a
                    href="#"
                    class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span class="sr-only"
                      >Learn more about how tax is calculated</span
                    >
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  ${this.clpCurrencyFormat(this.iva)}
                </dd>
              </div>
              <div
                class="flex items-center justify-between border-t border-gray-200 pt-4"
              >
                <dt class="text-base font-medium text-gray-900">
                  Total pedido
                </dt>
                <dd class="text-base font-medium text-gray-900">
                  ${this.clpCurrencyFormat(this.totalOrderAmount)}
                </dd>
              </div>
            </dl>

            <div class="mt-6">
              <a
                href="/checkout"
                type="submit"
                class="w-full rounded-md border border-transparent text-center bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Ir al pago
              </a>
            </div>
          </section>
        </form>
      </div>
    </div>`;
  }
}

customElements.define("store-cart", StoreCart);
