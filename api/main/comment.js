import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";

export class CommentApi {
  static endpoint = BASE_URL+"/api/v1/rest/products/review";

  static create(data, uuid) {
    return mainCaller(`${this.endpoint}/${uuid}`, HTTPMethods.POST, data);
  }
}



