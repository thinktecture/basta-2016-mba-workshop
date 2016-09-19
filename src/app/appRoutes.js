"use strict";
var router_1 = require('@angular/router');
var list_1 = require('./components/articles/list');
var details_1 = require('./components/articles/details');
var home_1 = require('./home/home');
var articlesResolver_1 = require('./resolvers/articlesResolver');
var appRoutes = [
    {
        path: 'articles', children: [
            { path: 'list', component: list_1.ArticlesListComponent },
            { path: 'details/:id', resolve: {
                    article: articlesResolver_1.ArticlesResolver
                }, component: details_1.ArticleDetailsComponent }
        ]
    },
    { path: '', component: home_1.HomeComponent }
];
exports.APP_ROUTES = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=appRoutes.js.map