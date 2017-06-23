import fs from 'fs';

const REPLACER = '</head>';

export default class StatisticInjectorWebpackPlugin {
  constructor(inOptions){
    this.options =  Object.assign({
      callback: (inHtml,inString)=>{
        return inHtml.replace(REPLACER,`${inString}${REPLACER}`);
      }
    },inOptions);
  }

  apply(compiler){
    const { path } = this.options;
    const statisString = fs.readFileSync( path , 'utf8');
    compiler.plugin('compilation',function(compilation){
      compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        htmlPluginData.html = this.options.callback(htmlPluginData.html, statisString);
        callback(null, htmlPluginData);
      });
    });
  }
}
