export class ApiManager {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  async getData() {
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
        console.log("dato guardado");
        return data;
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  addRecord(record) {
    const options = {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(record),
    };
    fechData(`https://bsite.net/metalflap/${this.endPoint}`, options);
  }

  updateRecord(record) {
    const options = {
      method: "PUT",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(record),
    };

    fechData(`https://bsite.net/metalflap/${this.endPoint}`, options);
  }
}
