module.exports = {
   
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "script"
    },
    "rules": {
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-console": ["error",{
            "allow":["warn","error","info"]
        }]

    },
    "parser": "babel-eslint",
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true
    },
    
};