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

    var externalLinksMapping = [
        {
            token: "TRANSLATOR",
            link: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html",
            text: "Translator"
        },
        {
            token: "CANONICAL",
            link: "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CanonicalDataModel.html",
            text: "Canonical"
        }
    ];

    var numberingUnicodeMapping = [
        {
            token: "1",
            valueUnicode: "U+2776",
            valueHtml: "&#x2776;"
        },{
            token: "2",
            valueUnicode: "U+2777",
            valueHtml: "&#x2777;"
        },{
            token: "3",
            valueUnicode: "U+2778",
            valueHtml: "&#x2778;"
        },{
            token: "4",
            valueUnicode: "U+2779",
            valueHtml: "&#x2779;"
        },{
            token: "5",
            valueUnicode: "U+277A",
            valueHtml: "&#x277A;"
        },{
            token: "6",
            valueUnicode: "U+277B",
            valueHtml: "&#x277B;"
        },{
            token: "7",
            valueUnicode: "U+277C",
            valueHtml: "&#x277C;"
        },{
            token: "8",
            valueUnicode: "U+277E",
            valueHtml: "&#x277E;"
        },{
            token: "9",
            valueUnicode: "U+277E",
            valueHtml: "&#x277E;"
        },{
            token: "10",
            valueUnicode: "U+277F",
            valueHtml: "&#x277F;"
        },{
            token: "11",
            valueUnicode: "U+24EB",
            valueHtml: "&#x24EB;"
        },{
            token: "12",
            valueUnicode: "U+24EC",
            valueHtml: "&#x24EC;"
        },{
            token: "13",
            valueUnicode: "U+24ED",
            valueHtml: "&#x24ED;"
        },{
            token: "14",
            valueUnicode: "U+24EE",
            valueHtml: "&#x24EE;"
        },{
            token: "15",
            valueUnicode: "U+24EF",
            valueHtml: "&#x24EF;"
        },{
            token: "16",
            valueUnicode: "U+24F0",
            valueHtml: "&#x24F0;"
        },{
            token: "17",
            valueUnicode: "U+24F1",
            valueHtml: "&#x24F1;"
        },{
            token: "18",
            valueUnicode: "U+24F2",
            valueHtml: "&#x24F2;"
        },{
            token: "19",
            valueUnicode: "U+24F3",
            valueHtml: "&#x24F3;"
        },{
            token: "20",
            valueUnicode: "U+24F4",
            valueHtml: "&#x24F4;"
        }
    ];

    var urlSegmentMetaMapping = {
        templates: [{
            key: "title",
            value: "Integration Blueprint: <<PRODUCER_CONTRACT_TYPE>> Producer <<PRODUCER_INTEGRATION_STYLE>>, <<CONSUMER_CONTRACT_TYPE>> Consumer - <<CONSUMER_INTEGRATION_STYLE>>"
        },{
            key: "description",
            value: "Producer is <<PRODUCER_CONTRACT_TYPE>> in relation to Canonical Data Exchange Contract. <<PRODUCER_INTEGRATION_STYLE>> is a prefered integration style of a Producer. Consumer is <<CONSUMER_CONTRACT_TYPE>> in relation to Canonical Data Exchange Contract. <<CONSUMER_INTEGRATION_STYLE>>  is a prefered integration style of a Consumer."
        },
        {
            key: "description",
            urlSegment: "p-adapter",
            value: "Producer Adapter is used to enable data exchange between Producer and Mediation Layer. "
        },
        {
            key: "description",
            urlSegment: "p-api",
            value: "Producer API is used as a facade between Producer and/or Producer Adapter and the Mediation Layer."
        },
        {
            key: "description",
            urlSegment: "c-adapter",
            value: "Consumer Adapter is used to enable data exchange between the Mediation Layer and Consumer. "
        },
        {
            key: "description",
            urlSegment: "c-api",
            value: "Consumer API is used as a facade between Consumer and/or Consumer Adapter and the Mediation Layer."
        }],
        mappings: [{
            urlSegment: "producer-file-transfer",
            token: "PRODUCER_INTEGRATION_STYLE",
            value: "File Transfer"
        },
        {
            urlSegment: "producer-messaging",
            token: "PRODUCER_INTEGRATION_STYLE",
            value: "Messaging"
        },
        {
            urlSegment: "producer-shared-db",
            token: "PRODUCER_INTEGRATION_STYLE",
            value: "Shared Database"
        },
        {
            urlSegment: "producer-rpc-pull",
            token: "PRODUCER_INTEGRATION_STYLE",
            value: "Remote Procedure Call (RPC)"
        },
        {
            urlSegment: "producer-rpc-push",
            token: "PRODUCER_INTEGRATION_STYLE",
            value: "Remote Procedure Call (RPC)"
        },
        {
            urlSegment: "producer-webhook",
            token: "PRODUCER_INTEGRATION_STYLE",
            value: "Webhook"
        },
        {
            urlSegment: "p-conformist",
            token: "PRODUCER_CONTRACT_TYPE",
            value: "Conformist"
        },
        {
            urlSegment: "p-non-conformist",
            token: "PRODUCER_CONTRACT_TYPE",
            value: "Non-Conformist"
        },{
            urlSegment: "consumer-file-transfer",
            token: "CONSUMER_INTEGRATION_STYLE",
            value: "File Transfer"
        },
        {
            urlSegment: "consumer-messaging",
            token: "CONSUMER_INTEGRATION_STYLE",
            value: "Messaging"
        },
        {
            urlSegment: "consumer-shared-db",
            token: "CONSUMER_INTEGRATION_STYLE",
            value: "Shared Database"
        },
        {
            urlSegment: "consumer-rpc-pull",
            token: "CONSUMER_INTEGRATION_STYLE",
            value: "Remote Procedure Call (RPC)"
        },
        {
            urlSegment: "consumer-rpc-push",
            token: "CONSUMER_INTEGRATION_STYLE",
            value: "Remote Procedure Call (RPC)"
        },
        {
            urlSegment: "consumer-webhook",
            token: "CONSUMER_INTEGRATION_STYLE",
            value: "Webhook"
        },
        {
            urlSegment: "c-conformist",
            token: "CONSUMER_CONTRACT_TYPE",
            value: "Conformist"
        },
        {
            urlSegment: "c-non-conformist",
            token: "CONSUMER_CONTRACT_TYPE",
            value: "Non-Conformist"
        }]
    };

    var urlSegmentPlantUmlTokenMapping = [
        {
            urlSegment: "producer-file-transfer",
            token: "USE_PRODUCER_CHANNEL",
            value: "true"
        },{
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
                            blocks[index].puml = replacePlantUmlTokens(data, blueprintComponents);
                            if(blocks.filter(x => x.puml == undefined) == 0) {
                                renderBlueprint(blocks);
                            }
                        }
                    });
             })(i);

             (function(index){
                $.ajax(
                    {
                        url: "../../plantuml/" + blocks[i].key +".json",
                        type: 'GET',
                        success: function(data) {     
                            blocks[index].comments = getPlantUmlComments(data, blueprintComponents);
                            if(blocks.filter(x => x.comments == undefined) == 0) {
                                renderComments(blocks);
                            }
                        }
                    });
             })(i);
        } 
        
        setMetaTags(blueprintComponents);
    };

    renderComments = function(blocks) {
        if(!blocks) return;
        var markdownToHtmlConverter = new showdown.Converter();
        blocks.forEach(block => {
            if(!block.comments) return;
            block.comments.forEach(comment => {
                $( "#diagram-comments" ).append( "<h2>" + comment.component + "</h2>" );
                comment.values.forEach(value => {
                    $( "#diagram-comments" ).append(markdownToHtmlConverter.makeHtml(getHtmlNumbering(value.index) + " " + formatExternalLinks(value.comment) + formatNote(value.note)) );
                });
            });
        });
    };

    formatExternalLinks = function(text) {
        externalLinksMapping.forEach(mapping => {
            text = text.replace(new RegExp("<<" + mapping.token + ">>","g"), "<a href=\"" + mapping.link + "\" target=\"_blank\">" + mapping.text + "</a>");
        });

        return text;
    };

    formatNote = function(note) {
        if(!note) return "";
        return "<p>\n```md\nNOTE: " + note + "\n```<p/>";
    };

    getHtmlNumbering = function(number) {
        var result = number;
        var mapping = numberingUnicodeMapping.find(x => x.token == number);

        if(mapping)
        {
            result = mapping.valueHtml;
        }
        
        return result;
    };

    renderBlueprint = function(blocks) {
        var pumlDiagram = blocks.find(x => x.key == "template").puml;
        blocks = blocks.filter(x => x.key !== "template");

        pumlDiagram = pumlDiagram.replace("<<CONTENT>>", blocks.map(x => x.puml).join('\n\n'));

        $("#diagram").attr("src", "http://www.plantuml.com/plantuml/img/" + window.plantumlEncoder.encode(pumlDiagram));
    };

    getPlantUmlComments = function(commentsConfig, components) {
        var result = []
        var mappings = [];

        components.forEach(component => {
            mappings = mappings.concat(urlSegmentPlantUmlTokenMapping.filter(mapping => mapping.urlSegment == component));
        });


        commentsConfig.data.forEach(data => {
            result.push({component: data.component, values: filterComments(data.comments, mappings, [])});
        });

        return result;
    };

    filterComments = function(comments, mappings, result) {
        var data = comments.find(x => mappings.some(y => y.token == x.condition.token && y.value == x.condition.value));
        if(data)
        {
            result = result.concat(data.values);
            if(data.comments)
            {
                result =  filterComments(data.comments, mappings, result);
            }
        }
        return result;
    };

    replacePlantUmlTokens = function(plantUml, components) {

        components.forEach(component => {
            var mappings = urlSegmentPlantUmlTokenMapping.filter(mapping => mapping.urlSegment == component);

            mappings.forEach(mapping => {
                plantUml = plantUml.replace(new RegExp("<<" + mapping.token + ">>", "g"), mapping.value);
            });

            numberingUnicodeMapping.forEach(mapping => {
                plantUml = plantUml.replace(new RegExp("<<" + mapping.token + ">>", "g"), "<" + mapping.valueUnicode + ">");
            });
        });

        return plantUml;
    };

    setMetaTags = function(components) {

        var title = urlSegmentMetaMapping.templates.find(x => x.key == "title").value;
        var descriptions = urlSegmentMetaMapping.templates.filter(x => x.key == "description");

        components.forEach(component => {
            var mappings = urlSegmentMetaMapping.mappings.filter(mapping => mapping.urlSegment == component);

            mappings.forEach(mapping => {
                title = title.replace(new RegExp("<<" + mapping.token + ">>", "g"), mapping.value);
                descriptions.forEach(description => {
                    description.value = description.value.replace(new RegExp("<<" + mapping.token + ">>", "g"), mapping.value);
                });
            });
        });

        $("#meta-description").attr("content", descriptions.map(x => x.value).join(" "));
        $(document).attr("title", title);
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
                showConponentLink(linkBlueprintComponents, componentLink, linkComponent);
            }
        });
    };

    showConponentLink = function(blueprintComponents, componentLink, linkComponent) {
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
        else
        {
            url = getAlternativeComponentLink(url, linkComponent);
            if(urls.includes(url))
            {
                componentLink.children("a").attr("href", "../" + url); 
                componentLink.show();
            }
        }
    };

    getAlternativeComponentLink = function(url, linkComponent) {
        if(!linkComponent) return url;

        var result = url;
        var options = [];
        var partialUrl = "";
        var mediatioLayerUrlSegment = "--mediation-layer--";
        if(linkComponent.startsWith("producer-"))
        {
            options.push(
                getOptions(
                    config.urlOptions.consumerOptions.filter(
                        x => x.urlOptionKeys.includes(linkComponent)).map(
                            x => ({ urlOptionKeys: [linkComponent], urlOptionValues: x.urlOptionValues}))));
            
            partialUrl = url.substring(0, url.indexOf(mediatioLayerUrlSegment));

        }
        else if(["p-non-conformist", "p-conformist"].includes(linkComponent))
        {
            var integrationStyle = url.split("--")[0];
            options.push(
                getOptions(
                    config.urlOptions.consumerOptions.filter(
                        x => x.urlOptionKeys.includes(integrationStyle) && x.urlOptionValues.required && x.urlOptionValues.required.includes(linkComponent)).map(
                            x => ({ urlOptionKeys: [integrationStyle], urlOptionValues: x.urlOptionValues}))));
            
            partialUrl = url.substring(0, url.indexOf(mediatioLayerUrlSegment));

        }
        else if(linkComponent.startsWith("consumer-"))
        {
            options.push(
                getOptions(
                    config.urlOptions.consumerOptions.filter(
                        x => x.urlOptionKeys.includes(linkComponent)).map(
                            x => ({ urlOptionKeys: [linkComponent], urlOptionValues: x.urlOptionValues})), true));
            var startIndex = url.indexOf(mediatioLayerUrlSegment) + mediatioLayerUrlSegment.length;
            partialUrl = url.substring(startIndex, url.length);
                            
        }
        else if(["c-non-conformist", "c-conformist"].includes(linkComponent))
        {
            var integrationStyle = url.split("--").pop();
            options.push(
                getOptions(
                    config.urlOptions.consumerOptions.filter(
                        x => x.urlOptionKeys.includes(integrationStyle) && x.urlOptionValues.required && x.urlOptionValues.required.includes(linkComponent)).map(
                            x => ({ urlOptionKeys: [integrationStyle], urlOptionValues: x.urlOptionValues})), true));
            
            var startIndex = url.indexOf(mediatioLayerUrlSegment) + mediatioLayerUrlSegment.length;
            partialUrl = url.substring(startIndex, url.length);

        }

        var alternativeUrls = getOptionCombos(options).map(x => x.filter(y => y != "").join("--"));

        if(alternativeUrls.length > 0)
        {
            result = url.replace(partialUrl, alternativeUrls[0]);
        }

        return result;
    }

    // check to evaluate whether "app" exists in the 
    // global app - if not, assign window.app an 
    // object literal

}( window.app = window.app || {} ));