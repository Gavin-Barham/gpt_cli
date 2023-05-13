#!/bin/zsh

# Save the current working directory
current_dir=$(pwd)

# Change directory to the script location
#update this with your path to this directory
cd {path to this directory}

# Run the Node.js script with absolute path
# Update this with your path to this directory followed by the index.js
node {path to this directory}/index.js

# Restore the original working directory
cd "$current_dir"
