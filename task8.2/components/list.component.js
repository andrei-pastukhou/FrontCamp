todoApp.component('articlesList', {
    templateUrl: 'view/articles-list.template.html',
    controller: function ($scope, todoFactory) {
        $scope.list = todoFactory.getList()
        $scope.filterDays = '';
        $scope.filterDate = function (task) {
            var fDate = new Date();
            if ($scope.filterDays > 0) {
                fDate.setDate(fDate.getDate() - $scope.filterDays);
                return task.date > fDate;
            }
            return true;
        };

        $scope.removeArticle = function (task) {
            todoFactory.removeArticle(task);
        };

        $scope.loadData = function () {
            todoFactory.loadData();
        };

        $scope.loadData = function () {
            todoFactory.loadData();
        };
    }
});

