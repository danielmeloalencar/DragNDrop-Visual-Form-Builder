const path = require('path')
var I18nPlugin = require("i18n-webpack-plugin");
var languages = {
    "en": null,
    "pt-BR": require("./src/pt-BR.json")
};

module.exports = Object.keys(languages).map(function(language) {
 return { 
   name: language,
   mode: 'production',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'v-assistant-builder-'+language+'.min.js',
    libraryTarget: 'umd',
    library: 'AssistantBuilder'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      
    ],
  },
  plugins: [
    new I18nPlugin(
        languages[language],
        {
          functionName:'TRS',
      }
    )
],
  devServer: {
    contentBase: [path.join(__dirname, 'example'), path.join(__dirname, 'lib')],
  },

}
});