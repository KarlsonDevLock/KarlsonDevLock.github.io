import { useEffect } from "react";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // expo-video's web <video> is absolutely positioned but keeps its intrinsic
  // size, which breaks `contentFit="cover"` in the browser preview. Native
  // platforms are unaffected; this only makes `npm run web` match the app.
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return undefined;
    const style = document.createElement("style");
    style.textContent = "video{width:100%;height:100%;}";
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0e0e0e" },
        }}
      />
    </SafeAreaProvider>
  );
}
