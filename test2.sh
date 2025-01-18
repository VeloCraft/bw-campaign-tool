ssh digitalocean-bw << 'EOF'
cd sites/bw-campaign-tool
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
# Ensure pm2 is installed
npm install -g pm2
export PATH=$(npm bin -g):$PATH
pnpm run build
EOF
