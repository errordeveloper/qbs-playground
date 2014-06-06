var _ = loadFile('underscore-min.js')._;
var meta = loadFile('meta.js');

_.templateSettings = meta.patterns;

_.extend(this, _);

this.preprocess = function(name) {
  var file = new TextFile(name);
  var result = this.template(file.readAll(), meta.language);
  file.close();
  return result;
}
