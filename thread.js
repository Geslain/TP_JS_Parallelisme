/**
 * Created by Gess on 21/01/2016.
 */

onmessage = function(e) {
    var typeData = JSON.parse(e.data)["type"];
    var dataTable = JSON.parse(e.data)["data"];
    var jsonResult = [];

    for(var key in dataTable) {
        var data = dataTable[key];
        jsonResult[key] = {
            "type": "rect",
            "originX": "left",
            "originY": "top",
            "left": data["x"],
            "top": data["y"],
            "width": data["width"],
            "height": data["height"],
            "fill": "black",
            "angle" : -data["direction"],
        };
    }
    postMessage(JSON.stringify({"type" : typeData , "data" : jsonResult }));
};