"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditFoodItem = (props) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [path, setPath] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState(false);
	const router = useRouter();

	useEffect(() => {
		handleLoadFoodItem();
	}, []);

	const handleLoadFoodItem = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/restaurant/food/edit/${props.params.id}`);
			const data = await response.json();

			if (response.status === 200) {
				const foodItem = data.result;
				setName(foodItem.name);
				setPrice(foodItem.price);
				setPath(foodItem.path);
				setDescription(foodItem.description);
			} else {
				alert("Food item is not loading");
			}
		} catch (error) {
			alert("An error occurred while loading the food item.");
		}
	};

	const handleEditFoodItem = async () => {
		if (!name || !price || !path || !description) {
			setError(true);
			return false;
		} else {
			setError(false);
		}

		const payload = {
			name, price, path, description
		}

		let response = await fetch(`http://localhost:3000/api/restaurant/food/edit/${props.params.id}`, {
			method: 'PUT',
			body: JSON.stringify(payload)
		});
		response = await response.json();

		if (response.success) {
			alert("Food item updated successfully");
			router.push('../dashboard')
		}
	};

	return (
		<>
			<div className="container">
				<h1>Edit Food Item</h1>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter food name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
					{
						error && !name && <span className="input-error">Please enter valid food name</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter price" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} />
					{
						error && !price && <span className="input-error">Please enter valid price</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter image link" className="input-field" value={path} onChange={(e) => setPath(e.target.value)} />
					{
						error && !path && <span className="input-error">Please enter valid link</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter description" className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} />
					{
						error && !description && <span className="input-error">Please enter valid description</span>
					}
				</div>
				<div className="input-wrapper">
					<button className="button" onClick={handleEditFoodItem}>Update Food Item</button>
				</div>
				<div className="input-wrapper">
					<button className="button" onClick={() => router.push('../dashboard')}>Back To Food Item List</button>
				</div>
			</div>
		</>
	);
};

export default EditFoodItem;
