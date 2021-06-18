let KAKAO_MAP;  //카카오맵 객체
let MARKERS=[];  //마커들을 보관하기 위한 배열
let INFO_WINDOWS=[]; //windows들을 보관하기 위한 배열

window.addEventListener('DOMContentLoaded', (event) => {

    const container = document.getElementById("kakao-map");
    const currentLat = 37.5666805;
    const currentLong = 126.9784147;
    const options = {
        center: new kakao.maps.LatLng(currentLat, currentLong),
        level: 3,
    };

    KAKAO_MAP = new kakao.maps.Map(container, options);
    const form = document.querySelector(".search-form");
    form.addEventListener("submit",searchEvent);


    const $gu_select = document.querySelector('#gu-select');
    const $category_select = document.querySelector("#category-select");
    initGuSelect($gu_select);
    initCategorySelect($category_select);
    $gu_select.addEventListener("change",changeGuSelect);
});


/*
  !! ASYNC !!
  name : searchEvent(e)

  feature : 구,동,카테고리,(가게이름) 에 따른 검색결과를 받은후 화면에 그려주는 함수(setPlaceMarker)를 호출함

  desc : setPlaceMarker 를 호출하기 전에 이미 존재하는 마커들을 clearPlaceMarker 를 통해 지워준다.
 */
async function searchEvent(e){
    e.preventDefault();

    const $gu_select = document.querySelector("#gu-select")
    const $dong_select = document.querySelector("#dong-select")
    const $category_select = document.querySelector("#category-select")
    const $place_name_input = document.querySelector("#place-name-input")

    const select_gu_value = $gu_select.options[$gu_select.selectedIndex].value;
    const select_dong_value = $dong_select.options[$dong_select.selectedIndex].value;
    const select_category_value = $category_select.options[$category_select.selectedIndex].value;
    const place_name = $place_name_input.value;

    const requestDto = {
        "gu":select_gu_value,
        "dong":select_dong_value,
        "sub_category":select_category_value,
        "place_name":place_name
    }

    const response = await fetch("/api/places",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(requestDto)
    })

    const result = await response.json();
    clearPlaceMarker();
    setPlaceMarker(result);
}

/*
  name : clearPlaceMarker()

  feature : 현재 지도에 표시되어있는 모든 마커들을 지운다.

  desc : 마커들에 대한 정보가 미리 MARKERS 배열에 담겨있어야 함
 */
function clearPlaceMarker(){
    for(let i=0;i<MARKERS.length;i++){
        MARKERS[i].setMap(null);
    }
    MARKERS=[];
    INFO_WINDOWS=[];
}

/*
   name : setPlaceMarker(places)

   feature : "/places"주소로 API 로 받아온 place 객체들의 배열

   desc : kakao.maps api 를 사용하여 새로운 객체를 만든후
          각각 MARKERS 와 INFO_WINDOWS 배열에 저장해야함
          이후 addListener 라는 API 사용하여 이벤트속성부여
 */
function setPlaceMarker(places){

    // MARKERS 와 INFO_WINDOWS 배열에 지도생성에 필요한 객체 삽입
    for(let place of places.data){
        const {address,dong,gu,name,latitude_y,longitude_x} = place;
        console.log(place);
        MARKERS.push(new kakao.maps.Marker({
            map:KAKAO_MAP,
            position: new kakao.maps.LatLng(parseFloat(latitude_y),parseFloat(longitude_x))
        }));

        INFO_WINDOWS.push(new kakao.maps.InfoWindow({
            content:`<button type="button" class="btn btn-primary">${name}</button>`
        }));
    }

    //마커에 이벤트속성 추가
    for(let i=0;i<MARKERS.length;i++){
        kakao.maps.event.addListener(MARKERS[i],'mouseover',makeOverListener(KAKAO_MAP,MARKERS[i],INFO_WINDOWS[i]));
        kakao.maps.event.addListener(MARKERS[i],'mouseout',makeOutListener(INFO_WINDOWS[i]));
    }

    //화면이동에 필요한 로직
    if(places.data.length !== 0 ){
        const {latitude_y,longitude_x} = places.data[0];
        panTo(latitude_y,longitude_x)
    }
}


/*
   name : panTo(latitude_y,longitude_x)

   input : type [string] latitude_y ,[string] longitude_x

   feature : 현재지도가 y,x (위도 , 경도) 로 커서가 이동함
 */
function panTo(latitude_y,longitude_x) {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon =  new kakao.maps.LatLng(parseFloat(latitude_y),parseFloat(longitude_x))
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    KAKAO_MAP.panTo(moveLatLon);
}

/*
   !! CALL BACK FUCNTION  !!
   name : makeOverListener(map, marker, infowindow)

   input : 1.type [kakao.maps.Map] 카카오맵 객체
           2.type [kakao.maps.Marker] 카카오맵 마커 객체
           3.type [kakao.maps.InfoWindow] 카카오맵 윈도우 객체

   feature : 마커들을 가르키면 해당마커의 infowindow 가 열리게끔 해주는 콜백함수

   desc : kakao.maps.event.addListener 라는 함수안에서 사용할수 있고
          3번째 인자인 콜백함수로 넣어줄수있다.
          그냥 넣어주면 안됨
 */
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

/*
   !! CALL BACK FUCNTION  !!
   name : makeOutListener(infowindow)

   input : 타입 [kakao.maps.InfoWindow] 카카오 윈도우 객체

   feature : 마커들을 가르키지 않을때 해당마커의 infowindow 가 닫히게끔 해주는 콜백함수

   desc : 해당 객체의 함수를 이용하여 해결하는 구조
 */
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}


/*
   name : initGuSelect($gu_select)

   input : type [<DOM element>] select 태그

   feature : 모든 구에 대한 정보를 불러온후  <select> 태그안에 넣어준다.

   desc : 인자로 element를 받는점에 주의
 */
function initGuSelect($gu_select){
    fetch('/api/gu')
        .then(res=>res.json())
        .then(res_json =>{
            const {data} = res_json
            let htmlString ='';

            for(let gu of data){
                htmlString += `<option value=${gu.guId}>${gu.guName}</option>`
            }
            $gu_select.innerHTML = htmlString;
    })
}

/*
   name : changeGuSelect()

   feature : "구" 를 선택하면 해당 구에 해당하는 동을 불러오는 함수를 호출하는 함수

 */
function changeGuSelect(){
    const $gu_select = document.querySelector('#gu-select');
    const select_value = $gu_select.options[$gu_select.selectedIndex].value;
    const select_text = $gu_select.options[$gu_select.selectedIndex].text;

    initDongSelect(select_value)
}

/*
   name : initDongSelect(GU_ID)

   input : type [number] GU_ID  database 상 gu 식별자값

   feature : GU_ID 대한 "동" 정보를 불러온후  dong <select> 태그안에 넣어준다.
 */
function initDongSelect(GU_ID){
    const $dong_select = document.querySelector("#dong-select");
    fetch('/api/dong/'+GU_ID)
        .then(res=>res.json())
        .then(res_json =>{
            const {data} = res_json
            let htmlString ='';

            for(let dong of data){
                htmlString += `<option value=${dong.dongId}>${dong.dongName}</option>`
            }
            $dong_select.innerHTML = htmlString;
    })
}

/*
   name : initCategorySelect($category_select)

   input : type [<DOM element>] select 태그

   feature : 모든 sub_category 의 값을 select 태그안에 채워줌

   desc : 처음 DOM이 load 될때만 실행해야함 (2번 이상해야할일이 없음)
 */
function initCategorySelect($category_select) {
    fetch('/api/sub_category')
        .then(res=>res.json())
        .then(res_json =>{
            const {data} = res_json
            let htmlString ='';

            for(let category of data){
                htmlString += `<option value=${category.id}>${category.name}</option>`
            }
            $category_select.innerHTML = htmlString;
    })
}
