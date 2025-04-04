/**
 * AWS EC2 Deployment Helper
 * 
 * This script helps prepare your application for deployment to an AWS EC2 instance.
 * It creates necessary configuration files and provides detailed instructions.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  mongoDbUri: 'mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila',
  port: 5000,
  domain: 'your-domain.com', // Replace with your domain if you have one
  usePm2: true,
  useNginx: true,
  enableHttps: false, // Set to true if you want to configure HTTPS
};

// Create .env file
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

// Create PM2 ecosystem file
function createPm2Config() {
  if (!config.usePm2) return;
  
  console.log('Creating PM2 ecosystem configuration...');
  
  const pm2Config = `module.exports = {
  apps: [{
    name: "acab-app",
    script: "dist/index.js",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: ${config.port},
      MONGODB_URI: "${config.mongoDbUri}"
    },
    watch: false,
    max_memory_restart: "500M"
  }]
};
`;

  try {
    fs.writeFileSync('ecosystem.config.js', pm2Config);
    console.log('✅ PM2 ecosystem file created successfully.');
  } catch (error) {
    console.error('❌ Error creating PM2 ecosystem file:', error.message);
  }
}

// Create Nginx configuration
function createNginxConfig() {
  if (!config.useNginx) return;
  
  console.log('Creating Nginx configuration...');
  
  const nginxConfig = `server {
    listen 80;
${config.domain ? `    server_name ${config.domain};` : ''}

    location / {
        proxy_pass http://localhost:${config.port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`;

  try {
    const nginxDir = 'nginx';
    if (!fs.existsSync(nginxDir)) {
      fs.mkdirSync(nginxDir);
    }
    fs.writeFileSync('nginx/acab-app.conf', nginxConfig);
    console.log('✅ Nginx configuration file created successfully.');
  } catch (error) {
    console.error('❌ Error creating Nginx configuration:', error.message);
  }
}

// Create deployment script
function createDeploymentScript() {
  console.log('Creating EC2 deployment script...');
  
  const deployScript = `#!/bin/bash

# Exit on error
set -e

echo "===== ACAB App Deployment Script ====="
echo "Starting deployment process..."

# Update system and install dependencies
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Install Nginx if configured
${config.useNginx ? `
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get install -y nginx
fi
` : ''}

# Build the application
echo "Installing dependencies..."
npm ci

echo "Building application..."
npm run build

# Configure Nginx if enabled
${config.useNginx ? `
echo "Configuring Nginx..."
sudo cp nginx/acab-app.conf /etc/nginx/conf.d/
sudo nginx -t && sudo systemctl restart nginx
` : ''}

# Start the application with PM2
${config.usePm2 ? `
echo "Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save

# Configure PM2 to start on system boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER
` : `
echo "Starting application..."
npm start &
`}

echo "===== Deployment Complete! ====="
${config.domain ? `echo "Your application should now be accessible at http://${config.domain}"` : `echo "Your application should now be running on port ${config.port}"`}
`;

  try {
    fs.writeFileSync('deploy-to-ec2.sh', deployScript);
    console.log('✅ Deployment script created successfully.');
  } catch (error) {
    console.error('❌ Error creating deployment script:', error.message);
  }
}

// Generate deployment instructions
function showDeploymentInstructions() {
  console.log('\n===== EC2 DEPLOYMENT INSTRUCTIONS =====\n');
  
  console.log('1. Launch an EC2 instance:');
  console.log('   - Amazon Linux 2 or Ubuntu Server recommended');
  console.log('   - t2.micro (free tier) or larger based on needs');
  console.log('   - Configure security group to allow HTTP (80), HTTPS (443) if needed, and SSH (22)');
  
  console.log('\n2. Connect to your EC2 instance:');
  console.log('   ssh -i your-key.pem ec2-user@your-instance-public-dns');
  
  console.log('\n3. Upload your project to the EC2 instance:');
  console.log('   From your local machine:');
  console.log('   scp -i your-key.pem -r ./ ec2-user@your-instance-public-dns:~/acab-app');
  
  console.log('\n4. Run the deployment script:');
  console.log('   cd ~/acab-app');
  console.log('   chmod +x deploy-to-ec2.sh');
  console.log('   ./deploy-to-ec2.sh');
  
  console.log('\n5. Monitor your application:');
  if (config.usePm2) {
    console.log('   pm2 status');
    console.log('   pm2 logs');
  }
  
  console.log('\n===== ADDITIONAL NOTES =====');
  console.log('- Make sure your MongoDB Atlas cluster allows connections from your EC2 instance IP');
  console.log('- For custom domains, configure Route 53 or update your domain\'s DNS settings');
  if (config.enableHttps) {
    console.log('- To enable HTTPS, install Certbot and run:');
    console.log('   sudo apt-get install certbot python3-certbot-nginx -y');
    console.log(`   sudo certbot --nginx -d ${config.domain}`);
  }
}

// Run the setup
function setup() {
  console.log('Starting AWS EC2 deployment setup...\n');
  
  createEnvFile();
  if (config.usePm2) createPm2Config();
  if (config.useNginx) createNginxConfig();
  createDeploymentScript();
  showDeploymentInstructions();
  
  console.log('\nSetup complete! Your project is now ready for AWS EC2 deployment.');
  console.log('Follow the instructions above to deploy your application.');
}

// Execute the setup
setup();