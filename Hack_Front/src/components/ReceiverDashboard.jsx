import { useState } from "react";

// Mock donor data with coordinates
const donors = [
  { id: 1, name: "John Doe", foodType: "Vegetables", quantity: "10kg", location: "Kathmandu", contactNumber: "9876543210", availableUntil: "Feb 15, 2025", lat: 27.7172, lon: 85.3240 },
  { id: 2, name: "Jane Smith", foodType: "Rice", quantity: "20kg", location: "Lalitpur", contactNumber: "9801234567", availableUntil: "Feb 20, 2025", lat: 27.6644, lon: 85.3188 },
  { id: 3, name: "Mike Johnson", foodType: "Fruits", quantity: "5kg", location: "Bhaktapur", contactNumber: "9812345678", availableUntil: "Feb 18, 2025", lat: 27.6726, lon: 85.4298 },
];

// Haversine formula to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const ReceiverDashboard = () => {
  const [filterDistance, setFilterDistance] = useState(10); // Default filter: 10 km
  const userLocation = { lat: 27.7000, lon: 85.3333 }; // Kathmandu coordinates (replace with real user location)

  // Filter donors based on selected distance
  const filteredDonors = donors.filter(
    (donor) => getDistance(userLocation.lat, userLocation.lon, donor.lat, donor.lon) <= filterDistance
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Receiver Dashboard</h2>

      {/* Dropdown for Distance Filter */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filter by Distance:</label>
        <select
          value={filterDistance}
          onChange={(e) => setFilterDistance(Number(e.target.value))}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          <option value="5">5 km</option>
          <option value="10">10 km</option>
          <option value="20">20 km</option>
          <option value="50">50 km</option>
        </select>
      </div>

      {/* Donor Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <thead>
          <tr style={{ background: "teal", color: "white", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Donor Name</th>
            <th style={{ padding: "10px" }}>Food Type</th>
            <th style={{ padding: "10px" }}>Quantity</th>
            <th style={{ padding: "10px" }}>Location</th>
            <th style={{ padding: "10px" }}>Contact Number</th>
            <th style={{ padding: "10px" }}>Available Until</th>
            <th style={{ padding: "10px" }}>Distance (km)</th>
            <th style={{ padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <tr key={donor.id} style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                <td style={{ padding: "10px" }}>{donor.name}</td>
                <td style={{ padding: "10px" }}>{donor.foodType}</td>
                <td style={{ padding: "10px" }}>{donor.quantity}</td>
                <td style={{ padding: "10px" }}>{donor.location}</td>
                <td style={{ padding: "10px" }}>{donor.contactNumber}</td>
                <td style={{ padding: "10px" }}>{donor.availableUntil}</td>
                <td style={{ padding: "10px", fontWeight: "bold" }}>{getDistance(userLocation.lat, userLocation.lon, donor.lat, donor.lon).toFixed(1)} km</td>
                <td style={{ padding: "10px" }}>
                  <button
                    style={{
                      background: "#28a745",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Contact
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "10px", color: "#888" }}>
                No donors found within {filterDistance} km.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiverDashboard;