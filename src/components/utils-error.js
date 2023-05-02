import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);
export class UtilsError extends withTwind(LitElement) {
  static get properties() {
    return {
      text: { type: String },
    };
  }

  constructor() {
    super();
    this.text = "";
  }

  render() {
    return html`<div class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-red-800 -mt-0.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-red-800">${this.text}</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5"></div>
        </div>
      </div>
    </div> `;
  }
}

customElements.define("utils-error", UtilsError);
