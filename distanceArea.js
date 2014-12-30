$(document).ready(function () {
    $("#addMilesInput").on("click", function () {
        $("#distensArea").slideDown();

        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;

        function initialize() {

            directionsDisplay = new google.maps.DirectionsRenderer();
            var usa = new google.maps.LatLng(37.09024, -95.712891);
            var mapOptions = {
                zoom: 4,
                center: usa
            };
            map = new google.maps.Map(document.getElementById('mapUsaCanvas'), mapOptions);
            directionsDisplay.setMap(map);
        }
        $("#startingPoint, #destinationPoint").mousedown(function () {
            $("#cityName").hide();
        });
        $("#calculateKmOfTrip").on("click", function () {

            /*web worker to get the km of drive*/
            if (typeof (webWorker) == "undefined") {
                webWorker = new Worker("js/jsForPricePage/webWorker.js");
            }
            
            webWorker.onmessage = function (event) {
                $("#totalAmountOfKm").text(event.data);
            };

            function showRouteOnMap() {
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
                        directionsDisplay.setDirections(response);
                        /* var totelRoute = response.routes[0].legs[0].distance.value * 2;
 var str = totelRoute.toString();
 str = str.substring(0, str.length - 3)
 $("#totalAmountOfKm").text(str);*/
                        $("#totalAmountOfKmSummery").show();
                    } else {
                        $("#cityName").show();
                    }
                })
            };
            $("#loadingPopUp").show();
            $("#myMusic").prop("currentTime", 5).trigger("play");
            setTimeout(showRouteOnMap, 6000);
        });
        initialize()
    });

    function showPosition(position) {
        $("#startingPoint").val(position.coords.latitude + ", " + position.coords.longitude);
    }

    $("#currentLocation").change(function () {
        if ($(this).is(":checked")) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);

            } else {
                $("#startingPoint").val("not supported");
            }
        } else {
            $("#startingPoint").val("");
        }
    });

    function calculateNewCostOfRental(amountOfKm) {
        $("#addMilesInput").hide();
        $("#addKmText").hide();

        amountOfKm = parseFloat(amountOfKm);
        if (amountOfKm > 89) {
            var lessThen91 = 90 * 0.50;
            var moreThen90 = (amountOfKm - 90) * 0.30;
            var costForTheKm = lessThen91 + moreThen90;
        } else {
            var costForTheKm = amountOfKm * 0.50;
        }


        var usersBookingOrderUntilNow = JSON.parse(localStorage.getItem("bookingDetails"));
        var gear = usersBookingOrderUntilNow[0].gear;
        if (gear == "manual") {
            costForTheKm = (costForTheKm - costForTheKm * 8 / 100).toFixed(2);
            costForTheKm = parseFloat(costForTheKm);
        }

        var currentRentalAmount = $("#calculatetPrice").text();
        currentRentalAmount = parseFloat(currentRentalAmount);
        var total = costForTheKm + currentRentalAmount;
        $("#calculatetPrice").text(total);

        var currentKmAmount = $("#amountOfKmIncluded").text();
        currentKmAmount = parseFloat(currentKmAmount);
        var totalKm = amountOfKm + currentKmAmount;
        $("#amountOfKmIncluded").text(totalKm);



        $("#kmAmount").text(amountOfKm);
        $(".calculateDetailsForKm").show();

        $("#distensArea").slideUp();
    }


    $("#addKmToRental").on("click", function () {
        var amountOfKm = $("#selectAmountOfKm").val();
        calculateNewCostOfRental(amountOfKm);
    });
    $("#addKmToRentalFromMap").on("click", function () {

        var amountOfKm = $("#totalAmountOfKm").text();
        calculateNewCostOfRental(amountOfKm);
    })
});
