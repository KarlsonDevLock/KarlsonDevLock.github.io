import { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ProjectCarousel from "../components/ProjectCarousel";
import ProfileFrame from "../components/ProfileFrame";
import AutoplayVideo from "../components/AutoplayVideo";
import { clamp, colors, useLayout } from "../theme";
import { aboutTools, heroVideo, skills, tools } from "../data/projects";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width, height, contentWidth, isPhone, isTablet } = useLayout();

  const scrollRef = useRef(null);
  const [offsets, setOffsets] = useState({});
  const params = useLocalSearchParams();

  const headerHeight = (isTablet ? 70 : 78) + insets.top;

  const recordSection = (key) => (event) => {
    const y = event.nativeEvent.layout.y;
    setOffsets((previous) =>
      previous[key] === y ? previous : { ...previous, [key]: y }
    );
  };

  const scrollToSection = (key) => {
    const y = offsets[key];
    if (typeof y === "number") {
      scrollRef.current?.scrollTo({ y, animated: true });
    }
  };

  // Handles the Header "About"/"Home" links coming from the project screens.
  useEffect(() => {
    const target = Array.isArray(params.scrollTo) ? params.scrollTo[0] : params.scrollTo;
    if (!target) return undefined;
    const y = offsets[target];
    if (typeof y !== "number") return undefined;
    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({ y, animated: true });
    }, 80);
    return () => clearTimeout(timer);
  }, [params.scrollTo, offsets]);

  const heroTitleSize = clamp(46.4, width * 0.07, 112);
  const sectionTitleSize = clamp(35.2, width * 0.05, 76.8);
  const aboutCopySize = clamp(20, width * 0.024, 32.8);

  return (
    <View style={styles.screen}>
      <SiteHeader variant="home" active="home" onSection={scrollToSection} />

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View style={[styles.hero, { minHeight: height }]} onLayout={recordSection("home")}>
          <AutoplayVideo source={heroVideo} style={StyleSheet.absoluteFill} contentFit="cover" />
          <LinearGradient
            colors={["rgba(0,0,0,0.28)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          <View
            style={{
              width: contentWidth,
              alignSelf: "center",
              flex: 1,
              justifyContent: "center",
              paddingTop: headerHeight,
              paddingBottom: 40,
            }}
          >
            <Text
              style={[
                styles.heroTitle,
                {
                  fontSize: heroTitleSize,
                  lineHeight: heroTitleSize * 0.94,
                  letterSpacing: heroTitleSize * -0.065,
                },
              ]}
            >
              Hi, I am karl{isPhone ? "\n" : " "}
              <Text style={styles.heroTitleAccent}>(KarlDev)</Text>
            </Text>

            <View style={[styles.heroRule, { width: Math.min(460, width * 0.72) }]} />
            <Text
              style={[
                styles.heroCopy,
                {
                  fontSize: clamp(16, width * 0.016, 19.84),
                  lineHeight: clamp(16, width * 0.016, 19.84) * 1.6,
                },
              ]}
            >
              {"I'm a Game Dev and, a part-time Web and Mobile Dev."}
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => scrollToSection("projects")}
              style={styles.textLink}
            >
              <Text style={styles.textLinkText}>My Selected Work ↓</Text>
            </Pressable>
          </View>
        </View>

        {/* PROJECTS */}
        <View onLayout={recordSection("projects")}>
          <ProjectCarousel />
        </View>

        {/* ABOUT */}
        <View
          onLayout={recordSection("about")}
          style={{
            backgroundColor: colors.paper,
            paddingTop: isPhone ? 86 : 120,
            paddingBottom: isPhone ? 86 : 132,
          }}
        >
          <View style={{ width: contentWidth, alignSelf: "center" }}>
            <View style={{ marginBottom: 46 }}>
              <Text style={styles.eyebrowDark}>A little context</Text>
              <Text
                style={[
                  styles.sectionTitleDark,
                  {
                    fontSize: sectionTitleSize,
                    lineHeight: sectionTitleSize * 0.96,
                    letterSpacing: sectionTitleSize * -0.055,
                  },
                ]}
              >
                About me
              </Text>
            </View>

            <View
              style={{
                flexDirection: isTablet ? "column" : "row",
                alignItems: isTablet ? "flex-start" : "center",
                gap: clamp(48, width * 0.08, 110),
              }}
            >
              <ProfileFrame />

              <View style={isTablet ? null : styles.aboutColumn}>
                <Text
                  style={[
                    styles.aboutCopy,
                    {
                      fontSize: aboutCopySize,
                      lineHeight: aboutCopySize * 1.42,
                      letterSpacing: aboutCopySize * -0.025,
                    },
                  ]}
                >
                  {"I'm Karl, a developer passionate about bringing ideas to life through games, websites, and mobile apps. Game development is my main focus, but I'm versatile enough to adapt, solve problems, and deliver quality work across different development projects."}
                </Text>

                <View
                  style={[
                    styles.aboutDetails,
                    { flexDirection: isPhone ? "column" : "row" },
                  ]}
                >
                  <View style={{ flex: isPhone ? undefined : 1.2 }}>
                    <Text style={styles.detailTitle}>Tools I use</Text>
                    <View style={styles.toolGrid}>
                      {aboutTools.map((toolKey) => {
                        const tool = tools[toolKey];
                        return (
                          <Image
                            key={toolKey}
                            source={tool.source}
                            accessibilityLabel={tool.label}
                            style={styles.toolIcon}
                            resizeMode="contain"
                          />
                        );
                      })}
                    </View>
                  </View>

                  <View style={{ flex: isPhone ? undefined : 1 }}>
                    <Text style={styles.detailTitle}>Skills</Text>
                    <View style={{ paddingLeft: 18, rowGap: 8 }}>
                      {skills.map((skill) => (
                        <Text key={skill} style={styles.skillRow}>
                          • {skill}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <SiteFooter onBackToTop={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 0,
  },
  hero: {
    width: "100%",
    backgroundColor: colors.dark,
    overflow: "hidden",
  },
  heroTitle: {
    maxWidth: 980,
    alignSelf: "center",
    marginTop: 16,
    textAlign: "center",
    color: colors.light,
    fontWeight: "500",
  },
  heroTitleAccent: {
    color: "#bdb8af",
  },
  heroRule: {
    height: 1,
    alignSelf: "center",
    marginTop: 34,
    marginBottom: 24,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  heroCopy: {
    maxWidth: 660,
    alignSelf: "center",
    textAlign: "center",
    color: "#d3d0ca",
  },
  textLink: {
    alignSelf: "center",
    marginTop: 34,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.4)",
  },
  textLinkText: {
    color: colors.light,
    fontSize: 14.08,
  },
  eyebrowDark: {
    color: colors.ink,
    fontSize: 11.84,
    fontWeight: "700",
    letterSpacing: 1.66,
    textTransform: "uppercase",
  },
  sectionTitleDark: {
    marginTop: 8,
    color: colors.ink,
    fontWeight: "600",
  },
  aboutColumn: {
    flex: 1,
  },
  aboutCopy: {
    maxWidth: 720,
    color: colors.ink,
  },
  aboutDetails: {
    marginTop: 54,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    columnGap: 34,
    rowGap: 34,
  },
  detailTitle: {
    marginBottom: 16,
    color: colors.inkSoft,
    fontSize: 12.48,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  toolGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toolIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paperStrong,
  },
  skillRow: {
    color: "#3f3d39",
    fontSize: 16,
    lineHeight: 25.6,
  },
});
