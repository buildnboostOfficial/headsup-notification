import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Events from "react-native-simple-events";

type dataType = {
  title?: string;
  body?: string;
  duration?: number;
  onClicked?: any;
};

export const showNotification = (data: dataType) => {
  const { title, body, onClicked, duration } = data;

  Events.trigger("Ready", {
    title,
    body,
    onClicked,
    duration,
  });
};

const Notification = () => {
  const opacity = useSharedValue(0);

  const [textTitle, setTextTitle] = useState<string | undefined>("");
  const [textBody, setTextBody] = useState<string | undefined>("");
  const [customFunction, setFunction] = useState();

  useEffect(() => {
    Events.on("Ready", "12345678", doThings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateY: interpolate(opacity.value, [0, 1], [-100, 0]),
        },
      ],
    };
  });

  const doThings = (data: dataType) => {
    const { title, body, onClicked, duration } = data;
    setTextTitle(title?.toString());
    setTextBody(body?.toString());
    setFunction(onClicked);
    opacity.value = withSequence(
      withTiming(1, {
        duration: 500,
      }),
      withDelay(
        duration ? duration : 5000,
        withTiming(0, {
          duration: 500,
        })
      )
    );
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity activeOpacity={0.8} onPress={customFunction}>
        <View style={styles.content}>
          <Text>{textTitle}</Text>
          <Text>{textBody}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1001,
    padding: 8,
  },
  content: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
});

export default Notification;
