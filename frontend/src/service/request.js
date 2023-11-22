import usersStorage from "../utils/functions.js";

class Request {
  baseUrl = "http://localhost:3001";

  async send(url, method, body) {
    const ownerId = usersStorage.get("user")?.id;

    const headers = {
      "Content-Type": "application/json",
    };

    if (ownerId) {
      headers["Authorization"] = ownerId;
    }

    const params = {
      method,
      headers,
    };

    if (body) {
      params.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(this.baseUrl + url, params);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }

  get(url) {
    return this.send(url, "GET");
  }
  post(url, body) {
    return this.send(url, "POST", body);
  }
  delete(url) {
    return this.send(url, "DELETE");
  }
  put(url, body) {
    return this.send(url, "PUT", body);
  }
}
const request = new Request();
export default request;
