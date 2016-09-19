import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../models/article';

@Component({
    moduleId: module.id,
    selector: 'article-details',
    templateUrl: 'details.html'
})
export class ArticleDetailsComponent implements OnInit {

    constructor(private _activatedRoute: ActivatedRoute) {

    }

    public article: Article;

    public ngOnInit(): void {

    }
}
