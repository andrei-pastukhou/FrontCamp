var adminApp = angular.module('adminApp', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.when('/list',
            {
                templateUrl:'view/list.html',
            });
        $routeProvider.when('/add',
            {
                templateUrl:'view/add.html',
                formType:'add'
            });
        $routeProvider.when('/edit/:id', {
            templateUrl:'view/edit.html',
            formType:'edit'
        });
        $routeProvider.otherwise({redirectTo: '/list'});
    });
adminApp.factory('todoFactory', function($http){
    var list = [
        {
            text: 'task1 text',
            title: 'task1',
            date: new Date('2018-03-17T12:00:00.000Z')
        },
        {
            text: 'task2 text',
            title: 'task2',
            date: new Date('2018-03-16T12:00:00.000Z')
        },
        {
            text: 'task3 text',
            title: 'task3',
            date: new Date('2018-03-15T12:00:00.000Z')
        },
        {
            text: 'task4 text',
            title: 'task4',
            date: new Date('2018-03-17T12:00:00.000Z')
        },
        {
            text: 'task5 text',
            title: 'task5',
            date: new Date('2018-03-16T12:00:00.000Z')
        },
        {
            text: 'task6 text',
            title: 'task6',
            date: new Date('2018-03-15T12:00:00.000Z')
        }


    ];
    var config = {
        articlesPerPage : 2,
        startPage : 1
    };
    return {
        getList: function getList() {
            return list;
        },
        getConfig : function getConfig() {
            return config;
        },
        addArticle: function addArticle(title,text){
            list.push({
                title: title,
                text: text,
                date: moment().format()
        });
        },
        removeArticle: function removeArticle(article){
            list.splice(list.indexOf(article), 1);
        },
        editArticle: function editArticle(id,article){
            list[id]=article;
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
                    console.error('Error with GET request', error);
                });
        }
    };
});
