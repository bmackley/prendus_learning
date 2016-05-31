module.exports = {
    entry: {
        'video-upload.component': './video-upload.component.ts'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'babel-loader?presets[]=es2015,presets[]=stage-3!ts',
                exclude: [ /node_modules/ ]
            }
        ]
    }
};
