import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const ReceiverDashboard = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]); // Store donors from API
  const [filterDistance, setFilterDistance] = useState(5);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [viewHistory, setViewHistory] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userLocation = { lat: 27.7000, lon: 85.3333 }; // Default user location

  // Function to calculate distance between two points
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Fetch donors from backend API
  useEffect(() => {
    axios.get("http://localhost:5000/api/Donors/donors") // Update with your actual API endpoint
      .then((response) => {
        setDonors(response.data); // Store fetched donors
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donors:", err);
        setError("Failed to load donor data.");
        setLoading(false);
      });
  }, []);

  const handleRequestHistory = () => {
    setViewHistory(true);
    setViewNotifications(false);
  };

  const handleNotifications = () => {
    setViewNotifications(true);
    setViewHistory(false);
  };

  const filteredDonors = donors.filter(
    (donor) => getDistance(userLocation.lat, userLocation.lon, donor.lat, donor.lon) <= filterDistance
  );

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-teal-700 text-white p-8 flex flex-col items-center shadow-lg justify-between">
        <h2 className="text-3xl font-bold text-center mb-6">Receiver Dashboard</h2>
        <ul className="w-full mb-auto">
          <li>
            <button
              className="w-full text-left py-3 px-6 text-lg rounded-lg hover:bg-teal-700"
              onClick={() => { setViewHistory(false); setViewNotifications(false); }}
            >
              View Donors
            </button>
          </li>
          <hr className="my-4 border-gray-300 w-full" />
          <li>
            <button className="w-full text-left py-3 px-6 text-lg rounded-lg hover:bg-teal-700" onClick={handleRequestHistory}>
              Request History
            </button>
          </li>
          <hr className="my-4 border-gray-300 w-full" />
          <li>
            <button className="w-full text-left py-3 px-6 text-lg rounded-lg hover:bg-teal-600" onClick={handleNotifications}>
              Notifications
            </button>
          </li>
          <hr className="my-4 border-gray-300 w-full" />
        </ul>
        <button onClick={() => navigate("/")} className="mt-auto w-full py-3 bg-[#8B322C] text-white font-semibold rounded-lg">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-white shadow-lg rounded-lg">
        {loading ? (
          <p className="text-center text-lg">Loading donors...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : viewHistory ? (
          <div><h2 className="text-center text-2xl font-semibold mb-6">Request History</h2><p>No request history yet.</p></div>
        ) : viewNotifications ? (
          <div><h2 className="text-center text-2xl font-semibold mb-6">Notifications</h2><p>No new notifications.</p></div>
        ) : selectedDonor ? (
          <div>
            <button onClick={() => setSelectedDonor(null)} className="mb-4 bg-teal-600 text-white px-4 py-2 rounded-md">
              Back to List
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedDonor.name} - {selectedDonor.foodType} ({selectedDonor.quantity})</h2>
            <MapContainer center={[selectedDonor.lat, selectedDonor.lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
              <Marker position={[selectedDonor.lat, selectedDonor.lon]}>
                <Popup>{selectedDonor.name} is donating {selectedDonor.foodType} ({selectedDonor.quantity}).</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-6">
              <label htmlFor="filter-distance" className="mr-4 font-medium">Filter by Distance:</label>
              <select id="filter-distance" value={filterDistance} onChange={(e) => setFilterDistance(Number(e.target.value))} className="p-2 border-2 border-teal-600 rounded-lg">
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="20">20 km</option>
                <option value="50">50 km</option>
              </select>
            </div>
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="py-3 px-6">Donor Name</th>
                  <th className="py-3 px-6">Food Type</th>
                  <th className="py-3 px-6">Quantity</th>
                  <th className="py-3 px-6">Location</th>
                  <th className="py-3 px-6">Contact</th>
                  <th className="py-3 px-6">Available Until</th>
                  <th className="py-3 px-6">Distance (km)</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.length > 0 ? filteredDonors.map(donor => (
                  <tr key={donor.id} className="border-b">
                    <td className="py-4 px-6">{donor.name}</td>
                    <td className="py-4 px-6">{donor.foodType}</td>
                    <td className="py-4 px-6">{donor.quantity}</td>
                    <td className="py-4 px-6">{donor.location}</td>
                    <td className="py-4 px-6">{donor.contactNumber}</td>
                    <td className="py-4 px-6">{donor.availableUntil}</td>
                    <td className="py-4 px-6 font-bold">{getDistance(userLocation.lat, userLocation.lon, donor.lat, donor.lon).toFixed(1)} km</td>
                    <td className="py-4 px-6"><button onClick={() => setSelectedDonor(donor)} className="bg-teal-600 text-white px-4 py-2 rounded-md">View on Map</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="8" className="text-center py-4">No donors found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiverDashboard;