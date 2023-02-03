var options = [
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

function combos(list, n = 0, result = [], current = []){
    if (n === list.length) result.push(current)
    else list[n].forEach(item => combos(list, n+1, result, [...current, item]))
 
    return result
}

var combos = combos(options);
combos.forEach(x => console.log(x.filter(y => y != "").join("--") + ","));