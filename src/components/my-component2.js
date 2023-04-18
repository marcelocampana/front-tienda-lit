import { LitElement, html } from "lit";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);

export class Home2 extends withTwind(LitElement) {
  render() {
    return html` <p class="text-4xl font-bold underline">Home2!</p>
      <p class="text-blue-500">This text should be blue</p>`;
  }
}
customElements.define("component-home2", Home2);
