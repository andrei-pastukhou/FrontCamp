adminApp.component('articlesPagination', {
    templateUrl: 'view/articles-pagination.template.html',
    controller: function ($scope, todoFactory, $route, $routeParams) {
        $scope.list = todoFactory.getList();
        var page = $routeParams["page"];
        if(!page){
            page = 0;
        }
        $scope.start = page * todoFactory.getArticlesPerPage();
        $scope.end = $scope.start + todoFactory.getArticlesPerPage();

        console.log($scope.start, $scope.end);
        $scope.filterDays = '';
        $scope.filterDate = function (task) {
            var fDate = new Date();
            if ($scope.filterDays > 0) {
                fDate.setDate(fDate.getDate() - $scope.filterDays);
                return task.date > fDate;
            }
            return true;
        };
    }
});

