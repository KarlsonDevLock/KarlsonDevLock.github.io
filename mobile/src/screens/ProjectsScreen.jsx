import { useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ProjectShowcase from "../components/ProjectShowcase";
import { clamp, colors, useLayout } from "../theme";
import { projectCategories } from "../data/projects";

export default function ProjectsScreen({ category }) {
  const insets = useSafeAreaInsets();
  const { width, contentWidth, isPhone } = useLayout();
  const listRef = useRef(null);

  const data = projectCategories[category];
  const headerHeight = (isPhone ? 148 : 126) + insets.top;
  const introSize = clamp(35.2, width * 0.05, 76.8);

  return (
    <View style={styles.screen}>
      {/* Approximation of the page's radial highlight (expo doesn't do radial). */}
      <View
        pointerEvents="none"
        style={{ position: "absolute", left: 0, right: 0, top: headerHeight, height: width * 0.6 }}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0)"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>

      <SiteHeader variant="projects" active={category} />

      <FlatList
        ref={listRef}
        data={data.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: headerHeight }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        removeClippedSubviews
        ListHeaderComponent={
          <View
            style={{
              width: contentWidth,
              alignSelf: "center",
              paddingTop: isPhone ? 74 : 100,
              paddingBottom: isPhone ? 56 : 82,
            }}
          >
            {data.eyebrow ? <Text style={styles.introEyebrow}>{data.eyebrow}</Text> : null}
            <Text
              style={[
                styles.introTitle,
                {
                  fontSize: introSize,
                  lineHeight: introSize * 0.96,
                  letterSpacing: introSize * -0.055,
                },
              ]}
            >
              {data.title}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <ProjectShowcase project={item} index={index} reverse={index % 2 === 1} />
        )}
        ListFooterComponent={
          <SiteFooter
            compact
            onBackToTop={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.pageDark,
  },
  introEyebrow: {
    color: colors.light,
    fontSize: 11.84,
    fontWeight: "700",
    letterSpacing: 1.66,
    textTransform: "uppercase",
  },
  introTitle: {
    marginTop: 8,
    color: colors.light,
    fontWeight: "600",
  },
});
