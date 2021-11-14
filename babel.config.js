module.exports = {
  presets: [
    "@babel/react",
    [
      '@babel/preset-env', {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ]
};