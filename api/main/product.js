import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";
export class ProductApi {
  static endpoint = BASE_URL+"/api/v1/rest/products";

  static get(params) {
    return mainCaller(
      this.endpoint + "/paginate",
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getDiscount(params) {
    return mainCaller(
      this.endpoint + "/discount",
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getMostSales(params) {
    return mainCaller(
      this.endpoint + "/most-sold",
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getId(id) {
    return mainCaller(this.endpoint + `/${id}`, HTTPMethods.GET, null, null);
  }
  static checkIds(params) {
    return mainCaller(
      this.endpoint + "/ids",
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
}
