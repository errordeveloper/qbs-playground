import qbs 1.0
import qbs.TextFile

import "underscore-wrapper.js" as _

Project {
    property bool hasSpecialFeature: true
    Application {
        name: 'metac'

        Depends { name: 'cpp' }
        cpp.defines: ['SOMETHING']


        files: [
            "src/foo.h",
            "src/foo.cpp",
            "src/test.metac"
        ]

        Transformer {
            inputs: "src/test.metac"
            Artifact {
                fileName: "test.cpp"
                fileTags: "processed_file"
            }
            prepare: {
                var cmd = new JavaScriptCommand();
                cmd.description = "Processing '" + input.filePath + "'";
                cmd.highlight = "codegen";
                cmd.sourceCode = function() {
                    _.preprocess(input, output);
                }
                return cmd;
            }
        }

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
