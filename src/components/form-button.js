import { LitElement, html } from "lit";
import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

export class FormButton extends withTwind(LitElement) {
  render() {
    return html` <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Guardar
      </button>
    </div>`;
  }
}

customElements.define("form-button", FormButton);
