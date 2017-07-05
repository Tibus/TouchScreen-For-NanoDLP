# Installation for Raspberry pi Zero
#pizero  try this : https://github.com/sdesalas/node-pi-zero
  sudo apt-get update
  sudo apt-get install git -y
  wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v6.4.0.sh | bash
  git clone http://gogs.flatland.be/tibus/NanoDLPNextion.git
  cd NanoDLPNextion

  sudo npm install serialport --unsafe-perm
  npm install

#pi3 : 
  sudo apt-get update
  sudo apt-get install git -y
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt install nodejs -y
  git clone http://gogs.flatland.be/tibus/NanoDLPNextion.git
  cd NanoDLPNextion
  sudo npm install serialport --unsafe-perm
  npm install