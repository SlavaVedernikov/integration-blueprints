// app (our app name) and undefined are passed here 
// to ensure 1. app can be modified locally and isn't 
// overwritten outside of our function context
// 2. the value of undefined is guaranteed as being truly 
// undefined. This is to avoid issues with undefined being 
// mutable pre-ES5.

;(function ( app, undefined ) {

    // private properties

    // public methods and properties
    app.loadBlueprint = function(blocks) {
        blocks.push({ key: "template"});

        for(var i = 0; i < blocks.length; i++) {
            (function(index){
                $.ajax(
                    {
                        url: "palmuml/" + blocks[i].key +".puml",
                        type: 'GET',
                        success: function(data) {     
                            blocks[index].value = data;
                            if(blocks.filter(x => x.value == undefined) == 0) {
                                renderBlueprint(blocks);
                            }
                        }
                    });
             })(i);
        }  
    }

    // private methods
    renderBlueprint = function(blocks) {
        var template = blocks.find(x => x.key == "template").value;
        blocks.pop();

        template.replace("<<Content>>", blocks.join("\n"));

        var plantumlEncoder = require("plantuml-encoder");
        var encoded = plantumlEncoder.encode(template);

        $("#diagram").attr("src", "http://www.plantuml.com/plantuml/img/" + encoded)
    }

    // check to evaluate whether "app" exists in the 
    // global app - if not, assign window.app an 
    // object literal

}( window.app = window.app || {} ));