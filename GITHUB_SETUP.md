# GitHub Repository Setup Guide

## GitHub Token

You've provided a GitHub token (`[REDACTED]`). This token should be added to your GitHub repository secrets to enable automated workflows.

## Setting Up GitHub Actions

Create a workflow file in your GitHub repository at `.github/workflows/main.yml` with the following content:

```yml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: dist/
```

## Adding GitHub Secret

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add a new secret with:
   - Name: `GITHUB_TOKEN`
   - Value: `[REDACTED]`

## Optional: AWS Deployment Configuration

To enable automated deployment to AWS, uncomment and configure the deployment section in your workflow file. This requires adding AWS credentials as secrets to your GitHub repository.

```yml
deploy:
  needs: build
  runs-on: ubuntu-latest
  steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist/
        
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
        
    - name: Deploy to AWS
      run: |
        # Add your AWS deployment commands here
        # Examples:
        # - For S3: aws s3 sync dist/ s3://your-bucket-name/
        # - For Elastic Beanstalk: eb deploy
```

## Required AWS Secrets (if using AWS deployment)

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`