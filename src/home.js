var app = angular.module('myApp', ['ui.mask']);
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
})

app.controller('myCtrl', function ($scope, $http) {
	$scope.tempoSimulacao = null;
	$scope.tempoChegada = null;
	$scope.quantNavio = null;
    $scope.myOpacity = 20;
    $scope.showResult = false;
    
	
    $scope.submit = function() {
        console.log($scope.object)
    }
	$scope.listItem = [{ id: 0, tempoDescarga: 0, numeroDescarga: 0 }];
   
    $scope.addItem = function () {
		$scope.myOpacity = $scope.myOpacity - 0.1;
		$scope.myStyle = {'opacity':$scope.myOpacity};
        $scope.listItem.push({ id: $scope.listItem[$scope.listItem.length - 1]['id'] + 1, tempoDescarga: 0, numeroDescarga: 0 });
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
        $.blockUI({ message: "Aguarde um momento, por favor!" });
        console.log($scope.listItem);
        console.log($scope.tempoSimulacao);
        console.log($scope.tempoChegada);
        console.log($scope.quantNavio);
        console.log($scope.myOpacity);
        if($scope.quantNavio<1){
            console.log("quantidade de navio não pode ser negativa");
        }
        $scope.navioEntrada = 0;
        $scope.navioDescarregados = 0;
        $scope.taxaOcupacaoPorto = 0;
        $scope.tempoMedioFila = 0;
        $scope.tamanhoMedioFila = 0;
        process($scope.quantNavio, $scope.tempoChegada, $scope.tempoSimulacao, $scope.listItem);
        $scope.showResult = true;
        $.unblockUI();
    }
    
    function process(quantNavio, tempoChegada, tempoSimulacao, listItem){
        countNavios = 0;
        countProcessNavio = 0;
        processingNavio = false;
        timeProcessNavio = 0;
        countDisOcuppation = 0;
        listItem.forEach(function(element){
            timeProcessNavio += element.tempoDescarga;
        });
        count = 0
        for(timer = 0; timer < tempoSimulacao; timer++ ){
            if(timer % tempoChegada == 0){
                if($scope.navioEntrada <= quantNavio) {
                    $scope.navioEntrada += 1;
                    countNavios += 1;
                    $scope.tamanhoMedioFila += countNavios;
                }
            }

            if(processingNavio){
                countProcessNavio -= 1;
                if(countProcessNavio == 0){
                    processingNavio = false;
                    $scope.navioDescarregados += 1;
                }
            }else{
                if(countNavios > 0){
                    if(!processingNavio){
                        processingNavio = true;
                        countProcessNavio = timeProcessNavio;
                        countNavios -= 1;
                    }
                }else{
                    countDisOcuppation += 1;
                }
            }
        }
        $scope.tamanhoMedioFila = $scope.tamanhoMedioFila/$scope.navioEntrada;
        $scope.taxaOcupacaoPorto = (countDisOcuppation/tempoSimulacao) * 100
    };

});
