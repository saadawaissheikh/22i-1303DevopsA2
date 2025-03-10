-- Ensure users table exists before inserting data
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert user from the provided data
INSERT INTO users (username, email, password, role) VALUES
('muqarrab', 'muqarrab@gmail.com', 'U2FsdGVkX19s8AMbR6DT9ZjufmJoX/Ig2PuJNd62Efw=', 'admin')
ON CONFLICT (email) DO NOTHING;
