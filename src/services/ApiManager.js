export class ApiManager {
  constructor(apiUrl) {
    this.apiUrl = `${process.env.API_HOSTNAME}${apiUrl}`;
  }

  async getData(uniqueValue) {
    try {
      const response = await fetch(`${this.apiUrl}/${uniqueValue}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  async getAllData() {
    try {
      const response = await fetch(this.apiUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  async addData(record) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(record),
      };
      const response = await fetch(this.apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  async updateData(id, record) {
    try {
      const options = {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(record),
      };
      const response = await fetch(`${this.apiUrl}${id}`, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  async deleteData(id) {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-type": "application/json;charset=UTF-8" },
      };
      const response = await fetch(`${this.apiUrl}${id}`, options);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al eliminar datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  async login(userData) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(userData),
      };
      const response = await fetch(this.apiUrl, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
