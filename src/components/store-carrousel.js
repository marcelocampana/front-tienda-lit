import { LitElement, html } from "lit";

export class StoreCarrousel extends LitElement {
  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
      />
      <div
        id="carouselExampleAutoplaying"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="images/banner.webp" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha384-/fwG9XrYIxhLZz1U45R6U+iahvDAaW+U8/Il3E9HEaPQ6aJp1U8UKJQ3ifk/2Q2"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"
        integrity="sha384-+w6fjhv6UJmd6JhG6UHcNBjfcv+X9uy0xkJFvyTrLSY0YrnNhKeRjicrOc02hgzr"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js"
        integrity="sha384-PhwTZmH2Ofm1PLtZfO9X0lziC+d5x5y5JHbSM+18wpo8tSzLQhZJdRWvYX9n37C/"
        crossorigin="anonymous"
      ></script>
    `;
  }
}

customElements.define("store-carrousel", StoreCarrousel);
