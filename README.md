IRCTC API
A railway management system API similar to IRCTC, enabling users to check train availability, book seats, and view booking details. Admins can manage trains and update seat information.

Features
User Authentication:
Register users with roles (user or admin).
Secure login using JWT.
Role-Based Access:
Admins can add and manage trains.
Users can check train availability, book seats, and view their bookings.
Real-Time Seat Booking:
Handles race conditions to prevent double bookings.
Admin Security:
API key protection for admin operations.
Tech Stack
Backend: Node.js, Express.js
Database: MySQL
Authentication: JWT
Environment Variables: dotenv
Project Structure
bash
Copy code
-api
  --admin
    ---newTrain.js          # Admin-only: Add new trains
  --booking.js              # Handle seat bookings
  --login.js                # User login
  --seatInfo.js             # Fetch booking details
  --seatAvailbility.js      # Check seat availability
  --signup.js               # User registration

-.env                       # Environment variables
-index.js                   # Application entry point
Setup and Installation
Prerequisites
Node.js and npm installed on your machine.
MySQL Database installed and running.
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/irctc-api.git
cd irctc-api
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add the following:

plaintext
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=irctc
JWT_SECRET=your_jwt_secret
ADMIN_API_KEY=your_admin_api_key
PORT=3000
Set up the database:

Create a database in MySQL:
sql
Copy code
CREATE DATABASE irctc;
Import the schema (create tables, etc.) using irctc_schema.sql:
bash
Copy code
mysql -u root -p irctc < path/to/irctc_schema.sql
Start the server:

bash
Copy code
npm start
The server will run at http://localhost:3000.

API Endpoints
Public Endpoints
Method	Endpoint	Description
POST	/signup	Register a new user
POST	/login	Login and get an auth token
User Endpoints (Requires JWT Token)
Method	Endpoint	Description
GET	/seat-availability	Check train and seat availability
POST	/booking	Book a seat on a train
GET	/seat-info	Get specific booking details
Admin Endpoints (Requires Admin API Key)
Method	Endpoint	Description
POST	/admin/new-train	Add a new train
