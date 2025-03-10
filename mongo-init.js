db = connect("mongodb://root:muqi1217@localhost:27017/admin");

db = db.getSiblingDB("event_service"); // Switch to 'eventbooking' database

db.createCollection("events");

db.events.insertMany([
  {
    title: "Nascon '25",
    description: "NASCON (National Students Conference) Event Description<p>The biggest tech conference...</p>",
    date: new Date("2025-03-21T12:41:28.063Z"),
    location: "Islamabad, Pakistan",
    price: 1200,
    tickets: 180,
    image: "canada.jpeg",
    category: "Tech",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Tech Fest 2025",
    description: "Tech Fest 2025 - A Gathering of Innovators<p>Join industry leaders...</p>",
    date: new Date("2025-05-15T10:00:00.000Z"),
    location: "Lahore, Pakistan",
    price: 1500,
    tickets: 200,
    image: "default.jpeg",
    category: "Tech",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Tech Fest 2025",
    description: "Tech Fest 2025 - A Gathering of Innovators<p>Join industry leaders, tech enthusiasts, and startups as they showcase the latest advancements in AI, blockchain, and software engineering. The event will feature keynote speeches, panel discussions, and hands-on workshops.</p><p>Whether you're a seasoned professional or a student looking to break into the tech industry, this event will provide networking opportunities and insights into the future of technology.</p>",
    date: new Date("2025-05-15T10:00:00.000Z"),
    location: "Lahore, Pakistan",
    price: 1500,
    tickets: 200,
    image: "default.jpeg",
    category: "Tec",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "International Art Exhibition 2025",
    description: "A Global Celebration of Creativity<p>Experience an exclusive display of paintings, sculptures, digital art, and photography from renowned and emerging artists worldwide. This exhibition provides a platform for artists to showcase their work and engage with art lovers.</p><p>Enjoy guided tours, interactive installations, and live demonstrations from professional artists. Whether you're an art collector or a casual admirer, this event promises a journey through breathtaking artistic expressions.</p>",
    date: new Date("2025-06-10T11:00:00.000Z"),
    location: "Paris, France",
    price: 25,
    tickets: 500,
    image: "default.jpeg",
    category: "Arts",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Startup Summit 2025",
    description: "Empowering Entrepreneurs & Investors<p>The Startup Summit brings together some of the most influential entrepreneurs, venture capitalists, and business mentors to share their experiences and strategies for success. Attend pitch competitions, fundraising workshops, and networking sessions.</p><p>Whether you have a startup idea or are looking for investment opportunities, this event is designed to fuel innovation and create lasting business partnerships.</p>",
    date: new Date("2025-07-05T09:00:00.000Z"),
    location: "Silicon Valley, USA",
    price: 300,
    tickets: 350,
    image: "canada.jpeg",
    category: "Business",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Global Music Festival 2025",
    description: "A Celebration of Sound and Rhythm<p>Get ready for an unforgettable experience as world-class musicians, bands, and DJs take the stage for three days of non-stop music. From rock to electronic, hip-hop to classical, this festival has something for every music lover.</p><p>Enjoy gourmet food trucks, art installations, and a vibrant festival atmosphere. Bring your friends and dance under the stars!</p>",
    date: new Date("2025-08-20T18:00:00.000Z"),
    location: "Berlin, Germany",
    price: 100,
    tickets: 10000,
    image: "graduation.jpeg",
    category: "Music",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Health & Wellness Expo 2025",
    description: "Discover the Future of Wellness<p>Join us for an immersive event focused on fitness, nutrition, and mental health. The expo will feature interactive sessions with experts, live yoga and meditation classes, and demonstrations of the latest health technologies.</p><p>Learn about holistic healing, plant-based diets, and ways to improve your well-being in an ever-changing world.</p>",
    date: new Date("2025-09-10T10:00:00.000Z"),
    location: "Toronto, Canada",
    price: 20,
    tickets: 2000,
    image: "canadaEvent.jpeg",
    category: "Tech",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Space Exploration Conference 2025",
    description: "Journey Beyond the Stars<p>Meet astronauts, scientists, and space enthusiasts as we discuss the latest discoveries in space technology, Mars colonization, and interstellar travel.</p><p>Watch live demonstrations of cutting-edge space technology and experience a virtual reality tour of the cosmos.</p>",
    date: new Date("2025-11-15T09:00:00.000Z"),
    location: "Houston, USA",
    price: 500,
    tickets: 600,
    image: "event.jpeg",
    category: "arts",
    createdAt: new Date(),
    updatedAt: new Date()
  }  
]);

print("✅ Successfully inserted events into MongoDB!");
