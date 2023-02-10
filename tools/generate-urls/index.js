var producerBlueprintConfig = {
    "data": [{
        "urlOptionKeys": [
            "producer-file-transfer",
            "producer-shared-db",
            "producer-rpc-pull",
            "producer-messaging"
        ],
        "urlOptionValues": {
            "required": [
                "p-adapter"
            ],
            "optional": [
                "p-api"
            ],
            "switchable":[
                ["p-conformist", "p-non-conformist"]
            ]}
        }, {
            "urlOptionKeys": [
                "producer-rpc-push"
            ],
            "urlOptionValues": {
                "required": [
                    "p-non-conformist",
                    "p-adapter"
                    
                ],
                "optional": [
                    "p-api"
                ]}
        }, {
            "urlOptionKeys": [
                "producer-rpc-push"
            ],
            "urlOptionValues": {
                "required": [
                    "p-conformist",
                    "p-api"
                    
                ]}
        }, {
            "urlOptionKeys": [
                "producer-webhook"
            ],
            "urlOptionValues": {
                "required": [
                    "p-non-conformist",
                    "p-adapter"
                    
                ],
                "optional": [
                    "p-api"
                ]}
        }      
    ]
};

var consumerBlueprintConfig = {
    "data": [{
            "urlOptionKeys": [
                "consumer-file-transfer",
                "consumer-shared-db",
                "consumer-messaging",
                "consumer-rpc-push"
            ],
            "urlOptionValues": {
                "required": [
                    "c-adapter"
                ],
                "switchable":[
                    ["c-conformist", "c-non-conformist"]
                ]}
        }, {
            "urlOptionKeys": [
                "consumer-rpc-pull",
                "consumer-webhook"
            ],
            "urlOptionValues": {
                "required": [
                    "c-api",
                    "c-conformist"
                ]}
        }       
    ]
};

function combos(list, n = 0, result = [], current = []){
    if (n === list.length) result.push(current)
    else list[n].forEach(item => combos(list, n+1, result, [...current, item]))
 
    return result
}

function getOptions(config, reverse){
    
    var result = [];
    config.data.forEach(x => {
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
        

        combos(options).forEach(x => result.push(x.filter(y => y != "").join("--")));
    });

    return result;
}

var options = [];

options.push(getOptions(producerBlueprintConfig));
options.push(["mediation-layer"]);
options.push(getOptions(consumerBlueprintConfig, true));

combos(options).forEach(x => console.log(x.filter(y => y != "").join("--") + ","));
