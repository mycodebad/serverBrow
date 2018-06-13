/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 * @description Return data request
 */
class dataRequest {
  constructor(Data) {
    this.method = Data.method;
    this.host = Data.host;
    this.url = Data.url;
    this.status = Data.status;
    this.headers = Data.headers;
    this.request = Data.request;
    this.createdAt = Data.createdAt;
    this.response = Data.response;
  }
}

module.exports = dataRequest;
