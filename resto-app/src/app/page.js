'use client';
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomersHeader";
import Footer from "./_components/Footer";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurant] = useState([]);

  useEffect(() => {
    LoadLocations();
    LoadRestaurant();
  }, []);

  const LoadLocations = async () => {
    let response = await fetch('http://localhost:3000/api/customer/locations');
    response = await response.json();
    if (response.status === 200) {
      setLocations(response.result);
    }
  }

  const LoadRestaurant = async (params) => {
    let url = 'http://localhost:3000/api/customer';
    if (params?.location) {
      url = url + "?location=" + params.location
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.status === 200) {
      setRestaurant(response.result);
    }
  }

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    LoadRestaurant({ location: item })
  }

  const handleInputChange = (event) => {
    setSelectedLocation(event.target.value);
  }

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            onClick={() => setShowLocation(true)}
            value={selectedLocation}
            onChange={handleInputChange}
            className="select-input"
            placeholder="Enter Place"
          />
          <ul className="location-list">
            {
              showLocation && locations.map((item) => (
                <li key={item} onClick={() => handleListItem(item)}>{item}</li>
              ))
            }
          </ul>
          <input type="text" className="search-input" onChange={(e) => LoadRestaurant({ restaurant: e.target.value })} placeholder="Enter food or restaurant" />
        </div>
      </div>

      <div className="restaurant-list-container">
        {
          restaurants.map((item) => (
            <div className="restaurant-wrapper">
              <div className="heading-wrapper">
                <h3>{item.name}</h3>
                <h5>Contact: {item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city}, {item.address}, Email: {item.email}</div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </main>
  );
}
