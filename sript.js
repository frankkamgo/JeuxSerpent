window.onload = function () {
    var canvasWidth = 900;// largeur
    var canvasHeight = 600;// hauteur
    var blocksize = 30;
    var ctx;
    var delay = 1000;
    // var xCoord = 0;
    //var yCoord = 0;
    var snakee;

    init(); // appel de init 

    function init() {
        var canvas = document.createElement('canvas'); // permet de desiner 
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        canvas.style.border = "2px solid";
        document.body.appendChild(canvas);// permet d'acrocher notre JS au html

        ctx = canvas.getContext('2d'); // permet de desiner en 2d 
        snakee = new Snake([[6, 4], [5, 4], [4, 4]],"right");
        refreshCanvas();

    }

    function refreshCanvas() {
        // xCoord += 5;
        // yCoord += 5;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // permet a chaque fois de supprimer ca position 
        //ctx.fillStyle = "#ff0000";
        //ctx.fillRect(30 , 30 , 100, 50); // creation d'un rectangle 
        // ctx.fillRect(xCoord, yCoord, 100, 50);// pour lui rendre mobil a chaque une nouvelle position
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas, delay);// rafrechi le convas a partie du delay

    }

    function drawBlock(ctx, position) {
        var x = position[0] * blocksize;
        var y = position[1] * blocksize;
        ctx.fillRect(x, y, blocksize, blocksize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.advance = function () {
            var nextposition = this.body[0].slice();// va couper le serpent (tete) pour lui faire avancer 
           // nextposition[0] += 1; // fais avancer le serpent d'un block
           switch(this.direction){
            case "left":
                nextposition[0] -= 1
                break;
           case "right":
                nextposition[0] += 1
                 break;
           case "down":
               nextposition[1] += 1
                 break;
            case "up":
                nextposition[1] -= 1
            break;
            default :
            throw("invalid direction");
           
           }
            this.body.unshift(nextposition);// permet de mettre a la premiere place
            this.body.pop(); // va nous permettre de couper notre serpent a la fin le dernier element
        };

        this.setDirection = function(newDirection){
            var allowDirection;
            switch(this.direction){
                case "left":
                case "right":
                    allowDirection = ["up" , "down"];
                    break;

                    case "down":
                        case "up":
                            allowDirection = ["left" , "right"];
                            break;
                            default :
                            throw("invalid direction");

            }
            if(allowDirection.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };

    }


    document.onkeydown = function handlekeyDown(e){
        var key = e.keyCode;// code de la touche qui a été apuié 
        var newDirection;
        switch(key){
            case 37 :
                newDirection = "left"
            brea; 
            case 38 : 
                 newDirection = "up"
            break; 
            case 39 : 
                newDirection = "right"
            break; 
            case 40 : 
                newDirection = "down"
            break;
            default :
            return;
        }
        snakee.setDirection(newDirection);
        
    }



}