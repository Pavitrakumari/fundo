import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private cart: HttpClient,
    private service :GeneralService) { }
    url = environment.baseUrl;/**url */

  addToCart(body) {
    let url = this.url + "/productcarts/addToCart";
    return this.service.httpPost(url, body);
  }

  cartDetails(cartId) {
    console.log("cart id in cartservice",cartId);
    let url = this.url + "productcarts/getCartDetails/"+cartId;
    return this.service.httpget(url);
  }
  placeOrder(body){
    console.log('szhgjaw',body);
    let url=this.url+"productcarts/placeOrder";
    return this.service.httpPost(url,body)

  }
  myCart(){
    this.url = this.url+"/productcarts/myCart"
    return this.service.httpget(this.url)
  }

}
