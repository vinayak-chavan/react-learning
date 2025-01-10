"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FooditemList = () => {
	const [foodItem, setFoodItem] = useState([]);
	const router = useRouter();

	useEffect(() => {
		loadFoodItems();
	}, []);

	const loadFoodItems = async () => {
		try {
			const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
			const restoId = restaurantData._id
			let response = await fetch(`http://localhost:3000/api/restaurant/food/${restoId}`);
			response = await response.json();

			if (response.status === 200) {
				setFoodItem(response.result);
			} else {
				alert("Food item list is not loading");
			}
		} catch (error) {
			console.error("Error loading food items:", error);
			alert("An error occurred while loading the food items.");
		}
	};

	const deleteFoodItem = async (id) => {
		let response = await fetch(`http://localhost:3000/api/restaurant/food/${id}`, {
			method: 'delete'
		});
		response = await response.json();

		if (response.success) {
			loadFoodItems();
		} else {
			alert("Food item not deleted");
		}
	}

	return (
		<>
				<h1>Food Items</h1>
				<table>
					<thead>
						<tr>
							<td>No</td>
							<td>Name</td>
							<td>Price</td>
							<td>Description</td>
							<td>Image</td>
							<td>Operations</td>
						</tr>
					</thead>
					<tbody>
						{
							foodItem && foodItem.map((item, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{item.name}</td>
									<td>{item.price}</td>
									<td>{item.description}</td>
									<td><img src={item.path} alt={item.name} width="100" /></td>
									<td>
										<button onClick={() => deleteFoodItem(item._id)}>Delete</button>
										<button onClick={() => router.push(`dashboard/${item._id}`)}>Edit</button>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
		</>
	);
};

export default FooditemList;
