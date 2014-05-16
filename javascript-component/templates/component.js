// ------------------------------------------------------------------------------
//
// <%= constructorName %>
//
// ------------------------------------------------------------------------------

define([ "jquery" ], function($) {

  "use strict";

  // @args = {}
  // el: {string} selector for parent element
  // listener: {string} selector for the listener
  function <%= constructorName %>(args) {
    this.$listener = $(args.listener || "#js-row--content");
    this.$el = $(args.el);
    this.$el && this.init();
  }

  <%= constructorName %>.prototype.init = function() {
    this.listen();
    this.broadcast();
  };

  // -------------------------------------------------------------------------
  // Subscribe to Events
  // -------------------------------------------------------------------------

  <%= constructorName %>.prototype.listen = function() {

    this.$listener.on(":eventType/event", this._example.bind(this));

  };

  // -------------------------------------------------------------------------
  // Broadcast Events
  // -------------------------------------------------------------------------

  <%= constructorName %>.prototype.broadcast = function() {

    this.$el.on("click", function() {
      this.$el.trigger(":eventType/event");
    });

  };

  // -------------------------------------------------------------------------
  // Private Functions
  // -------------------------------------------------------------------------

  <%= constructorName %>.prototype._example = function() {

  };

  return <%= constructorName %>;

});
