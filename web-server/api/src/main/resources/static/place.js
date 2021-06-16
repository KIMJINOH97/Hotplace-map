let container = document.getElementById("kakao-map");

// 기본 좌표
let currentLat = 37.5666805;
let currentLong = 126.9784147;

let options = {
    center: new kakao.maps.LatLng(currentLat, currentLong),
    level: 3,
};

let KAKAO_MAP = new kakao.maps.Map(container, options);

let locationCache;
let markerCache = new Set();

let input = document.querySelector(".search-input");
let btn = document.querySelector(".search-button");
let form = document.querySelector(".search-form");

let marker = null,
    circle = null,
    infoWindow = null;

form.addEventListener("submit",(e) => {
    e.preventDefault();
    if (input.value === "") {
        getLocation();
        return;
    }
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(input.value, async function (result, status) {
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
});

kakao.maps.event.addListener(KAKAO_MAP, "click", function (mouseEvent) {
    const latLng = mouseEvent.latLng;
    const lat = latLng.getLat(),
        long = latLng.getLng();
    const rad = 100;
    // resetCircle(marker, circle, infoWindow);

    marker = new kakao.maps.Marker({
        map: KAKAO_MAP,
        position: latLng,
    });

    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    KAKAO_MAP.panTo(latlng);
});