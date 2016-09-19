import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RootComponent} from './components/root/root';
import {HttpModule} from '@angular/http';
import {ArticlesService} from './services/articleService';
import {ArticlesListComponent} from './components/articles/list';
import {APP_ROUTES} from './appRoutes';
import {ArticleDetailsComponent} from './components/articles/details';
import {HomeComponent} from './home/home';
import {ArticlesResolver} from './resolvers/articlesResolver';

@NgModule({
    imports: [ BrowserModule, HttpModule, APP_ROUTES ],
    declarations: [
        RootComponent,
        ArticlesListComponent,
        ArticleDetailsComponent,
        HomeComponent
    ],
    exports: [],
    bootstrap: [ RootComponent ],
    providers: [
        ArticlesService,
        ArticlesResolver
    ]
})
export class AppModule{

}
