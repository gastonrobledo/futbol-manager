Android Setup
=============
1. `brew install android-sdk`
2. `android`
	1. Select "Android 6, Google Repository, Android Support Repository", click "Install packages" - Accept license.
	_This will take a long time and use a lot of data, be sure you're on WiFi._
3. Run `cordova platform add android`

IOS Setup
=========
1. Go to - https://developer.apple.com/account
	1. Click on "Certificates, IDs & Profiles"
	2. Select Certificate
	3. Click Download
2. Open XCode
	1. Click xcode in top left
	2. Click preferences
	3. Click accounts
	4. Click + in bottom left. Add Apple ID
	5. Download the provisioning profiles
3. Run `cordova platform add ios`

IOS Build & Emulate
===================
1. Run `cordova build ios`
2. `cordova emulate ios`
	1. Can also specify device, e.g. `cordova emulate ios --target=iPhone-5`

Android Build & Emulate
=======================
1. Run `cordova build android`
2. `cordova emulate android`
	1. Can also specify device, e.g. `cordova emulate android --target=DEVICE`

Go to [https://www.genymotion.com/](https://www.genymotion.com/) to download a faster android emulator, since the one that comes with the SDK is slow.

Run on Actual Device Via USB Tether
===================================
* Android - `cordova run android`.
* IOS - `cordova run ios`.

\*\* **The device cannot have the Futbol app installed.**
If it is already installed, uninstall and then type: `cordova run android` or `cordova run ios` as appropriate.


## Folder Structure
Here you have the project folder structure
```
mobile/
    |- hooks/
    |- platforms/
        |- ios/
        |- android/
    |- plugins/
    |- res/
    |- www/
    |- config.xml
```

What follows is a brief description of each entry.
- ```hooks```: This contains the scripts to run on build steps, e.g after_build or before_build
- ```platforms```: This contains the native code + cordova code to build the app
- ```platforms/ios```: This contains the native code + cordova for iOS
- ```platforms/android```: This contains the native code + cordova for android
- ```plugins```: This folder contains the plugins for cordova e.g. ```cordova-plugin-console```
- ```res```: this folder contains the resources needed such as icons and splash screens.
- ```www```: this folder will contain the HTML/CSS/Javascript code.
- ```config.xml```: this file contains all the configuration for both platforms.