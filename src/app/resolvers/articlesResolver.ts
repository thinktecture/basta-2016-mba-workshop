import {Injectable} from '@angular/core';
import {Article} from '../models/article';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {ArticlesService} from '../services/articleService';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ArticlesResolver implements Resolve<Article>{

    constructor(private _articlesService: ArticlesService){

    }
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {

        return this._articlesService.getArticleById(route.params['id']);

    }

}
