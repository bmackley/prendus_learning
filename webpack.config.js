module.exports = {
    entry: {
        'prendus-video.component': './app/client/components/video/prendus-video.component.ts',
        'app-element': './app/client/components/app-element/app-element.ts',
        'sign-in': './app/client/components/sign-in/sign-in.ts',
        'course-element': './app/client/components/course-element/course-element.ts'
    },
    output: {
        path: './app/client/dist',
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
