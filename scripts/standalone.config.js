var webpack = require("webpack");
var path = require('path');
var fs = require('fs');
var cfg = {
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