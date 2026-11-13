import { asset } from "../lib/asset.js";

export default function ProfileFrame() {
  return (
    <div
      aria-label="Profile image slideshow"
      className="relative aspect-square w-[min(100%,420px)] justify-self-center overflow-hidden rounded-full border border-line bg-[#d7d3cb] max-[900px]:w-[min(68vw,360px)]"
    >
      <img
        className="profile-photo absolute inset-0 h-full w-full object-cover"
        src={asset("assets/NewImage/PremiumNigga.png")}
        alt="Profile photo placeholder"
      />
      <img
        className="profile-logo absolute inset-0 h-full w-full"
        src={asset("assets/images/LogoTransparent.png")}
        alt="KarlDev logo"
      />
    </div>
  );
}
