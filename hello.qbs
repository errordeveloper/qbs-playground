import qbs 1.0
import qbs.TextFile

import "underscore-wrapper.js" as _

Project {
    property bool hasSpecialFeature: true
    Application {
        name: {
          return _.preprocess('test.metac');
        }

        Depends { name: 'cpp' }
        cpp.defines: ['SOMETHING']


        files: [
            "src/foo.h",
            "src/foo.cpp",
            //"src/test.cpp"
        ]

        /*
        Transformer {
            inputs: "src/test.metac"
            Artifact {
                fileName: "src/test.cpp"
                fileTags: "processed_file"
            }
            prepare: {
                var cmd = new JavaScriptCommand();
                cmd.description = "Processing '" + input.filePath + "'";
                cmd.highlight = "codegen";
                cmd.sourceCode = function() {
                    var file = new TextFile(input.filePath);
                    var content = file.readAll();
                    file.close()
                    content = content.replace("test1", "test2");
                    file = new TextFile(output.filePath, TextFile.WriteOnly);
                    file.truncate();
                    file.write(content);
                    file.close();
                }
                return cmd;
            }
        }
        */

        Group {
            condition: project.hasSpecialFeature
            prefix: "src/"
            files: ["specialfeature.cpp", "specialfeature.h"]
        }

        Group {
            cpp.defines: {
                var defines = outer.concat([
                    'HAVE_MAIN_CPP',
                    cpp.debugInformation ? '_DEBUG' : '_RELEASE'
                    ]);
                if (project.hasSpecialFeature)
                    defines.push("HAS_SPECIAL_FEATURE");
                return defines;
            }
            prefix: "src/"
            files: [
                'main.cpp'
            ]
        }
    }
}
