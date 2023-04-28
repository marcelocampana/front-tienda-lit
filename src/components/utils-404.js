import { LitElement, html } from "lit";

export class Error404 extends LitElement {
  render() {
    return html` <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      />
      <div
        class="page-wrap d-flex flex-row align-items-center bg-body-secondary"
        style="height: 800px;"
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12 text-center">
              <span class="display-1 d-block">404</span>
              <div class="mb-4 lead">Esta página no fue encontrada</div>
              <a href="http://localhost:3000" class="btn btn-link"
                >Ir al inicio</a
              >
            </div>
          </div>
        </div>
      </div>`;
  }
}

customElements.define("utils-404", Error404);
