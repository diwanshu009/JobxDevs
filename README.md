# JobxDevs

JobxDevs is a job portal platform designed to help users find job opportunities, apply for them, and manage their job applications. This platform allows users to explore companies, apply for job openings, and track the status of their applications. It also includes features for companies to post job listings and view applicants.

This project is built using  MERN (MongoDB, Express.js, React.js, Node.js) stack with a focus on creating a user-friendly and efficient job portal system. It is also designed to be deployed as a serverless function on Cloudflare, enabling fast and scalable backend services.

---

## Features

- **User Authentication**: Secure authentication using JWT (JSON Web Tokens) for both job seekers and employers.
- **Job Listings**: Recruiters can post job listings, and users can browse job opportunities.
- **Job Applications**: Users can apply for jobs directly through the platform.
- **Application Management**: Users can track the status of their job applications and view details of each application.
- **Company Profile**: Recruiters can register their company and manage their job listings.

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB (NoSQL database for storing user profiles, job listings, and application data)
- **Authentication**: JWT (JSON Web Tokens), Bcrypt (for password hash)
- **FrontEnd**: Reactjs, Redux toolkit, Custom hooks, Tailwind, ShadCN, React Router
- **Image Upload:** Cloudinary for storing and managing uploaded images

---

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

1. **Node.js**: Make sure you have Node.js installed (preferably version 20 or higher).
2. **MongoDB**: You need a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database.
3. **Environment Variables**: The app uses several environment variables, so you need to set them up.
4. **Cloudinary**: You also need a Cloudinary account for image storage

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/diwanshu009/JobxDevs.git
   ```
2. Install NPM packages:
   ```sh
   cd jobxdevs
   cd backend
   npm install
   cd..
   cd frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` in the backend directory, containing the following variables:
   ```env
   PORT=
   API_KEY=
   API_SECRET=
   CLOUD_NAME=
   MONGODB_URL=
   SECRET_KEY=
   ```

   Replace each value with your specific configuration details.

4. Run the application:
   ```sh
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` to view the app.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request (`we will merge within 24 hour`)

## Please give a star to the repository if you like it.

## Contact

Diwanshu - [GitHub](https://github.com/diwanshu009)

Project Link: [https://github.com/diwanshu009/JobxDevs.git](https://github.com/diwanshu009/JobxDevs.git)
