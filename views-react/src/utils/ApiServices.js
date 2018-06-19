import axios from "axios";

class ApiServices {
  SendRequest(ConfigRequest) {
    console.log("SendRequest", ConfigRequest);
    switch (ConfigRequest.method) {
      case "GET":
        console.log("caso GET");
        return axios.get(ConfigRequest.url, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      case "POST":
        return;
      case "PATH":
        return;
      case "DELETE":
        return;
      default:
        return;
    }
  }
}

const services = new ApiServices();

export default services;
