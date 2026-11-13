import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, useLayout } from "../theme";
import { assets } from "../data/projects";

const projectLinks = [
  { path: "/projects/games", label: "Games" },
  { path: "/projects/web", label: "Website" },
  { path: "/projects/mobile", label: "Mobile" },
];

/**
 * The fixed site header.
 *  - variant "home"     -> wordmark + Home / Projects dropdown / About
 *  - variant "projects" -> same, plus a second row with category tabs
 *
 * The header is absolutely positioned above the screen content so it behaves
 * exactly like the original `position: fixed` bar.
 */
export default function SiteHeader({ variant = "home", active = "home", onSection }) {
  const insets = useSafeAreaInsets();
  const { width, isPhone, isTablet } = useLayout();
  const isProjects = variant === "projects";

  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ x: 16, y: 140 });
  const buttonRef = useRef(null);

  const baseHeight = isProjects ? (isPhone ? 148 : 126) : isTablet ? 70 : 78;
  const headerHeight = baseHeight + insets.top;
  const horizontalPadding = isTablet ? 16 : Math.max(24, (width - 1180) / 2);

  const pillHeight = isPhone ? 36 : 40;
  const pillPadding = isPhone ? 11 : 16;
  const pillFont = isPhone ? 11.52 : 13.44;

  useEffect(() => {
    if (!open) return undefined;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      setOpen(false);
      return true;
    });
    return () => subscription.remove();
  }, [open]);

  const goSection = (id) => {
    setOpen(false);
    if (onSection) {
      onSection(id);
      return;
    }
    // Reuse the existing Home screen when possible instead of stacking copies.
    router.navigate({ pathname: "/", params: { scrollTo: id } });
  };

  const openMenu = () => {
    buttonRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({ x, y: y + h + 8 });
      setOpen(true);
    });
  };

  const menuWidth = isPhone ? 150 : 180;
  const menuLeft = Math.max(8, Math.min(anchor.x, width - menuWidth - 8));

  return (
    <>
      <View
        style={[
          styles.bar,
          isProjects
            ? {
                minHeight: headerHeight,
                paddingTop: insets.top + 10,
                paddingBottom: 10,
                columnGap: 24,
              }
            : {
                height: headerHeight,
                paddingTop: insets.top,
                columnGap: isPhone ? 10 : 24,
                flexWrap: "nowrap",
              },
          { paddingHorizontal: horizontalPadding },
        ]}
      >
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="KarlDev home"
          onPress={() => goSection("home")}
          style={styles.brand}
        >
          <Image
            source={assets.logoWord}
            resizeMode="contain"
            style={{ width: isPhone ? 118 : isTablet ? 148 : 185, height: isPhone ? 31 : 38 }}
          />
        </Pressable>

        <View
          style={[
            styles.nav,
            { columnGap: isPhone ? 5 : 8 },
            isProjects && isPhone ? styles.navFullRow : null,
          ]}
        >
          <Pressable
            accessibilityRole="button"
            onPress={() => goSection("home")}
            style={({ pressed }) => [
              styles.pill,
              { minHeight: pillHeight, paddingHorizontal: pillPadding },
              active === "home" ? styles.pillActive : styles.pillIdle,
              pressed ? styles.pillPressed : null,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                { fontSize: pillFont },
                active === "home" ? styles.pillTextActive : styles.pillTextIdle,
              ]}
            >
              Home
            </Text>
          </Pressable>

          <Pressable
            ref={buttonRef}
            accessibilityRole="button"
            accessibilityState={{ expanded: open }}
            onPress={openMenu}
            style={({ pressed }) => [
              styles.pill,
              { minHeight: pillHeight, paddingHorizontal: pillPadding },
              styles.pillIdle,
              pressed ? styles.pillPressed : null,
            ]}
          >
            <Text style={[styles.pillText, { fontSize: pillFont }, styles.pillTextIdle]}>
              Projects
            </Text>
            <Text style={[styles.dropdownArrow, { fontSize: pillFont * 0.6 }, open && styles.dropdownArrowOpen]}>
              ▼
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => goSection("about")}
            style={({ pressed }) => [
              styles.pill,
              { minHeight: pillHeight, paddingHorizontal: pillPadding },
              styles.pillIdle,
              pressed ? styles.pillPressed : null,
            ]}
          >
            <Text style={[styles.pillText, { fontSize: pillFont }, styles.pillTextIdle]}>About</Text>
          </Pressable>
        </View>

        {isProjects && (
          <View style={[styles.tabs, { justifyContent: isPhone ? "flex-start" : "flex-end" }]}>
            {[
              { path: "/projects/games", label: "Games", key: "games" },
              { path: "/projects/mobile", label: "Mobile", key: "mobile" },
              { path: "/projects/web", label: "Website", key: "web" },
            ].map((tabLink) => (
              <Pressable
                key={tabLink.key}
                accessibilityRole="button"
                onPress={() => router.navigate(tabLink.path)}
                style={({ pressed }) => [
                  styles.pill,
                  styles.tabPill,
                  active === tabLink.key ? styles.pillActive : styles.pillIdle,
                  pressed ? styles.pillPressed : null,
                ]}
              >
                <Text
                  style={[
                    styles.pillText,
                    styles.tabText,
                    active === tabLink.key ? styles.pillTextActive : styles.pillTextIdle,
                  ]}
                >
                  {tabLink.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <Modal
        visible={open}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setOpen(false)}>
          <Pressable
            onPress={() => {}}
            style={[styles.menu, { left: menuLeft, top: anchor.y, minWidth: menuWidth }]}
          >
            {projectLinks.map((link, index) => (
              <Pressable
                key={link.path}
                accessibilityRole="menuitem"
                onPress={() => {
                  setOpen(false);
                  router.navigate(link.path);
                }}
                style={({ pressed }) => [
                  styles.menuItem,
                  index === 0 ? styles.menuItemFirst : null,
                  index === projectLinks.length - 1 ? styles.menuItemLast : null,
                  pressed ? styles.menuItemPressed : null,
                ]}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      styles.menuItemText,
                      { fontSize: isPhone ? 11.52 : 13.44 },
                      pressed ? styles.menuItemTextPressed : null,
                    ]}
                  >
                    {link.label}
                  </Text>
                )}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    elevation: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    rowGap: 10,
    backgroundColor: colors.headerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  brand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
  },
  navFullRow: {
    width: "100%",
    justifyContent: "flex-end",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: radius.pill,
  },
  pillIdle: {
    backgroundColor: "transparent",
    borderColor: colors.borderSoft,
  },
  pillActive: {
    backgroundColor: colors.navActiveBg,
    borderColor: "rgba(255,255,255,0.75)",
  },
  pillPressed: {
    backgroundColor: colors.navActiveBg,
    borderColor: "rgba(255,255,255,0.75)",
  },
  pillText: {
    fontWeight: "400",
  },
  pillTextIdle: {
    color: colors.navIdle,
  },
  pillTextActive: {
    color: colors.navActiveText,
  },
  dropdownArrow: {
    marginLeft: 4,
    color: colors.navIdle,
  },
  dropdownArrowOpen: {
    transform: [{ rotate: "180deg" }],
  },
  tabs: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  tabPill: {
    minHeight: 34,
    paddingHorizontal: 13,
  },
  tabText: {
    fontSize: 12.32,
  },
  modalBackdrop: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "rgba(10,10,10,0.92)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 16,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItemFirst: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  menuItemLast: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  menuItemPressed: {
    backgroundColor: colors.navActiveBg,
  },
  menuItemText: {
    color: colors.navIdle,
  },
  menuItemTextPressed: {
    color: colors.navActiveText,
  },
});
