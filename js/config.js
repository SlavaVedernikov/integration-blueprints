;(function ( config, undefined ) {

    // private properties
    

    // public methods and properties e.g. app.doSomething = function()
    config.urlOptions = {
        "producerOptions": [{
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
                    "producer-rpc-push",
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
            }, {
                "urlOptionKeys": [
                    "producer-rpc-push",
                    "producer-webhook"
                ],
                "urlOptionValues": {
                    "required": [
                        "p-conformist",
                        "p-api"
                    ]}
            }
        ],
        "consumerOptions": [{
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
                    "consumer-webhook",
                    "consumer-rpc-pull"
                ],
                "urlOptionValues": {
                    "required": [
                        "c-api",
                        "c-conformist"
                    ]}
            }, {
                "urlOptionKeys": [
                    "consumer-rpc-pull"
                ],
                "urlOptionValues": {
                    "required": [
                        "c-adapter",
                        "c-non-conformist"
                    ]}
            }]
    };
    

    // private methods e.g. doSomethingElse = function()
    

}( window.config = window.config || {} ));