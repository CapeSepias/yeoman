var util = require('util'),
    yeoman = require('yeoman-generator'),

    // ANSI Colours
    DEFAULT = "\033[0m",
    GREEN   = "\033[0;32m",
    RED     = "\033[0;31m",
    YELLOW  = "\033[1;33m",

    // Hooks
    HOOK       = "#===== yeoman hook =====#",
    HOOK_BEGIN = "#===== yeoman begin-hook =====#",
    HOOK_END   = "#===== yeoman end-hook =====#";

var StyleguideComponentGenerator = module.exports = function StyleguideComponentGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the styleguide_component subgenerator with the argument ' + this.name + '.');
};

util.inherits(StyleguideComponentGenerator, yeoman.generators.NamedBase);

StyleguideComponentGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
      name: 'description',
      message: 'Would you like to give a description (leave blank if not)?',
      default: ''
    },
    {
      type: 'confirm',
      name: 'stubs',
      message: 'Will you be needing to stub out some data?',
      default: true
    },
    {
      type: 'confirm',
      name: 'newGroup',
      message: 'Would you like to include this in a *new* group in the left nav?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.nameVar = this._.slugify(this.name).replace(/-/g, '_');
      this.description = props.description;
      this.stubs = props.stubs;
      this.stylesheetDir = props.stylesheetDir;
      this.newGroup = props.newGroup;

      cb();
    }.bind(this));
};

StyleguideComponentGenerator.prototype.newFiles = function() {
  this.copy('partial.html.haml', 'app/views/components/_'+this.nameVar+'.html.haml');
  this.copy('stylesheet.sass', 'app/assets/stylesheets/'+this.stylesheetDir+'/_'+this.nameVar+'.sass');
  this.template('styleguide-view.html.haml', 'app/views/styleguide/'+this.nameVar+'.html.haml');

  if (this.stubs) {
    this.template('stubs.yml', 'app/data/styleguide/'+this.nameVar+'_stubs.yml');
  }
};

StyleguideComponentGenerator.prototype.controller = function() {
  var path   = 'app/controllers/styleguide_controller.rb',
      file   = this.readFileAsString(path),
      insert = "def "+this.nameVar+"\n    render '/styleguide/"+this.nameVar+"'\n  end";

  if (file.indexOf(insert) === -1) {
    this.write(path, file.replace(HOOK, insert+'\n\n  '+HOOK));
  } else {
    console.log(YELLOW+"app/controllers/styleguide_controller.rb no change necessary."+DEFAULT);
  }
};

StyleguideComponentGenerator.prototype.helper = function( ) {
  var cb           = this.async();
      exists       = false,
      path         = 'app/helpers/styleguide_helper.rb',
      file         = this.readFileAsString(path),
      insert       = "{\n              name: \"Pagination\",\n              path: \"/styleguide/pagination\",\n              extra_style: \"nav__item--delimited\"\n            }",
      before       = file.split(HOOK_BEGIN)[0],
      after        = file.split(HOOK_END)[1],
      middle       = file.replace(before+HOOK_BEGIN, "").replace(HOOK_END+after, ""),
      groups       = JSON.parse(middle.replace(/\b([a-z-_]+)\:/gi, '"$1":')).groups, // That regex just wraps the keys in "" to make it valid JSON.
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
        return this.newGroup
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
            path: "/styleguide/"+this.nameVar,
            extra_style: "nav__item--delimited"
          }]
        });
      } else {
        groups[props.group].items.push({
          name: this.name.charAt(0).toUpperCase()+this.name.slice(1),
          path: "/styleguide/"+this.nameVar,
          extra_style: "nav__item--delimited"
        });
      }

      toWrite = before+HOOK_BEGIN+'\n    ';
      toWrite+= JSON.stringify({groups: groups}, null, 2).replace(/"([a-z-_]+)"\:/gi, '$1:').replace(/\n/g, '\n    ');
      toWrite+= '\n    '+HOOK_END+after;

      this.write(path, toWrite);

      cb();
    }.bind(this));

  }
};

StyleguideComponentGenerator.prototype.routes = function() {
  var path   = 'config/routes.rb',
      file   = this.readFileAsString(path),
      insert = "get 'styleguide/"+this.nameVar+"'        => 'styleguide#"+this.nameVar+"'";

  if (file.indexOf(insert) === -1) {
    this.write(path, file.replace(HOOK, insert+'\n  '+HOOK));
  }
};