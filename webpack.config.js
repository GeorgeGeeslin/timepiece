var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{test: /\.(js)$/, use: 'babel-loader'},
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{test: /\.(jpe?g|png|gif|svg)$/i, use: [{'url-loader?limit=1000', 'img-loader'}]}
		]
	},
	devServer: {
		historyApiFallback: true,
		stats: "errors-only"
	},
	watchOptions: {
		ignored: /scss/
	},
	plugins: [new HtmlWebpackPlugin({
		template: './index.html'
	})]
};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	)
}

module.exports = config;