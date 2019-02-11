var webpack = require("webpack");
var path = require('path');
var fs = require('fs');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var extract_css = new MiniCssExtractPlugin({
	filename: "re-slide.css",
	chunkFilename: "re-slide-[id].css"
})


var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.(xml|html|txt|md|glsl|svg)$/, loader: "raw-loader" },
			{ test: /\.(less)$/, exclude: /^(https?:)?\/\//,use: [{loader: MiniCssExtractPlugin.loader},'css-loader','less-loader']},
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: [{loader: MiniCssExtractPlugin.loader},'css-loader'] },
			{ test: /\.(woff|woff2|eot|ttf|png)$/,loader: 'url-loader?limit=65000' }
		]
	},
	entry: {
		main: "./source/re-slide.coffee",
	},
	externals: ["react"],
	output: {
		filename: "re-slide.js",
		// library: 'Slide',
		libraryTarget: 'commonjs2'
	},
	plugins:[extract_css]
}
module.exports = cfg;