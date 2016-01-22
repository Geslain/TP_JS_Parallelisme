/**
 * Created by Gess on 16/01/2016.
 */
var log ;
$(document).ready(function(){

    var m = new Model();

    var view = new View(m);
    view.drawView();

    $("[data-control='move']").click(function(){
        //view.model.moveCars();
        //view.model.movePedestrian();
        //view.drawView();
        setInterval(function(){
            view.model.moveCars();
            view.model.movePedestrian();
            view.drawView();
        },50);
    });
});