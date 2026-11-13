// Files in /public are referenced at runtime. Prefixing with BASE_URL keeps
// them working when the build is hosted under a sub-path (GitHub Pages).
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
