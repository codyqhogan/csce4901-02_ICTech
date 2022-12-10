import { AxiosResponse } from "axios";

class NetworkResponse {
  response: AxiosResponse;
  
  constructor(axiosRes : AxiosResponse) {
    this.response = axiosRes;
  }

  data(): any {
    return this.response?.data;
  }

  onSuccess(callback: (response: AxiosResponse) => any) {
    if (this.response.status < 300 && this.response.status >= 200) {
      callback(this.response);
    };
    return this;
  }

  onClientError(callback: (response: AxiosResponse) => any) {
    if (this.response.status < 500 && this.response.status >= 400) {
      callback(this.response);
    };
    return this;
  }

  onServerError(callback: (response: AxiosResponse) => any) {
    if (this.response.status < 600 && this.response.status >= 500) {
      callback(this.response);
    };
    return this;
  }

  onResolve(callback: (response: AxiosResponse) => any) {
    callback(this.response);
    return this;
  }
}

export default NetworkResponse;
