import { Image, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import AutoplayVideo from "./AutoplayVideo";
import { clamp, colors, radius, useLayout } from "../theme";
import { tools } from "../data/projects";

/**
 * One project row: media card + description panel.
 * `reverse` swaps the columns on wide layouts, exactly like .reverse on the site.
 */
export default function ProjectShowcase({ project, index, reverse }) {
  const { width, contentWidth, isPhone, isTablet } = useLayout();
  const isRow = !isTablet;

  const panelTitleSize = clamp(28.8, width * 0.03, 48);

  const media = (
    <View
      style={[
        styles.mediaCard,
        { minHeight: isPhone ? 390 : 460 },
        isRow ? styles.mediaFlex : null,
      ]}
    >
      <AutoplayVideo source={project.video} style={StyleSheet.absoluteFill} textureView />

      <View
        style={[
          styles.mediaFooter,
          {
            left: isPhone ? 10 : 16,
            right: isPhone ? 10 : 16,
            bottom: isPhone ? 10 : 16,
            gap: isPhone ? 12 : 18,
            padding: isPhone ? 12 : 14,
          },
        ]}
      >
        <BlurView intensity={16} tint="dark" style={StyleSheet.absoluteFill} pointerEvents="none" />
        <Image
          source={project.logo}
          style={{ width: isPhone ? 68 : 88, height: isPhone ? 44 : 52, borderRadius: 10 }}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.type}>{project.type}</Text>
          <Text
            style={[
              styles.mediaTitle,
              {
                fontSize: clamp(16.8, width * 0.02, 24.8),
                letterSpacing: clamp(16.8, width * 0.02, 24.8) * -0.025,
              },
            ]}
            numberOfLines={2}
          >
            {project.title}
          </Text>
        </View>
      </View>
    </View>
  );

  const panel = (
    <View style={isRow ? styles.panel : styles.panelStacked}>
      <Text style={styles.eyebrow}>{String(index + 1).padStart(2, "0")}</Text>
      <Text
        style={[
          styles.heading,
          {
            fontSize: panelTitleSize,
            lineHeight: panelTitleSize,
            letterSpacing: panelTitleSize * -0.045,
          },
        ]}
      >
        {project.heading}
      </Text>
      <Text style={styles.description}>{project.description}</Text>

      <View style={styles.toolsBlock}>
        <Text style={styles.toolsLabel}>Tools</Text>
        <View style={styles.toolsRow}>
          {project.tools.map((toolKey) => {
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
    </View>
  );

  return (
    <View
      style={[
        styles.card,
        {
          width: contentWidth,
          flexDirection: isRow ? "row" : "column",
          gap: clamp(28, width * 0.06, 76),
          padding: isPhone ? 14 : 34,
          borderRadius: isPhone ? 22 : radius.panel,
        },
      ]}
    >
      {isRow && reverse ? (
        <>
          {panel}
          {media}
        </>
      ) : (
        <>
          {media}
          {panel}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    marginBottom: 44,
    alignItems: "stretch",
    borderWidth: 1,
    borderColor: colors.borderSofter,
    backgroundColor: colors.glassPanel,
    overflow: "hidden",
  },
  mediaCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.11)",
    backgroundColor: "#171717",
  },
  mediaFlex: {
    flex: 1.45,
  },
  mediaFooter: {
    position: "absolute",
    minHeight: 104,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.eighteen,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: colors.glassFooter,
    overflow: "hidden",
  },
  type: {
    color: colors.labelMuted,
    fontSize: 10.88,
    fontWeight: "700",
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  mediaTitle: {
    color: colors.light,
    fontWeight: "500",
    marginTop: 3,
  },
  panel: {
    flex: 0.75,
    justifyContent: "center",
    padding: 26,
  },
  panelStacked: {
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  eyebrow: {
    color: colors.light,
    fontSize: 11.84,
    fontWeight: "700",
    letterSpacing: 1.66,
    textTransform: "uppercase",
  },
  heading: {
    color: colors.light,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 16,
  },
  description: {
    color: colors.bodyMuted,
    fontSize: 16,
    lineHeight: 25.6,
  },
  toolsBlock: {
    marginTop: 34,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.11)",
  },
  toolsLabel: {
    color: colors.labelMuted,
    fontSize: 10.88,
    fontWeight: "700",
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  toolsRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toolIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: colors.borderSofter,
    backgroundColor: "#efede8",
  },
});
