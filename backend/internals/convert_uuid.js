/**
 * Crediting original: https://www.npmjs.com/package/add-dashes-to-uuid
 * GitHub: https://github.com/timmyrs/add-dashes-to-uuid
 */
module.exports.toProper=i=>i.substr(0,8)+"-"+i.substr(8,4)+"-"+i.substr(12,4)+"-"+i.substr(16,4)+"-"+i.substr(20);