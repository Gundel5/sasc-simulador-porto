var app = angular.module('myApp', ['ui.mask']);
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
})

app.controller('myCtrl', function ($scope, $http) {
	$scope.tempoSimulacao = 2;
	$scope.tempoChegada = null;
	$scope.quantNavio = null;
	$scope.myOpacity = 1;
	
    $scope.submit = function() {
        console.log($scope.object)
    }
	$scope.listItem = [{ id: 0, esquerda: '', direita: '' }];
   
    $scope.addItem = function () {
		$scope.myOpacity = $scope.myOpacity - 0.1;
		$scope.myStyle = {'opacity':$scope.myOpacity};
        $scope.listItem.push({ id: $scope.listItem[$scope.listItem.length - 1]['id'] + 1, esquerda: '', direita: '' });
        console.log($scope.listItem)
    }

    $scope.removeItem = function (id) {
		$scope.myOpacity = $scope.myOpacity + 0.1;
		$scope.myStyle = {'opacity':$scope.myOpacity};
        if ($scope.listItem.length > 1) {
            $scope.listItem.forEach(function (element, index) {
                if (element['id'] === id) {
                    console.log(index);
                    console.log(element['id']);
                    $scope.listItem.splice(index, 1)
                    console.log($scope.listItem)
                }
            });
        }
    }

	$scope.generate = function () {
		// $.blockUI({ message: '<h1><img src="https://scontent.fpoa8-1.fna.fbcdn.net/v/t1.0-9/29315270_1782513481769521_4325627701726543872_n.jpg?_nc_cat=107&_nc_ht=scontent.fpoa8-1.fna&oh=f80982f84264cbf42099379008f0d002&oe=5D5109C6" /> Just a moment...</h1>' });
        // $.blockUI({ message: "Just moment, please!" });
        console.log($scope.listItem);
        console.log($scope.tempoSimulacao);
        console.log($scope.tempoChegada);
        console.log($scope.quantNavio);
        console.log($scope.myOpacity);
        if($scope.quantNavio == -10){
            console.log("Acerto mizeravi, mas nao passa daqui");
        }else if($scope.quantNavio<1){
            console.log("quantidade de navio não pode ser negativa");
        }
        process($scope.quantNavio, $scope.tempoChegada, $scope.tempoSimulacao, $scope.listItem);
    }
    
    function process(quantNavio, tempoChegada, tempoSimulacao, listItem){
        
    };

});
