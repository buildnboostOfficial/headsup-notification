# Headsup Notification

In-App Headsup Notification for react native

## Installation
Make sure you have reanimated 2 installed and configured before using this package.

using npm
```
npm install @buildnboost/headsup-notification
```

using yarn
```
yarn add @buildnboost/headsup-notificatio
```

## Implementation
Add this lines in you root files

```
import Notification from “@buildnboost/headsup-notification”

/* Inside main code */
<View>
  <Notification />
</View>
```

Add this line where you want to call the notifications
```
import { showNotification } from “@buildnboost/headsup-notification”

showNotification({
      title: “this is notification title”,
      body: “this is notification body”
});
```

## Options
|property|type|default|description|
|--------|----|-------|-----------|
|title|String|""|Title of notification.
|body|String|""|Body of notification.
|duration|Number|2000|Defines how long the notification will be displayed.
