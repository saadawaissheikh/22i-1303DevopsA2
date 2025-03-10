import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, Clock, Share2, Ticket, Copy } from "lucide-react";

interface EventType {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  tickets: number; // Updated type to match API response
  image?: string;
}

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5002/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data: EventType = await response.json();
        setEvent(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading event details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        No event found.
      </div>
    );
  }

  // Function to copy the sharable link to the clipboard
  const handleShare = () => {
    const eventUrl = `${window.location.origin}/event/${event?._id}`;
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide copied message after 2 seconds
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">Loading event details...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">{error}</div>;
  }

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">No event found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[450px]">
        {event.image ? (
          <img
            src={`http://localhost:5002/images/${event.image}`}
            alt={event.title}
            className="w-full h-full object-cover rounded-b-xl shadow-md"
            onError={(e) => {
              e.currentTarget.src = `http://localhost:5002/images/default.jpeg`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-b-xl shadow-md">
            <span className="text-gray-700">No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="text-white max-w-4xl">
            <h1 className="text-4xl font-bold drop-shadow-md">{event.title}</h1>
            <div className="flex flex-wrap justify-center gap-6 mt-4 text-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(event.date).toDateString()}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Event Description */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4 text-justify">
                {event.description?.trim() ||
                  `Join us for an incredible gathering filled with excitement, inspiration, and endless opportunities to connect, learn, and grow.`}
              </p>

              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Gain insights from industry leaders and visionaries.</li>
                <li>Participate in interactive skill-building activities.</li>
                <li>Enjoy thrilling acts and talented artists.</li>
                <li>Connect with professionals and entrepreneurs.</li>
                <li>Participate in contests and win amazing rewards.</li>
              </ul>

              <p className="text-gray-700 mt-4 text-justify">
                Don’t miss out! Secure your spot today and be part of an event that will leave you inspired and energized.
              </p>
            </div>
          </div>

          {/* Ticket Section */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-xl p-8 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tickets</h2>
              
              {event.tickets > 0 ? (
                <div className="text-gray-700">
                  <p>🎟️ Available Tickets: <strong>{event.tickets}</strong></p>
                  <p className="mt-2">Price per ticket: <strong>${event.price}</strong></p>
                  <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                    Purchase Ticket
                  </button>
                </div>
              ) : (
                <p className="text-red-500">🚫 Sold Out</p>
              )}

              {/* Share Button */}
              <button
                className="w-full mt-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Event
              </button>

              {/* Copied Notification */}
              {copied && (
                <div className="mt-3 text-sm text-green-600 flex items-center">
                  <Copy className="h-4 w-4 mr-2" />
                  Link Copied!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
