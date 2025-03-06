# JobxDevs

JobxDevs is a job portal platform designed to help users find job opportunities, apply for them, and manage their job applications. This platform allows users to explore companies, apply for job openings, and track the status of their applications. It also includes features for companies to post job listings and view applicants.

This project is built using Node.js, Express, and MongoDB, with a focus on creating a user-friendly and efficient job portal system. It is also designed to be deployed as a serverless function on Cloudflare, enabling fast and scalable backend services.

---

## Features

- **User Authentication**: Secure user login and registration using JWT tokens.
- **Job Listings**: Recruiters can post job listings, and users can browse job opportunities.
- **Job Applications**: Users can apply for jobs directly through the platform.
- **Application Management**: Users can track the status of their job applications and view details of each application.
- **Company Profile**: Recruiters can register their company and manage their job listings.
- **MongoDB Integration**: A robust database solution for managing user profiles, job listings, and applications.

---

## Tech Stack

- **Backend**: Node.js, Express, Multer, Cloudinary, 
- **Database**: MongoDB (NoSQL database for storing user profiles, job listings, and application data)
- **Authentication**: JWT (JSON Web Tokens) for secure authentication
- **Environment Management**: dotenv (for managing environment variables)
- **FrontEnd**: Reactjs, Redux toolkit, Custom hooks, Tailwind, ShadCN

---

## Getting Started

### Prerequisites

1. **Node.js**: Make sure you have Node.js installed (preferably version 14 or higher).
2. **MongoDB**: You need a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database.
3. **Environment Variables**: The app uses several environment variables, so you need to set them up.

### Installation

1. Clone this repository:
   git clone https://github.com/diwanshu009/JobxDevs.git
   
   cd JobxDevs

### API Endpoints : 
   
 ## User Routes
   POST /api/v1/user/register: Register a new user.
   POST /api/v1/user/login: Log in an existing user.
   GET /api/v1/user/profile: Get the logged-in user's profile.
   PUT /api/v1/user/profile: Update the user's profile.
   
 ## Company Routes
   POST /api/v1/company/create: Create a new company profile.
   GET /api/v1/company/:id: Get a company's profile by ID.
   GET /api/v1/company/jobs: Get all jobs listed by a company.
   
 ## Job Routes
   GET /api/v1/job: Get all available job listings.
   POST /api/v1/job/create: Create a new job listing.
   GET /api/v1/job/:id: Get details of a specific job listing.
   
 ## Application Routes
   POST /api/v1/application/apply/:jobId: Apply for a job.
   GET /api/v1/application/status: Get the status of a job application.
   GET /api/v1/application/get: Get all job applications for the logged-in user.
   POST /api/v1/application/status/:jobId/update: Update the status of a job application.
   
