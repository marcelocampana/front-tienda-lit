import { LitElement, html } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import install from "@twind/with-web-components";
import config from "../../twind.config.js";

const withTwind = install(config);
class ProtectedLink extends withTwind(LitElement) {
  static get properties() {
    return {
      href: { type: String },
      text: { type: String },
      class: { type: String },
      svgCode: { type: String },
      style: { type: String },
    };
  }

  constructor() {
    super();
    this.href = "";
    this.text = "";
    this.class = "";
    this.svgCode = "";
    this.style = "";
  }

  async handleClick(e) {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(this.href, { method: "GET", headers });

    if (response.ok) {
      if (!token) {
        window.location.href = "/login";
      } else {
        // Actualiza la propiedad 'route' de 'RouterComponent'
        window.history.pushState({}, "", this.href);
        const routerComponent = document.querySelector("router-component");
        routerComponent.route = this.href;
      }
    } else {
      console.error("Error al acceder a la ruta protegida");
    }
  }

  render() {
    return html`
      <slot></slot>
      <a
        href="${this.href}"
        @click="${this.handleClick}"
        class="${this.class}"
        style="${this.style}"
      >
        ${this.svgCode ? unsafeSVG(this.svgCode) : this.text}
      </a>
    `;
  }
}

customElements.define("protected-link", ProtectedLink);
