import axios from "axios";

class ApiServices {
  SendRequest(ConfigRequest) {
    console.log("SendRequest", ConfigRequest);
    switch (ConfigRequest.method) {
      case "GET":
        return axios.get(ConfigRequest.url, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      case "POST":
        return axios.post(ConfigRequest.url, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      case "PATH":
        return axios.path(ConfigRequest.url, {
          headers: {
            "Content-Type": "application/json"
          }
        });

      case "DELETE":
        return axios.delete(ConfigRequest.url, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      default:
        return axios.get(ConfigRequest.url, {
          headers: {
            "Content-Type": "application/json"
          }
        });
    }
  }
}

let services = new ApiServices();

export default services;
