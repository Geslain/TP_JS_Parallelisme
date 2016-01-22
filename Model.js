/**
 * Created by Gess on 21/01/2016.
 */
(function($, window) {
    var Model = function(){
        this.cars = [];
        this.pedestrians = [];
        this.map = null;

        this.NB_CARS = 100;
        this.NB_PEDESTRIANS = 100;
        this.MAP_WIDTH = 1000;
        this.MAP_HEIGHT = 800;
        this.MAX_CAR_SPEED = 5;
        this.MAX_PEDESTRIAN_SPEED = 5;
        this.CAR_WIDTH = 30;
        this.CAR_HEIGHT = 10;
        this.PEDESTRIAN_WIDTH = 10;
        this.PEDESTRIAN_HEIGHT = 10;
        this.HITBOX_CAR_WIDTH = 40;
        this.HITBOX_CAR_HEIGHT = 15;
        this.HITBOX_PEDESTRIAN_WIDTH = 15;
        this.HITBOX_PEDESTRIAN_HEIGHT = 15;

        this.init = function() {
            this.map = new Map(this.MAP_WIDTH, this.MAP_HEIGHT);

            for(var i = 0 ; i < this.NB_CARS ; i++)
            {
                this.cars[i] = this.initRandomCar(i);
            }

            for(var i = 0 ; i < this.NB_PEDESTRIANS ; i++)
            {
                this.pedestrians[i] = this.initRandomPedestrian();
            }
        };

        this.initRandomCar = function(id) {
            var tempCar =  new Car();
            tempCar.x = parseInt(Math.random()*this.MAP_WIDTH);
            tempCar.y = parseInt(Math.random()*this.MAP_HEIGHT);
            tempCar.speed = parseInt((Math.random()*this.MAX_CAR_SPEED)+1);
            tempCar.direction = parseInt(Math.random()*360);
            tempCar.id = id;
            tempCar.height = this.CAR_HEIGHT;
            tempCar.width = this.CAR_WIDTH;
            tempCar.hitbox = new Hitbox(this.HITBOX_CAR_WIDTH, this.HITBOX_CAR_HEIGHT);

            return tempCar;
        };

        this.initRandomPedestrian = function(id) {
            var tempPedestrian =  new Pedestrian();
            tempPedestrian.x = parseInt(Math.random()*this.MAP_WIDTH);
            tempPedestrian.y = parseInt(Math.random()*this.MAP_HEIGHT);
            tempPedestrian.speed = parseInt((Math.random()*this.MAX_PEDESTRIAN_SPEED)+1);
            tempPedestrian.direction = parseInt(Math.random()*360);
            tempPedestrian.id = id;
            tempPedestrian.height = this.PEDESTRIAN_HEIGHT;
            tempPedestrian.width = this.PEDESTRIAN_WIDTH;
            tempPedestrian.hitbox = new Hitbox(this.HITBOX_PEDESTRIAN_WIDTH,this.HITBOX_PEDESTRIAN_HEIGHT);

            return tempPedestrian;
        };

        this.moveCars = function() {
            for(key in this.cars) {
                var car = this.cars[key];
                car.x += car.speed * Math.cos(car.direction *Math.PI/180);
                car.y -= car.speed * Math.sin(car.direction *Math.PI/180);
                car.direction += 1;
            }
        }

        this.movePedestrian= function() {
            for(key in this.pedestrians) {
                var pedestrian = this.pedestrians[key];
                pedestrian.x += pedestrian.speed * Math.cos(pedestrian.direction *Math.PI/180);
                pedestrian.y -= pedestrian.speed * Math.sin(pedestrian.direction *Math.PI/180);
                pedestrian.direction += 5;
            }
        }

    };

    window.Model = Model;

}) (jQuery, window);