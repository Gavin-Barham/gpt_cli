#!/bin/zsh

# Save the current working directory
current_dir=$(pwd)

# Change directory to the script location
#update this with your path to this directory
cd /Users/gavinbarham/Documents/my-code/repos/gpt_cli

# Run the Node.js script with absolute path
# Update this with your path to this directory followed by the index.js
node /Users/gavinbarham/Documents/my-code/repos/gpt_cli/index.js

# Restore the original working directory
cd "$current_dir"
