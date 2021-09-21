import React, { useEffect } from "react";
import ClientNavBar from "../components/clientNavBar";
import Kakaomap from "../components/kakaomap";

interface IProps {
	children: React.ReactNode;
}

function Map({ children }: IProps) {
	const kakaoMap = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (kakaoMap && kakaoMap.current) {
			const latitude = 37.497349; // 위도
			const longitude = 127.024686; // 경도
			const coords = new (window as any).kakao.maps.LatLng(latitude, longitude); // 지도의 중심좌표
			const options = {
				center: coords,
				level: 4,
			};
			const map = new (window as any).kakao.maps.Map(kakaoMap.current, options);
			const marker = new (window as any).kakao.maps.Marker({
				position: coords,
				clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
				map,
			});
			// 맵의 중앙으로 이동
			map.relayout();
			map.setCenter(coords);
			// 마커를 중앙으로 이동
			marker.setPosition(coords);

			// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
			const zoomControl = new (window as any).kakao.maps.ZoomControl();
			map.addControl(zoomControl, (window as any).kakao.maps.ControlPosition.RIGHT);

			let iwContent =
				'<div style="padding:5px;">맘모스 크라상</div><div>서울 서초구 서초대로</div><div>텀블러 사용 시 10% 할인</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
			let iwPosition = new (window as any).kakao.maps.LatLng(latitude, longitude); //인포윈도우 표시 위치입니다
			let iwRemoveable = true; // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

			// 인포윈도우를 생성하고 지도에 표시합니다
			let infowindow = new (window as any).kakao.maps.InfoWindow({
				map: map, // 인포윈도우가 표시될 지도
				position: iwPosition,
				content: iwContent,
				removable: iwRemoveable,
			});

			// 아래 코드는 인포윈도우를 지도에서 제거합니다
			// infowindow.close();

			// 마커 클릭 이벤트
			new (window as any).kakao.maps.event.addListener(marker, "click", function () {
				console.log("마커를 클릭!");
				infowindow.open(map);
			});
		}
	}, [kakaoMap]);
	return (
		<>
			<Kakaomap ref={kakaoMap} />
			<ClientNavBar />
		</>
	);
}

export default Map;
