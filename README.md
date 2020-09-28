# Welcome To The PcSleepTimer App!
PcSleepTimer is a native app for Windows, Linux, and Mac, which gives your PC a sleep timer similar to the ones found in your TV. You can setup your own duration and the process that is ran once the time is up (default is the shutdown command for the OS).

## How Do I Get It?
There are two ways to get a copy of PcSleepTimer: Download the latest release under the release tab (windows only), or compile from source.

### How To Compile From Source
1. Install Node JS and npm on your PC.
2. Fork and clone the repository.
3. Run command ```npm install --save-dev``` on the cloned folder.
4. Create a folder called ```build``` and move the icon file to that folder.
5. Run command ```electron-builder build --windows```

When building for other operating systems, replace ```--windows``` with your OS specific flag (Linux: ```--linux```, Mac: ```--mac```). If you need a different operating system, go [here](https://www.electron.build/cli) for the electron-builder documentation.