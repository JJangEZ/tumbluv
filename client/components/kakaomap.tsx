import React, { forwardRef, Ref } from "react";

type KakaomapProps = {
	ref: Ref<HTMLDivElement>;
};
const Kakaomap: React.FC<KakaomapProps> = forwardRef((props, ref) => {
	return (
		<div style={{ width: "360px", height: "400px" }}>
			<div ref={ref} style={{ width: "100%", height: "100%" }} />
		</div>
	);
});

export default Kakaomap;
