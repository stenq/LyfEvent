import React, { useState, useRef,  useEffect} from 'react';
import Modal from "../components/Modal"


const CreateEventPage = ({eventId}) => {
  
  const [modalOpen, setModalOpen]= useState(false)

  const [imageSrc, setImageSrc] = useState(null);

  const picUrl = useRef(null);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
      title: '',
      date: '',
      description: '',
      location: '',
      image: '',
      capacity: '',
      category: '',
    });

    useEffect(() => {
      if (eventId) {
        // Fetch event data by ID
        const fetchEventData = async () => {
          try {
            const response = await fetch(`/api/events-detail/${eventId}`);
            const data = await response.json();
    
            if (response.ok) {
              // Preload event form data
              setFormData({
                title: data.title,
                date: data.date,
                description: data.description,
                location: data.location,
                image: data.image,
                capacity: data.capacity,
                category: data.category,
              });
    
              // Convert image URL to Base64
              if (data.image) {
                const imageResponse = await fetch(data.image);
                const blob = await imageResponse.blob();
    
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result;
                  picUrl.current = base64String; // Save the Base64 string
                  setImageSrc(base64String); // Show preview
                  setFormData((prev) => ({
                    ...prev,
                    image: base64String, // Update form data with the Base64 image
                  }));
                };
                reader.readAsDataURL(blob);
              }
            } else {
              console.error('Error fetching event data:', data.message || 'Unknown error');
            }
          } catch (error) {
            console.error('Error fetching event data:', error);
          }
        };
    
        fetchEventData();
      }
    }, [eventId]);
    



  const updatePic = (image) => {
    picUrl.current = image;
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();

  };


  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      setImageSrc(imageUrl);
      setModalOpen(true);
    });
    reader.readAsDataURL(file);
  };

  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };


  

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const finalFormData = {
        ...formData,
        image: picUrl.current,  // Assuming picUrl.current contains the correct image URL or data
      };
    
      try {
        const response = await fetch('/api/events-create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalFormData),
        });
    
        const data = await response.json(); // Get the response body after awaiting fetch
    
        if (response.ok) {
          // Event was created successfully
          console.log('Event created successfully:', data);
        } else {
          // Failed to create the event, log the errors
          console.error('Error:', data.errors || data.message || 'Unknown error');
        }
      } catch (error) {
        // Handle any network or other errors
        console.error('Network Error:', error);
      }
    };

    const handleSubmitChange = async (e) => {
      e.preventDefault();
    
      const finalFormData = {
        ...formData,
        image: picUrl.current,  // Assuming picUrl.current contains the correct image URL or data
      };
    
      try {
        const response = await fetch(`/api/events-update/${eventId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalFormData),
        });
    
        const data = await response.json(); // Get the response body after awaiting fetch
    
        if (response.ok) {
          // Event was created successfully
          console.log('Event created successfully:', data);
        } else {
          // Failed to create the event, log the errors
          console.error('Error:', data.errors || data.message || 'Unknown error');
        }
      } catch (error) {
        // Handle any network or other errors
        console.error('Network Error:', error);
      }
    };


    return (
      <div className="container mx-auto p-4 max-w-2xl bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{eventId ? "Edit Event" : "Create Event"}</h1>
        <form className="grid grid-cols-1 gap-6" onSubmit={eventId ? handleSubmitChange : handleSubmit}>
  
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Event Title"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 focus:ring-opacity-50 p-3 bg-gray-50"
            />
          </div>
  
          <div>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 focus:ring-opacity-50 p-3 bg-gray-50"
            >
              <option value="">Select a category</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Arts">Arts</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
  
          <div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Event Description"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 focus:ring-opacity-50 p-3 bg-gray-50"
            ></textarea>
          </div>
  
          <div>
            <label
              htmlFor="image-upload"
              className={`block w-full h-48 rounded-md cursor-pointer flex flex-col items-center justify-center ${
                picUrl.current ? "border-2 border-blue-500" : "border-2 border-dashed border-gray-400"
              }`}
            >
              <div className="text-center">
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 px-4"
                  >
                    {picUrl.current ? "Upload New Picture" : "Select from the computer"}
                  </button>
                </div>
                {picUrl.current ? (
                  <p className="text-green-500">
                    Image Uploaded:{" "}
                    <a
                      href={picUrl.current}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Preview Image
                    </a>
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">PNG, JPG, SVG</p>
                )}
              </div>
            </label>
  
            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              ref={fileInputRef}
              onChange={onSelectFile}
            />
          </div>
  
          {modalOpen && <Modal closeModal={() => setModalOpen(false)} imageSrc={imageSrc} updatePic={updatePic} />}
  
          <div>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 focus:ring-opacity-50 p-3 bg-gray-50"
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 focus:ring-opacity-50 p-3 bg-gray-50"
              />
            </div>
  
            <div>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 focus:ring-opacity-50 p-3 bg-gray-50"
              />
            </div>
          </div>
  
          <div className="mt-4">
            <button
              type="submit"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              {eventId ? "Save Changes" : "Save"}
            </button>
          </div>
        </form>
      </div>
    );
  };

export default CreateEventPage;
