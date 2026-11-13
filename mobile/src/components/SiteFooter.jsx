import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, useLayout } from "../theme";
import { assets, socialLinks } from "../data/projects";

export default function SiteFooter({ compact = false, onBackToTop }) {
  const insets = useSafeAreaInsets();
  const { width, isPhone, isTablet, contentWidth } = useLayout();
  const markWidth = Math.min(260, width * 0.62);

  return (
    <View style={[styles.footer, { paddingTop: compact ? 28 : 70, paddingBottom: 24 + insets.bottom }]}>
      {!compact && (
        <View
          style={{
            width: contentWidth,
            alignSelf: "center",
            flexDirection: isTablet ? "column" : "row",
            alignItems: isTablet ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Back to top"
            onPress={onBackToTop}
            style={{ width: markWidth }}
          >
            <Image
              source={assets.logoMark}
              style={{ width: "100%", height: 150 }}
              resizeMode="contain"
            />
          </Pressable>

          <View
            style={{
              alignItems: isTablet ? "flex-start" : "flex-end",
              minWidth: Math.min(width - 32, 310),
            }}
          >
            <Text style={styles.eyebrow}>Follow / Contact me</Text>
            <View
              style={[
                styles.socialRow,
                { justifyContent: isTablet ? "flex-start" : "flex-end" },
              ]}
            >
              {socialLinks.map((link) => (
                <Pressable
                  key={link.label}
                  accessibilityRole="link"
                  accessibilityLabel={link.label}
                  onPress={() => Linking.openURL(link.href).catch(() => {})}
                  style={({ pressed }) => [styles.socialButton, pressed ? styles.socialButtonPressed : null]}
                >
                  <Image source={link.icon} style={styles.socialIcon} resizeMode="contain" />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}

      <View
        style={{
          width: contentWidth,
          alignSelf: "center",
          marginTop: compact ? 0 : 58,
          paddingTop: 18,
          borderTopWidth: 1,
          borderTopColor: colors.hairline,
          flexDirection: isPhone ? "column" : "row",
          alignItems: isPhone ? "flex-start" : "center",
          justifyContent: "space-between",
          rowGap: 8,
        }}
      >
        <Text style={styles.footerBottomText}>© 2026 KarlDev</Text>
        <Pressable accessibilityRole="link" onPress={onBackToTop}>
          {({ pressed }) => (
            <Text style={[styles.footerBottomText, pressed ? styles.footerBottomTextPressed : null]}>
              {compact ? "Home ↗" : "Back to top ↑"}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    backgroundColor: colors.footerBg,
  },
  eyebrow: {
    color: colors.light,
    fontSize: 11.84,
    fontWeight: "700",
    letterSpacing: 1.66,
    textTransform: "uppercase",
  },
  socialRow: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  socialButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  socialButtonPressed: {
    backgroundColor: colors.paper,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  footerBottomText: {
    color: colors.footerMuted,
    fontSize: 12.48,
  },
  footerBottomTextPressed: {
    color: "#ffffff",
  },
});
