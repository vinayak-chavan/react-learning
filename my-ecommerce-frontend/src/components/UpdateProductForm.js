// src/components/UpdateProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Input } from '@mui/material';

const UpdateProductForm = () => {
    const { productId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState(null);
		const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { name, description, price } = response.data;
                setName(name);
                setDescription(description);
                setPrice(price);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            if (photo) {
                formData.append('photo', photo);
            }

            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:8000/products/${productId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            alert('Product updated successfully!');
						navigate(`/products`);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Update Product
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
                    <InputLabel htmlFor="photo">Update Photo</InputLabel>
                    <Input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                </FormControl>
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Update Product
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default UpdateProductForm;
