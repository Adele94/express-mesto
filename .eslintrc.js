module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends":  [
        "plugin:react/recommended",
        "google",
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "no-underscore-dangle": ["error", {"allow": "_id"}]
    }
};
