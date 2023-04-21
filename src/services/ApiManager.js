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
        return data;
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  async verifyUser(record) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(record),
      };
      const response = await fetch(this.apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        /*  if (!user) {
          console.log("Usuario no encontrado");
        } else {
          const passwordMatchs = await bcrypt.compare(
            data.password,
            record.email
          );
          passwordMatchs
            ? console.log("Usuario y Contraseña correctas")
            : console.log("Contraseña incorrecta");
        } */
        return data;
      } else {
        console.error("Error al obtener el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }
}
