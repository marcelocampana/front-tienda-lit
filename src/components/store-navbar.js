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
      showMobilelMenu: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.username = "";
    this.userId = "";
    this.showMobilelMenu = false;
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
       ${
         this.showMobilelMenu
           ? html` <div class="relative z-40 " role="dialog" aria-modal="true">
               <div class="fixed inset-0 bg-black bg-opacity-25"></div>

               <div class="fixed inset-0 z-40 flex">
                 <div
                   class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                 >
                   <div class="flex px-4 pt-5 pb-2">
                     <button
                      @click=${() => (this.showMobilelMenu = false)}
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
                   <div class="mt-2">
                     <div class="border-b border-gray-200">
                       <div
                         class="-mb-px flex space-x-8 px-4"
                         aria-orientation="horizontal"
                         role="tablist"
                       >
                         <a
                           href="/"
                           id="tabs-1-tab-1"
                           class="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                           aria-controls="tabs-1-panel-1"
                           role="tab"
                           type="button"
                         >
                           Catálogos
                         </a>

                         <protected-link
                           class="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                           href=${`/customer-orders?${this.userId}`}
                           text="Mis pedidos"
                         >
                         </protected-link>
                       </div>
                     </div>

                     <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                       <div class="flow-root">
                         <a
                           href=${this.username === "" ? "/login" : "#"}
                           class="-m-2 block p-2 font-medium text-gray-900"
                           > ${
                             this.username === ""
                               ? "Acceder"
                               : `Hola, ${this.username}`
                           }</a
                         >
                       </div>
                       <div class="flow-root">
                        ${
                          this.username === ""
                            ? html`<a
                                href="/signin"
                                class="-m-2 block p-2 font-medium text-gray-900"
                                >Crear cuenta</a
                              >`
                            : html`<button
                                @click=${() => this.closeSession()}
                                class="text-sm font-medium text-gray-700 hover:text-gray-800"
                              >
                                Cerrar sesión
                              </button>`
                        }
                      
                         
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>`
           : null
       }
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
                <!-- Mobile menu -->
                <button
                  type="button"
                  @click=${() => (this.showMobilelMenu = true)}
                  class="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                >
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

                <div class="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div class="flex h-full space-x-8">
                    <div class="flex">
                      <div class="relative flex">
                   
                        <a
                          href="/"
                          type="button"
                          class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                          aria-expanded="false"
                        >
                          Catálogo
                        </a>
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

                    <div class="flex">
                      <div class="relative flex">

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
                        ${
                          this.username === ""
                            ? "Acceder"
                            : `Hola, ${this.username}`
                        }
                      </div></a
                    >
                    <span
                      class="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                    ${
                      this.username === ""
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
                          </button>`
                    }
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
                      ${
                        this.totalCountCartItems &&
                        this.totalCountCartItems !== 0
                          ? html`<span
                              class="mx-auto -mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-200 text-green-200"
                            >
                              0
                            </span>`
                          : null
                      }

                      <span class="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>`;
  }
}

customElements.define("store-navbar", StoreNavbar);
