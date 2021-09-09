import dummy from "../data/cafelist.json";

function List() {
	return (
		<>
			<div>☕️ This is cafe list!</div>
			{dummy.cafelist.map((cafe) => (
				<div key={cafe.id}>
					<div>{cafe.name}</div>
					<div>{cafe.address}</div>
				</div>
			))}
		</>
	);
}

export default List;
