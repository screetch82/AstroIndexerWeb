#!/bin/bash

# AstroIndexer Website Deployment Script
# Deploys to GitHub Pages (astroindexerweb repository)

echo "🚀 Starting AstroIndexer Website Deployment..."

# Configuration
REPO_NAME="astroindexerweb"
GITHUB_USER="your-github-username"  # Update this
BRANCH="gh-pages"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git is not installed${NC}"
    exit 1
fi

# Create temporary directory for deployment
TEMP_DIR=$(mktemp -d)
echo "📁 Created temporary directory: $TEMP_DIR"

# Copy website files to temp directory
echo "📋 Copying website files..."
cp -r ./* "$TEMP_DIR/" 2>/dev/null || true

# Remove deployment script from the copy
rm -f "$TEMP_DIR/deploy.sh"

# Initialize git repository in temp directory
cd "$TEMP_DIR"
git init
git add -A

# Create initial commit
git commit -m "Deploy AstroIndexer website - $(date '+%Y-%m-%d %H:%M:%S')"

# Add remote repository
git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

# Check if gh-pages branch exists
if git ls-remote --heads origin ${BRANCH} | grep ${BRANCH} > /dev/null; then
    echo "📥 Pulling existing ${BRANCH} branch..."
    git fetch origin ${BRANCH}
    git checkout ${BRANCH}
    git pull origin ${BRANCH}

    # Copy new files over existing ones
    cp -r ../* ./ 2>/dev/null || true
    rm -f deploy.sh

    git add -A
    git commit -m "Update AstroIndexer website - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
else
    echo "📝 Creating new ${BRANCH} branch..."
    git checkout -b ${BRANCH}
fi

# Push to GitHub
echo "📤 Pushing to GitHub Pages..."
git push -u origin ${BRANCH} --force

# Clean up
cd -
rm -rf "$TEMP_DIR"

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📌 Next steps:"
echo "1. Go to https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "2. Set Source to 'Deploy from a branch'"
echo "3. Select '${BRANCH}' branch and '/ (root)' folder"
echo "4. Save the settings"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://${GITHUB_USER}.github.io/${REPO_NAME}/"
echo "   or https://astroindexer.com (if custom domain is configured)"
echo ""
echo "📊 Check deployment status:"
echo "   https://github.com/${GITHUB_USER}/${REPO_NAME}/deployments"