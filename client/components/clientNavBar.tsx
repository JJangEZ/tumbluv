import Link from "next/link";

function ClientNavBar(): JSX.Element {
	// HOME 지도 쿠폰 피드 더보기
	const navData = [
		{
			id: 1,
			route: "/home",
			name: "HOME",
		},
		{
			id: 2,
			route: "/map",
			name: "지도",
		},
		{
			id: 3,
			route: "/coupon",
			name: "쿠폰",
		},
		{
			id: 4,
			route: "/feed",
			name: "피드",
		},
		{
			id: 5,
			route: "/more",
			name: "더보기",
		},
	];

	return (
		<ul>
			{navData.map((nav) => (
				<li key={nav.id}>
					<Link href={nav.route}>
						<a>{nav.name}</a>
					</Link>
				</li>
			))}
		</ul>
	);
}

export default ClientNavBar;
