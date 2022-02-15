module.exports = {
  extends: "airbnb",
  plugins: ["react-native", "jsx-a11y", "import"],
  env: {
    es6: true,
    "react-native/react-native": true
  },
  parser: "babel-eslint",
  ecmaFeatures: {
    jsx: true
  },
  rules: {
    "react/jsx-filename-extension": 0,
    "no-underscore-dangle": 0
  }
};
