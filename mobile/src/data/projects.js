// All content mirrors the original website 1:1. Every asset is bundled with
// require() so it works offline and on both Android and iOS.

const logoWord = require("../../assets/portfolio/images/KarlsonDevWORD.png");
const logoMark = require("../../assets/portfolio/images/LogoTransparent.png");

export const assets = {
  logoWord,
  logoMark,
  profilePhoto: require("../../assets/portfolio/NewImage/PremiumNigga.png"),
};

export const tools = {
  unity: { source: require("../../assets/portfolio/images/tools/unityLogo.png"), label: "Unity" },
  blender: { source: require("../../assets/portfolio/images/tools/blenderLogo.png"), label: "Blender" },
  flutter: { source: require("../../assets/portfolio/images/tools/flutterLogo.png"), label: "Flutter" },
  vscode: { source: require("../../assets/portfolio/images/tools/vscodeLogo.png"), label: "VS Code" },
  vscode22: {
    source: require("../../assets/portfolio/images/tools/vscode2022Logo.png"),
    label: "VS Code 2022",
  },
  github: { source: require("../../assets/portfolio/images/tools/github_icon.png"), label: "GitHub" },
  system: { source: require("../../assets/portfolio/NewImage/systemLOGO.png"), label: "System.io" },
  html: { source: require("../../assets/portfolio/NewImage/html5_logo.png"), label: "HTML" },
  css: { source: require("../../assets/portfolio/NewImage/css3_logo.png"), label: "CSS" },
  js: { source: require("../../assets/portfolio/NewImage/JSlogo.png"), label: "JavaScript" },
};

export const homeSlides = [
  {
    id: "codekey",
    type: "Game",
    title: "CodeKey",
    image: require("../../assets/portfolio/NewImage/codekeiBG.jpg"),
    gradient: ["#032234", "#04486f"],
  },
  {
    id: "hytale",
    type: "Mobile",
    title: "Hytale Companion",
    image: require("../../assets/portfolio/NewImage/HytaleCompanionTransparentSmalllogo.png"),
    gradient: ["#074b6d", "#aceba5"],
  },
  {
    id: "wellness",
    type: "Website",
    title: "'yourhealthinwellness' Website",
    image: require("../../assets/portfolio/NewImage/wellnessBG.png"),
    gradient: ["#586240", "#f6faca"],
  },
];

export const heroVideo = require("../../assets/portfolio/videos/PortfolioVid.mp4");

export const projectCategories = {
  games: {
    title: "My Game Projects",
    eyebrow: null,
    items: [
      {
        id: "codekey",
        type: "Game",
        title: "CodeKey",
        heading: "CodeKey",
        description:
          "A Collaborative projects where you battle your way through a neon-drenched cyberpunk world in this turn-based educational RPG. Solve and answer real programming challenges derived from C-based languages to unleash powerful attacks, defeat virus enemies, and recover the lost Core Libraries.",
        video: require("../../assets/portfolio/videos/Shortcodekeyvid.mp4"),
        logo: require("../../assets/portfolio/NewImage/codekeylogo.png"),
        tools: ["unity", "vscode22"],
      },
      {
        id: "tbegs",
        type: "Game",
        title: "TBEGS",
        heading: "TBEGS(in development)",
        description:
          "This game is still in development. A top down 2d turn based educational game, where players learn programming concepts through gameplay. Inspired from classic gameboy pokemon games like Emerald etc.",
        video: require("../../assets/portfolio/videos/Shorttbges.mp4"),
        logo: logoMark,
        tools: ["unity", "vscode22"],
      },
      {
        id: "the-ward",
        type: "Game",
        title: "The Ward",
        heading: "The Ward",
        description:
          "A very short mini horror game, designed for practice purposes on 3d environment design.",
        video: require("../../assets/portfolio/videos/newshortward.mp4"),
        logo: require("../../assets/portfolio/NewImage/Thewardlogo.jpg"),
        tools: ["unity", "blender", "vscode22"],
      },
      {
        id: "ninja-speed",
        type: "Game",
        title: "Ninja Speed",
        heading: "Ninja Speed",
        description:
          "My first game project, a fast-paced side-scrolling platformer featuring a ninja character.",
        video: require("../../assets/portfolio/videos/ninjashortvid.mp4"),
        logo: require("../../assets/portfolio/NewImage/ninjalogo.png"),
        tools: ["unity", "vscode22"],
      },
      {
        id: "flappy-remake",
        type: "Game",
        title: "Flappy Bird REMAKE",
        heading: "Flappy Bird REMAKE",
        description: "A modern take on the classic Flappy Bird game, built with Unity.",
        video: require("../../assets/portfolio/videos/newflappyshort.mp4"),
        logo: require("../../assets/portfolio/NewImage/flappyremakelogo.jpg"),
        tools: ["unity", "vscode22"],
      },
      {
        id: "recoil-rush",
        type: "Game",
        title: "Recoil Rush",
        heading: "Recoil Rush",
        description:
          "A fast-paced shooter game where players control a character with a powerful recoil mechanism.",
        video: require("../../assets/portfolio/videos/shortrecoilVId.mp4"),
        logo: require("../../assets/portfolio/NewImage/recoilLogo.png"),
        tools: ["unity", "vscode22"],
      },
    ],
  },
  web: {
    title: "My Website Projects",
    eyebrow: "Projects / Website",
    items: [
      {
        id: "albion-price-checker",
        type: "Website",
        title: "Albion Price Checker",
        heading: "Albion Price Checker",
        description: "A simple website for checking prices of items in the game Albion Online.",
        video: require("../../assets/portfolio/videos/albioncheckervid.mp4"),
        logo: require("../../assets/portfolio/NewImage/albioncheckerLogo.png"),
        tools: ["html", "css", "js", "vscode"],
      },
      {
        id: "wellness",
        type: "Website",
        title: "Wellness",
        heading: "Wellness",
        description:
          "A Commissioned website for a wellness brand, featuring a modern design and responsive layout using system.io",
        video: require("../../assets/portfolio/videos/wellnessshortvid.mp4"),
        logo: require("../../assets/portfolio/NewImage/wellnesLogo.png"),
        tools: ["html", "css", "system"],
      },
    ],
  },
  mobile: {
    title: "My Mobile Projects",
    eyebrow: null,
    items: [
      {
        id: "hytale-companion",
        type: "Mobile",
        title: "Hytale Companion",
        heading: "Hytale Companion",
        description:
          "Hytale companion is a wiki app for the game Hytale, providing players with information about characters, items, and locations.",
        video: require("../../assets/portfolio/videos/newhytaleshort.mp4"),
        logo: require("../../assets/portfolio/NewImage/HytaleCompanionTransparentSmalllogo.png"),
        tools: ["flutter", "vscode", "github"],
      },
    ],
  },
};

export const socialLinks = [
  {
    href: "https://github.com/KarlsonDevLock",
    label: "GitHub",
    icon: require("../../assets/portfolio/images/tools/github_icon.png"),
  },
  {
    href: "https://karlsondevlock.itch.io/",
    label: "itch.io",
    icon: require("../../assets/portfolio/images/tools/itchio_icon.png"),
  },
  {
    href: "https://www.facebook.com/profile.php?id=61578882082749",
    label: "Facebook",
    icon: require("../../assets/portfolio/images/tools/fbLogo.png"),
  },
  {
    href: "https://www.youtube.com/@Devlock21",
    label: "YT",
    icon: require("../../assets/portfolio/images/tools/YTLogo.png"),
  },
];

export const aboutTools = ["unity", "blender", "flutter", "vscode", "vscode22", "system"];

export const skills = [
  "Beginner 3D modeller",
  "Game development",
  "Responsive web design",
  "Mobile UI development",
];
