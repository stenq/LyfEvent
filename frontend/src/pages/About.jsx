import React from 'react'
import logo from "../assets/logo/logo.svg"
import we from "../assets/img/we.jpg"

const About = () => {
  return (
    <div >
        <div class="flex flex-col justify-center items-center pt-4">
    <h1 class="text-2xl font-bold text-gray-800">About Us</h1>
    <img src={logo} class="mt-3 object-cover w-30 h-20 md:w-40 md:h-30" alt="Company Logo" />
</div>

<div class="flex flex-col justify-center items-center pt-8 px-6 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
    <p class="text-gray-700 text-lg leading-relaxed text-center">
        "We are three friends who want to give people the opportunity to find events happening in their city. People will also be able to easily create events on topics that interest them. We are doing this on our own initiative."
    </p>
    <img src={we} class="mt-3 object-cover w-100 h-100 md:w-100 md:h-100" alt="wes" />
</div>

<div>
<div class="flex flex-col justify-center items-center pt-8 px-6 mt-5 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
    <p class="text-gray-700 text-lg leading-relaxed text-center">
        "Our mission is to create a platform that connects people with the events that matter most to them. Whether it’s a concert, conference, or community gathering, we strive to make it easy for everyone to find and participate in events happening in their city."
    </p>
</div>
</div>
    </div>
  )
}

export default About