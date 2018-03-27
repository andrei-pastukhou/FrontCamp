adminApp.component('articlesList', {
    templateUrl: 'view/articles-list.template.html',
    controller: function ($scope, todoFactory) {
        $scope.list = todoFactory.getList();
        $scope.articlesPerPage = 2;
        $scope.currentPage = 1;
        $scope.start = $scope.currentPage * $scope.articlesPerPage;
        $scope.numberOfPages=function(){
            return Math.ceil($scope.list.length/$scope.articlesPerPage);
        };

        $scope.removeArticle = function (task) {
            todoFactory.removeArticle(task);
        };
        $scope.loadData = function () {
            todoFactory.loadData();
        };
    }
});
adminApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start );
    }
});
