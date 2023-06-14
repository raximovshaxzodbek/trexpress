import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";

export class BannerApi {
  static endpoint = BASE_URL+"/api/v1/rest/banners";

  static get(params) {
    return mainCaller(
      this.endpoint + "/paginate",
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static getId(id) {
    return mainCaller(this.endpoint + `/${id}`, HTTPMethods.GET);
  }
  static getProduct(id) {
    return mainCaller(this.endpoint + `/${id}/products`, HTTPMethods.GET);
  }
  static liked(id) {
    return mainCaller(this.endpoint + `/${id}/liked`, HTTPMethods.POST);
  }
}
