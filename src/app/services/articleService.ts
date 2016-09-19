import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ODataListResponse} from '../models/odataListResponse';
import {Article} from '../models/article';

@Injectable()
export class ArticlesService {

    private _apiUrl: string = 'https://ngmd.azurewebsites.net/api/';

    constructor(private _http: Http) {

    }

    public getAllArticles() {
        return this._http.get(`${this._apiUrl}articlesdemo`)
            .map(response => <ODataListResponse<Article>>response.json())
            .map((oResponse: ODataListResponse<Article>) => oResponse.Items);
    }

    getArticleById(id: string) {
        return this._http.get(`${this._apiUrl}articlesdemo/${id}`)
            .map(response => <Article>response.json());

    }
}

