import {Component, OnInit} from '@angular/core';
import {ArticlesService} from '../../services/articleService';
import {Article} from '../../models/article';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'articles-list',
    templateUrl: 'list.html'
})
export class ArticlesListComponent implements OnInit{

    constructor(private _articlesService: ArticlesService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute
    ){

    }

    public articles: Array<Article>;

    public openDetails(article: Article){
        this._router.navigate([`../details/${article.Id}`], {relativeTo: this._activatedRoute});
    }
    public ngOnInit(): void {
        this._articlesService.getAllArticles()
            .subscribe(
                (result) => this.articles = result,
                (err) => console.warn(err)
            );
    }
}
