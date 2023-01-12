// app (our app name) and undefined are passed here 
// to ensure 1. app can be modified locally and isn't 
// overwritten outside of our function context
// 2. the value of undefined is guaranteed as being truly 
// undefined. This is to avoid issues with undefined being 
// mutable pre-ES5.

;(function ( app, undefined ) {

    // private properties

    // public methods and properties
    app.loadBlueprint = function(blocks) {
        blocks.push({ key: "template"});

        for(var i = 0; i < blocks.length; i++) {
            (function(index){
                $.ajax(
                    {
                        url: "palmuml/" + blocks[i].key +".puml",
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
    }

    // private methods
    renderBlueprint = function(blocks) {
        var pumlDiagram = blocks.find(x => x.key == "template").value;
        blocks.pop();

        pumlDiagram.replace("<<Content>>", blocks.join("\n"));

        $("#diagram").attr("src", "http://www.plantuml.com/plantuml/png/~1"+encode64(pumlDiagram));
    }

    encode64 = function(data) {
        r = "";
        for (i=0; i<data.length; i+=3) {
         if (i+2==data.length) {
        r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
        } else if (i+1==data.length) {
        r += append3bytes(data.charCodeAt(i), 0, 0);
        } else {
        r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1),
        data.charCodeAt(i+2));
        }
        }
        return r;
        }
        
    append3bytes = function (b1, b2, b3) {
        c1 = b1 >> 2;
        c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
        c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
        c4 = b3 & 0x3F;
        r = "";
        r += encode6bit(c1 & 0x3F);
        r += encode6bit(c2 & 0x3F);
        r += encode6bit(c3 & 0x3F);
        r += encode6bit(c4 & 0x3F);
        return r;
    }
        
    encode6bit = function (b) {
        if (b < 10) {
         return String.fromCharCode(48 + b);
        }
        b -= 10;
        if (b < 26) {
         return String.fromCharCode(65 + b);
        }
        b -= 26;
        if (b < 26) {
         return String.fromCharCode(97 + b);
        }
        b -= 26;
        if (b == 0) {
         return '-';
        }
        if (b == 1) {
         return '_';
        }
        return '?';
    }
    /* 
    compress = function (s) {
          //UTF8
          s = unescape(encodeURIComponent(s));
          $('im').src = "http://www.plantuml.com/plantuml/img/"+encode64(zip_deflate(s, 9));
    }
    */
    // check to evaluate whether "app" exists in the 
    // global app - if not, assign window.app an 
    // object literal

}( window.app = window.app || {} ));