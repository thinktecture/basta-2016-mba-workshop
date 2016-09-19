"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var articleService_1 = require('../services/articleService');
var ArticlesResolver = (function () {
    function ArticlesResolver(_articlesService) {
        this._articlesService = _articlesService;
    }
    ArticlesResolver.prototype.resolve = function (route, state) {
        return this._articlesService.getArticleById(route.params['id']);
    };
    ArticlesResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [articleService_1.ArticlesService])
    ], ArticlesResolver);
    return ArticlesResolver;
}());
exports.ArticlesResolver = ArticlesResolver;
//# sourceMappingURL=articlesResolver.js.map