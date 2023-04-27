import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);
export class StoreLogin extends withTwind(LitElement) {
  constructor() {
    super();
    this.currentUser = [];
    this.href = "/dashboard/product-list";
    this.endUserRoleHref = "/checkout";
  }

  async handleLogin(e) {
    e.preventDefault();

    const loginDataForm = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const apiManager = new ApiManager("/api/v1/auth");
    const currentUser = await apiManager.login(loginDataForm);

    this.currentUser.push(currentUser);

    localStorage.setItem("authToken", this.currentUser[0].token);
    localStorage.setItem("currentUserName", this.currentUser[0].userName);
    localStorage.setItem("currentUserEmail", this.currentUser[0].email);
    // this.requestUpdate();

    if (this.currentUser[0].roleName === "admin") {
      const token = localStorage.getItem("authToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(this.href, { method: "GET", headers });

      if (response.ok) {
        // Actualiza la propiedad 'route' de 'RouterComponent'
        window.history.pushState({}, "", this.href);
        const routerComponent = document.querySelector("router-component");
        routerComponent.route = this.href;
      }
    } else {
      window.location.href = this.endUserRoleHref;
      //window.location.href = window.location.pathname;
    }
  }

  render() {
    return html`<div class="h-screen bg-gray-900">
    ${this.currentUser[0] && this.currentUser[0].email}
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          <img
            class="mx-auto w-12"
            src="images/logo-tienda-circle.png"
            alt="Store"
          />
          </a>
          <h2
            class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
          >
          Acceder
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit=${this.handleLogin}>
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-white"
                >Email</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-white"
                  >Contraseña</label
                >
                <div class="text-sm">
                  <a
                    href="/signin"
                    class="hidden font-semibold text-indigo-400 hover:text-indigo-300"
                    >Forgot password?</a
                  >
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Acceder
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-400">
            No tienes cuenta?
            <a
              href="/signin"
              class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
              >Crea una aquí</a
            >
          </p>
        </div>
      </div>
    </div> 
    </div>`;
  }
}

customElements.define("store-login", StoreLogin);
