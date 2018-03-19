var todoApp = angular.module('todoApp', ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider.when('/list',
            {
                templateUrl:'view/list.html',
                controller:'listController'
            });
        $routeProvider.when('/add',
            {
                templateUrl:'view/add.html',
                controller:'addController'
            });
        $routeProvider.when("/edit/:id", {
            templateUrl:'view/edit.html',
            controller:'editController'
        });
        $routeProvider.otherwise({redirectTo: '/list'});
    });

todoApp.factory("todoFactory", function(){
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

    ];
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
            taskList.splice(taskList.indexOf(task), 1)
        },
        editTask: function editTask(id,task){
            taskList[id]=task;
        }
    };
});
