#!/bin/bash

# Create .env file for production
cat > .env << EOL
NODE_ENV=production
PORT=5000
# Add your MongoDB connection string here
MONGODB_URI=mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila
EOL

# Install dependencies
npm install

# Build the project
npm run build

echo "Setup complete! You can now deploy the application."