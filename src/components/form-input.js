import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

export class FormInput extends withTwind(LitElement) {
  constructor({ label, name, id, type }) {
    super();
    this.label = label;
    this.inputName = name;
    this.inputId = id;
    this.inputType = type;
  }

  render() {
    return html`
      <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label
            for="${this.inputName}"
            class="block text-sm font-medium leading-6 text-gray-900"
            >${this.label}</label
          >
          <div class="mt-1">
            <input
              type="${this.inputType}"
              name="${this.inputName}"
              id="${this.inputId}"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("form-input", FormInput);
