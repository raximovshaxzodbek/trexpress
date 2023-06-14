import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";

export class CheckCoupon {
  static endpoint = BASE_URL+"/api/v1/rest/coupons/check";

  static create(data) {
    return mainCaller(this.endpoint, HTTPMethods.POST, data);
  }
}
