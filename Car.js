/**
 * Created by Gess on 21/01/2016.
 */
(function($, window) {
    var Car = function(){
    };
    Car.prototype = new MovableObject;

    window.Car = Car;

}) (jQuery, window);