import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";

export class OrderApi {
  static endpoint = BASE_URL+"/api/v1/dashboard/user/orders";
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
  static create(data) {
    return mainCaller(`${this.endpoint}`, HTTPMethods.POST, data);
  }
  static createReview(data) {
    return mainCaller(
      `${this.endpoint}/review/${data.id}`,
      HTTPMethods.POST,
      data
    );
  }
  static statusChange(id) {
    return mainCaller(
      `${this.endpoint}/${id}/status/change`,
      HTTPMethods.POST,
      { status: "canceled" }
    );
  }
}
