import React, { useEffect, useState } from 'react';
import { Search, Calendar, Users, Video, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  tickets: number;
  image: string;
  createdAt: string;
}

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (isAuthenticated) {
      navigate("/create");
    } else {
      navigate("/signin");
    }
  };

  const handleExploreEvent = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (isAuthenticated) {
      navigate("/explore");
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    fetch('http://localhost:5002/api/events/top')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Unexpected response format:", data);
          setEvents([]); // Ensure events is always an array
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);
  

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-purple-900 text-white flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative max-w-3xl text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create Unforgettable Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            The all-in-one platform for event management and ticketing
          </p>

          <div className="flex flex-row md:flex-row gap-4 justify-center">
            <button
              onClick={handleCreateEvent}
              className="bg-purple-600 text-white w-45 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition duration-200"
            >
              Create Event
            </button>
            <button
              onClick={handleExploreEvent}
              className="bg-white text-purple-900 w-45 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-200"
            >
              Explore Events
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EventBookings?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Event Creation</h3>
              <p className="text-gray-600">Create and customize your events in minutes with our intuitive tools</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Attendee Management</h3>
              <p className="text-gray-600">Powerful tools to manage registrations and communicate with attendees</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Events</h3>
              <p className="text-gray-600">Host engaging virtual events with built-in streaming capabilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading events...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map(event => (
                <div key={event._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`http://localhost:5002/images/${event.image}`} // Correct Path
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 flex items-center mb-2">
                      <Calendar className="h-5 w-5 mr-2" />
                      {new Date(event.date).toLocaleString()}
                    </p>
                    <p className="text-gray-600 flex items-center mb-2">
                      <MapPin className="h-5 w-5 mr-2" />
                      {event.location}
                    </p>
                    <p className="text-gray-600 flex items-center mb-2">
                      <DollarSign className="h-5 w-5 mr-2" />
                      ${event.price}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-semibold">{event.tickets} Tickets Left</span>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200">
                        Get Tickets
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
