import { getToken } from "./token";

class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  //headers dinámicos
  _getHeaders({ auth = false, isFormData = false } = {}) {
    const headers = {};

    if (!isFormData) {
      headers["Content-Type"] = "aplication/json";
    }

    if (auth) {
      const token = getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();

    return res.json().then((err) => {
      throw new Error(err.message || `Error ${res.status}`);
    });
  }

  //Mostrar mis proyectos de portafolio
  getProjects(category) {
    const url = category
      ? `${this.baseUrl}/portfolio?category=${category}`
      : `${this.baseUrl}/portfolio`;

    return fetch(url, { headers: this._getHeaders() }).then(
      this._checkResponse,
    );
  }

  //Agragar más proyectos
  createProject(formData) {
    return fetch(`${this.baseUrl}/portfolio`, {
      method: "POST",
      headers: this._getHeaders({ auth: true, isFormData: true }),
      body: formData,
    }).then(this._checkResponse);
  }

  //Editar un proyecto
  updateProject(id, data) {
    return fetch(`${this.baseUrl}/portfolio/${id}`, {
      method: "PUT",
      headers: this._getHeaders({ auth: true }),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  //Borrar un proyecto
  deleteProject(id) {
    return fetch(`${this.baseUrl}/portfolio/${id}`, {
      method: "DELETE",
      headers: this._getHeaders({ auth: true }),
    }).then(this._checkResponse);
  }
}

//instancia para llamar a las apis
const api = new Api({
  baseUrl: "http://localhost:3000",
});

export default api;
