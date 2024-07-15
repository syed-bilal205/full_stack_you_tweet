#You_TweeT

full_stack_you_tweet
You Tweet is a platform where users can upload videos and share their thoughts through tweets. It includes features for commenting, subscribing to users, and more.

Features Video Upload: Users can upload videos to share with others. Tweet Creation: Users can post tweets to express their thoughts. Comments: Engage in discussions with comments on videos and tweets. Subscription: Follow other users to stay updated on their content.

Technologies Used Frontend: React, Redux Toolkit,Redux Toolkit Query, React Router Dom, React Icons, React Player, React Cooie, Tailwind CSS Backend: Node.js, Express.js, MongoDB, Cookie Parser, Cloudinary Authentication: JWT (JSON Web Tokens) Bcryptjs

Setup Instructions Clone the Repository

git clone https://github.com/your-username/full_stack_you_tweet.git cd full_stack_you_tweet

Install Dependencies

npm install

Set Environment Variables Create a .env file in the backend directory with the following variables: PORT MONGO_URI DB_NAME ACCESS_TOKEN_SECRET ACCESS_TOKEN_EXPIRY REFRESH_TOKEN_SECRET REFRESH_TOKEN_EXPIRY CLOUDINARY_CLOUD_NAME CLOUDINARY_API_KEY CLOUDINARY_API_SECRET NODE_ENV

Set Environment Variables Create a .env file in the frontend directory with the following variables: VITE_API_URL VITE_REFRESH_TOKEN

Run the Application

Start the backend server: npm start Start the frontend development server:

cd frontend npm start

Contributing Contributions are welcome! Please fork the repository and submit pull requests to contribute.

License This project is licensed under the MIT License - see the LICENSE file for details.
