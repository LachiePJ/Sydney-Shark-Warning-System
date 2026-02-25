#!/bin/bash

# Simple push script for SharkWarningSystem
# This will prompt for your GitHub credentials securely

cd /Users/lox/SharkWarningSystem

echo "Clearing old credentials..."
git config --unset credential.helper 2>/dev/null
git config --global --unset credential.helper 2>/dev/null

echo "Pushing to GitHub..."
echo "When prompted:"
echo "  Username: LachiePJ (or your GitHub username)"
echo "  Password: [Paste your Personal Access Token]"
echo ""

git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "Vercel will auto-deploy in 2-3 minutes"
else
    echo ""
    echo "❌ Push failed. Check your credentials."
fi
