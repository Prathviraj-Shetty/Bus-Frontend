<h1>Dream Bus</h1>
A user-friendly online platform that simplifies the process of reserving bus tickets for travelers. With a wide range of bus operators and routes, users can easily search for available buses, view seat availability, and book tickets in real-time. The system securely manages user profiles, payment transactions, and ticket confirmations, ensuring a seamless booking experience

<h3>Features</h3>
<h4>Next.js Frontend:</h4> Utilizes Next.js, a React framework, to build the frontend. This enables server-side rendering, efficient client-side routing, and an optimized development experience.

<h4>Django Backend:</h4> Integrates Django, a high-level Python web framework, to handle backend functionalities. Django offers robust database management, URL routing, and powerful data processing capabilities.

<h4>API Communication:</h4> Demonstrates how to establish communication between the Next.js frontend and Django backend through API endpoints. This allows for efficient data exchange and separation of concerns between the frontend and backend.

<h4>Authentication and Authorization:</h4> Implements user authentication and authorization using Django's built-in authentication system. Users can sign up, log in, and access different parts of the application based on their roles and permissions.

<h4>User Registration and Login:</h4> Users can sign up and log in to the website to access their accounts, manage bookings, and enjoy personalized experiences.

<h4>Search and Filter Buses:</h4> Users can search for buses based on their departure and arrival locations, as well as filter results by bus name and other preferences.

<h4>Interactive Seat Selection:</h4> The application provides an interactive seat map for users to select their preferred seats. They can see the layout of the bus and choose seats that suit their preferences.

<h4>Real-time Availability:</h4> Users can view real-time seat availability information while selecting their seats, ensuring that they are making informed choices.

<h4>Booking Process:</h4> Once the user selects their seats, they can proceed to the booking process. They can review their choices.

<h4>Booking History:</h4> Users can access their booking history, view past trips, and download e-tickets for their reference.

<h4>Responsive Design:</h4> The website is designed to work seamlessly on various devices, including desktops, tablets, and smartphones.


<h3>Prerequisites</h3>
Before running this project, ensure you have the following installed:
<ul>
<li>Node.js and npm (for Next.js frontend)</li>
<li>Python and pip (for Django backend)</li>
<li>A compatible database (such as PostgreSQL, MySQL, or SQLite) for Django</li>
<li>Getting Started</li>
<li>Clone the Repository: Start by cloning this repository to your local machine.</li>
</ul>

<h3>Frontend Setup:</h3>
<ul>
<li>Navigate to the frontend directory</li>
<li>Run npm install to install the required dependencies</li>
<li>Run yarn dev to start the development server for the Next.js frontend</li>
</ul>
<h3>Backend Setup:</h3>
<ul>
<li>Navigate to the backend directory.</li>
<li>Create a virtual environment: python -m venv venv</li>
<li>Activate the virtual environment: source venv/bin/activate (Linux/macOS) or venv\Scripts\activate (Windows)</li>
<li>Install backend dependencies: pip install -r requirements.txt</li>
<li>Run migrations: python manage.py migrate</li>
<li>Start the Django development server: python manage.py runserver</li>
</ul>

<h3>Access the Application:</h3>

Open your web browser and navigate to http://localhost:3000 to access the Website.