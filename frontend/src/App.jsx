import './App.css'
import Header from './components/Header'
import EventsPage from './pages/EventsPage'
import EventPage from './pages/EventPage'
import Home from './pages/Home'
import CreateEventPage from './pages/CreateEventPage'
import About from './pages/About'
import "react-image-crop/dist/ReactCrop.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (
    <Router>
      <div className='App'>
          <Header />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/event/:id' element={<EventPage />}/>
            <Route path='/events' element={<EventsPage />}/>
            <Route path='/create-event' element={<CreateEventPage />}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
      </div>
    </Router>
  )
}

export default App
