import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar as CalendarIcon, Filter } from "lucide-react";

// Define the Event type
interface EventType {
  _id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  date: string;
  price: number;
  image?: string;
}

const categories = ["All", "Music", "Tech", "Food", "Sports", "Arts", "Business"];

const ExploreEvents = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]); // ✅ Fixed here
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data: EventType[] = await response.json(); // ✅ Type assertion here
        setEvents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on category and search query
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen mt-10 bg-gray-50 py-12">
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Filters Button */}
            <div className="flex gap-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading & Error Handling */}
        {loading && <p className="text-center text-gray-500">Loading events...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            >
              {/* Event Image */}
              <img
                src={`http://localhost:5002/images/${event.image}`} // Correct Path
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {/* Title & Category in the Same Line */}
<div className="flex justify-between items-center mb-2">
  {/* Event Title */}
  <h3 className="text-xl font-semibold">{event.title}</h3>

  {/* Category Label */}
  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
    {event.category || "General"}
  </span>
</div>


                {/* Event Date */}
                <div className="flex items-center text-gray-600 mb-2">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{new Date(event.date).toDateString()}</span>
                </div>
                {/* Event Location */}
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  {/* Price */}
                  <span className="text-purple-600 font-semibold">
                    {event.price > 0 ? `$${event.price}` : "Free"}
                  </span>
                  {/* View Details Button */}
                  <button
                    onClick={() => {
                      console.log("Navigating to:", `/event/${event._id}`);
                      navigate(`/event/${event._id}`);
                    }}                    
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Events Found Message */}
        {filteredEvents.length === 0 && !loading && (
          <p className="text-center text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;
