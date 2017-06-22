(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menu/templates/categorieslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
