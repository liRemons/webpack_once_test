const schema = require('./schema.json')

const bannerLoader = function (content) {
  const options = this.getOptions(schema)
  const prefix = `
    /*
    * Author: ${options.author}
    */
  `;

  return prefix + content
}

module.exports = bannerLoader
