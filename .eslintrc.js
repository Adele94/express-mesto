module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "parserOptions": {
        "ecmaVersion": 13
    },
    "rules": {
      "no-underscore-dangle": ["error",{"allow": [ "_id"]}]
    }
};
