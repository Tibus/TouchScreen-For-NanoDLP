wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v6.4.0.sh | bash
sudo sed -i.bak "1i#\!/bin/sh \-e\nnode /home/pi/nextion/bin/index.js 2> /home/pi/nextion/errorOutput.log > /home/pi/nextion/output.log &" /etc/rc.local
npm install -G babel-polyfill pngjs pushbullet request-promise-native serialport sharp three debug
