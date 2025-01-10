// src/components/AddProductForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Input } from '@mui/material';

const AddProductForm = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [photo, setPhoto] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('description', description);
			formData.append('price', price);
			formData.append('photo', photo); // Append photo file to form data

			const token = localStorage.getItem('token');
			await axios.post(
				'http://localhost:8000/products',
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data'
					}
				}
			);
			alert('Product added successfully!');
			setName('');
			setDescription('');
			setPrice('');
			setPhoto(null);
			navigate(`/products`);
		} catch (error) {
			console.error('Error adding product:', error);
			alert('Failed to add product');
		}
	};

	const handlePhotoChange = (e) => {
		setPhoto(e.target.files[0]);
	};

	return (
		<Container maxWidth="sm">
			<Typography variant="h4" component="h1" gutterBottom>
				Add Product
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Name"
					fullWidth
					margin="normal"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<TextField
					label="Description"
					fullWidth
					multiline
					rows={4}
					margin="normal"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<TextField
					type="number"
					label="Price"
					fullWidth
					margin="normal"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel htmlFor="photo">Photo</InputLabel>
					<Input
						type="file"
						id="photo"
						accept="image/*"
						onChange={handlePhotoChange}
						required
					/>
				</FormControl>
				<Box mt={2}>
					<Button type="submit" variant="contained" color="primary">
						Add Product
					</Button>
				</Box>
			</form>
		</Container>
	);
};

export default AddProductForm;
