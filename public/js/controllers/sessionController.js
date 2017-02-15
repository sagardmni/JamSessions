angular.module("myApp").controller("sessionController", ['$window','$scope','$http', function($window, $scope, $http) {
    $scope.createSessionOn = false;
    $scope.userVisible = false;
    $scope.sendMessageVisible = false;
    $scope.createSession = function () {
      var sessionInfo = {location: $scope.form.location, 
        genre: $scope.form.genre, musician: $scope.form.musician}
      console.log(sessionInfo);
      $scope.createSessionOn = false;
      $http.post('http://localhost:3000/createsession', {sessionInfo: sessionInfo}).
        success(function(data, status, headers, config) 
        {
          console.log("Success");
          $http.get('http://localhost:3000/loadsessions').
          success(function(data, status, headers, config) 
          {
            console.log("Success");
            $scope.sessions = data.sessions;
          }).
          error(function(data, status, headers, config) {
            console.log("Error");
          });
        }).
        error(function(data, status, headers, config) {
          console.log("Error");
        });
    }
    $scope.loadSessions = function() {
          $http.get('http://localhost:3000/loadsessions').
          success(function(data, status, headers, config) 
          {
            console.log("Success");
            $scope.sessions = data.sessions;
          }).
          error(function(data, status, headers, config) {
            console.log("Error");
          });
    }

    $scope.createSessionVisible = function () {
      $scope.createSessionOn = true;
    }

    $scope.startMessage = function () {
      $scope.sendMessageVisible = true;
    }

    $scope.sendMessage = function () {
      $scope.sendMessageVisible = false;
    }

    $scope.gotoSession = function (session) {
      console.log("Clicked row to get here: ");
      console.log(session);
      $http.post('http://localhost:3000/session',{session: session}).
      success(function(data, status){
        console.log("Success!");
        console.log(data.user);
        $scope.user = data.user;
        $scope.userVisible = true;
        // $window.location.href = "http://localhost:3000/session";
      }).
      error(function(data, status){
        console.log("Failure!");
      });
    }
}]);