import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";

export class TransactionsApi {
  static endpoint = BASE_URL+"/api/v1/payments/order/";

  static create(id, data) {
    return mainCaller(
      `${this.endpoint}${id}/transactions`,
      HTTPMethods.POST,
      data
    );
  }
}
