import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load auth tokens from localStorage
  const [authTokens, setAuthTokens] = useState(() => {
    return localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
  });

  // Load user data from JWT
  const [user, setUser] = useState(() => {
    return localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null;
  });

  const [loading, setLoading] = useState(true);
  const [joinedEvents, setJoinedEvents] = useState([]); // Track joined events

  // Function to fetch joined events
  const fetchJoinedEvents = async (accessToken) => {
    if (!accessToken || !user) return;
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/my-joined-events/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setJoinedEvents(data.map(event => event.id)); // Store event IDs
      } else {
        console.error("Failed to fetch joined events.");
        setJoinedEvents([]);
      }
    } catch (error) {
      console.error("Error fetching joined events:", error);
      setJoinedEvents([]);
    }
  };
  

  // Function to update joined events in state
  const updateJoinedEvents = (events) => {
    setJoinedEvents(events);
  };

  // User login function
  const loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      await fetchJoinedEvents(data.access); // Fetch joined events after login
      navigate("/profile");
    } else {
      alert("Something Went Wrong");
    }
  };

  // User logout function
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setJoinedEvents([]); // Clear joined events
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  // Refresh access token function
  const updateToken = async () => {
    if (!authTokens?.refresh) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/token-refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        await fetchJoinedEvents(data.access); // Fetch joined events
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  // Provide authentication-related data and functions to children components
  const authContextData = {
    user: user,
    authTokens: authTokens,
    loading: loading,
    loginUser: loginUser,
    logoutUser: logoutUser,
    joinedEvents: joinedEvents,
    updateJoinedEvents: updateJoinedEvents,
  };

  // Effect to refresh token periodically and on mount
  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMin = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMin);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
