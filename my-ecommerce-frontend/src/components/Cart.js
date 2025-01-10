import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardMedia, Container, CircularProgress, IconButton, TextField, Button, Alert } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Row, Col } from 'react-bootstrap';

const Cart = () => {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get('http://localhost:8000/cart', {
					headers: { Authorization: `Bearer ${token}` }
				});
				setCartItems(response.data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCartItems();
	}, []);

	const handleUpdateQuantity = async (id, quantity) => {
		try {
			const token = localStorage.getItem('token');
			await axios.put(
				`http://localhost:8000/cart/${id}`,
				{ quantity },
				{
					headers: {
						Authorization: `Bearer ${token}`
					},
				}
			);
			setCartItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, quantity } : item)));
		} catch (error) {
			console.error('Failed to update quantity:', error);
		}
	};

	const handleDeleteItem = async id => {
		try {
			const token = localStorage.getItem('token');
			await axios.delete(`http://localhost:8000/cart/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` }
				});
			setCartItems(prevItems => prevItems.filter(item => item.id !== id));
		} catch (error) {
			console.error('Failed to delete item:', error);
		}
	};

	const handlePlaceOrder = async () => {
		try {
			const token = localStorage.getItem('token');
			await axios.post(
				'http://localhost:8000/orders',
				{},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);
			setSuccess(true);
			setCartItems([]);
		} catch (error) {
			console.error('Failed to place order:', error);
			setError('Failed to place order');
		}
	};

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<CircularProgress />
			</div>
		);
	}

	if (error) {
		return <Alert severity="error">Error: {error}</Alert>;
	}

	return (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom>
				Shopping Cart
			</Typography>
			{success && <Alert severity="success">Order placed successfully!</Alert>}
			{cartItems?.length === 0 || cartItems === null ? (
				<Typography variant="h6" component="p">
					Your cart is empty.
				</Typography>
			) : (
				<>
					<Row>
						{cartItems?.map(item => (
							<Col md={6} key={item.id} className="mb-4">
								<Card>
									<CardMedia
										component="img"
										height="140"
										image={`http://localhost:8000/${item.product.photo}`}
										alt={item.product.name}
									/>
									<CardContent>
										<Typography variant="h6" component="h2">
											{item.product.name}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											{item.product.description}
										</Typography>
										<Typography variant="body1" component="p">
											Price: ${item.product.price}
										</Typography>
										<TextField
											label="Quantity"
											type="number"
											value={item.quantity}
											onChange={e => handleUpdateQuantity(item.id, parseInt(e.target.value))}
											variant="outlined"
											size="small"
											style={{ marginTop: '10px' }}
										/>
										<Typography variant="body1" component="p" style={{ marginTop: '10px' }}>
											Total: ${item.product.price * item.quantity}
										</Typography>
										<IconButton
											onClick={() => handleDeleteItem(item.id)}
											color="secondary"
											style={{ marginTop: '10px' }}
										>
											<DeleteIcon />
										</IconButton>
									</CardContent>
								</Card>
							</Col>
						))}
					</Row>
					<Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{ marginTop: '20px' }}>
						Place Order
					</Button>
				</>
			)}
		</Container>
	);
};

export default Cart;
