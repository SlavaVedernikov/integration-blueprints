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
        ["producer-item", "producer-batch"],
        ["", "producer-adapter"],
        ["", "producer-api"],
        ["", "mediation-layer"],
        ["", "consumer-api"],
        ["", "consumer-adapter"],
        ["consumer-push", "consumer-pull"],
        ["consumer-item", "consumer-batch"],
        ["producer-data-contract", "consumer-data-contract", "canonical-data-contract"]
        ];

    var urls = [];

    // public methods and properties
    app.loadPage = function() {
        $.ajax(
            {
                url: "../../data/urls.json",
                type: 'GET',
                success: function(data) {     
                    urls = data.data;
                    updateLinks();
                    
                    //TODO: get PalmUML blocks based on URL
                    loadBlueprint([{
                        key: "producer_push_producer_channel"
                    }, {
                        key: "consumer_pull_producer_channel"
                    }]);
                    
                }
            });
    };

    

    // private methods
    loadBlueprint = function(blocks) {
        blocks.push({ key: "template"});

        for(var i = 0; i < blocks.length; i++) {
            (function(index){
                $.ajax(
                    {
                        url: "../../palmuml/" + blocks[i].key +".puml",
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
        var componentLinks = $(".component-links > ul > li[id]");

        componentLinks.each(i => {
            var componentLink = $(componentLinks[i]);
            var componentLinkId = componentLink.attr("id");
            var linkComponent = componentLinkId.split("--")[1];
            var linkComponentAction = componentLinkId.split("--")[0];
            var linkBlueprintComponents = blueprintComponents.map((x) => x);
            var componentIsInBlueprint = blueprintComponents.find(x => x == linkComponent);

            if(componentIsInBlueprint && linkComponentAction == "show") { 
                componentLink.show();
            }
            else if(componentIsInBlueprint && linkComponentAction == "remove") {
                linkBlueprintComponents = linkBlueprintComponents.filter(x => x != linkComponent);
                componentLink.children("a").attr("href", "../" + getBlueprintUrl(linkBlueprintComponents)); 
                componentLink.show();
            }
            else if(!componentIsInBlueprint && linkComponentAction == "add"){
                linkBlueprintComponents.push(linkComponent);
                componentLink.children("a").attr("href", "../" + getBlueprintUrl(linkBlueprintComponents)); 
                componentLink.show();
                
                var componentContainer = componentLink.parents(".grid-container-component");
                componentContainer.css( "background-color", "#aaaaaa");
                componentContainer.children(".component-icon").children("img").css("opacity", "0.5");
            }
            else if(componentIsInBlueprint && linkComponentAction == "replace"){
                linkBlueprintComponents = linkBlueprintComponents.filter(x => x != linkComponent);
                var linkComponentReplacement = componentLinkId.split("--")[2];
                linkBlueprintComponents.push(linkComponentReplacement);
                componentLink.children("a").attr("href", "../" + getBlueprintUrl(linkBlueprintComponents)); 
                componentLink.show();
            }
        });

        var dataContractLinks = $("a[id$='-data-contract']");
        dataContractLinks.each(i => {
            var dataContractLink = $(dataContractLinks[i]);
            var dataContractLinkId = dataContractLink.attr("id");
            var dataContracts = dataContractLinkId.split("--")[1].split(":");
            var dataContractAction = dataContractLinkId.split("--")[0];
            var linkBlueprintComponents = blueprintComponents.map((x) => x);
            var dataContractIsInBlueprint = blueprintComponents.find(x => dataContracts.find(y => y == x));

            if(dataContractIsInBlueprint && dataContractAction == "replace"){
                linkBlueprintComponents = linkBlueprintComponents.filter(x => !dataContracts.includes(x));
                var linkDataContractReplacement = dataContractLinkId.split("--")[2];
                linkBlueprintComponents.push(linkDataContractReplacement);
                dataContractLink.attr("href", "../" + getBlueprintUrl(linkBlueprintComponents)); 
                dataContractLink.show();
            }
        });
        
        var dataContractSpans = $("span[id$='-data-contract']");
        dataContractSpans.each(i => {
            var dataContractSpan = $(dataContractSpans[i]);
            var dataContractSpanId = dataContractSpan.attr("id");
            var dataContract = dataContractSpanId.split("--")[1];
            var dataContractAction = dataContractSpanId.split("--")[0];
            var dataContractIsInBlueprint = blueprintComponents.find(x => x == dataContract);

            if(dataContractIsInBlueprint && dataContractAction == "show") { 
                dataContractSpan.show();
            }
        });
    };

    getBlueprintUrl = function(blueprintComponents) {
        var urlSegments = [];
        urlOptions.forEach((urlOptionsSegment) => {
                urlOptionsSegment.every((segment) => {
                    if(blueprintComponents.find(component => component == segment)) {
                        urlSegments.push(segment);
                        return false;
                    }
                    urlSegments.push("");
                    return true;
                });
            }
        )

        return urlSegments.filter(segment => segment != "").join("--");
    };

    // check to evaluate whether "app" exists in the 
    // global app - if not, assign window.app an 
    // object literal

}( window.app = window.app || {} ));