import { LitElement, html } from "lit";
import "../../components/admin-sidebar.js";
import "../../components/admin-table.js";

export class ProductList extends LitElement {
  render() {
    return html`<admin-sidebar><admin-table></admin-table></admin-sidebar>`;
  }
}

customElements.define("product-list", ProductList);
