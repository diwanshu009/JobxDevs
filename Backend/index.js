import { connectDB } from './db/index.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';

const MONGODB_URL = process.env.MONGODB_URL;

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith('/api/v1/user')) {
        return userRoute(request);
    } else if (path.startsWith('/api/v1/company')) {
        return companyRoute(request);
    } else if (path.startsWith('/api/v1/job')) {
        return jobRoute(request);
    } else if (path.startsWith('/api/v1/application')) {
        return applicationRoute(request);
    } else {
        return new Response('Not Found', { status: 404 });
    }
}

async function connectMongoDB() {
    try {
        const db = await connectDB(MONGODB_URL);
        console.log('Database connected');
    } catch (err) {
        console.log('MongoDB connection error:', err);
    }
}

connectMongoDB();