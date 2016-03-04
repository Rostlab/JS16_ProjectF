/* Not working yet */
var webpack = require('webpack');
module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },plugins: [
    new webpack.BannerPlugin("Copyright JSSeminar")
  ]
}
