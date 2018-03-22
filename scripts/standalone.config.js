var webpack = require("webpack");
var path = require('path');
var fs = require('fs');
var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.(xml|html|txt|md|glsl)$/, loader: "raw-loader" },
			{ test: /\.(less)$/, use: ['style-loader','css-loader','less-loader'] },
			{ test: /\.(css)$/, use: ['style-loader','css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=65000' }
		]
	},
	entry: {
		main: "./source/preact-slide.coffee",
	},
	externals: ["preact"],
	output: {
		filename: "preact-slide.js",
		library: 'Slide',
		libraryTarget: 'umd'
	}
}
module.exports = cfg;