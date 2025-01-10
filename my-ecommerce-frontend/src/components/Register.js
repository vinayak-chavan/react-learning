import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [role, setRole] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:8000/users/register', { name, email, password, role });
			alert('Register successfully!');
			navigate('/login');
		} catch (error) {
			alert('Registration failed');
		}
	};

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<Container maxWidth="xs">
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			>
				<Typography component="h1" variant="h5">Register</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					id="name"
					label="Name"
					name="name"
					autoFocus
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="role"
					label="Role"
					name="role"
					value={role}
					onChange={(e) => setRole(e.target.value)}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Register
				</Button>
				<Button
					type="button"
					fullWidth
					variant="outlined"
					color="secondary" 
					onClick={handleLogin}
					sx={{ mb: 2 }}
				>
					Login
				</Button>
			</Box>
		</Container>
	);
};

export default Register;
