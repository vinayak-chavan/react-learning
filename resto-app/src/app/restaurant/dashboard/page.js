'use client';
import RestrauntHeader from "@/app/_components/RestaurantHeader";
import '../../restaurant/style.css';
import AddFoodItem from "@/app/_components/AddFoodItem";
import { useState } from "react";
import './../style.css';
import FooditemList from "@/app/_components/FoodItemList";

const dashboard = () => {
	const [addItem, setAddItem] = useState(false);

	return (
		<>
			<RestrauntHeader />
			<button onClick={() => setAddItem(true)}>Add Food</button>
			<button onClick={() => setAddItem(false)}>Dashboard</button>
			{
				addItem ? <AddFoodItem setAddItem={setAddItem}/> : <FooditemList />
			}

		</>
	)
}

export default dashboard;