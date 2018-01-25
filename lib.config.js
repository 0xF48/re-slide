var webpack = require("webpack");
var cfg = {
	module: {
		loaders: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.glsl$/, use: "glsl-template-loader" },
			{ test: /\.(scss|less)$/, use: ['style-loader','css-loader','sass-loader'] }
		]
	},
	entry: {
		main: "preact-slide.coffee",
	},
	resolve: {
		"modules": ["node_modules"],
	},
	output: {
		path: 'static',
		filename: "index.js",
		library: 'Slide',
		libraryTarget: 'umd'
	}
}
module.exports = cfg;