const startMap = () => {
    const ironhackBarcelona = {
        lat: 41.3977381,
  	    lng: 2.190471916
    }

    const map = new google.maps.Map(
        document.getElementById("google-map"),
        {
            zoom: 15,
            center: ironhackBarcelona
        }
    );

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(userLocation);

            const request = {
                query: 'libreria',
                location: userLocation,
                radius: '1000',
                type: ['book_store'],
                fields: ["name", "geometry"],
            };
        
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                for (let i = 0; i < results.length; i++) {
                  createMarker(results[i]);
                  map.setCenter(userLocation);
                }
              }
            });

            function createMarker(place) {
                if (!place.geometry || !place.geometry.location) return;
              
                const marker = new google.maps.Marker({
                  map,
                  position: place.geometry.location,
                });
              
                google.maps.event.addListener(marker, "click", () => {
                    const contentString = 
                        "<div id='content'>" +
                        `<h5>${place.name}</h5>` +
                        `<p>Rating: ${place.rating}</p>` +
                        "<br>" +
                        `<p>${place.vicinity}</p>` +
                        "</div>"
                    ;

                    const infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false
                    });
                });
            };
        })
        
    } else {
        console.error('Browser does not support geolocation.');
    }
};

startMap();