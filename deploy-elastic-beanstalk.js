/**
 * AWS Elastic Beanstalk Deployment Helper
 * 
 * This script automates the deployment process to AWS Elastic Beanstalk.
 * It creates necessary configuration files and provides deployment instructions.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  applicationName: 'acab-app',
  environmentName: 'production',
  region: 'us-east-1',
  nodeVersion: '18',
  mongoDbUri: 'mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila',
  port: 5000
};

// Helper to run shell commands
function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    return { success: true, output };
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    return { success: false, error: error.message };
  }
}

// Create necessary EB configuration files
function createEbConfigFiles() {
  console.log('Creating Elastic Beanstalk configuration files...');
  
  // Create .elasticbeanstalk directory
  if (!fs.existsSync('.elasticbeanstalk')) {
    fs.mkdirSync('.elasticbeanstalk');
  }
  
  // Create config.yml
  const configYml = `branch-defaults:
  main:
    environment: ${config.environmentName}
    group_suffix: null
global:
  application_name: ${config.applicationName}
  branch: null
  default_ec2_keyname: null
  default_platform: Node.js ${config.nodeVersion}
  default_region: ${config.region}
  include_git_submodules: true
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: null
  repository: null
  sc: git
  workspace_type: Application
`;

  // Create Procfile
  const procfile = 'web: npm start';
  
  // Create .ebignore
  const ebignore = `
# Ignore development files
node_modules
.git
.github
.gitignore
.env.local
.env.development
README.md
*.log

# Include dist directory for production build
!dist/
`;

  // Create .ebextensions directory and files
  if (!fs.existsSync('.ebextensions')) {
    fs.mkdirSync('.ebextensions');
  }
  
  // Create node-settings.config
  const nodeSettings = `option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    MONGODB_URI: ${config.mongoDbUri}
    PORT: ${config.port}
  aws:elasticbeanstalk:environment:proxy:staticfiles:
    /static: /dist/static
`;

  // Create nginx.config
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

        location / {
          proxy_pass http://nodejs;
          proxy_set_header Connection "";
          proxy_http_version 1.1;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        
        # Enable gzip compression
        gzip on;
        gzip_comp_level 4;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
      }
`;

  // Write all files
  try {
    fs.writeFileSync('.elasticbeanstalk/config.yml', configYml);
    fs.writeFileSync('Procfile', procfile);
    fs.writeFileSync('.ebignore', ebignore);
    fs.writeFileSync('.ebextensions/01-node-settings.config', nodeSettings);
    fs.writeFileSync('.ebextensions/02-nginx.config', nginxConfig);
    
    console.log('✅ Elastic Beanstalk configuration files created successfully.');
  } catch (error) {
    console.error('❌ Error creating EB config files:', error.message);
  }
}

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

// Generate deployment instructions
function showDeploymentInstructions() {
  console.log('\n===== ELASTIC BEANSTALK DEPLOYMENT INSTRUCTIONS =====\n');
  
  console.log('1. Install the EB CLI:');
  console.log('   pip install awsebcli');
  
  console.log('\n2. Initialize your EB application (if not already done):');
  console.log(`   eb init -p "node.js-${config.nodeVersion}" -r ${config.region} ${config.applicationName}`);
  
  console.log('\n3. Create an environment and deploy:');
  console.log(`   eb create ${config.environmentName}`);
  
  console.log('\n4. For future deployments, simply use:');
  console.log('   eb deploy');
  
  console.log('\n5. Open your application:');
  console.log('   eb open');
  
  console.log('\n===== ADDITIONAL NOTES =====');
  console.log('- Make sure your MongoDB Atlas cluster allows connections from AWS IPs');
  console.log('- You may need to update the Node.js version in the EB environment settings');
  console.log('- For custom domains, configure Route 53 and AWS Certificate Manager');
}

// Run the setup
function setup() {
  console.log('Starting AWS Elastic Beanstalk deployment setup...\n');
  
  createEbConfigFiles();
  createEnvFile();
  showDeploymentInstructions();
  
  console.log('\nSetup complete! Your project is now ready for AWS Elastic Beanstalk deployment.');
  console.log('Follow the instructions above to deploy your application.');
}

// Execute the setup
setup();