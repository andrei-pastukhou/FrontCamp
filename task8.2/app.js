var todoApp = angular.module('todoApp', ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider.when('/list',
            {
                templateUrl:'view/list.html',
                // controller:'listController'

            });
        $routeProvider.when('/add',
            {
                templateUrl:'view/add.html',
                formType:'add'
            });
        $routeProvider.when("/edit/:id", {
            templateUrl:'view/edit.html',
            formType:'edit'
        });
        $routeProvider.otherwise({redirectTo: '/list'});
    });
todoApp.factory("todoFactory", function($http){
    var list = [
        {
            text: 'task1 text',
            title: 'task1',
            date: new Date("2018-03-17T12:00:00.000Z")
        },
        {
            text: 'task2 text',
            title: 'task2',
            date: new Date("2018-03-16T12:00:00.000Z")
        },
        {
            text: 'task3 text',
            title: 'task3',
            date: new Date("2018-03-15T12:00:00.000Z")
        }

    ];
    return {
        getList: function getList() {
            return list;
        },
        addArticle: function addArticle(title,text){
            list.push({
                title: title,
                text: text,
                date: new Date()
            });
        },
        removeArticle: function removeArticle(task){
            list.splice(list.indexOf(task), 1);
        },
        editArticle: function editTask(id,task){
            list[id]=task;
        },
        loadData: function loadData() {
            $http.get('task.json')

                .then(function(response) {
                    response.data.forEach(function (element){
                        element.date = new Date(element.date);
                        list.push(element);
                    });
                })

                .catch(function(error){
                    console.error("Error with GET request", error);
                });
        }
    };
});