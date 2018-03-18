var app = angular.module('toDoApp', [])

app.factory("todoFactory", function(){
    var taskList = [
        {
            text: 'task1',
            statusDone: false,
            date: new Date("2018-03-17T12:00:00.000Z")
        },
        {
            text: 'task2',
            statusDone: false,
            date: new Date("2018-03-16T12:00:00.000Z")
        },
        {
            text: 'task3',
            statusDone: false,
            date: new Date("2018-03-15T12:00:00.000Z")
        }

    ]
    return {
        getTasks: function getTasks() {
             return taskList;
        },
        addTask: function addTask(text){
            taskList.push({
                text: text,
                statusDone: false,
                date: new Date()
            });
        },
        doneTask: function doneTask(task){
            task.statusDone = !task.statusDone;
        },
        removeTask: function removeTask(task){
            console.log(task);
            taskList.splice(taskList.indexOf(task), 1)
    	}
    };
});



app.controller('toDoController', ['$scope', 'todoFactory', function ($scope, todoFactory) {
    $scope.tasks = todoFactory.getTasks()
    $scope.newTaskName = '';
    $scope.filterDays = '';
    $scope.filterDate =  function(task) {
        var fDate = new Date();
        if($scope.filterDays > 0){
            fDate.setDate(fDate.getDate() - $scope.filterDays);
            return task.date > fDate;
        }
        return true;
    };

    $scope.addTask = function () {
        todoFactory.addTask($scope.newTaskName)
        $scope.newTaskName = '';
    };

    $scope.removeTask = function (task) {
        todoFactory.removeTask(task);
    };

    $scope.doneTask = function (task) {
        todoFactory.doneTask(task);
    }

}]);

