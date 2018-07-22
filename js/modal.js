        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 
        btn.onclick = function() {
            console.log(game.modal_open);
            game.modal_open = true;
            modal.style.display = "block";
            console.log(game.modal_open);
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            game.modal_open = false;
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            game.modal_open = false;
            if (event.target == modal) {
                modal.style.display = "none";

            }
        };