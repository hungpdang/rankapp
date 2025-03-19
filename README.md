# Getting Started

Run ```yarn``` at root folder to install then
```cd ios && pod install```

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

# Using Yarn
```yarn start```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android
```yarn android```

### iOS
For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

```yarn ios```


If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: For Unit testing redux

Run ```yarn test redux``` at root folder to perform unit test

