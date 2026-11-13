import { useWindowDimensions } from "react-native";

// Tokens copied from the original style.css :root variables.
export const colors = {
  ink: "#151515",
  inkSoft: "#5f5c57",
  paper: "#f1efea",
  paperStrong: "#faf9f6",
  line: "rgba(21,21,21,0.14)",
  dark: "#0e0e0e",
  light: "#f5f3ee",
  mutedLight: "#b7b3ac",

  pageDark: "#111111",
  headerBg: "rgba(10,10,10,0.82)",
  hairline: "rgba(255,255,255,0.12)",

  navIdle: "#d5d2cc",
  navActiveBg: "#f2f0eb",
  navActiveText: "#141414",

  glassPanel: "rgba(255,255,255,0.045)",
  glassCard: "rgba(10,10,10,0.54)",
  glassFooter: "rgba(12,12,12,0.58)",
  borderSoft: "rgba(255,255,255,0.18)",
  borderSofter: "rgba(255,255,255,0.12)",

  bodyMuted: "#b9b5ae",
  labelMuted: "#aaa69f",
  footerBg: "#101010",
  footerMuted: "#aaa69f",
  paperFrame: "#d7d3cb",
};

export const radius = {
  card: 24,
  panel: 30,
  small: 14,
  eighteen: 18,
  pill: 999,
};

export const rem = 16;

export const clamp = (min, value, max) => Math.min(Math.max(value, min), max);

/**
 * Mirrors the original breakpoints:
 *   <= 640px  phone rules
 *   <= 900px  tablet rules
 *   >  900px  desktop rules
 * and the .section-shell width: min(100% - 48px, 1180px)
 */
export function useLayout() {
  const { width, height } = useWindowDimensions();
  const isPhone = width < 640;
  const isTablet = width < 900;
  const gutter = isTablet ? 16 : 24;

  return {
    width,
    height,
    isPhone,
    isTablet,
    gutter,
    contentWidth: Math.min(width - gutter * 2, 1180),
  };
}

// Helpers for CSS em values used by the original stylesheet.
export const em = (size, value) => size * value;
