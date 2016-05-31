var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute','ngResource','xeditable']);
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'content/login.html',
            controller  : 'UserController'
        })
        .when('/home', {
            templateUrl : 'content/pages/home.html',
            controller  : 'contentController'
        })
        .when('/setting', {
            templateUrl : 'content/pages/setting.html',
            controller  : 'contentController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
angularRoutingApp.component('navigation', {
  templateUrl: 'navigation/navigation.html',
  controller: function(){},
});
angularRoutingApp.controller('UserController', ['$scope', function($scope) {
        $scope.user = {};
 
        $scope.update = function() {
          console.log($scope.user);
        };
 
        $scope.reset = function(form) {
          $scope.user = {};
          if (form) {
            form.$setPristine();
            form.$setUntouched();
          }
        };

        $scope.reset();
}]);
angularRoutingApp.controller('EditableRowCtrl', function($scope, $filter, $http) {

    $http.get('content/data.json').success(function (data) {
        $scope.users = data;
  // $scope.users = [
  //   {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin',skill: 1, skillName: 'Iphone 5s LCD',score: '100'},

  ];

  $scope.save = function (index, user){
    // alert(index)
    var user_to_edit = $scope.users[index];
    user_to_edit = user;

  }

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.skills = [];
  $scope.loadSkills = function() {
    return $scope.skills.length ? null : $http.get('/skills').success(function(data) {
      $scope.skills = data;
    });
  };
  $scope.showSkill = function(user) {
    if(user.skill && $scope.skills.length) {
      var selected = $filter('filter')($scope.skills, {id: user.skill});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.skillName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  // $scope.checkName = function(data, id) {
  //   if (id === 2 && data !== 'awesome') {
  //     return "Username 2 should be `awesome`";
  //   }
  // };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null 
    };
    $scope.users.push($scope.inserted);
  };
});