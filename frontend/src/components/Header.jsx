import React, { useContext } from 'react'
import logo from "../assets/logo/logo.svg"
import { AuthContext } from '../context/AuthContext'

const Header = () => {

  const {user} = useContext(AuthContext)

  return (
      <div>
        <header>
          <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 mt-4 mb-2">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <a href="/" class="flex items-center">
                <img src={logo} class="mr-3 h-14 sm:h-16" alt="Flowbite Logo" />
              </a>

              <div class="flex items-center lg:order-2">

                {user ? (
                  <>

                    <a
                      href="/my-events"
                      className="text-gray-800 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-lg px-5 lg:px-6 py-3 lg:py-2.5 shadow-lg border-2 border-yellow-500 focus:outline-none transition-all duration-200 transform hover:scale-105 mr-4"
                    >
                      My Events
                    </a>

                    <a
                      href="/profile" 
                      className="text-gray-800 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 lg:px-6 py-3 lg:py-2.5 shadow-lg border-2 border-blue-500 focus:outline-none transition-all duration-200 transform hover:scale-105 mr-4"
                    >
                      Profile
                    </a>

                  </>
                  ) : (
                    <>

                    <a
                     href="/login" 
                     class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 lg:px-6 py-2 lg:py-2.5 mr-2 hover:text-blue-700 focus:outline-none"
                     >
                    Log in
                    </a>

                    <a
                      href="#"
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 lg:px-6 py-2 lg:py-2.5 mr-2 focus:outline-none"
                    >
                      Get started
                    </a>
                    
                    </>
                  )}

                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  class="inline-flex items-center p-2 ml-1 text-lg text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  <li>
                    <a
                      href="/"
                      class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/events"
                      class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0"
                    >
                      Events
                    </a>
                  </li>
                  <li>
                    <a
                      href="/create-event"
                      class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0"
                    >
                      Create Event
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-600 lg:p-0"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
  )
}

export default Header