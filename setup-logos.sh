#!/bin/bash
# Script to help add logo images

echo "🦈 Sydney Shark Warning System - Logo Setup"
echo ""
echo "I need two PNG image files:"
echo "  1. Node Strategy logo (any size, will be scaled)"
echo "  2. White shark icon (ideally 32x32px or similar)"
echo ""
echo "Where are your image files located?"
echo ""
echo "Common locations:"
echo "  ~/Desktop/"
echo "  ~/Downloads/"
echo "  ~/Documents/"
echo ""
read -p "Enter the directory path: " IMG_DIR

# Expand tilde
IMG_DIR="${IMG_DIR/#\~/$HOME}"

if [ ! -d "$IMG_DIR" ]; then
  echo "❌ Directory not found: $IMG_DIR"
  exit 1
fi

echo ""
echo "📁 Files in $IMG_DIR:"
ls -1 "$IMG_DIR"/*.{png,jpg,jpeg,PNG,JPG,JPEG} 2>/dev/null | head -20

echo ""
read -p "Enter filename for Node Strategy logo: " NODE_LOGO
read -p "Enter filename for Shark icon: " SHARK_ICON

NODE_SRC="$IMG_DIR/$NODE_LOGO"
SHARK_SRC="$IMG_DIR/$SHARK_ICON"

if [ ! -f "$NODE_SRC" ]; then
  echo "❌ Node logo not found: $NODE_SRC"
  exit 1
fi

if [ ! -f "$SHARK_SRC" ]; then
  echo "❌ Shark icon not found: $SHARK_SRC"
  exit 1
fi

# Copy files
PROJ_DIR="$HOME/SharkWarningSystem/public"
cp "$NODE_SRC" "$PROJ_DIR/node-logo.png"
cp "$SHARK_SRC" "$PROJ_DIR/shark-icon.png"

echo ""
echo "✅ Logos copied successfully!"
ls -lh "$PROJ_DIR"/*.png

echo ""
echo "📦 Now deploying to Vercel..."
cd "$HOME/SharkWarningSystem"
git add public/node-logo.png public/shark-icon.png
git commit -m "add: real Node Strategy and shark icon images"
git push

echo ""
echo "🚀 Done! Your logos should appear on the site in ~1 minute"
echo "Visit: https://sydney-shark-warning-system.vercel.app"
