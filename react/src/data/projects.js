export const tools = {
  unity: { src: "assets/images/tools/unityLogo.png", label: "Unity" },
  blender: { src: "assets/images/tools/blenderLogo.png", label: "Blender" },
  vscode: { src: "assets/images/tools/vscodeLogo.png", label: "VS Code" },
  vscode22: { src: "assets/images/tools/vscode2022Logo.png", label: "VS Code 2022" },
  flutter: { src: "assets/images/tools/flutterLogo.png", label: "Flutter" },
  github: { src: "assets/images/tools/github_icon.png", label: "GitHub" },
  system: { src: "assets/NewImage/systemLOGO.png", label: "System.io" },
  html: { src: "assets/NewImage/html5_logo.png", label: "HTML" },
  css: { src: "assets/NewImage/css3_logo.png", label: "CSS" },
  js: { src: "assets/NewImage/JSlogo.png", label: "JavaScript" },
};

export const homeSlides = [
  {
    id: "codekey",
    type: "Game",
    title: "CodeKey",
    image: "assets/NewImage/codekeiBG.jpg",
    gradient: "linear-gradient(135deg, #032234, #04486f)",
  },
  {
    id: "hytale",
    type: "Mobile",
    title: "Hytale Companion",
    image: "assets/NewImage/HytaleCompanionTransparentSmalllogo.PNG",
    gradient: "linear-gradient(135deg, #074b6d, #aceba5)",
  },
  {
    id: "wellness",
    type: "Website",
    title: "'yourhealthinwellness' Website",
    image: "assets/NewImage/wellnessBG.png",
    gradient: "linear-gradient(135deg, #586240, #f6faca)",
  },
];

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
        video: "assets/videos/Shortcodekeyvid.mp4",
        logo: "assets/NewImage/codekeylogo.png",
        tools: ["unity", "vscode22"],
      },
      {
        id: "tbegs",
        type: "Game",
        title: "TBEGS",
        heading: "TBEGS(in development)",
        description:
          "This game is still in development. A top down 2d turn based educational game, where players learn programming concepts through gameplay. Inspired from classic gameboy pokemon games like Emerald etc.",
        video: "assets/videos/Shorttbges.mp4",
        logo: "assets/images/LogoTransparent.png",
        tools: ["unity", "vscode22"],
      },
      {
        id: "the-ward",
        type: "Game",
        title: "The Ward",
        heading: "The Ward",
        description:
          "A very short mini horror game, designed for practice purposes on 3d environment design.",
        video: "assets/videos/newshortward.mp4",
        logo: "assets/NewImage/Thewardlogo.jpg",
        tools: ["unity", "blender", "vscode22"],
      },
      {
        id: "ninja-speed",
        type: "Game",
        title: "Ninja Speed",
        heading: "Ninja Speed",
        description:
          "My first game project, a fast-paced side-scrolling platformer featuring a ninja character.",
        video: "assets/videos/ninjashortvid.mp4",
        logo: "assets/NewImage/ninjalogo.png",
        tools: ["unity", "vscode22"],
      },
      {
        id: "flappy-remake",
        type: "Game",
        title: "Flappy Bird REMAKE",
        heading: "Flappy Bird REMAKE",
        description: "A modern take on the classic Flappy Bird game, built with Unity.",
        video: "assets/videos/newflappyshort.mp4",
        logo: "assets/NewImage/flappyremakelogo.jpg",
        tools: ["unity", "vscode22"],
      },
      {
        id: "recoil-rush",
        type: "Game",
        title: "Recoil Rush",
        heading: "Recoil Rush",
        description:
          "A fast-paced shooter game where players control a character with a powerful recoil mechanism.",
        video: "assets/videos/shortrecoilVId.mp4",
        logo: "assets/NewImage/recoilLogo.png",
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
        description:
          "A simple website for checking prices of items in the game Albion Online.",
        video: "assets/videos/albioncheckervid.mp4",
        logo: "assets/NewImage/albioncheckerLogo.png",
        tools: ["html", "css", "js", "vscode"],
      },
      {
        id: "wellness",
        type: "Website",
        title: "Wellness",
        heading: "Wellness",
        description:
          "A Commissioned website for a wellness brand, featuring a modern design and responsive layout using system.io",
        video: "assets/videos/wellnessshortvid.mp4",
        logo: "assets/NewImage/wellnesLogo.png",
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
        video: "assets/videos/newhytaleshort.mp4",
        logo: "assets/NewImage/HytaleCompanionTransparentSmalllogo.PNG",
        tools: ["flutter", "vscode", "github"],
      },
    ],
  },
};

export const socialLinks = [
  {
    href: "https://github.com/KarlsonDevLock",
    label: "GitHub",
    icon: "assets/images/tools/github_icon.png",
  },
  {
    href: "https://karlsondevlock.itch.io/",
    label: "itch.io",
    icon: "assets/images/tools/itchio_icon.png",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61578882082749",
    label: "Facebook",
    icon: "assets/images/tools/fbLogo.png",
  },
  {
    href: "https://www.youtube.com/@Devlock21",
    label: "YT",
    icon: "assets/images/tools/YTLogo.png",
  },
];
