// // protected-link.js
// import { LitElement, html } from "lit";

// class ProtectedLink extends LitElement {
//   static get properties() {
//     return {
//       href: { type: String },
//       text: { type: String },
//     };
//   }

//   constructor() {
//     super();
//     this.href = "";
//     this.text = "";
//   }

//   async handleClick(event) {
//     event.preventDefault();

//     try {
//       const response = await fetch(this.href, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });

//       if (response.ok) {
//         const htmlContent = await response.text();
//         document.querySelector("#content").innerHTML = htmlContent;
//         history.pushState(null, "", this.href);
//       } else {
//         throw new Error("Error al cargar la ruta protegida");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   render() {
//     return html`
//       <a href="${this.href}" @click="${this.handleClick}"> ${this.text} </a>
//     `;
//   }
// }

// customElements.define("protected-link", ProtectedLink);
