import mainCaller from "./mainCaller";
import HTTPMethods from "../HTTPMethods";
import {BASE_URL} from "./BASE_URL";

export class UploadApi {
  static endpoint = BASE_URL+"/api/v1/dashboard/galleries";

  static create(data) {
    return mainCaller(this.endpoint, HTTPMethods.POST, data);
  }
}


