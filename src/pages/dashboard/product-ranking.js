import { LitElement, html } from "lit";
import "../../components/admin-sidebar.js";
import "../../components/admin-product-ranking.js";

export class ProductRanking extends LitElement {
  render() {
    return html`<admin-sidebar><admin-ranking></admin-ranking></admin-sidebar>`;
  }
}

customElements.define("product-ranking", ProductRanking);
