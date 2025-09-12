# ACAB (All Cats Are Beautiful)

A dynamic React.js web application exploring the post-apocalyptic ACAB universe, offering immersive interactive experiences across character exploration, storytelling, and community engagement.

## Tech Stack

- React.js frontend
- Express.js backend
- MongoDB for data storage
- TypeScript for type safety
- Zod for schema validation
- Responsive design for multi-device support
- Tailwind CSS for styling

## Prerequisites

- Node.js 18 or later
- npm 9 or later
- MongoDB database (connection string required)

## Local Development

1. Clone this repository:
   ```
   git clone https://github.com/YOUR-USERNAME/acab-project.git
   cd acab-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your MongoDB connection:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:5000](http://localhost:5000) in your browser.

## Deployment Options

### Deploying to AWS Elastic Beanstalk

1. Install EB CLI
2. Configure your AWS credentials
3. Run the deployment script:
   ```
   node deploy-elastic-beanstalk.js
   ```
4. Follow the instructions provided by the script

### Deploying to AWS EC2 with PM2

1. Configure your AWS credentials
2. Run the deployment script:
   ```
   node deploy-ec2.js
   ```
3. Follow the instructions provided by the script

## Project Structure

- `client/` - Frontend React application
- `server/` - Backend Express server
- `shared/` - Shared types and schemas
- `attached_assets/` - Media assets for the application

## Continuous Integration/Deployment

This project includes GitHub Actions workflow for CI/CD. When you push to the main branch, it will:

1. Install dependencies
2. Build the application
3. Prepare for deployment (deployment step needs to be configured)

## License

All rights reserved.