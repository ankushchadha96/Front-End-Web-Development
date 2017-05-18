var map;

var myPlaceCorrdinates = {
    lat: 12.9716,
    lng: 77.5946
};

var markers = [];

var myinfoWindow = '';

var myAppViewModel = {
    list: ko.observableArray([]),
    searchQuery: ko.observable(),
    wasError: ko.observable(false),
    ErrorMessage: ko.observable(''),



    constructor: function () {
        for (var i in markers) {
            myAppViewModel.list.push(markers[i].title);
        }
    },

    fun: function (query) {

        myAppViewModel.list.removeAll();

        for (var i in markers) {

            if (markers[i].title.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                myAppViewModel.list.push(markers[i].title);
                markers[i].setVisible(true);
            } else {
                markers[i].setVisible(false);
            }
        }

    }

}

function mapNotWorking() {
    myAppViewModel.wasError(true);
    myAppViewModel.ErrorMessage('Map can"t be loaded');
}

function fetch_zomato_restaurant() {
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/geocode',
        headers: {
            'Accept': 'application/json',
            'user-key': '3bcf9f4b92799cec67722ad354259831'
        },
        data: 'lat=12.9716&lon=77.5946',
        async: true
    }).done(function (response) {
        var metadata = response.nearby_restaurants;
        for (var i in metadata) {
            var marker = new google.maps.Marker({
                title: metadata[i].restaurant.name,
                position: {
                    lat: parseFloat(metadata[i].restaurant.location.latitude),
                    lng: parseFloat(metadata[i].restaurant.location.longitude)
                },
                map: map,
                animation: google.maps.Animation.DROP,
                addres: metadata[i].restaurant.location.address
            });
            marker.addListener('click', openInfoWindow2);
            markers.push(marker);
        }
        var bounds = new google.maps.LatLngBounds();
        for (var k in markers) {
            bounds.extend(markers[k].position);
        }
        map.fitBounds(bounds);
        myAppViewModel.constructor();
    }).fail(function () {
        myAppViewModel.wasError(true);
        myAppViewModel.ErrorMessage('restaurant cant be diaplayed');
    });
}

function openInfoWindow2() {
    openInfoWindow(this);
}

function animateCurrentMarker(marker) {
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    marker.setAnimation(google.maps.Animation.BOUNCE);
}

function stopCurrentMarker(marker) {
    myinfoWindow.marker.setIcon(null);
    myinfoWindow.marker.setAnimation(null);
}

function open(title) {
    for (var i in markers) {
        if (markers[i].title == title) {
            //myinfoWindow.marker = markers[i];
            openInfoWindow(markers[i]);
            return;
        }
    }
}

function openInfoWindow(marker) {
    if (myinfoWindow.marker !== marker && myinfoWindow.marker !== undefined) {
        stopCurrentMarker(myinfoWindow.marker);
    }
    animateCurrentMarker(marker);
    var content = '<h1>' + marker.title + '</h1>';
    content += '<h2>' + marker.addres + '</h2>';
    myinfoWindow.marker = marker;
    myinfoWindow.setContent(content);
    myinfoWindow.open(map, marker);
    myinfoWindow.addListener('closeclick', stopCurrentMarker);
}

function IntialMap() {
    myinfoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        center: myPlaceCorrdinates,
        zoom: 13
    });
    fetch_zomato_restaurant();
}


ko.applyBindings(myAppViewModel);
myAppViewModel.searchQuery.subscribe(myAppViewModel.fun);