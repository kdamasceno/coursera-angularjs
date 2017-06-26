(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // página principal se não encontra URL
  $urlRouterProvider.otherwise('/');

  // *** Configuração de estados ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })

  // Página de categorias
  .state('categoriesList', {
    url: '/categories',
    templateUrl: 'src/menu/templates/categories.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  
  // Página de items de uma categoria
  .state('itemsList', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menu/templates/items.template.html',
    controller: 'ItemsController as itemsList',
    resolve: {
      itemsForCategory: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
      },
  })

  ;
}

})();
