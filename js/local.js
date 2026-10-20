// 카카오 SDK 초기화 + 공유 템플릿 + 지도 (정적 호스팅용)
(function(){
  var C = window.WEDDING_CONFIG || {};
  var hasKey = !!(C.kakaoJsKey && C.kakaoJsKey.length > 10);

  if (hasKey && window.Kakao && !Kakao.isInitialized()) Kakao.init(C.kakaoJsKey);

  // 카카오톡 공유 (원본과 동일한 location 템플릿: 청첩장 보기 / 위치 보기 버튼)
  if (window.common) {
    common.shareKakao = function(){
      if (!hasKey) { alert('카카오톡 공유를 쓰려면 config.js에 카카오 JavaScript 키를 넣어주세요.'); return; }
      Kakao.Share.sendDefault({
        objectType: 'location',
        address: C.placeAddress,
        addressTitle: C.placeName,
        content: {
          title: C.shareTitle,
          description: C.shareDescription,
          imageUrl: C.shareImage,
          imageWidth: C.shareImageWidth,
          imageHeight: C.shareImageHeight,
          link: { mobileWebUrl: C.siteUrl, webUrl: C.siteUrl }
        },
        buttons: [{ title: '청첩장 보기', link: { mobileWebUrl: C.siteUrl, webUrl: C.siteUrl } }]
      });
    };
  }

  // 지도: 키가 있으면 카카오맵 SDK 로드 (index.js가 MT001로 렌더), 없으면 구글 지도 임베드
  if (hasKey) {
    var s = document.createElement('script');
    s.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=' + C.kakaoJsKey + '&autoload=false&libraries=services';
    document.head.appendChild(s);
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      var map = document.getElementById('map');
      if (!map) return;
      map.setAttribute('mapType', 'MT999');
      setTimeout(function(){
        map.innerHTML = '<iframe style="width:100%;height:100%;border:0;display:block" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=' + C.lat + ',' + C.lon + '&z=17&hl=ko&output=embed"></iframe>';
      }, 50);
    });
  }
})();
