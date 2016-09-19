import {Routes, RouterModule} from '@angular/router';
import {ArticlesListComponent} from './components/articles/list';
import {ArticleDetailsComponent} from './components/articles/details';
import {HomeComponent} from './home/home';
import {ModuleWithProviders} from '@angular/core';
import {ArticlesResolver} from './resolvers/articlesResolver';

const appRoutes: Routes = [
    {
        path: 'articles', children: [
        { path: 'list', component: ArticlesListComponent },
        { path: 'details/:id', resolve: {
            article: ArticlesResolver
        }, component: ArticleDetailsComponent }
    ]
    },
    { path: '', component: HomeComponent }

];

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(appRoutes);
