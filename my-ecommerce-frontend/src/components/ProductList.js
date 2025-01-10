import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	Button,
	Box,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddProductForm from './AddProductForm';
import UpdateProductForm from './UpdateProductForm';

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [quantities, setQuantities] = useState({});
	const dispatch = useDispatch();
	const token = useSelector((state) => state.user.token);
	const role = useSelector((state) => state.user.role);
	const [showAddForm, setShowAddForm] = useState(false);
	const [editProductId, setEditProductId] = useState(null);
	const navigate = useNavigate();

	// Fetch products on component mount and whenever token changes
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get('http://localhost:8000/products', {
					headers: { Authorization: `Bearer ${token}` }
				});
				setProducts(response.data);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		// Fetch products only if token is available
		if (token) {
			fetchProducts();
		}
	}, [token, showAddForm, editProductId]);

	// Fetch token from localStorage on component mount
	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			dispatch({ type: 'SET_TOKEN', payload: storedToken });
		}
	}, [dispatch]);

	const handleToggleAddForm = () => {
		setShowAddForm(!showAddForm);
		setEditProductId(null);
	};

	const handleEditProduct = (productId) => {
		navigate(`/products/${productId}/edit`);
	};

	const handleDeleteProduct = async (productId) => {
		try {
			await axios.delete(`http://localhost:8000/products/${productId}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			setProducts(products.filter(product => product.ID !== productId));
			alert('Product deleted successfully!');
		} catch (error) {
			console.error('Error deleting product:', error);
			alert('Failed to delete product');
		}
	};

	const handleQuantityChange = (productId, quantity) => {
		setQuantities({
			...quantities,
			[productId]: quantity
		});
	};

	const handleAddToCart = async (productId) => {
		const quantity = quantities[productId] || 1;
		try {
			const response = await axios.post('http://localhost:8000/cart', {
				productId,
				quantity
			}, {
				headers: { Authorization: `Bearer ${token}` }
			});
			alert('Product added to cart successfully!');
		} catch (error) {
			console.error('Error adding product to cart:', error);
			alert('Failed to add product to cart');
		}
	};

	return (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom>
				Product List
			</Typography>
			{role === 'Admin' && (
				<Box mb={2}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						onClick={handleToggleAddForm}
					>
						{showAddForm ? 'Return To List' : 'Add Product'}
					</Button>
				</Box>
			)}
			{showAddForm ? (
				<AddProductForm />
			) : (
				<Grid container spacing={4}>
					{products.map((product) => (
						<Grid item key={product.ID} xs={12} sm={6} md={4}>
							<Card>
								<CardMedia
									component="img"
									height="200"
									image={`http://localhost:8000/${product.photo}` || 'placeholder.jpg'}
									alt={product.name}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{product.name}
									</Typography>
									<Typography variant="body2" color="text.secondary" paragraph>
										{product.description}
									</Typography>
									<Typography variant="h6" color="primary">
										${product.price}
									</Typography>
									{role !== 'Admin' && (
										<FormControl fullWidth variant="outlined" margin="normal">
											<InputLabel>Quantity</InputLabel>
											<Select
												value={quantities[product.ID] || 1}
												onChange={(e) => handleQuantityChange(product.ID, e.target.value)}
												label="Quantity"
											>
												{[...Array(10).keys()].map(i => (
													<MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								</CardContent>
								<CardActions>
									{role === 'Admin' ? (
										<>
											<Button
												size="small"
												color="primary"
												startIcon={<EditIcon />}
												onClick={() => handleEditProduct(product.ID)}
											>
												Edit
											</Button>
											<Button
												size="small"
												color="secondary"
												startIcon={<DeleteIcon />}
												onClick={() => handleDeleteProduct(product.ID)}
											>
												Delete
											</Button>
										</>
									) : (
										<Button
											size="small"
											color="primary"
											startIcon={<ShoppingCartIcon />}
											onClick={() => handleAddToCart(product.ID)}
										>
											Add to Cart
										</Button>
									)}
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
			{editProductId !== null && (
				<UpdateProductForm productId={editProductId} />
			)}
		</Container>
	);
};

export default ProductList;
