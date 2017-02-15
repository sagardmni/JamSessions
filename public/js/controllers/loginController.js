angular.module("myApp").controller("loginController", ['$window','$scope','$http', function($window, $scope, $http) {
    $scope.verify = function () {
      $scope.errorMessage = "";
      var loginInfo = JSON.stringify({username: $scope.form.username, pwd: $scope.form.pwd});
      console.log(loginInfo);
      $http.post('http://localhost:3000/authenticate', loginInfo).
        success(function(data, status, headers, config) 
        {
          if(data.login !== "error")
          {
            $window.location.href = "/home";
          }
          else
          {
            $scope.errorMessage = "Authentication failed. Please try again";
          }
        }).
        error(function(data, status, headers, config) {
          console.log("Error");
        });
    }
}]);