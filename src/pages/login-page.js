import { LitElement, html } from "lit";
import "../components/store-login.js";

export class LoginPage extends LitElement {
  render() {
    return html` <store-login></store-login>`;
  }
}

customElements.define("login-page", LoginPage);
