(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
   templateUrl: 'src/menu/templates/itemsList.template.html',
   bindings: {
    itemsForCategory: '<'
   }
});

})();