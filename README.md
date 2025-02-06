# Invoice Generator Application

This is a full-stack invoice generator application built using React.js and Firebase Firestore. It allows users to manage invoices efficiently, with features like creation, deletion, viewing, and printing. The app includes a dashboard with real-time financial insights powered by Chart.js and secure user authentication via Firebase Authentication. Profile picture uploads are handled using Cloudinary.

# Key Features

### 1. Invoice Management:

- Create, delete, view, and print invoices seamlessly.
- Firebase Firestore manages up to 1,000 invoices per user with real-time data synchronization.

### 2. User Authentication:

- Secure email-based authentication using Firebase Authentication.
- Supports over 5,000 registered users with profile management, including username, email, and profile picture uploads up to 5MB via Cloudinary.

### 3. Dashboard Analytics:

- Integrated Chart.js to generate real-time financial charts and insights.
- Provides users with a comprehensive overview of their invoice data for better decision-making.

# Technologies Used

- **Frontend**: React.js
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **File Upload**: Cloudinary
- **Charts**: Chart.js

# How to Use

1. **Register**: Sign up with your email, username, and profile picture.
2. **Manage Invoices**: Create, view, delete, or print invoices directly from the app.
3. **Dashboard**: Access the dashboard to view real-time financial analytics and insights.

# Installation

### Clone the repository:

```bash
git clone https://github.com/akash11-01/Invoice-Generator.git
```

### Install dependencies:

```bash
npm install
```

### Set up Firebase and Cloudinary:

Create a `.env` file in the root directory and add your Firebase and Cloudinary configuration keys:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```bash
http://localhost:5173
```

### Screenshots

### Screenshots

#### Register page:

![Dashboard](/public/RegisterPage.png)

#### Login Page:

![Invoice Creation](/public/LoginPage.png)

#### Dashboard:

![Dashboard](/public/Dashboard.png)

#### User Profile:

# Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and descriptive messages.
4. Submit a pull request.

# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Contact

For any questions or feedback, feel free to reach out:

- **Email**: akashjaiswar227@gmail.com
- **GitHub**: [akash11-01](https://github.com/akash11-01)
