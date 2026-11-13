import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useFocusEffect } from "expo-router";

/**
 * Muted, looping, autoplaying video — the native equivalent of
 * <video autoplay muted loop playsinline>.
 *
 * Players are released automatically when the component unmounts, which is what
 * keeps the Games screen (6 videos) inside the device's decoder limit.
 */
export default function AutoplayVideo({
  source,
  style,
  contentFit = "cover",
  textureView = false,
  nativeControls = false,
}) {
  const player = useVideoPlayer(source, (instance) => {
    instance.loop = true;
    instance.muted = true;
    instance.play();
  });

  useFocusEffect(
    useCallback(() => {
      player.play();
      return () => player.pause();
    }, [player])
  );

  return (
    <VideoView
      player={player}
      style={[style, styles.fill]}
      contentFit={contentFit}
      nativeControls={nativeControls}
      // SurfaceView ignores rounded corners / clipping on Android;
      // TextureView is required for the cards' border radius.
      surfaceType={textureView ? "textureView" : "surfaceView"}
    />
  );
}

const styles = StyleSheet.create({
  // VideoView/Image are replaced elements: without an explicit 100% size they
  // fall back to the asset's intrinsic size instead of filling the container.
  fill: {
    width: "100%",
    height: "100%",
  },
});
