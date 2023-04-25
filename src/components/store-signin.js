import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);
export class StoreSignin extends withTwind(LitElement) {
  constructor() {
    super();
    this.currentUser = [];
  }

  async handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const apiManager = new ApiManager("/api/v1/auth/new-user");
    const currentUser = await apiManager.addData(newUser);

    this.currentUser.push(currentUser);

    localStorage.setItem("userToken", this.currentUser[0].token);
    localStorage.setItem("currentUserName", this.currentUser[0].userName);
    localStorage.setItem("currentUserEmail", this.currentUser[0].email);
  }

  render() {
    return html` <div class="h-screen bg-gray-900">
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto w-auto hidden"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2
            class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"
          >
       Crear cuenta
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit=${this.handleSubmit}>
           <div>
              <label
                for="fullName"
                class="block text-sm font-medium leading-6 text-white"
                >Nombre</label
              >
              <div class="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
                <div class="text-sm hidden">
                  <a
                    href="#"
                    class="font-semibold text-indigo-400 hover:text-indigo-300"
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
               Crear cuenta
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-400">
            Ya tienes un cuenta?
            <a
              href="/login"
              class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
              >Accede aquí!</a
            >
          </p>
        </div>
      </div>
    </div> 
    </div>`;
  }
}

customElements.define("store-signin", StoreSignin);
