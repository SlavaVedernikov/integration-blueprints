// app (our app name) and undefined are passed here 
// to ensure 1. app can be modified locally and isn't 
// overwritten outside of our function context
// 2. the value of undefined is guaranteed as being truly 
// undefined. This is to avoid issues with undefined being 
// mutable pre-ES5.

;(function ( app, undefined ) {

    // private properties
    var urlOptions = [
        ["producer-file-transfer", "producer-shared-db", "producer-rpc", "producer-messaging", "producer-webhook"],
        ["", "p-adapter"],
        ["", "publisher-api"],
        ["", "mediation-layer"],
        ["", "subscriber-api"],
        ["", "c-adapter"],
        ["consumer-file-transfer", "consumer-shared-db", "consumer-rpc", "consumer-messaging", "consumer-webhook"],
        ["producer-data-contract", "canonical-data-contract"],
        ["producer-channel", "mediation-layer-channel"]
        ];

    var palmUmlTokens = {
        content: "<<CONTENT>>",
        messageMultiplicity: "<<MESSAGE_MULTIPLICITY>>",
        dataContract: "<<DATA_CONTRACT>>",
    }

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
                    ///*
                    //TODO: get PalmUML blocks based on URL
                    loadBlueprint([{
                        key: "producer_push_producer_channel"
                    }, {
                        key: "consumer_pull_producer_channel"
                    }]);
                    //*/
                    
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

        pumlDiagram = pumlDiagram.replace(palmUmlTokens.content, blocks.map(x => x.value).join('\n\n'));

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
            var linkIdSegments = componentLinkId.split("--");
            var linkComponentAction = linkIdSegments[0];
            var linkComponent = linkComponentAction == "replace" ? linkIdSegments[2] : linkIdSegments[1];
            var linkAlternativeComponents = linkIdSegments[1].split(":");
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
                componentContainer.children(".component-icon").children("div").children("img").css("opacity", "0.5");
            }
            else if(!componentIsInBlueprint && linkComponentAction == "replace"){
                linkBlueprintComponents = linkBlueprintComponents.filter(x => !linkAlternativeComponents.includes(x));
                linkBlueprintComponents.push(linkComponent);
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

        var channelLinks = $("a[id$='-channel']");
        channelLinks.each(i => {
            var channelLink = $(channelLinks[i]);
            var channelLinkId = channelLink.attr("id");
            var channels = channelLinkId.split("--")[1].split(":");
            var channelAction = channelLinkId.split("--")[0];
            var linkBlueprintComponents = blueprintComponents.map((x) => x);
            var channelIsInBlueprint = blueprintComponents.find(x => channels.find(y => y == x));

            if(channelIsInBlueprint && channelAction == "replace"){
                linkBlueprintComponents = linkBlueprintComponents.filter(x => !channels.includes(x));
                var linkchannelReplacement = channelLinkId.split("--")[2];
                linkBlueprintComponents.push(linkchannelReplacement);
                channelLink.attr("href", "../" + getBlueprintUrl(linkBlueprintComponents)); 
                channelLink.show();
            }
        });

        var channelSpans = $("span[id$='-channel']");
        channelSpans.each(i => {
            var channelSpan = $(channelSpans[i]);
            var channelSpanId = channelSpan.attr("id");
            var channel = channelSpanId.split("--")[1];
            var channelAction = channelSpanId.split("--")[0];
            var channelIsInBlueprint = blueprintComponents.find(x => x == channel);

            if(channelIsInBlueprint && channelAction == "show") { 
                channelSpan.show();
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