import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import Home from './pages/Home';
import ExploreEvents from './pages/ExploreEvents';
import CreateEvent from './pages/CreateEvent';
import Pricing from './pages/Pricing';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreEvents />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;