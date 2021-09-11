import React, { useEffect } from "react";
import Kakaomap from "../components/kakaomap";

interface IProps {
	children: React.ReactNode;
}

function Map({ children }: IProps) {
	const kakaoMap = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (kakaoMap && kakaoMap.current) {
			const x = 127.024686;
			const y = 37.497349;
			const coords = new (window as any).kakao.maps.LatLng(y, x); // 지도의 중심좌표
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

			// 마커 클릭 이벤트
			new (window as any).kakao.maps.event.addListener(marker, "click", function () {
				console.log("마커를 클릭!");
			});
		}
	}, [kakaoMap]);
	return (
		<>
			<Kakaomap ref={kakaoMap} />
			<div>맘모스 크라상</div>
			<div>서울 서초구 서초대로</div>
			<div>텀블러 사용 시 10% 할인</div>
		</>
	);
}

export default Map;
