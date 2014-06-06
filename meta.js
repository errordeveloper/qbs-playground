var _ = loadFile('underscore-min.js')._;
//var _ = require('./underscore-min.js');

// The idea is that this syntax is a bit shorter then ERB-style
this.patterns = {
    evaluate    : /%([\s\S]+?)%/g,
    interpolate : /%=([\s\S]+?)%/g,
    escape      : /%-([\s\S]+?)%/g
};

_.templateSettings = this.patterns;

this.language = {
  first: "Foo",
  second: "Baz",
  x: function(a) {
    return a;
  },
  a: [1, 2, 3],

  system_include: function() {
      return _.template(
        "// system headers% _.each(headers, function(header) { %\n#include <%= header %>% }); %"
      , {headers: arguments});
  },
  local_include: function() {
      return _.template(
        "// local headers% _.each(headers, function(header) { %\n#include \"%= header %\"% }); %"
      , {headers: arguments});
  },
  check: function(func, cond) {
      var _code = [];
      var code = "";

      _code = [
        "error_t retval = %= func %;",
        "if( retval == %= cond.okay % )",
        "{",
        "    %= cond.whenOkay %",
        "}",
      ];

      code = _.template(_code.join('\n'), {func: func, cond: cond});

      _code = [
        //"%= _.each(cond.onErrors, function(v, k, l) { return 'else if ( retval ==' +k  +')\n' } %",
      //"else if ( retval == %= k % )",
      //  "{",
      //  "    error(\"%= v.message %\");",
      //  "  % if( v.call != undefined ) %",
      //  "    %= v.call %;",
      //  "  % if( v.goto != undefined ) %",
      //  "    goto %= v.goto %;",
        //"% }); %",
      ];
      code += _.template(_code.join('\n'));

      return ["{", code, "}"].join('\n');
  },
};
