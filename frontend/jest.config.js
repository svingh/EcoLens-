// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-leaflet|@react-leaflet|leaflet)/)"
  ],
  moduleNameMapper: {
    "react-leaflet": "<rootDir>/mocks/reactLeafletMock.js", // Add this line
    "\\.(css|scss)$": "identity-obj-proxy",
    "^leaflet$": "leaflet/dist/leaflet.js"
  },
};

  