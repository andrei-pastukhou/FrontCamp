todoApp.controller('addController', function ($scope, todoFactory) {
    $scope.tasks = todoFactory.getTasks()
    $scope.newTaskName = '';

    $scope.addTask = function () {
        if($scope.addTaskForm.$valid){
            todoFactory.addTask($scope.newTaskName)
            $scope.newTaskName = '';
            alert("new task is added");
        }

    };
});

