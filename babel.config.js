module.exports = {
  presets: [
    "@babel/react",
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
      },
    ],
    "@babel/preset-typescript",
  ],
};
