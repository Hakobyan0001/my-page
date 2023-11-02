import usersStorage from "../utils/functions.js";

class Request {
  baseUrl = "http://localhost:3001";
  async send(url, method, body) {
    const ownerId = usersStorage.get("user").id;

    let params = {
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: ownerId,
      },
    };
    if (body) {
      params.body = JSON.stringify(body);
    }
    const response = await fetch(this.baseUrl + url, params);
    const res = await response.json();
    return res;
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