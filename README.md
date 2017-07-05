# NanoDLP-TouchScreen
Nextion Screen => NodeJS => NanoDLP

# Enable /dev/ttyAMA0 For Raspberry Pi Zero and Raspberry Pi 3
$ sudo raspi-config
  => Interfacing Option
  => Serial
  => NO
  => YES

$ sudo nano /boot/config.txt
  => add this line : ```dtoverlay=pi3-disable-bt```

$ sudo reboot
$ sudo nano /boot/cmdline.txt
  => remove the word phase "console=serial0,115200" or "console=ttyAMA0,115200"

$ sudo reboot
