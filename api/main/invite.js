import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";

export class InviteApi {
  static endpoint = BASE_URL+"/api/v1/dashboard/user/shop/invitation/";
  static get(params) {
    return mainCaller(
        BASE_URL+`/api/v1/dashboard/user/invites/paginate`,
      HTTPMethods.GET,
      null,
      null,
      params
    );
  }
  static create(uuid) {
    return mainCaller(`${this.endpoint}${uuid}/link`, HTTPMethods.POST, {});
  }
}
