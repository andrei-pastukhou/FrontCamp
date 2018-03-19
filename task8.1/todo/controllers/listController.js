todoApp.controller('listController', function ($scope, todoFactory) {
    $scope.tasks = todoFactory.getTasks()
    $scope.filterDays = '';
    $scope.filterDate =  function(task) {
        var fDate = new Date();
        if($scope.filterDays > 0){
            fDate.setDate(fDate.getDate() - $scope.filterDays);
            return task.date > fDate;
        }
        return true;
    };

    $scope.removeTask = function (task) {
        todoFactory.removeTask(task);
    };

    $scope.doneTask = function (task) {
        todoFactory.doneTask(task);
    }

});

