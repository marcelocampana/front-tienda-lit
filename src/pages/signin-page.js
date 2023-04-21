import { LitElement, html } from "lit";
import "../components/store-signin.js";

export class SigninPage extends LitElement {
  render() {
    return html` <store-signin></store-signin>`;
  }
}

customElements.define("signin-page", SigninPage);
