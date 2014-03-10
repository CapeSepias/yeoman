// ------------------------------------------------------------------------------
//
// <%= constructorName %>
//
// ------------------------------------------------------------------------------

define([ "jquery" ], function($) {

  "use strict";

  // @args = {}
  // el: {string} selector for parent element
  var <%= constructorName %> = function(args) {
    this.$listener = $("#js-row--content" || args.$listener);
    this.$el = $(args.el);
    this.$el && this.init();
  }, _this;

  <%= constructorName %>.prototype.init = function() {
    _this = this;
    this.listen();
    this.broadcast();
  };

  // -------------------------------------------------------------------------
  // Subscribe to Events
  // -------------------------------------------------------------------------

  <%= constructorName %>.prototype.listen = function() {

    this.$listener.on(":eventType/event", function() {
      _this._example();
    });

  };

  // -------------------------------------------------------------------------
  // Broadcast Events
  // -------------------------------------------------------------------------

  <%= constructorName %>.prototype.broadcast = function() {

    this.$el.on("click", function() {
      _this.$el.trigger(":eventType/event");
    });

  };

  // -------------------------------------------------------------------------
  // Private Functions
  // -------------------------------------------------------------------------

  <%= constructorName %>.prototype._example = function() {

  };

  return <%= constructorName %>;

});
