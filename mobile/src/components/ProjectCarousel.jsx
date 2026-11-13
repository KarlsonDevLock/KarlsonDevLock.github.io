import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { clamp, colors, radius, useLayout } from "../theme";
import { homeSlides } from "../data/projects";

/** The 3-slide home carousel, driven by state instead of radio inputs. */
export default function ProjectCarousel() {
  const { width, height, contentWidth, isPhone, isTablet } = useLayout();
  const [index, setIndex] = useState(0);
  const [progress] = useState(() => new Animated.Value(0));

  const cardWidth = contentWidth;
  const cardHeight = isPhone ? 430 : isTablet ? Math.round(cardWidth * 0.75) : Math.round((cardWidth * 8.4) / 16);

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: index,
      duration: 520,
      easing: Easing.bezier(0.2, 0.75, 0.25, 1),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [index, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -cardWidth, -cardWidth * 2],
  });

  const previous = () => setIndex((value) => (value - 1 + homeSlides.length) % homeSlides.length);
  const next = () => setIndex((value) => (value + 1) % homeSlides.length);

  const arrowSize = isPhone ? 44 : 52;
  const headingSize = clamp(35.2, width * 0.05, 76.8);

  return (
    <LinearGradient
      colors={homeSlides[index].gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.section, { minHeight: height, paddingVertical: isPhone ? 86 : 110 }]}
    >
      <View style={{ width: contentWidth, alignSelf: "center" }}>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>My Selected work</Text>
          <Text
            style={[
              styles.headingTitle,
              {
                fontSize: headingSize,
                letterSpacing: headingSize * -0.055,
                lineHeight: headingSize * 0.96,
              },
            ]}
          >
            Projects
          </Text>
        </View>

        <View style={[styles.carousel, { width: cardWidth }]}>
          <Animated.View
            style={{
              flexDirection: "row",
              width: cardWidth * homeSlides.length,
              transform: [{ translateX }],
            }}
          >
            {homeSlides.map((slide, slideIndex) => (
              <View
                key={slide.id}
                style={{ width: cardWidth, height: cardHeight, backgroundColor: "#191919", overflow: "hidden" }}
              >
                <Image source={slide.image} style={styles.slideImage} resizeMode="cover" />
                <View
                  style={[
                    styles.caption,
                    {
                      left: isPhone ? 12 : 18,
                      right: isPhone ? 12 : 18,
                      bottom: isPhone ? 12 : 18,
                      minHeight: isPhone ? 98 : 112,
                      padding: isPhone ? 16 : 20,
                    },
                  ]}
                >
                  <BlurView intensity={18} tint="dark" style={StyleSheet.absoluteFill} pointerEvents="none" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.slideType}>{slide.type}</Text>
                    <Text
                      style={[
                        styles.slideTitle,
                        {
                          fontSize: clamp(20, width * 0.03, 35.2),
                          letterSpacing: clamp(20, width * 0.03, 35.2) * -0.035,
                        },
                      ]}
                      numberOfLines={2}
                    >
                      {slide.title}
                    </Text>
                  </View>
                  {!isPhone && (
                    <Text style={styles.slideIndex}>
                      {`0${slideIndex + 1} / 0${homeSlides.length}`}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </Animated.View>

          <View
            pointerEvents="box-none"
            style={[
              styles.arrows,
              { top: cardHeight / 2 - arrowSize / 2, left: isPhone ? 10 : 18, right: isPhone ? 10 : 18 },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous project"
              onPress={previous}
              style={({ pressed }) => [
                styles.arrow,
                { width: arrowSize, height: arrowSize },
                pressed ? styles.arrowPressed : null,
              ]}
            >
              <Text style={styles.arrowText}>←</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next project"
              onPress={next}
              style={({ pressed }) => [
                styles.arrow,
                { width: arrowSize, height: arrowSize },
                pressed ? styles.arrowPressed : null,
              ]}
            >
              <Text style={styles.arrowText}>→</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/projects/games")}
          style={({ pressed }) => [styles.primaryButton, pressed ? styles.primaryButtonPressed : null]}
        >
          {({ pressed }) => (
            <Text style={[styles.primaryButtonText, pressed ? styles.primaryButtonTextPressed : null]}>
              View more Projects <Text>↗</Text>
            </Text>
          )}
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
  },
  heading: {
    marginBottom: 46,
  },
  eyebrow: {
    color: colors.light,
    fontSize: 11.84,
    fontWeight: "700",
    letterSpacing: 1.66,
    textTransform: "uppercase",
  },
  headingTitle: {
    color: colors.light,
    fontWeight: "600",
    marginTop: 8,
  },
  carousel: {
    alignSelf: "center",
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "rgba(255,255,255,0.04)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 35,
    shadowOffset: { width: 0, height: 24 },
    elevation: 12,
  },
  // Image needs explicit 100% or it renders at the asset's intrinsic size.
  slideImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  caption: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 24,
    borderRadius: radius.eighteen,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.glassCard,
    overflow: "hidden",
  },
  slideType: {
    color: "rgba(255,255,255,0.63)",
    fontSize: 11.84,
    letterSpacing: 1.42,
    textTransform: "uppercase",
  },
  slideTitle: {
    color: "#ffffff",
    fontWeight: "500",
    marginTop: 4,
  },
  slideIndex: {
    color: "rgba(255,255,255,0.63)",
    fontSize: 11.84,
    letterSpacing: 1.42,
    textTransform: "uppercase",
  },
  arrows: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrow: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    backgroundColor: "rgba(8,8,8,0.58)",
  },
  arrowPressed: {
    backgroundColor: "rgba(8,8,8,0.86)",
  },
  arrowText: {
    color: "#ffffff",
    fontSize: 18,
  },
  primaryButton: {
    alignSelf: "center",
    marginTop: 36,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.32)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  primaryButtonPressed: {
    backgroundColor: colors.light,
  },
  primaryButtonText: {
    color: colors.light,
    fontSize: 13.76,
  },
  primaryButtonTextPressed: {
    color: colors.ink,
  },
});
