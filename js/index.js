// app (our app name) and undefined are passed here 
// to ensure 1. app can be modified locally and isn't 
// overwritten outside of our function context
// 2. the value of undefined is guaranteed as being truly 
// undefined. This is to avoid issues with undefined being 
// mutable pre-ES5.

;(function ( app, undefined ) {

    // private properties
    var urlOptions = [
        ["producer-push", "producer-pull"],
        ["", "producer-adapter"],
        ["", "producer-api"],
        ["", "mediation-layer"],
        ["", "consumer-api"],
        ["", "consumer-adapter"],
        ["consumer-push", "consumer-pull"],
        ["consumer-data-contract", "consumer-data-contract", "canonical-data-contract"]
        ];

    var urls = [];

    // public methods and properties
    app.loadPage = function() {
        $.ajax(
            {
                url: "/data/urls.json",
                type: 'GET',
                success: function(data) {     
                    urls = data.data;
                    updateLinks();
                }
            });
    };

    app.loadBlueprint = function(blocks) {
        blocks.push({ key: "template"});

        for(var i = 0; i < blocks.length; i++) {
            (function(index){
                $.ajax(
                    {
                        url: "/palmuml/" + blocks[i].key +".puml",
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
    };

    // private methods
    renderBlueprint = function(blocks) {
        var pumlDiagram = blocks.find(x => x.key == "template").value;
        blocks.pop();

        pumlDiagram = pumlDiagram.replace("<<Content>>", blocks.map(x => x.value).join('\n\n'));

        $("#diagram").attr("src", "http://www.plantuml.com/plantuml/img/" + window.plantumlEncoder.encode(pumlDiagram));
    };

    updateLinks = function() {
        var blueprintCode = window.location.pathname.replace("index.html", "").split("/").filter(x => x).pop();
        console.log(blueprintCode);
        var blueprintComponents = blueprintCode.split("--");
        var componentLinks = $(".component-links > ul > li");
        componentLinks.each(i => {
            var componentLink = $(componentLinks[i]);
            var componentLinkId = componentLink.attr("id");
            var linkComponent = componentLinkId.split("--")[1];
            var linkComponentAction = componentLinkId.split("--")[0];
            var componentIsInBlueprint = blueprintComponents.find(x => x == linkComponent);

            if(componentIsInBlueprint && linkComponentAction == "remove") {
                componentLink.show();
            }
            else if(!componentIsInBlueprint && linkComponentAction == "add"){
                componentLink.show();
                var componentContainer = componentLink.parents(".grid-container-component");
                if(!componentContainer.parent().hasClass("producer") && !componentContainer.parent().hasClass("consumer"))
                {
                    componentContainer.css( "background-color", "#aaaaaa");
                    componentContainer.children(".component-icon").children("img").css("opacity", "0.5");
                }
            }
        });
        
    }

    // check to evaluate whether "app" exists in the 
    // global app - if not, assign window.app an 
    // object literal

}( window.app = window.app || {} ));