var _ = loadFile('underscore-min.js')._,

//_.templateSettings = {
//  interpolate: /\{\{(.+?)\}\}/g
//};

this.language = {
  first: "Foo",
  second: "Baz",
  x: function(a) {
    return a;
  },
  a: [1, 2, 3],

  system_include: function() {
      return _.template(
        "// system headers<% _.each(headers, function(header) { %>\n#include <<%= header %>><% }); %>"
      , {headers: arguments});
  },
  local_include: function() {
      return _.template(
        "// local headers<% _.each(headers, function(header) { %>\n#include \"<%= header %>\"<% }); %>"
      , {headers: arguments});
  },
};

this.patterns = {
    interpolate: /\#\{\{(.+?)\}\}/g
};
