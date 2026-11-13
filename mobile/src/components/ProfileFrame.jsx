import { useEffect, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { colors, useLayout } from "../theme";
import { assets } from "../data/projects";

/**
 * Circular photo/logo cross-fade, ported from the two CSS keyframe animations
 * (10s loop, 45%-50% and 95%-100% transitions, 1 -> 1.025 scale).
 */
export default function ProfileFrame() {
  const { width, isTablet } = useLayout();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      progress.setValue(0);
      return undefined;
    }

    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [progress, reduceMotion]);

  const inputRange = [0, 0.45, 0.5, 0.95, 1];
  const photoOpacity = progress.interpolate({ inputRange, outputRange: [1, 1, 0, 0, 1] });
  const logoOpacity = progress.interpolate({ inputRange, outputRange: [0, 0, 1, 1, 0] });
  const scale = progress.interpolate({ inputRange, outputRange: [1, 1, 1.025, 1.025, 1] });

  const size = isTablet ? Math.min(width * 0.68, 360) : Math.min(width - 48, 420);

  return (
    <View
      accessibilityLabel="Profile image slideshow"
      style={[styles.frame, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: reduceMotion ? 1 : photoOpacity, transform: [{ scale: reduceMotion ? 1 : scale }] }]}
      >
        <Image source={assets.profilePhoto} style={styles.fill} resizeMode="cover" />
      </Animated.View>

      {!reduceMotion && (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: logoOpacity, transform: [{ scale }] }]}>
          <Image
            source={assets.logoMark}
            style={[styles.fill, styles.logo]}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paperFrame,
  },
  // Image is a replaced element: explicit 100% keeps it filling the circle
  // instead of rendering at the asset's intrinsic size.
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  logo: {
    backgroundColor: "#121212",
  },
});
