import { LitElement, html } from "lit";
import "../../components/admin-sidebar.js";
import "../../components/admin-product-update.js";

export class productUpdate extends LitElement {
  constructor() {
    super();
    this.page = {
      title: "Modificar Producto",
    };
  }

  render() {
    return html` <admin-sidebar>
      <h1>${this.page.title}</h1>
      <admin-product-update> </admin-product-update>
    </admin-sidebar>`;
  }
}

customElements.define("product-update", productUpdate);
