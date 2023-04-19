import { LitElement, html } from "lit";
import "../../components/admin-sidebar.js";
import "../../components/form-input.js";
import { FormInput } from "../../components/form-input.js";
import "../../components/form-button.js";
import { FormTextarea } from "../../components/form-textarea.js";
import { FormSelect } from "../../components/form-select.js";

export class AddProduct extends LitElement {
  constructor() {
    super();
    this.page = {
      title: "Agregar Producto",
    };
  }

  render() {
    return html` <admin-sidebar>
      <h1>${this.page.title}</h1>
      <form>
        ${new FormInput({
          label: "Nombre",
          name: "nombre",
          id: "nombre",
          type: "text",
        })}
        ${new FormTextarea({
          label: "Descripción",
          name: "description",
          id: "description",
        })}
        ${new FormSelect({
          label: "Categoria",
          name: "category",
          id: "category",
        })}
        ${new FormInput({
          label: "Precio",
          name: "nombre",
          id: "nombre",
          type: "number",
        })}
        ${new FormInput({
          label: "Sku",
          name: "sku",
          id: "sku",
          type: "text",
        })}
        <form-button></form-button>
      </form>
    </admin-sidebar>`;
  }
}

customElements.define("add-product", AddProduct);
