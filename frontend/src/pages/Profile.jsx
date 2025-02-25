import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import defaultUserImg from "../assets/img/defaultuser.jpg";
import swag from "../assets/img/swag.jpg";

const Profile = () => {
  const { user, authTokens, logoutUser, joinedEvents } = useContext(AuthContext);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEventDetails, setJoinedEventDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("created");

  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    profile_picture: user?.profile_picture || defaultUserImg,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        const response = await fetch("/api/my-events", {
          headers: { Authorization: `Bearer ${authTokens?.access}` },
        });
        if (!response.ok) throw new Error("Failed to fetch created events.");
        const data = await response.json();
        setCreatedEvents(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchJoinedEventDetails = async () => {
      try {
        const eventPromises = joinedEvents.map((eventId) =>
          fetch(`/api/events-detail/${eventId}/`, {
            headers: { Authorization: `Bearer ${authTokens?.access}` },
          }).then((response) => response.json())
        );
        const events = await Promise.all(eventPromises);
        setJoinedEventDetails(events);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (authTokens) {
      fetchCreatedEvents();
      fetchJoinedEventDetails();
    }
  }, [authTokens, joinedEvents]);

  // Handle Input Change
  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle Profile Picture Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profile_picture: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };


  // Save Profile Changes
  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("username", profileData.username);
  
    if (profileData.profile_picture instanceof File) {
      formData.append("profile_picture", profileData.profile_picture);
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/", {
        method: "PUT",
        headers: { Authorization: `Bearer ${authTokens?.access}` },
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to update profile.");
  
      const data = await response.json();
      console.log("Updated profile data:", data);
  
      // Ensure full URL is stored
      setProfileData({
        username: data.username,
        profile_picture: data.profile_picture
          ? `http://localhost:8000${data.profile_picture}`  
          : defaultUserImg,
      });
  
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Cancel Editing and Revert Changes
  const handleCancelEdit = () => {
    setProfileData({
      username: user.username,
      profile_picture: user.profile_picture || defaultUserImg,
    });
    setPreviewImage(null);
    setIsEditing(false);
  };
  

  if (!user) {
    return <p className="text-center text-xl font-semibold">Please log in to view your profile.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col">
        <div className="max-w-6xl w-full mx-auto mt-5 bg-white shadow-lg rounded-lg overflow-hidden p-6">
          {/* Banner Section */}
          <div className="relative h-40 bg-gray-300">
            <img src={swag} alt="Banner" className="w-full h-full object-cover" />
          </div>

          {/* Profile Info */}
          <div className="relative p-8">
            <div className="absolute -top-12 left-6 w-24 h-24">
              
              <img
              
                src={previewImage || profileData.profile_picture}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="ml-32">
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{profileData.username}</h1>
                  <p className="text-gray-600">@{profileData.username}</p>
                </>
              )}

              {isEditing && (
                <input type="file" onChange={handleFileChange} className="border p-2 rounded w-full mt-2" />
              )}

              <div className="mt-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-500 mr-2"
                    >
                      Back
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                  >
                    Edit Profile
                  </button>
                )}

                <button
                  onClick={logoutUser}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Tabs for Created and Joined Events */}
          <div className="border-b flex">
            <button
              className={`flex-1 py-3 text-center text-lg font-semibold ${
                activeTab === "created" ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("created")}
            >
              Created Events
            </button>
            <button
              className={`flex-1 py-3 text-center text-lg font-semibold ${
                activeTab === "joined" ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("joined")}
            >
              Joined Events
            </button>
          </div>

          {/* Event Grid */}
          <div className="p-6 flex-grow">
            {activeTab === "created" ? (
              createdEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {createdEvents.map((event) => (
                    <Link to={`/event/${event.id}`} key={event.id} className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">You haven't created any events yet.</p>
              )
            ) : joinedEventDetails.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {joinedEventDetails.map((event) => (
                  <Link to={`/event/${event.id}`} key={event.id} className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">You haven't joined any events yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
