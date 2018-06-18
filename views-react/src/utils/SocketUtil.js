import io from "socket.io-client";

class SocketUtil {
  constructor() {
    if (!SocketUtil.instance) {
      this._host = "http://localhost";
      this._port = "8888";
      this._conection = io(`${this._host + `:` + this._port}`);
      SocketUtil.instance = this;
    }
    return SocketUtil.instance;
  }
}

const instance = new SocketUtil();
Object.freeze(instance);

export default instance;
