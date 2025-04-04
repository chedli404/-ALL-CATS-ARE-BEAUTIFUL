/**
 * AWS Deployment Configuration Helper
 * 
 * This file contains configuration options and utilities
 * to prepare the application for AWS deployment.
 * 
 * Usage:
 * 1. Configure the options below
 * 2. Run: node aws-deploy-config.js
 * 3. Follow the printed instructions
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Deployment Configuration
const config = {
  // AWS Region to deploy to
  awsRegion: 'us-east-1',
  
  // MongoDB connection string
  mongoDbUri: 'mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila',
  
  // Application port
  port: 5000,
  
  // Deployment method: 'eb' (Elastic Beanstalk), 'ec2', or 'lambda'
  deploymentMethod: 'eb',
  
  // Custom domain name (optional)
  customDomain: '',
  
  // Enable HTTPS
  enableHttps: true,
};

// Create environment variables file
function createEnvFile() {
  console.log('Creating .env file for production...');
  
  const envContent = `NODE_ENV=production
PORT=${config.port}
MONGODB_URI=${config.mongoDbUri}
`;

  try {
    fs.writeFileSync('.env', envContent);
    console.log('✅ .env file created successfully.');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
}

// Create a simple Procfile for Elastic Beanstalk
function createProcfile() {
  console.log('Creating Procfile for Elastic Beanstalk...');
  
  try {
    fs.writeFileSync('Procfile', 'web: npm start');
    console.log('✅ Procfile created successfully.');
  } catch (error) {
    console.error('❌ Error creating Procfile:', error.message);
  }
}

// Create ebextensions for Elastic Beanstalk configuration
function createEbExtensions() {
  console.log('Creating .ebextensions configuration...');
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync('.ebextensions')) {
      fs.mkdirSync('.ebextensions');
    }
    
    // Create nginx configuration
    const nginxConfig = `files:
  "/etc/nginx/conf.d/proxy.conf":
    mode: "000644"
    owner: root
    group: root
    content: |
      upstream nodejs {
        server 127.0.0.1:${config.port};
        keepalive 256;
      }

      server {
        listen 80;
        
        if ($time_iso8601 ~ "^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})") {
          set $year $1;
          set $month $2;
          set $day $3;
          set $hour $4;
          set $minutes $5;
          set $seconds $6;
        }
        
        access_log /var/log/nginx/healthd/application.log.$year-$month-$day-$hour healthd;
        access_log /var/log/nginx/access.log main;

        location / {
          proxy_pass http://nodejs;
          proxy_set_header Connection "";
          proxy_http_version 1.1;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        
        gzip on;
        gzip_comp_level 4;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
      }`;
    
    // Create node.js configuration
    const nodeConfig = `option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    MONGODB_URI: ${config.mongoDbUri}
    PORT: ${config.port}
  aws:elasticbeanstalk:environment:proxy:staticfiles:
    /static: /dist/static`;
    
    fs.writeFileSync('.ebextensions/01_nginx.config', nginxConfig);
    fs.writeFileSync('.ebextensions/02_nodeconfig.config', nodeConfig);
    
    console.log('✅ .ebextensions configuration created successfully.');
  } catch (error) {
    console.error('❌ Error creating .ebextensions:', error.message);
  }
}

// Generate deployment instructions
function generateDeploymentInstructions() {
  console.log('\n===== DEPLOYMENT INSTRUCTIONS =====\n');
  
  if (config.deploymentMethod === 'eb') {
    console.log('ELASTIC BEANSTALK DEPLOYMENT:');
    console.log('1. Install the EB CLI:');
    console.log('   pip install awsebcli');
    console.log('\n2. Initialize your EB application:');
    console.log(`   eb init -p "node.js-18" -r ${config.awsRegion} acab-app`);
    console.log('\n3. Create an environment and deploy:');
    console.log('   eb create production-environment');
    console.log('\n4. Open your application:');
    console.log('   eb open');
  } else if (config.deploymentMethod === 'ec2') {
    console.log('EC2 DEPLOYMENT WITH PM2:');
    console.log('1. SSH into your EC2 instance');
    console.log('\n2. Install Node.js and PM2:');
    console.log('   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash');
    console.log('   . ~/.nvm/nvm.sh');
    console.log('   nvm install 18');
    console.log('   npm install -g pm2');
    console.log('\n3. Upload your project to the EC2 instance');
    console.log('\n4. Install dependencies and start:');
    console.log('   npm install');
    console.log('   npm run build');
    console.log('   pm2 start npm --name "acab-app" -- start');
    console.log('   pm2 startup');
    console.log('   pm2 save');
  } else if (config.deploymentMethod === 'lambda') {
    console.log('AWS LAMBDA/API GATEWAY DEPLOYMENT:');
    console.log('For Lambda deployment, check the AWS documentation.');
    console.log('This requires splitting the frontend and backend.');
  }
  
  console.log('\n===== IMPORTANT NOTES =====');
  console.log('1. Make sure your build script includes both frontend and backend');
  console.log('2. Check that your MongoDB Atlas cluster allows connections from AWS IPs');
  console.log('3. For production use, update the MongoDB connection string with proper credentials');
}

// Run the configuration
function runConfiguration() {
  console.log('Starting AWS deployment configuration...');
  
  // Create necessary files
  createEnvFile();
  createProcfile();
  
  if (config.deploymentMethod === 'eb') {
    createEbExtensions();
  }
  
  // Generate deployment instructions
  generateDeploymentInstructions();
  
  console.log('\nConfiguration complete! Your project is ready for AWS deployment.');
}

// Execute configuration
runConfiguration();