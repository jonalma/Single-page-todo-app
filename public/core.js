// create a module, 
// create a controller
// define functions to handle todos. 
// Then we can apply to view.

// public/core.js
var scotchTodo = angular.module('scotchTodo',[]);

function mainController($scope,$http){
    $scope.formData = {};
    
    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data){
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
    
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {}; //clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
    };
    
    // delete a todo after checking it
    $scope.deleteTodo = function(id){
        $http.delete('api/todos/' + id)
            // if successful creation, call our get function to get all the new todos
            .success(function(data){
                $scope.todos = data; // assign our new list of todos
                console.log(data);
        })
        .error(function(data){
            console.log('Error: ' + data);
        });
    };
    
}