module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    karma: {
      unit: {
        configFile: "karma.conf.js"
      }
    },
    clean: ["dist"],
    jshint: {
      files: ["src/*.js"],
      options: grunt.file.readJSON(".jshintrc")
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: "dist/<%= pkg.name %>.map",
        banner: [
          "<%= pkg.name %>.js v<%= pkg.version %> by <%= pkg.author %>",
          "<%= pkg.repository.url %>",
          "Licenses: <%= pkg.license %>"
        ].join("\n")
      },
      dist: {
        files: {
          "dist/<%= pkg.name %>.min.js": "src/*.js"
        }
      }
    }
  });

  grunt.registerTask("coveralls", function() {
    var done = this.async();

    if (!process.env.CI) {
      console.log("Aborting coveralls. Not a CI environment!");
      done();
      return;
    }

    var path = grunt.file.expand("coverage/**/lcov.info")[0];

    exec("cat \"" + path + "\" | node_modules/coveralls/bin/coveralls.js", done);
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("test", ["jshint", "karma:unit", "coveralls"]);
  grunt.registerTask("package", ["clean", "uglify"]);
  grunt.registerTask("build", [
      "test",
      "package"
  ]);

  grunt.registerTask("default", ["build"]);
};
