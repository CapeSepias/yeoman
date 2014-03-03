var util = require("util"),
    yeoman = require("yeoman-generator"),

    // ANSI Colours
    DEFAULT        = "\033[0m",
    GREEN          = "\033[0;32m",

    COMPONENT_PATH = "app/assets/javascripts/lib/components/",
    SPEC_PATH      = "spec/javascripts/lib/components/",
    FIXTURES_PATH  = "spec/javascripts/fixtures/";

var JavascriptComponentGenerator = module.exports = function JavascriptComponentGenerator() {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(JavascriptComponentGenerator, yeoman.generators.NamedBase);

JavascriptComponentGenerator.prototype.askFor = function askFor() {
  var cb = this.async(),
      prompts;

  console.log(this.yeoman);

  this.nameVar = this.name;
  this.constructorName = this.name[0].toUpperCase() + this.name.substr(1);

  prompts = [
    {
      type: "confirm",
      name: "fixtures",
      message: "Will you need fixtures for your spec?",
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.fixtures = props.fixtures;
    cb();
  }.bind(this));

};

JavascriptComponentGenerator.prototype.newFiles = function() {

  this.template("component.js", COMPONENT_PATH + this.nameVar + ".js");
  this.template("spec.js", SPEC_PATH + this.nameVar + "_spec.js");

  if (this.fixtures) {
    this.copy("fixtures.html", FIXTURES_PATH + this.nameVar + ".html");
    console.log(GREEN + this.nameVar + ".html has been created for you." + DEFAULT);
  }

  console.log(GREEN + this.nameVar + ".js has been created for you." + DEFAULT);
  console.log(GREEN + this.nameVar + "_spec.js has been created for you." + DEFAULT);

};
