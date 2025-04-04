/**
 * ACAB (All Cats Are Beautiful) - Deployment Guide
 * 
 * This file contains comprehensive documentation on how to deploy
 * this application to various AWS services. You can read this file
 * or use the deployment helper scripts provided in the project.
 * 
 * DEPLOYMENT OPTIONS:
 * 1. AWS Elastic Beanstalk (Recommended) - Use deploy-elastic-beanstalk.js
 * 2. AWS EC2 with PM2 - Use deploy-ec2.js
 * 3. AWS Amplify (Frontend) + Lambda (Backend) - Manual process
 */

/*
============================================================
AWS ELASTIC BEANSTALK DEPLOYMENT
============================================================

PREREQUISITES:
- AWS Account
- AWS CLI and EB CLI installed
- Node.js and npm installed locally

STEP 1: PREPARE YOUR APPLICATION
-------------------------------
1. Build your application:
   ```
   npm install
   npm run build
   ```

2. Configure environment variables:
   Create a .env file with:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila
   ```

3. Create Elastic Beanstalk configuration files:
   - Run the deploy-elastic-beanstalk.js script:
     ```
     node deploy-elastic-beanstalk.js
     ```
   - This will create:
     - .elasticbeanstalk/config.yml
     - .ebextensions/
     - Procfile
     - .ebignore

STEP 2: DEPLOY TO ELASTIC BEANSTALK
----------------------------------
1. Initialize your EB application:
   ```
   eb init -p "node.js-18" -r us-east-1 acab-app
   ```

2. Create an environment and deploy:
   ```
   eb create production
   ```

3. Open your application:
   ```
   eb open
   ```

4. For future deployments:
   ```
   eb deploy
   ```

STEP 3: CONFIGURE CUSTOM DOMAIN (OPTIONAL)
----------------------------------------
1. Register a domain in Route 53 or use an existing domain
2. In the Elastic Beanstalk console, go to your environment
3. Go to Configuration > Load Balancer > Add Listener
4. Add a HTTPS listener on port 443
5. Configure an SSL certificate via AWS Certificate Manager
6. Update your domain's DNS to point to the EB environment URL
*/

/*
============================================================
AWS EC2 DEPLOYMENT WITH PM2
============================================================

PREREQUISITES:
- AWS Account
- EC2 instance running Amazon Linux 2 or Ubuntu Server
- SSH access to the EC2 instance

STEP 1: PREPARE YOUR APPLICATION
-------------------------------
1. Build your application locally:
   ```
   npm install
   npm run build
   ```

2. Run the EC2 deployment helper:
   ```
   node deploy-ec2.js
   ```
   This will create:
   - .env
   - ecosystem.config.js (PM2 configuration)
   - nginx/acab-app.conf (if Nginx is enabled)
   - deploy-to-ec2.sh (deployment script)

STEP 2: LAUNCH AND CONFIGURE EC2 INSTANCE
----------------------------------------
1. Launch an EC2 instance:
   - Choose Amazon Linux 2 or Ubuntu Server AMI
   - Select t2.micro or larger instance type
   - Configure security group to allow:
     - SSH (port 22)
     - HTTP (port 80)
     - HTTPS (port 443, if needed)

2. Connect to your EC2 instance:
   ```
   ssh -i your-key.pem ec2-user@your-instance-public-dns
   ```

3. Install required software:
   ```
   # For Amazon Linux 2
   sudo yum update -y
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   . ~/.nvm/nvm.sh
   nvm install 18
   npm install -g pm2

   # For Ubuntu
   sudo apt update
   sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm install -g pm2
   ```

STEP 3: UPLOAD AND DEPLOY THE APPLICATION
----------------------------------------
1. Upload your project to the EC2 instance:
   ```
   scp -i your-key.pem -r ./ ec2-user@your-instance-public-dns:~/acab-app
   ```

2. Deploy using the script:
   ```
   cd ~/acab-app
   chmod +x deploy-to-ec2.sh
   ./deploy-to-ec2.sh
   ```

STEP 4: CONFIGURE CUSTOM DOMAIN (OPTIONAL)
----------------------------------------
1. Point your domain's DNS to your EC2 instance's public IP
2. Install and configure Nginx if not already done
3. For HTTPS, install Certbot:
   ```
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d your-domain.com
   ```
*/

/*
============================================================
AWS AMPLIFY + LAMBDA DEPLOYMENT (SERVERLESS)
============================================================

This approach splits the frontend and backend:
- Frontend: AWS Amplify
- Backend: AWS Lambda with API Gateway

PREREQUISITES:
- AWS Account
- AWS CLI installed and configured
- SAM CLI or Serverless Framework (optional)

STEP 1: DEPLOY FRONTEND TO AMPLIFY
--------------------------------
1. Login to AWS Amplify Console
2. Choose "Host web app"
3. Connect to your repository
4. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Configure environment variables as needed
6. Deploy

STEP 2: DEPLOY BACKEND TO LAMBDA
-------------------------------
1. Modify server code to use Lambda handlers
2. Create Lambda functions for each API endpoint
3. Set up API Gateway to route requests
4. Configure environment variables in Lambda
5. Set up IAM roles and permissions

NOTE: This method requires significant code changes and is more complex,
but offers better scalability and can be more cost-effective for variable traffic.
*/

/**
 * DEPLOYMENT CHECKLIST
 * 
 * Before deploying, check the following:
 * 
 * 1. Build and test locally:
 *    - npm run build
 *    - Verify the application works properly
 * 
 * 2. Environment variables:
 *    - Ensure all required environment variables are set
 *    - Check MongoDB connection string is correct
 * 
 * 3. Security considerations:
 *    - Update MongoDB user/password for production
 *    - Configure proper security groups
 *    - Enable HTTPS if needed
 * 
 * 4. Static assets:
 *    - Verify all images and media are correctly loading
 *    - Check CSS and styling on multiple devices
 * 
 * 5. Database configuration:
 *    - Ensure MongoDB Atlas IP whitelist includes AWS IPs
 *    - Check database connection on the deployed environment
 */

// Export deployment instructions for use in other scripts
module.exports = {
  title: "ACAB (All Cats Are Beautiful) Deployment Guide",
  recommendations: [
    "AWS Elastic Beanstalk is recommended for simplicity",
    "Use PM2 for process management on EC2",
    "Configure MongoDB Atlas to accept connections from your AWS deployment"
  ],
  runSetup: function() {
    console.log("To run deployment setup, use one of the deployment helper scripts:");
    console.log("- For Elastic Beanstalk: node deploy-elastic-beanstalk.js");
    console.log("- For EC2: node deploy-ec2.js");
  }
};

/*
 * To read this guide without executing code, open this file in a text editor
 * or use:
 * 
 * cat deployment-guide.js | less
 */