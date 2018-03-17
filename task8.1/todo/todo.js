var app = angular.module('toDoApp', [])

app.controller('toDoController', ['$scope', function ($scope) {
    $scope.tasks = ['Go to workshop', 'Do homework'];
    $scope.newTaskName = '';

    $scope.addTask = function () {
        var name = $scope.newTaskName;
        if (name && $scope.tasks.indexOf(name) == -1) {
            $scope.tasks.push(name)
            $scope.newTaskName = '';
        }
    };

    $scope.removeTask = function (index) {
        $scope.tasks.splice(index, 1);
    }
}]);