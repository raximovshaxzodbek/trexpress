import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";

export class AddressApi {
  static endpoint = BASE_URL+"/api/v1/dashboard/user/addresses";

  static get(params) {
    return mainCaller(this.endpoint, HTTPMethods.GET, null, null, params);
  }
  static getId(id) {
    return mainCaller(this.endpoint + `/${id}`, HTTPMethods.GET);
  }
  static create(data) {
    return mainCaller(this.endpoint, HTTPMethods.POST, data);
  }

  static update(id, data) {
    return mainCaller(this.endpoint + `/${id}`, HTTPMethods.PUT, data);
  }

  static delete(id) {
    return mainCaller(this.endpoint + `/${id}`, HTTPMethods.DELETE);
  }
}
