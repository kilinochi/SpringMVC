var path = require('path');

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/main/resources/static/scripts')
    }
};
