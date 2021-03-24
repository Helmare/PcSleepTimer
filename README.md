# Welcome To The PcSleepTimer App!
PcSleepTimer is an app for Windows, Mac, and Linux that’s just like the sleep timer on your TV but for your PC. After a specified duration, the app will ask if you’re still awake. If not, it will run a process, which is PC shutdown by default. This is useful for people who use their PC for consuming media, such as music or video, before going to bed. With this app, you’ll no longer have your PC running needlessly through the night, and you’ll no longer have to remember where you left off in a TV show before falling asleep.

## How Do I Get It?
There are two ways to get a copy of PcSleepTimer: Download the latest release under the release tab (windows only), or compile from source.

### How To Compile From Source
1. Install Node JS and npm on your PC.
2. Fork and clone the repository.
3. Run command ```npm install --save-dev``` on the cloned folder.
4. Create a folder called ```build``` and move the icon file to that folder.
5. Run command ```electron-builder build --windows```

The app files will be built in the ```dist``` folder. If you need to build for other operating systems, replace ```--windows``` with your OS specific flag (Linux: ```--linux```, Mac: ```--mac```). Other OS flags can be found [here](https://www.electron.build/cli).

*Note: This has not been tested on linux or mac. Any contribution on that front will be greatly appriciated!*

## Settings
After you run PcSleepTimer for the first time it will create a ```settings.json``` file. You can change all the settings int this file, but the app must be restarted for them to take affect.

| Setting        | Description                                                       |
|----------------|-------------------------------------------------------------------|
|```duration```  |Duration of the sleep timer.                                       |
|```overtime```  |Duration of the overtime period.                                   |
|```fullscreen```|Whether the app will switch to fullscreen duration overtime.       |
|```process```   |The process that will run if the timer is not reset after overtime.|
