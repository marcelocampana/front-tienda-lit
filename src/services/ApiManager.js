import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken-promisified";

export class ApiManager {
  constructor(apiUrl) {
    this.apiUrl = `${process.env.API_HOSTNAME}${apiUrl}`;
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

  createToken(user) {
    try {
      const token = jwt.sign(user, process.env.SECRET_KEY);
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error al crear el token:", error);
    }
  }

  checkPassword(passwordToCheck, storedPassword) {
    const bytes = CryptoJS.AES.decrypt(
      storedPassword,
      process.env.PASSWORD_KEY
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword === passwordToCheck
      ? true //password match
      : false; //password not match
  }

  async verifyUser(credentials) {
    try {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(credentials),
      };
      const response = await fetch(this.apiUrl, options);
      if (response.ok) {
        const user = await response.json();
        let result;
        if (user) {
          result = !this.checkPassword(credentials.password, user.password)
            ? "password not match"
            : this.createToken(user);
        } else {
          result = "Usuario no existe";
        }
        return result;
      } else {
        console.error("Error al obtener el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }
}
