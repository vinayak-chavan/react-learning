'use client';
import { useState } from "react"
import RestaurantLogin from "../_components/RestrauntLogin"
import RestrauntSignUp from "../_components/RestrauntSignUp"
import RestrauntHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";
import './style.css';

const Restaurant = () => {
	const [login, setLogin] = useState(true);
	return (
		<>
			<div className="container">
				<RestrauntHeader />
				<h1>Restaurant Login/Signup Page</h1>
				{
					login ? <RestaurantLogin /> : <RestrauntSignUp />
				}

				<div>
					<button onClick={() => { setLogin(!login) }} className="button-link">
						{login ? "New User? SignUp" : "Already Have An Account? Login"}
					</button>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Restaurant