export const makeInfoWindow = (place) => {
  const {
    name,
    address,
    kakao_url,
    naver_url,
    instagram_url,
    instagram_hashtag,
    kakao_star,
    naver_star,
  } = place;

  return `<div class="card border-primary mb-3" style="max-width: 18rem;">
        <div class="card-header">가게 정보</div>
        <div class="card-body ">
            <div class="card-header"> 이름 : ${name}</div>
            ${
              place.kakao_star !== null
                ? `<div class="card-list"><a href=${kakao_url} target="_blank" class="card-link">카카오</a><div class="card-text text-primary">&nbsp;별점 : ${kakao_star}</div></div>`
                : ''
            }
            ${
              naver_star !== null
                ? `<div class="card-list"><a href=${naver_url} target="_blank" class="card-link text-success">네이버</a><div class="card-text text-success">&nbsp;별점 : ${naver_star}</div></div>`
                : ''
            }
            ${
              instagram_hashtag !== null
                ? `<div class="card-list"><a href=${instagram_url} target="_blank" class="card-link" style="color: #6f42c1">인스타그램</a><div class="card-text" style="color: #6f42c1">&nbsp;해시태그 : ${instagram_hashtag}</div></div>`
                : ''
            }
            <p class="card-text">주소 : ${address}</p>
        </div>
    </div>`;
};
