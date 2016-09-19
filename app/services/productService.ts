import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Product} from '../models/product';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService{
    private apiUrl;
    constructor(private _http: Http){

    }

    public getAllProducts(){
        return this._http.get(`${this.apiUrl}/products`)
            .map(response => <Array<Product>>response.json());

    }
}
