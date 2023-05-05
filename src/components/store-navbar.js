import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

import { ApiManager } from "../services/ApiManager.js";

export class StoreNavbar extends withTwind(LitElement) {
  static get properties() {
    return {
      cartItems: { type: Array },
      totalCountCartItems: { type: Number },
      username: { type: String },
      userId: { type: String },
    };
  }

  constructor() {
    super();
    this.username = "";
    this.userId = "";
  }

  countCartItems() {
    this.cartItems = JSON.parse(localStorage.getItem("cart"));
    const totalCartItems =
      this.cartItems &&
      this.cartItems.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
    this.totalCountCartItems = totalCartItems;
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
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.username = "";
    }
  }

  closeSession() {
    localStorage.removeItem("authToken");
    this.username = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.countCartItems();
    this.valTk();
    window.addEventListener("cart-updated", () => {
      this.countCartItems();
    });
  }

  render() {
    return html`<div class="bg-white">
      <div class="relative z-40 hidden" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-black bg-opacity-25"></div>

        <div class="fixed inset-0 z-40 flex">
          <div
            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
          >
            <div class="flex px-4 pt-5 pb-2">
              <button
                type="button"
                class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
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

            <!-- Links -->
            <div class="mt-2">
              <div class="border-b border-gray-200">
                <div
                  class="-mb-px flex space-x-8 px-4"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-900" -->
                  <a
                    href="/"
                    id="tabs-1-tab-1"
                    class="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                    aria-controls="tabs-1-panel-1"
                    role="tab"
                    type="button"
                  >
                    Catálogo
                  </a>

                  <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-900" -->
                  <protected-link
                    class="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                    href=${`/customers-orders`}
                    text="Mis pedidos"
                  >
                  </protected-link>
                </div>
              </div>

              <!-- 'Women' tab panel, show/hide based on tab state. -->
              <div
                id="tabs-1-panel-1"
                class="space-y-10 px-4 pt-10 pb-8"
                aria-labelledby="tabs-1-tab-1"
                role="tabpanel"
                tabindex="0"
              >
                <div class="grid grid-cols-2 gap-x-4">
                  <div class="group relative text-sm">
                    <div
                      class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                    >
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg"
                        alt="Models sitting back to back, wearing Basic Tee in black and bone."
                        class="object-cover object-center"
                      />
                    </div>
                    <a href="#" class="mt-6 block font-medium text-gray-900">
                      <span
                        class="absolute inset-0 z-10"
                        aria-hidden="true"
                      ></span>
                      New Arrivals
                    </a>
                    <p aria-hidden="true" class="mt-1">Shop now</p>
                  </div>

                  <div class="group relative text-sm">
                    <div
                      class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                    >
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg"
                        alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
                        class="object-cover object-center"
                      />
                    </div>
                    <a href="#" class="mt-6 block font-medium text-gray-900">
                      <span
                        class="absolute inset-0 z-10"
                        aria-hidden="true"
                      ></span>
                      Basic Tees
                    </a>
                    <p aria-hidden="true" class="mt-1">Shop now</p>
                  </div>
                </div>

                <div>
                  <p
                    id="women-clothing-heading-mobile"
                    class="font-medium text-gray-900"
                  >
                    Clothing
                  </p>
                  <ul
                    role="list"
                    aria-labelledby="women-clothing-heading-mobile"
                    class="mt-6 flex flex-col space-y-6"
                  >
                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Tops</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Dresses</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Pants</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Denim</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Sweaters</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >T-Shirts</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Jackets</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Activewear</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Browse All</a
                      >
                    </li>
                  </ul>
                </div>

                <div>
                  <p
                    id="women-accessories-heading-mobile"
                    class="font-medium text-gray-900"
                  >
                    Accessories
                  </p>
                  <ul
                    role="list"
                    aria-labelledby="women-accessories-heading-mobile"
                    class="mt-6 flex flex-col space-y-6"
                  >
                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Watches</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Wallets</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Bags</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Sunglasses</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Hats</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Belts</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p
                    id="women-brands-heading-mobile"
                    class="font-medium text-gray-900"
                  >
                    Brands
                  </p>
                  <ul
                    role="list"
                    aria-labelledby="women-brands-heading-mobile"
                    class="mt-6 flex flex-col space-y-6"
                  >
                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Full Nelson</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >My Way</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Re-Arranged</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Counterfeit</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Significant Other</a
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <!-- 'Men' tab panel, show/hide based on tab state. -->
              <div
                id="tabs-1-panel-2"
                class="space-y-10 px-4 pt-10 pb-8"
                aria-labelledby="tabs-1-tab-2"
                role="tabpanel"
                tabindex="0"
              >
                <div class="grid grid-cols-2 gap-x-4">
                  <div class="group relative text-sm">
                    <div
                      class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                    >
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg"
                        alt="Drawstring top with elastic loop closure and textured interior padding."
                        class="object-cover object-center"
                      />
                    </div>
                    <a href="#" class="mt-6 block font-medium text-gray-900">
                      <span
                        class="absolute inset-0 z-10"
                        aria-hidden="true"
                      ></span>
                      New Arrivals
                    </a>
                    <p aria-hidden="true" class="mt-1">Shop now</p>
                  </div>

                  <div class="group relative text-sm">
                    <div
                      class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                    >
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg"
                        alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt."
                        class="object-cover object-center"
                      />
                    </div>
                    <a href="#" class="mt-6 block font-medium text-gray-900">
                      <span
                        class="absolute inset-0 z-10"
                        aria-hidden="true"
                      ></span>
                      Artwork Tees
                    </a>
                    <p aria-hidden="true" class="mt-1">Shop now</p>
                  </div>
                </div>

                <div>
                  <p
                    id="men-clothing-heading-mobile"
                    class="font-medium text-gray-900"
                  >
                    Clothing
                  </p>
                  <ul
                    role="list"
                    aria-labelledby="men-clothing-heading-mobile"
                    class="mt-6 flex flex-col space-y-6"
                  >
                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Tops</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Pants</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Sweaters</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >T-Shirts</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Jackets</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Activewear</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Browse All</a
                      >
                    </li>
                  </ul>
                </div>

                <div>
                  <p
                    id="men-accessories-heading-mobile"
                    class="font-medium text-gray-900"
                  >
                    Accessories
                  </p>
                  <ul
                    role="list"
                    aria-labelledby="men-accessories-heading-mobile"
                    class="mt-6 flex flex-col space-y-6"
                  >
                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Watches</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Wallets</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Bags</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Sunglasses</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Hats</a>
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500">Belts</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p
                    id="men-brands-heading-mobile"
                    class="font-medium text-gray-900"
                  >
                    Brands
                  </p>
                  <ul
                    role="list"
                    aria-labelledby="men-brands-heading-mobile"
                    class="mt-6 flex flex-col space-y-6"
                  >
                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Re-Arranged</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Counterfeit</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >Full Nelson</a
                      >
                    </li>

                    <li class="flow-root">
                      <a href="#" class="-m-2 block p-2 text-gray-500"
                        >My Way</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
              <div class="flow-root">
                <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                  >Mujer</a
                >
              </div>

              <div class="flow-root">
                <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                  >Infantil</a
                >
              </div>
            </div>

            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
              <div class="flow-root">
                <a
                  href="/login"
                  class="-m-2 block p-2 font-medium text-gray-900"
                  >Acceder</a
                >
              </div>
              <div class="flow-root">
                <a
                  href="/signin"
                  class="-m-2 block p-2 font-medium text-gray-900"
                  >Crear cuenta</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <header class="relative bg-white">
        <p
          class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
        >
          Envíos gratis a todo Chile en compras sobre $30.000!
        </p>

        <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="border-b border-gray-200">
            <div class="flex h-16 items-center">
              <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. -->
              <button
                type="button"
                class="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span class="sr-only">Open menu</span>
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              <!-- Logo -->
              <div class="ml-4 flex lg:ml-0">
                <a href="/">
                  <span class="sr-only"></span>
                  <img
                    class="h-10 w-auto"
                    src="images/logo-tienda.png"
                    alt=""
                  />
                </a>
              </div>

              <!-- Flyout menus -->
              <div class="hidden lg:ml-8 lg:block lg:self-stretch">
                <div class="flex h-full space-x-8">
                  <div class="flex">
                    <div class="relative flex">
                      <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->
                      <a
                        href="/"
                        type="button"
                        class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                        aria-expanded="false"
                      >
                        Catálogo
                      </a>
                    </div>

                    <!--
                      'Women' flyout menu, show/hide based on flyout menu state.
    
                      Entering: "transition ease-out duration-200"
                        From: "opacity-0"
                        To: "opacity-100"
                      Leaving: "transition ease-in duration-150"
                        From: "opacity-100"
                        To: "opacity-0"
                    -->
                    <div
                      class="absolute inset-x-0 top-full text-sm text-gray-500"
                    >
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div
                        class="absolute inset-0 top-1/2 bg-white shadow"
                        aria-hidden="true"
                      ></div>

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8"></div>
                      </div>
                    </div>
                  </div>

                  <div class="flex">
                    <div class="relative flex">
                      <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->
                      <button
                        type="button"
                        class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                        aria-expanded="false"
                      >
                        <protected-link
                          class="border-transparent text-gray-700 flex-1 whitespace-nowrap border-b-2 py-4 px-1 mt-1 text-base font-medium text-sm"
                          href=${`/customer-orders?${this.userId}`}
                          text="Mis pedidos"
                        >
                        </protected-link>
                      </button>
                    </div>

                    <div
                      class="absolute inset-x-0 top-full text-sm text-gray-500"
                    >
                      <div
                        class="absolute inset-0 top-1/2 bg-white shadow"
                        aria-hidden="true"
                      ></div>

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="ml-auto flex items-center">
                <div
                  class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
                >
                  <a
                    href=${this.username === "" ? "/login" : "#"}
                    class="text-sm font-medium text-gray-700 hover:text-gray-800"
                    ><div>
                      ${this.username === ""
                        ? "Acceder"
                        : `Hola, ${this.username}`}
                    </div></a
                  >
                  <span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                  ${this.username === ""
                    ? html`<a
                        href="/signin"
                        class="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >Crear cuenta</a
                      >`
                    : html`<button
                        @click=${() => this.closeSession()}
                        class="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Cerrar sesión
                      </button>`}
                </div>

                <!-- Cart -->
                <div class="ml-4 flow-root lg:ml-6">
                  <a href="/cart" class="group -m-2 flex items-center p-2">
                    <svg
                      class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    ${this.totalCountCartItems && this.totalCountCartItems !== 0
                      ? html`<span
                          class="mx-auto -mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-200 text-green-200"
                        >
                          0
                        </span>`
                      : null}

                    <span class="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>`;
  }
}

customElements.define("store-navbar", StoreNavbar);
