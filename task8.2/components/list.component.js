adminApp.component('articlesList', {
    templateUrl: 'view/articles-list.template.html',
    controller: function ($scope, todoFactory) {
        var config = todoFactory.getConfig();
        $scope.list = todoFactory.getList();
        $scope.articlesPerPage = config.articlesPerPage;
        $scope.currentPage = config.startPage;
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
