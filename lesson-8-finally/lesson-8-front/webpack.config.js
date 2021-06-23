const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/script.js',
    output: {
        filename: './build.js',
    },
    // watch for changes
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000 // порверяем измемения раз в секунду
    }, 
    // second case for auto register changes
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
    },
};


