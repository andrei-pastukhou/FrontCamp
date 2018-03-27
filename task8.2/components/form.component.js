adminApp.component('formList', {
    templateUrl: 'view/articles-form.template.html',
    controller: function ($scope, todoFactory,$route, $routeParams) {
        $scope.formType = $route.current.$$route.formType;
        $scope.formTitle = '';
        $scope.formText = '';
        if( $scope.formType === 'edit'){
            var id = $routeParams["id"];
            $scope.tasks = todoFactory.getList()
            var article = $scope.tasks[id];
            $scope.formTitle = article.title;
            $scope.formText = article.text;
        }
        $scope.save = function () {
            if($scope.articleForm.$valid){
                if($scope.formType === 'add'){
                    todoFactory.addArticle($scope.formTitle,$scope.formText)
                    alert("new task is added");
                    $scope.formTitle = '';
                    $scope.formText = '';
                }
                if($scope.formType === 'edit') {
                        article.text = $scope.formText;
                        article.title = $scope.formTitle;
                        todoFactory.editArticle(id, article);
                        alert("task was edited ");
                }
            }
        };
    }
});
