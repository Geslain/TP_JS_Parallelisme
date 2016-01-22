/**
 * Created by Gess on 21/01/2016.
 */

(function($, window) {
    var View = function(model){

        this.model = model;
        var $canvas = $("<canvas>").attr("id", "canvas")
            .attr("width" , model.MAP_WIDTH)
            .attr("height" , model.MAP_HEIGHT);

        $("#canvas-container").append($canvas);

        this.canvas = new fabric.StaticCanvas('canvas');
        this.NB_THREAD = 20;
        this.SIZE_CHUNK = this.model.NB_CARS/this.NB_THREAD;
        this.width =  model.MAP_WIDTH;
        this.height =  model.MAP_HEIGHT;
        this.workers = [];
        this.entities = ["Car", "Pedestrian"];

        // Methods

        this.clearCanvas = function() {
           this.canvas.clear();
        };

        this.drawView = function() {
            this.drawCars();
            this.drawPedestrians();
        };

        this.drawCars = function() {
            var carTab = this.model.cars;
            var chunkedData = null;

            for(var i = 0; i < this.NB_THREAD ; i++) {
                chunkedData = carTab.slice(i*this.SIZE_CHUNK,(i*this.SIZE_CHUNK)+this.SIZE_CHUNK);
                this.workers[i].postMessage(JSON.stringify({"type": "Car" , "data":chunkedData}));
            }
        };

        this.drawPedestrians = function() {
            var pedestrianTab = this.model.pedestrians;
            var chunkedData = null;

            for(var i = 0; i < this.NB_THREAD ; i++) {
                chunkedData = pedestrianTab.slice(i*this.SIZE_CHUNK,(i*this.SIZE_CHUNK)+this.SIZE_CHUNK);
                this.workers[i].postMessage(JSON.stringify({"type": "Pedestrian" , "data":chunkedData}));
            }
        }

        this.initWorkers = function(){
            var self = this;
            var count = 0;
            var jsonResult = [];
            var canvasSave = [];
            var jsonCanvasSave = [];

            for(var i = 0; i < this.NB_THREAD ; i++) {
                self.workers[i] = new Worker("thread.js");

                self.workers[i].onmessage = function(e) {

                    jsonResult = jsonResult.concat(JSON.parse(e.data)["data"]);
                    count++;

                    // On affiche seulement la vue quand on a executé tous les traitements, c'est à dire quand on a fait
                    // (Nombre d'objets à traiter * nombre de thread par objet) traitement
                    if(count == self.NB_THREAD*self.entities.length) {
                        count = 0;
                        canvasSave = JSON.stringify(self.canvas);
                        jsonCanvasSave = JSON.parse(canvasSave);
                        finalResult = jsonResult.concat(jsonCanvasSave["objects"])
                        jsonCanvasSave["objects"] = jsonResult;
                        self.canvas.loadFromJSON(JSON.stringify(jsonCanvasSave),self.canvas.renderAll.bind(self.canvas))
                        jsonResult = [];
                    }
                };
            }
        };

        // Traitement du constructeur
        model.init();
        this.initWorkers();
    };

    window.View = View;
}) (jQuery, window);
