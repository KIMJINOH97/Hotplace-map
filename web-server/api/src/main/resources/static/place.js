let KAKAO_MAP;

let currentLat = 37.5666805;
let currentLong = 126.9784147;



window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed')

    let container = document.getElementById("kakao-map");

    const options = {
        center: new kakao.maps.LatLng(currentLat, currentLong),
        level: 3,
    };

    KAKAO_MAP = new kakao.maps.Map(container, options);

    const form = document.querySelector(".search-form");
    form.addEventListener("submit",searchEvent);
});

function searchEvent(e){
    e.preventDefault();
    console.log("form addEventlister");

    // input 태그에 아무것도 없을 경우
    // if (input.value === "") {
    //     getLocation();
    //     return;
    // }

    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(input.value, async function (result, status) {
        console.log(result[0]);
        const { y: lat, x: long } = result[0];
        let coords;
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
            // resetCircle(marker, circle, infoWindow);
            coords = new kakao.maps.LatLng(lat, long);

            // fetch 서버에 요청 하는 부분
            let coordinate = await getPlaceByDong();
            console.log(coordinate);
            coordinate.map((d) => {
                let latLng = new kakao.maps.LatLng(d.latitude_y, d.longitude_x);
                marker = new kakao.maps.Marker({
                    position: latLng
                });
                return marker.setMap(KAKAO_MAP);
            });
        }
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        KAKAO_MAP.panTo(coords);
    });
    input.value = "";
    console.log("function end");
}



let input = document.querySelector(".search-input");
let btn = document.querySelector(".search-button");




// kakao.maps.event.addListener(KAKAO_MAP, "click", function (mouseEvent) {
//     const latLng = mouseEvent.latLng;
//     const lat = latLng.getLat(),
//         long = latLng.getLng();
//     const rad = 100;
//     // resetCircle(marker, circle, infoWindow);
//
//     marker = new kakao.maps.Marker({
//         map: KAKAO_MAP,
//         position: latLng,
//     });
//
//     // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//     KAKAO_MAP.panTo(latlng);
// });

