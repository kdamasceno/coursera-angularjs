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
  
  // Página de detalhes de uma categoria
  .state('categoriesList.itemDetail', {
    url: '/items/{itemId}',
    templateUrl: 'src/menu/templates/item-detail.template.html',
    controller: 'ItemDetailController as itemDetail',
    resolve: {
      item: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory()
                .then(function (items) {
                  return items[$stateParams.itemId];
                });
            }]
    }
  })
  
  ;
}

})();
