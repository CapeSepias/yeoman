// ------------------------------------------------------------------------------
//
// <%= constructorName %>
//
// ------------------------------------------------------------------------------

define([ "jquery" ], function($) {

  "use strict";

  var _this;

  // @args = {}
  // el: {string} selector for parent element
  // listener: {string} selector for the listener
  function <%= constructorName %>(args) {
    this.$listener = $(args.listener || "#js-row--content");
    this.$el = $(args.el);
    this.$el && this.init();
  }

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
