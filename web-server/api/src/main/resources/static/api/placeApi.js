const BASE_URL = 'http://localhost:8080';

async function getPlaceByDong() {
    let url = new URL(`${BASE_URL}/api/places`);
    let params = { dong : 345 };
    url.search = new URLSearchParams(params).toString();

    let response = await fetch(url);
    let res = await response.json();

    let { data } = res;
    return data;
}