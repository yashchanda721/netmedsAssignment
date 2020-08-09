import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private Http: HttpClient) { }

  get_item_list() {
    return this.Http.get(`http://localhost/netmedsAssignment/User/getItemList`);
  }

  add_user_items(data,id) {
    return this.Http.post(`http://localhost/netmedsAssignment/User/add_user_items/`+id, data);
  }

  get_user_selected_item_list(id) {
    return this.Http.get(`http://localhost/netmedsAssignment/User/get_user_selected_item_list/`+id);
  }

  get_user_purchased_item_list(id) {
    return this.Http.get(`http://localhost/netmedsAssignment/User/get_user_purchased_item_list/`+id);
  }

  make_purchase(id) {
    return this.Http.get(`http://localhost/netmedsAssignment/User/make_purchase/`+id);
  }

  delete_user_selected_item_list(id) {
    return this.Http.get(`http://localhost/netmedsAssignment/User/delete_user_selected_item_list/`+id);
  }
  
  delete_selected_item(id) {
    return this.Http.post(`http://localhost/netmedsAssignment/User/delete_selected_item`, id);
  }

  loginUser(data){
    return this.Http.post(`http://localhost/netmedsAssignment/User/loginUser`, data);
  }
}
