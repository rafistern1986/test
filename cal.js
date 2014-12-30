$(document).ready(function () {

    var pricePerDay = 11;
    var pickUpDate = "april";
    var returnDate = "may";
    var oneDay = 24 * 60 * 60 * 1000;
    var firstDate = new Date(pickUpDate);
    var secondDate = new Date(returnDate);
    var daysOfRental = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    var totelRentalPrice = daysOfRental * pricePerDay;
    $("#calculatetPrice").text(totelRentalPrice);
    $("#rentelDaysAmount").text(daysOfRental);
    $("#rentalPricePerDay").text(pricePerDay);

})
