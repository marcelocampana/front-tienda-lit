import { LitElement, html } from "lit";
import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

export class FormSelect extends withTwind(LitElement) {
  constructor({ label, name, id }) {
    super();
    this.label = label;
    this.name = name;
    this.id = id;
  }
  render() {
    return html`<div
      class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div class="sm:col-span-3">
        <label
          for="${this.name}"
          class="block text-sm font-medium leading-6 text-gray-900"
          >  ${this.label} </label
        >
        <div class="mt-1">
          <select
            id="${this.id}"
            name="${this.name}"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div>
    </div>
 </div>`;
  }
}

customElements.define("form-select", FormSelect);
