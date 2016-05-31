angularRoutingApp.controller('contentController',function($scope,$http,dataResource){
	$http.get('content/data.json').success(function(data){

		$scope.datos = data;
	});

	$scope.dataResource = dataResource.get();
})

angularRoutingApp.factory("dataResource", function ($resource) {
    return $resource("content/data.json", 
        {},
        { get: { method: "GET", isArray: true }
    })
})