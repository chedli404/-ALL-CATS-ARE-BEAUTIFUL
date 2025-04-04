# ACAB (All Cats Are Beautiful) - Deployment Guide

This guide outlines steps to deploy the ACAB application on AWS.

## Prerequisites

1. AWS Account
2. Node.js 18+ installed locally
3. AWS CLI installed and configured

## Build Instructions

Before deploying, build the application:

```bash
# Install dependencies
npm install

# Build the application (both client and server)
npm run build
```

The build process will:
- Create a production-ready React build in the `dist` folder
- Compile the Express server code
- Bundle everything needed for production

## Deployment Options

### Option 1: AWS Elastic Beanstalk (Recommended)

1. **Install EB CLI:**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB Application:**
   ```bash
   eb init -p node.js-18 acab-application
   ```

3. **Create Environment and Deploy:**
   ```bash
   eb create acab-production
   ```

4. **Configure Environment Variables:**
   Go to the Elastic Beanstalk console > Your environment > Configuration > Software > Environment properties.
   
   Add:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila`
   - Any other required secrets

5. **Access Your Application:**
   ```bash
   eb open
   ```

### Option 2: EC2 Instance with PM2

1. **Launch EC2 Instance:**
   - Choose Amazon Linux 2 or Ubuntu Server
   - t2.micro (or larger depending on traffic)
   - Configure security groups to allow HTTP (80), HTTPS (443), and SSH (22)

2. **Connect to Instance:**
   ```bash
   ssh -i your-key.pem ec2-user@your-instance-public-dns
   ```

3. **Install Node.js:**
   ```bash
   # For Amazon Linux
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   . ~/.nvm/nvm.sh
   nvm install 18

   # For Ubuntu
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

5. **Clone Repository and Setup:**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   npm install
   npm run build
   ```

6. **Create .env File:**
   ```bash
   cat > .env << EOL
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila
   EOL
   ```

7. **Start with PM2:**
   ```bash
   pm2 start npm --name "acab-app" -- start
   pm2 startup
   pm2 save
   ```

8. **Setup Nginx (Optional for SSL/Domain):**
   ```bash
   sudo amazon-linux-extras install nginx1 # For Amazon Linux
   # or
   sudo apt-get install nginx # For Ubuntu
   ```

   Create a configuration in `/etc/nginx/conf.d/acab.conf`:
   ```
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable and start Nginx:
   ```bash
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

### Option 3: AWS Amplify (Frontend) + AWS Lambda/API Gateway (Backend)

For a serverless approach, follow the detailed steps below:

1. **Frontend Deployment with Amplify:**
   - Log in to the AWS Amplify Console
   - Select "Host web app"
   - Connect your GitHub/GitLab/Bitbucket repository
   - Follow the setup wizard
   - Configure build settings:
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

2. **Backend Deployment to Lambda:**
   This is a bit more complex and involves:
   - Creating an AWS Lambda function for each API route
   - Setting up API Gateway to route requests
   - Connecting to your MongoDB database

## Environment Variables

Regardless of the deployment method, make sure these environment variables are set:

- `NODE_ENV=production`
- `PORT=5000` (or let AWS assign it)
- `MONGODB_URI=mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila`

## Post-Deployment

1. **Verify the Application:**
   - Check that all routes work
   - Test user interactions
   - Verify database connections

2. **Setup Monitoring:**
   - Use AWS CloudWatch for logs and metrics
   - Set up alarms for abnormal behavior

3. **Configure a Custom Domain:**
   - Use Route 53 if the domain is managed by AWS
   - Set up SSL certificate via AWS Certificate Manager

## Troubleshooting

- If the application doesn't start, check logs:
  - Elastic Beanstalk: Use the EB console or `eb logs`
  - EC2: Check `/var/log/nginx/error.log` and PM2 logs with `pm2 logs`
  
- If database connection fails, verify:
  - Network security groups allow outbound traffic
  - The MongoDB Atlas IP whitelist includes your AWS IP
  - Connection string is correctly set in environment variables

## Scaling the Application

When you need to scale:

1. **Elastic Beanstalk**: Enable auto-scaling in the EB console
2. **EC2**: Use an Auto Scaling group with a load balancer
3. **Serverless**: Lambda automatically scales based on demand