var _ = loadFile('underscore-min.js')._,
var meta = loadFile('meta.js');

_.templateSettings = meta.patterns;

_.extend(this, _);

this.preprocess = function(input, output) {
    var file = new TextFile(input.filePath);
    var result = this.template(file.readAll(), meta.language);
    file.close();
    file = new TextFile(output.filePath, TextFile.WriteOnly);
    file.truncate();
    file.write(result);
    file.close();
}
