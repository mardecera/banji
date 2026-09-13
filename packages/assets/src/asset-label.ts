export const assetLabel = (filename: string): string =>
  filename.replace(/\.svg$/i, "").replace(/[-_]/g, " ");
