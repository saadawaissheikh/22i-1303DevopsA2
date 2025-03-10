import React, { useState, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronDown, MapPin, Image as ImageIcon, DollarSign, Users } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import ReactQuill from 'react-quill';
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";


interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-transform transform translate-x-0 animate-slide-in">
      {message}
      <button onClick={onClose} className="ml-2 text-lg font-bold">×</button>
    </div>
  );
};

const categories = ['All', 'Music', 'Tech', 'Food', 'Sports', 'Arts', 'Business'];

const CreateEvent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [tickets, setTickets] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:5002/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const data = await response.json();

        if (data.filePath) {
            setImagePath(`http://localhost:5002${data.filePath}`);
            console.log("file name: ", data.filePath);
        }

    } catch (error) {
        console.error("Error uploading file:", error);
    }

  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!title){
      setNotification('Please fill in the title field');
      return;
    }

    if(!startDate){
      setNotification('Please fill in the date field');
      return;
    }

    if(!location){
      setNotification('Please fill in the location field');
      return;
    }

    if(!price){
      setNotification('Please fill in the price field');
      return;
    }

    if(!tickets){
      setNotification('Please fill in the tickets field');
      return;
    }

    if(!imagePath){
      setNotification('Please fill in the image field');
      return;
    }
    
    const eventData = {
      title,
      date: startDate,
      location,
      description,
      price: Number(price),
      tickets: Number(tickets),
      image: imagePath.split("/").pop(),
      category: selectedCategory,
    };

    

    try {
      
      const response = await fetch('http://localhost:5002/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const fileName = imagePath.split("/").pop();
        console.log("Event created with image:", image, imagePath, imageFile?.name, imageFile);
        console.log("image:", fileName);
        setNotification('Event Created Successfully');
        navigate('/explore');
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error submitting event:', error);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">Create New Event</h1>

          <form onSubmit={handleSubmit}>
            {/* Event Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter event title"
              />
            </div>

            <div className="flex gap-4 mb-6">
  {/* Date & Time */}
  <div className="w-1/2">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Date & Time
    </label>
    <div className="flex items-center">
      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  </div>

  {/* Category Dropdown */}
  <div className="w-1/2 relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Category
    </label>
    <div
      className="w-full px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer bg-white focus:ring-2 focus:ring-purple-500"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      {selectedCategory}
      <ChevronDown className="h-5 w-5 text-gray-500" />
    </div>

    {isDropdownOpen && (
      <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        {categories.map((category) => (
          <li
            key={category}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelectedCategory(category);
              setIsDropdownOpen(false);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter event location"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Description
              </label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                className="bg-white"
                theme="snow"
              />
            </div>

            {/* Ticket Pricing */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Pricing
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Price per ticket"
                  />
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="number"
                    value={tickets}
                    onChange={(e) => setTickets(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Available tickets"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Image
              </label>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePath ? (
                  <div className="w-32 h-32 mx-auto border rounded-lg overflow-hidden">
                    <img 
                      src={imagePath} 
                      alt="Uploaded" 
                      className="w-full h-full object-contain rounded-lg shadow-md" 
                    />
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Drag and drop an image here, or click to select</p>
                  </>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>



            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
};

export default CreateEvent;
