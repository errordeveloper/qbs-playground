var _ = loadFile('underscore-min.js')._;

_.templateSettings = {
    interpolate: /\#\{\{(.+?)\}\}/g
};

_.extend(this, _);

this.preprocess = function(text, data) {
  return this.template(text, data);
}
