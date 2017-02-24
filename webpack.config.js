
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {

	entry: {
				
				lib:['./node_modules/jquery/dist/jquery.min.js',
					 './node_modules/bootstrap/dist/js/bootstrap.min.js'],
				app: ['./grid.js']
				
			},
	output: {
		path: '/',
		filename: '[name].finalbundle.js'
	},
	module:{
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
			  presets: ['es2015', 'react']
			}
		}]

	},
	plugins: [
		new webpack.ProvidePlugin({
	    	'ReactDOM':   'react-dom',
	    	'React':     'react',
	    	'$': 'jquery',
	    	'jQuery': 'jquery',
	    	'jquery': 'jquery'
	    	
	  	}),
		new HtmlWebpackPlugin({  // Also generate a test.html
	      
	      template: 'template/build.html'
	    })
	]
};