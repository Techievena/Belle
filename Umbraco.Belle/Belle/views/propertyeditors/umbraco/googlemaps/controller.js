'use strict';

define(['app'], function (app) {
    app.controller("GoogleMapsController", function ($rootScope, $scope, $notification) {
    require(
        [
            'async!http://maps.google.com/maps/api/js?sensor=false'
        ],
        function () {
            //Google maps is available and all components are ready to use.
            var valueArray = $scope.property.value.split(',');
            var latLng = new google.maps.LatLng(valueArray[0], valueArray[1]);
            
            var mapDiv = document.getElementById($scope.property.alias + '_map');
            var mapOptions = {
                zoom: $scope.property.config.zoom,
                center: latLng,
                mapTypeId: google.maps.MapTypeId[$scope.property.config.mapType]
            };

            var map = new google.maps.Map(mapDiv, mapOptions);
            var marker = new google.maps.Marker({
                map: map,
                position: latLng,
                draggable: true
            });
            
            google.maps.event.addListener(marker, "dragend", function(e){
                var newLat = marker.getPosition().lat();
                var newLng = marker.getPosition().lng();
            
                //here we will set the value
                $scope.property.value = newLat + "," + newLng;

                //call the notication engine
                $rootScope.$apply(function () {
                    $notification.warning("Your dragged a marker to", $scope.property.value);
                });
            });
        }
    );    
});



	return app;
});

