todoApp.controller('editController', function ($scope, todoFactory, $routeParams) {
    var id = $routeParams["id"];
    $scope.tasks = todoFactory.getTasks()
    var task = $scope.tasks[id];
    $scope.editTaskName = task.text;

    $scope.editTask = function () {
        if($scope.editTaskForm.$valid){
            task.text = $scope.editTaskName;
            todoFactory.editTask(id, task);
            alert("task was edited ");
        }

    };
});

