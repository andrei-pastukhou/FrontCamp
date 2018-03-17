var app = angular.module('toDoApp', [])

app.factory("todoFactory", function(){
    var taskList = ["New Delhi", "Mumbai", "Kolkata", "Chennai"];
    return {
        getTasks: function getTasks() {
             return taskList;
        },
        addTask: function addTask(text){
            taskList.push(text);
        },
        removeTask: function removeTask(text){
            taskList.splice(taskList.indexOf(text), 1)
    	}
    };
});



app.controller('toDoController', ['$scope', 'todoFactory', function ($scope, todoFactory) {
    $scope.tasks = todoFactory.getTasks()
    $scope.newTaskName = '';

    $scope.addTask = function () {
        todoFactory.addTask($scope.newTaskName)
        $scope.newTaskName = '';
    };

    $scope.removeTask = function (text) {
        todoFactory.removeTask(text);
    }
}]);

