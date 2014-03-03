require([ "jquery", "public/assets/javascripts/lib/components/<%= nameVar %>.js" ], function($, <%= constructorName %>) {

  "use strict";

  describe("<%= constructorName %>", function() {

    describe("Initialisation", function() {

      beforeEach = function(){
        window.<%= nameVar %> = new <%= constructorName %>();
      };

      it("is defined", function() {
        expect(<%= nameVar %>).toBeDefined();
      });

    });
  });
});
