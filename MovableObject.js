/**
 * Created by Gess on 16/01/2016.
 */

(function($, window) {

    function MovableObject(){
        this.speed = 0;
        this.direction = 0;
        this.x = 0;
        this.y = 0;
        this.id = 0;
        this.height = 0;
        this.width = 0;
        this.hitbox = new Hitbox;

        this.init = function() {

        };
    }
    window.MovableObject = MovableObject;
}) (jQuery, window);