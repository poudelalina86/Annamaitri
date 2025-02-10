import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    userType: "",
    recipientType: "",
    latitude: "",
    longitude: "",
    location: "", 
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevState) => ({
            ...prevState,
            latitude,
            longitude,
            location: `${latitude}, ${longitude}`, // You can store this location or omit if not needed
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Signup failed", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Location */}
          <div className="flex space-x-2">
            <input
              id="location"
              name="location"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Use Current Location
            </button>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your contact number"
            />
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select User Type</option>
              <option value="donor">Donor</option>
              <option value="receiver">Receiver</option>
            </select>
          </div>

          {/* Recipient Type (Only if Receiver) */}
          {formData.userType === "receiver" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipient Type
              </label>
              <select
                name="recipientType"
                value={formData.recipientType}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Recipient Type</option>
                <option value="orphanage">Orphanage</option>
                <option value="shelter">Shelter</option>
                <option value="ngo">NGO</option>
                <option value="poultry farming">Poultry Farming</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-900 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-sm font-medium ${
              !formData.name ||
              !formData.email ||
              !formData.password ||
              !formData.contact ||
              !formData.userType ||
              (formData.userType === "receiver" && !formData.recipientType)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              isLoading ||
              !formData.name ||
              !formData.email ||
              !formData.password ||
              !formData.contact ||
              !formData.userType ||
              (formData.userType === "receiver" && !formData.recipientType)
            }
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
