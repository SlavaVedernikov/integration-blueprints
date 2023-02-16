// app (our app name) and undefined are passed here 
// to ensure 1. app can be modified locally and isn't 
// overwritten outside of our function context
// 2. the value of undefined is guaranteed as being truly 
// undefined. This is to avoid issues with undefined being 
// mutable pre-ES5.

;(function ( app, undefined ) {

    // private properties
    var urlOptions = [
        ["producer-file-transfer", "producer-shared-db", "producer-rpc-pull", "producer-rpc-push", "producer-messaging", "producer-webhook"],
        ["p-conformist", "p-non-conformist"],
        ["", "p-adapter"],
        ["", "p-api"],
        ["", "mediation-layer"],
        ["", "c-api"],
        ["", "c-adapter"],
        ["c-conformist", "c-non-conformist"],
        ["consumer-file-transfer", "consumer-shared-db", "consumer-rpc-pull", "consumer-rpc-push", "consumer-messaging", "consumer-webhook"]
    ];

    var urlSegmentPlantUmlTokenMapping = [
        {
            urlSegment: "producer-webhook",
            token: "USE_PRODUCER_ADAPTER_CHANNEL",
            value: "true"
        }, {
            urlSegment: "producer-webhook",
            token: "PRODUCER_ADAPTER_CHANNEL_TYPE",
            value: "webhook-callback"
        }, {
            urlSegment: "p-conformist",
            token: "IS_PRODUCER_CONFORMIST",
            value: "true"
        },
        {
            urlSegment: "p-non-conformist",
            token: "IS_PRODUCER_CONFORMIST",
            value: "false"
        },
        {
            urlSegment: "c-conformist",
            token: "IS_CONSUMER_CONFORMIST",
            value: "true"
        },
        {
            urlSegment: "c-non-conformist",
            token: "IS_CONSUMER_CONFORMIST",
            value: "false"
        },
        {
            urlSegment: "p-adapter",
            token: "USE_PRODUCER_ADAPTER",
            value: "true"
        },
        {
            urlSegment: "p-api",
            token: "USE_PRODUCER_API",
            value: "true"
        },
        {
            urlSegment: "c-adapter",
            token: "USE_CONSUMER_ADAPTER",
            value: "true"
        },
        {
            urlSegment: "c-api",
            token: "USE_CONSUMER_API",
            value: "true"
        }];

    var urls = [];

    // public methods and properties
    app.loadPage = function() {
        urls = getUrls();
        updateLinks();
        loadBlueprint(); 
    };

    // private methods

    getUrls = function(){
        var options = [];

        options.push(getOptions(config.urlOptions.producerOptions));
        options.push(["mediation-layer"]);
        options.push(getOptions(config.urlOptions.consumerOptions, true));

        return getOptionCombos(options).map(x => x.filter(y => y != "").join("--"));
    }

    getOptionCombos = function (list, n = 0, result = [], current = []){
        if (n === list.length) result.push(current)
        else list[n].forEach(item => getOptionCombos(list, n+1, result, [...current, item]))
     
        return result
    };

    getOptions = function(config, reverse){
        var result = [];
        config.forEach(x => {
            var options = [];
    
            if(!reverse)
            {
                options.push(x.urlOptionKeys);
        
                if(x.urlOptionValues.switchable)
                {
                    x.urlOptionValues.switchable.forEach(y => {
                        options.push(y);
                    });
                }
    
                if(x.urlOptionValues.required)
                {
                    options.push([x.urlOptionValues.required.join('--')]);
                }
            
                if(x.urlOptionValues.optional)
                {
                    x.urlOptionValues.optional.forEach(y => {
                        options.push(["", y]);
                    });
                }
            }
            else
            {
                if(x.urlOptionValues.optional)
                {
                    x.urlOptionValues.optional.forEach(y => {
                        options.push(["", y]);
                    });
                }
    
                if(x.urlOptionValues.required)
                {
                    options.push([x.urlOptionValues.required.join('--')]);
                }
    
                if(x.urlOptionValues.switchable)
                {
                    x.urlOptionValues.switchable.forEach(y => {
                        options.push(y);
                    });
                }
    
                options.push(x.urlOptionKeys);
            }
            
    
            getOptionCombos(options).forEach(x => result.push(x.filter(y => y != "").join("--")));
        });

        return result;
    };

    loadBlueprint = function() {
        var blocks = [];

        var blueprintCode = window.location.pathname.replace("index.html", "").split("/").filter(x => x).pop();
        var blueprintComponents = blueprintCode.split("--");
        blocks = blocks.concat(blueprintComponents.filter(x => x.startsWith("producer-") || x.startsWith("consumer-")).map(x => ({ ["key"]: x })));
        blocks.push({ key: "integration-platform"});
        blocks.push({ key: "template"});

        for(var i = 0; i < blocks.length; i++) {
            (function(index){
                $.ajax(
                    {
                        url: "../../plantuml/" + blocks[i].key +".puml",
                        type: 'GET',
                        success: function(data) {     
                            blocks[index].value = replacePlantUmlTokens(data, blueprintComponents);
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
        blocks = blocks.filter(x => x.key !== "template");

        pumlDiagram = pumlDiagram.replace("<<CONTENT>>", blocks.map(x => x.value).join('\n\n'));

        $("#diagram").attr("src", "http://www.plantuml.com/plantuml/img/" + window.plantumlEncoder.encode(pumlDiagram));
    };

    replacePlantUmlTokens = function(plantUml, components) {

        components.forEach(component => {
            var mappings = urlSegmentPlantUmlTokenMapping.filter(mapping => mapping.urlSegment == component);

            mappings.forEach(mapping => {
                plantUml = plantUml.replace("<<" + mapping.token + ">>", mapping.value);
            });
        });

        return plantUml;
    }

    updateLinks = function() {
        var blueprintCode = window.location.pathname.replace("index.html", "").split("/").filter(x => x).pop();
        console.log(blueprintCode);
        var blueprintComponents = blueprintCode.split("--");
        var componentLinks = $(".component-links > ul > li[id]");

        componentLinks.each(i => {
            var componentLink = $(componentLinks[i]);
            var componentLinkId = componentLink.attr("id");
            var linkIdSegments = componentLinkId.split("--");
            var linkComponentAction = linkIdSegments[0];
            var linkComponent = linkComponentAction == "replace" ? linkIdSegments[2] : linkIdSegments[1];
            var linkAlternativeComponents = linkIdSegments[1].split("+");
            var linkBlueprintComponents = blueprintComponents.map((x) => x);
            var componentIsInBlueprint = blueprintComponents.find(x => x == linkComponent);

            if(componentIsInBlueprint && linkComponentAction == "show") { 
                componentLink.show();
            }
            else if(componentIsInBlueprint && linkComponentAction == "remove") {
                linkBlueprintComponents = linkBlueprintComponents.filter(x => x != linkComponent);
                showConponentLink(linkBlueprintComponents, componentLink);
                
            }
            else if(!componentIsInBlueprint && linkComponentAction == "add"){
                linkBlueprintComponents.push(linkComponent);
                showConponentLink(linkBlueprintComponents, componentLink);
                
                var componentContainer = componentLink.parents(".grid-container-component");
                componentContainer.css( "background-color", "#aaaaaa");
                componentContainer.children(".component-icon").children("img").css("opacity", "0.5");
                componentContainer.children(".component-icon").children("div").children("img").css("opacity", "0.5");
            }
            else if(!componentIsInBlueprint && linkComponentAction == "replace"){
                linkBlueprintComponents = linkBlueprintComponents.filter(x => !linkAlternativeComponents.includes(x));
                linkBlueprintComponents.push(linkComponent);
                showConponentLink(linkBlueprintComponents, componentLink);
            }
        });
    };

    showConponentLink = function(blueprintComponents, componentLink) {
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

        var url = urlSegments.filter(segment => segment != "").join("--");

        if(urls.includes(url))
        {
            componentLink.children("a").attr("href", "../" + url); 
            componentLink.show();
        }
    };

    // check to evaluate whether "app" exists in the 
    // global app - if not, assign window.app an 
    // object literal

}( window.app = window.app || {} ));