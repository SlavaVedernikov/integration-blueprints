var options = [
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

function combos(list, n = 0, result = [], current = []){
    if (n === list.length) result.push(current)
    else list[n].forEach(item => combos(list, n+1, result, [...current, item]))
 
    return result
}

var combos = combos(options);
combos.forEach(x => console.log(x.filter(y => y != "").join("--") + ","));