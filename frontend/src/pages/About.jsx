
import React from "react";
import logo from "../assets/logo/logo.svg";
import we from "../assets/img/we.jpg";
import happy from "../assets/img/happypeople.jpg";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center space-y-12 px-6 py-12">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">
          Empowering communities by connecting people to meaningful events.
        </p>
        <img
          src={logo}
          className="mt-6 mx-auto w-32 h-auto rounded-lg shadow-md"
          alt="Company Logo"
        />
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Who We Are Section */}
        <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Who We Are</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            "We are three friends who want to give people the opportunity to
            find events happening in their city. People will also be able to{" "}
            <span className="font-semibold text-blue-600">
              easily create events
            </span>{" "}
            on topics that interest them. We are doing this on our own
            initiative."
          </p>
          <img
            src={we}
            className="w-full h-150 mt-7 object-cover rounded-lg shadow-md"
            alt="We"
            
          />
        </div>

        {/* Combined Our Mission and How We Achieve Sections */}
        <div className="flex flex-col justify-between">
          {/* Our Mission Section */}
          <div className="flex-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition mb-4">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              "Our mission is to create a platform that{" "}
              <span className="text-blue-600 font-semibold">
                connects people with the events
              </span>{" "}
              that matter most to them. Whether it’s a concert, conference, or
              community gathering, we strive to make it{" "}
              <span className="font-bold">easy for everyone</span> to find and
              participate in events happening in their city."
            </p>
            <img
              src={happy}
              className="w-full h-auto mt-4 rounded-lg shadow-md"
              alt="Happy People"
            />
          </div>

{/* How We Achieve Section */}
          <div className="flex-1 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
              How We Want to Achieve That
            </h2>
            <ul className="list-none space-y-4">
              <li className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 128l-177.6 0c1 5.2 1.6 10.5 1.6 16l0 16 32 0 144 0c8.8 0 16-7.2 16-16s-7.2-16-16-16zM224 144c0-17.7-14.3-32-32-32c0 0 0 0 0 0l-24 0c-66.3 0-120 53.7-120 120l0 48c0 52.5 33.7 97.1 80.7 113.4c-.5-3.1-.7-6.2-.7-9.4c0-20 9.2-37.9 23.6-49.7c-4.9-9-7.6-19.4-7.6-30.3c0-15.1 5.3-29 14-40c-8.8-11-14-24.9-14-40l0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40c0 8.8 7.2 16 16 16s16-7.2 16-16l0-40 0-40zM192 64s0 0 0 0c18 0 34.6 6 48 16l208 0c35.3 0 64 28.7 64 64s-28.7 64-64 64l-82 0c1.3 5.1 2 10.5 2 16c0 25.3-14.7 47.2-36 57.6c2.6 7 4 14.5 4 22.4c0 20-9.2 37.9-23.6 49.7c4.9 9 7.6 19.4 7.6 30.3c0 35.3-28.7 64-64 64l-64 0-24 0C75.2 448 0 372.8 0 280l0-48C0 139.2 75.2 64 168 64l24 0zm64 336c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l64 0zm16-176c0 5.5-.7 10.9-2 16l2 0 32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0 0 16zm-24 64l-40 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 16 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-24 0z"/>
                </svg>
                </div>
                <p className="ml-4 text-gray-700 text-lg">
                  Building a user-friendly platform with personalized event
                  recommendations.
                </p>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 128l-177.6 0c1 5.2 1.6 10.5 1.6 16l0 16 32 0 144 0c8.8 0 16-7.2 16-16s-7.2-16-16-16zM224 144c0-17.7-14.3-32-32-32c0 0 0 0 0 0l-24 0c-66.3 0-120 53.7-120 120l0 48c0 52.5 33.7 97.1 80.7 113.4c-.5-3.1-.7-6.2-.7-9.4c0-20 9.2-37.9 23.6-49.7c-4.9-9-7.6-19.4-7.6-30.3c0-15.1 5.3-29 14-40c-8.8-11-14-24.9-14-40l0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40c0 8.8 7.2 16 16 16s16-7.2 16-16l0-40 0-40zM192 64s0 0 0 0c18 0 34.6 6 48 16l208 0c35.3 0 64 28.7 64 64s-28.7 64-64 64l-82 0c1.3 5.1 2 10.5 2 16c0 25.3-14.7 47.2-36 57.6c2.6 7 4 14.5 4 22.4c0 20-9.2 37.9-23.6 49.7c4.9 9 7.6 19.4 7.6 30.3c0 35.3-28.7 64-64 64l-64 0-24 0C75.2 448 0 372.8 0 280l0-48C0 139.2 75.2 64 168 64l24 0zm64 336c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l64 0zm16-176c0 5.5-.7 10.9-2 16l2 0 32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0 0 16zm-24 64l-40 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 16 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-24 0z"/>
                </svg>
                </div>
                <p className="ml-4 text-gray-700 text-lg">
                  Partnering with local event organizers to provide comprehensive
                  listings.
                </p>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 128l-177.6 0c1 5.2 1.6 10.5 1.6 16l0 16 32 0 144 0c8.8 0 16-7.2 16-16s-7.2-16-16-16zM224 144c0-17.7-14.3-32-32-32c0 0 0 0 0 0l-24 0c-66.3 0-120 53.7-120 120l0 48c0 52.5 33.7 97.1 80.7 113.4c-.5-3.1-.7-6.2-.7-9.4c0-20 9.2-37.9 23.6-49.7c-4.9-9-7.6-19.4-7.6-30.3c0-15.1 5.3-29 14-40c-8.8-11-14-24.9-14-40l0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40c0 8.8 7.2 16 16 16s16-7.2 16-16l0-40 0-40zM192 64s0 0 0 0c18 0 34.6 6 48 16l208 0c35.3 0 64 28.7 64 64s-28.7 64-64 64l-82 0c1.3 5.1 2 10.5 2 16c0 25.3-14.7 47.2-36 57.6c2.6 7 4 14.5 4 22.4c0 20-9.2 37.9-23.6 49.7c4.9 9 7.6 19.4 7.6 30.3c0 35.3-28.7 64-64 64l-64 0-24 0C75.2 448 0 372.8 0 280l0-48C0 139.2 75.2 64 168 64l24 0zm64 336c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l64 0zm16-176c0 5.5-.7 10.9-2 16l2 0 32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0 0 16zm-24 64l-40 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 16 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-24 0z"/>
                </svg>
                </div>
                <p className="ml-4 text-gray-700 text-lg">
                  Offering easy ticketing solutions and seamless event registration.
                </p>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 128l-177.6 0c1 5.2 1.6 10.5 1.6 16l0 16 32 0 144 0c8.8 0 16-7.2 16-16s-7.2-16-16-16zM224 144c0-17.7-14.3-32-32-32c0 0 0 0 0 0l-24 0c-66.3 0-120 53.7-120 120l0 48c0 52.5 33.7 97.1 80.7 113.4c-.5-3.1-.7-6.2-.7-9.4c0-20 9.2-37.9 23.6-49.7c-4.9-9-7.6-19.4-7.6-30.3c0-15.1 5.3-29 14-40c-8.8-11-14-24.9-14-40l0-40c0-13.3 10.7-24 24-24s24 10.7 24 24l0 40c0 8.8 7.2 16 16 16s16-7.2 16-16l0-40 0-40zM192 64s0 0 0 0c18 0 34.6 6 48 16l208 0c35.3 0 64 28.7 64 64s-28.7 64-64 64l-82 0c1.3 5.1 2 10.5 2 16c0 25.3-14.7 47.2-36 57.6c2.6 7 4 14.5 4 22.4c0 20-9.2 37.9-23.6 49.7c4.9 9 7.6 19.4 7.6 30.3c0 35.3-28.7 64-64 64l-64 0-24 0C75.2 448 0 372.8 0 280l0-48C0 139.2 75.2 64 168 64l24 0zm64 336c8.8 0 16-7.2 16-16s-7.2-16-16-16l-48 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l64 0zm16-176c0 5.5-.7 10.9-2 16l2 0 32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0 0 16zm-24 64l-40 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 16 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-24 0z"/>
                </svg>
                </div>
                <p className="ml-4 text-gray-700 text-lg">
                  Encouraging community engagement through feedback and reviews.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
};

export default About;