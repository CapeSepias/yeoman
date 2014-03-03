var util = require("util"),
    yeoman = require("yeoman-generator"),

    // ANSI Colours
    DEFAULT = "\033[0m",
    RED     = "\033[0;31m",
    YELLOW  = "\033[1;33m",

    // Hooks
    R_HOOK       = "#===== yeoman hook =====#",
    R_HOOK_BEGIN = "#===== yeoman begin-hook =====#",
    R_HOOK_END   = "#===== yeoman end-hook =====#";

var StyleguideComponentGenerator = module.exports = function StyleguideComponentGenerator() {
  // By calling `NamedBase` here, we get the argument to the subgenerator call as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log("You called the styleguide_component subgenerator with the argument " + this.name + ".");
};

util.inherits(StyleguideComponentGenerator, yeoman.generators.NamedBase);

StyleguideComponentGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: "description",
    message: "Would you like to give a description (leave blank if not)?",
    default: ""
  },
  {
    type: "confirm",
    name: "stubs",
    message: "Will you be needing to stub out some data?",
    default: true
  },
  {
    type: "list",
    name: "componentType",
    message: "Choose the component type",
    choices: [
      "JS Components",
      "UI Components"
    ],
    default: 0
  },
  {
    type: "confirm",
    name: "newGroup",
    message: "Would you like to include this in a *new* group in the left nav?",
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.nameVar = this._.slugify(this.name).replace(/-/g, "_");
    this.description = props.description;
    this.stubs = props.stubs;
    this.stylesheetDir = props.stylesheetDir;
    this.newGroup = props.newGroup;
    this.componentType = this._.slugify(props.componentType).replace(/-/g, "_");

    cb();
  }.bind(this));
};

StyleguideComponentGenerator.prototype.newFiles = function() {
  this.copy("partial.html.haml", "app/views/components/_"+this.nameVar+".html.haml");
  this.copy("stylesheet.sass", "app/assets/stylesheets/components/_"+this.nameVar+".sass");
  this.template("styleguide-view.html.haml", "app/views/styleguide/"+this.componentType+"/"+this.nameVar+".html.haml");

  if (this.stubs) {
    this.template("stubs.yml", "app/data/styleguide/"+this.nameVar+"_stubs.yml");
  }
};

StyleguideComponentGenerator.prototype.controller = function() {
  var path   = "app/controllers/styleguide_controller.rb",
      file   = this.readFileAsString(path),
      insert = "def "+this.nameVar+"\n    render '/styleguide/"+this.componentType+"/"+this.nameVar+"'\n  end";

  if (file.indexOf(insert) === -1) {
    this.write(path, file.replace(R_HOOK, insert + "\n\n  "+R_HOOK));
  } else {
    console.log(YELLOW+"app/controllers/styleguide_controller.rb no change necessary."+DEFAULT);
  }
};

StyleguideComponentGenerator.prototype.helper = function( ) {
  var cb           = this.async(),
      exists       = false,
      path         = "app/helpers/styleguide_helper.rb",
      file         = this.readFileAsString(path),
      before       = file.split(R_HOOK_BEGIN)[0],
      after        = file.split(R_HOOK_END)[1],
      middle       = file.replace(before+R_HOOK_BEGIN, "").replace(R_HOOK_END+after, "").replace(/\b([a-z-_]+)\:/gi, "\"$1\":"), // That regex just wraps the keys in "" to make it valid JSON.
      navItems     = JSON.parse(middle),
      groups       = eval("navItems." + this.componentType),
      groupChoices = [];

  groups.forEach(function(group, i) {
    if (group.title === this.name) {
      console.log(RED+"This item already exists in the left nav."+DEFAULT);
      cb();
      exists = true;
      return false;
    }

    groupChoices.push({
      name: group.title,
      value: ""+i
    });
  });

  if (!exists) {

    this.prompt([{
      type: "input",
      name: "newGroupName",
      message: "What would you like to call the new group?",
      default: "New Group",
      when: function() {
        return this.newGroup;
      }.bind(this)
    },
    {
      type: "list",
      name: "group",
      message: "Which group should this go in in the left nav?",
      choices: groupChoices,
      default: 0,
      when: function() {
        return !this.newGroup;
      }.bind(this)
    }], function (props) {
      var toWrite = "";

      if (this.newGroup) {
        groups.push({
          title: props.newGroupName,
          items: [{
            name: this.name.charAt(0).toUpperCase()+this.name.slice(1),
            path: this.nameVar
          }]
        });
      } else {
        groups[props.group].items.push({
          name: this.name.charAt(0).toUpperCase()+this.name.slice(1),
          path: this.nameVar
        });
      }

      // Update navItems with the updated section.
      eval("navItems." + this.componentType + " = groups");

      toWrite = before+R_HOOK_BEGIN + "\n    ";
      toWrite+= JSON.stringify(navItems, null, 2).replace(/"([a-z-_]+)"\:/gi, "$1:").replace(/\n/g, "\n    ");
      toWrite+= "\n    " + R_HOOK_END + after;

      this.write(path, toWrite);

      cb();
    }.bind(this));

  }
};

StyleguideComponentGenerator.prototype.routes = function() {
  var path   = "config/routes.rb",
      file   = this.readFileAsString(path),
      insert = "get 'styleguide/" + this.nameVar + "'        => 'styleguide#" + this.nameVar + "'";

  if (file.indexOf(insert) === -1) {
    this.write(path, file.replace(R_HOOK, insert + "\n  " + R_HOOK));
  }
};
