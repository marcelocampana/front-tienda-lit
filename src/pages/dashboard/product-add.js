import { LitElement, html } from "lit";
import "../../components/admin-sidebar.js";
import "../../components/admin-product-add.js";

export class ProductAdd extends LitElement {
  constructor() {
    super();
    this.page = {
      title: "Agregar Producto",
    };
  }

  render() {
    return html` <admin-sidebar>
      <h1>${this.page.title}</h1>
      <admin-product-add> </admin-product-add>
    </admin-sidebar>`;
  }
}

customElements.define("product-add", ProductAdd);
