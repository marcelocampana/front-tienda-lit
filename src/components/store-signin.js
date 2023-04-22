import { LitElement, html } from "lit";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken-promisified";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";
import { ApiManager } from "../services/ApiManager.js";

const withTwind = install(config);
export class StoreSignin extends withTwind(LitElement) {
  async handleSubmit(e) {
    e.preventDefault();
    console.log(process.env.PASSWORD_KEY);
    const payload = { id: 123 };
    const secretKey = process.env.SECRET_KEY;
    const token = await jwt.sign(payload, secretKey);

    const encryptedPassword = CryptoJS.AES.encrypt(
      e.target.password.value,
      process.env.PASSWORD_KEY
    ).toString();

    console.log(encryptedPassword);
    const user = {
      email: e.target.email.value,
      password: encryptedPassword,
    };
    const apiManager = new ApiManager("/api/auth");
    const result = await apiManager.addData(user);
    console.log(token, "--", result, process.env.PASSWORD_KEY);
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
