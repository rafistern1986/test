function checkDistens() {
    /*var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    directionsDisplay = new google.maps.DirectionsRenderer();
    var usa = new google.maps.LatLng(37.09024, -95.712891);
    var mapOptions = {
        zoom: 4,
        center: usa
    };
    
    map = new google.maps.Map(document.getElementById('mapUsaCanvas'), mapOptions);
    $("#loadingPopUp").hide();
    $("#myMusic").trigger("pause").prop("currentTime", 5);
    $("#distensArea").addClass("height562px")

    var start = $("#startingPoint").val();
    var end = $("#destinationPoint").val();
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var totelRoute = response.routes[0].legs[0].distance.value * 2;*/
            var totelRoute = this.postMessage(event.data)
            var str = totelRoute.toString();
            str = str.substring(0, str.length - 3)
            postMessage(str);

            /* $("#totalAmountOfKm").text(str);
        }
    })*/
} 

setTimeout(checkDistens, 6000)
