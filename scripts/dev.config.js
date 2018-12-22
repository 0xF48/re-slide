var webpack = require("webpack");
var path = require("path");
var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.glsl$/, use: "glsl-template-loader" },
			{ test: /\.(xml|html|txt|md)$/, loader: "raw-loader" },
			{ test: /\.(less)$/, use: ['style-loader','css-loader','less-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=65000' }
		]
	},
	entry: {
		// main: "./source/site.coffee",
		main: "./source/test.coffee"
	},
	resolve: {
		// "modules": [__dirname+"/node_modules"],
	},
	output: {
		path: path.join(__dirname,'..','/site/'),
		publicPath: '/site/',
		filename: "[name].js"
	},
	devServer: {
		port: 2998
	}
}
module.exports = cfg;