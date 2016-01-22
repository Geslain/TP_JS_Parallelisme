/**
 * Created by Gess on 21/01/2016.
 */
(function($, window) {
    var Pedestrian = function(){
    };
    Pedestrian.prototype = new MovableObject;

    window.Pedestrian = Pedestrian;

}) (jQuery, window);