// Controller contains events triggered by View
class Controller {

    static init = function(e) {
        Model.init()
        View.render( Model.getData() )
    }

    static up = function(e) {
        Model.up()
        View.render( Model.getData() )
    }

    static down = function(e) {
        Model.down()
        View.render( Model.getData() )
    }

}

// init events
window.addEventListener("load", Controller.init)

// button click events
document.getElementById("select").addEventListener("click", Controller.select)
document.getElementById("move").addEventListener("click", Controller.move)
document.getElementById("up").addEventListener("click", Controller.up)
document.getElementById("down").addEventListener("click", Controller.down)
document.getElementById("submit").addEventListener("click", Controller.submit)