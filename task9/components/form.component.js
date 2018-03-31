adminApp.component('formList', {
    templateUrl: 'view/articles-form.template.html',
    controller: function ($scope, todoFactory,$route, $routeParams) {
        $scope.form = {
            type: $route.current.$$route.formType,
            title: '',
            text: ''
        };

        if( $scope.formType === 'edit'){
            var id = $routeParams["id"];
            $scope.tasks = todoFactory.getList()
            var article = $scope.tasks[id];
            $scope.form.title = article.title;
            $scope.form.text = article.text;
        }
        $scope.save = function () {
            if($scope.articleForm.$valid){
                switch ($scope.form.type) {
                    case 'add':
                        todoFactory.addArticle($scope.form.title,$scope.form.text)
                        alert("new task is added");
                        $scope.form.title = '';
                        $scope.form.text = '';
                        break;
                    case 'edit':
                        article.text = $scope.form.text;
                        article.title = $scope.form.title;
                        todoFactory.editArticle(id, article);
                        alert("task was edited ");
                }
            }
        };
    }
});
