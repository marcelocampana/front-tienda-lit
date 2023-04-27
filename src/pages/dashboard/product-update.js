import { LitElement, html } from "lit";
import "../../components/admin-sidebar.js";
import "../../components/admin-product-update.js";
import install from "@twind/with-web-components";
import config from "../../../twind.config.js";

const withTwind = install(config);

export class productUpdate extends withTwind(LitElement) {
  constructor() {
    super();
    this.page = {
      title: "Detalle del Producto",
    };
  }

  render() {
    return html` <admin-sidebar>
      <h1 class="text-3xl text-gray-600 ">${this.page.title}</h1>
      <admin-product-update></admin-product-update>
    </admin-sidebar>`;
  }
}

customElements.define("product-update", productUpdate);
