import { LitElement, html } from "lit";
import "../../components/admin-sidebar.js";

export class SidebarLayout extends LitElement {
  render() {
    return html` <admin-sidebar></admin-sidebar> `;
  }
}

customElements.define("sidebar-layout", SidebarLayout);
