module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-properties')({
      preserve: false, // Set to false to replace the variables with their values
    }),
    require('autoprefixer'),
  ],
};
