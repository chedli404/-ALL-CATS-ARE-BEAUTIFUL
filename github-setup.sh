#!/bin/bash

# GitHub Repository Setup Helper
# This script helps you push your ACAB project to GitHub from your local machine
# Run this after downloading the project from Replit

echo "ACAB GitHub Setup Helper"
echo "========================"
echo "This script will help you push your project to GitHub after downloading it."
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Get repository name
read -p "Enter repository name (default: acab-project): " REPO_NAME
REPO_NAME=${REPO_NAME:-acab-project}

echo ""
echo "You'll need to create a new repository on GitHub:"
echo "1. Go to https://github.com/new"
echo "2. Name it: $REPO_NAME"
echo "3. Make it private or public as you prefer"
echo "4. Do NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""
read -p "Press Enter once you've created the repository..."

echo ""
echo "Now, run these commands in your terminal:"
echo ""
echo "# Navigate to the project directory"
echo "cd path/to/downloaded/project"
echo ""
echo "# Initialize Git repository"
echo "git init"
echo ""
echo "# Add all files"
echo "git add ."
echo ""
echo "# Create first commit"
echo "git commit -m \"Initial commit\""
echo ""
echo "# Connect to your GitHub repository"
echo "git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo ""
echo "# Push to GitHub"
echo "git push -u origin main"
echo ""
echo "Done! Your code should now be on GitHub."
echo ""
echo "For AWS deployment follow the instructions in README.md"
