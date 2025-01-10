import { useState } from "react";
import { useRouter } from "next/navigation";

const RestrauntSignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cPassword, setCPassword] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [contact, setContact] = useState('');
	const router = useRouter();
	const [error, setError] = useState(false);
	const [passwordError, setpasswordError] = useState(false);

	const handleSignup = async () => {
		if (password !== cPassword) {
			setpasswordError(true);
			return false;
		} else {
			setpasswordError(false);
		}
		if (!name || !email || !password || !cPassword || !address || !city || !contact) {
			setError(true);
			return false;
		} else {
			setError(false);
		}
		
		const payload = {
			name,
			email,
			password,
			cPassword,
			address,
			city,
			contact
		};
		let response = await fetch('http://localhost:3000/api/restaurant', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		}
		)
		response = await response.json();

		if (response.success) {
			alert("Restaurant registration successful");
			const { result } = response;
			delete result.password;
			localStorage.setItem("restaurantUser", JSON.stringify(result));
			router.push("/restaurant/dashboard");
		}
	}

	return (
		<>
			<h3>SignUp Restaurant</h3>
			<div>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter restaurant name" className="input-field" value={name} onChange={(event) => setName(event.target.value)} />
					{
						error && !name && <span className="input-error">Please enter valid name</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter email id" className="input-field" value={email} onChange={(event) => setEmail(event.target.value)} />
					{
						error && !email && <span className="input-error">Please enter valid email</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="password" placeholder="Enter password" className="input-field" value={password} onChange={(event) => setPassword(event.target.value)} />
					{
						error && !password && <span className="input-error">Please enter valid password</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="password" placeholder="Confirm password" className="input-field" value={cPassword} onChange={(event) => setCPassword(event.target.value)} />
					{
						passwordError && <span className="input-error">Password and Confirm password does not match</span>
					}
					{
						error && !cPassword && <span className="input-error">Please enter valid confirm password</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter full address" className="input-field" value={address} onChange={(event) => setAddress(event.target.value)} />
					{
						error && !address && <span className="input-error">Please enter valid address</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter city" className="input-field" value={city} onChange={(event) => setCity(event.target.value)} />
					{
						error && !city && <span className="input-error">Please enter valid city</span>
					}
				</div>
				<div className="input-wrapper">
					<input type="text" placeholder="Enter contact number" className="input-field" value={contact} onChange={(event) => setContact(event.target.value)} />
					{
						error && !contact && <span className="input-error">Please enter valid contact</span>
					}
				</div>
				<div className="input-wrapper">
					<button className="button" onClick={handleSignup}>SignUp</button>
				</div>
			</div>
		</>
	)
}

export default RestrauntSignUp;