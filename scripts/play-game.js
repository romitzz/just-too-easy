$(document).ready(function() {
    $(".error-message").hide();

    var gameOverMsg = $(".game-over-message");
    if(!gameOverMsg.data("game-over")) {
        gameOverMsg.hide();
    }

    $(".btn-shot-type").click(function(){
        var buttonGroup = $(this).parent();
        var data = {
            game_key : buttonGroup.data("game"),
            player_key : buttonGroup.data("player"),
            shot_type_key  : $(this).data("shot-type"),
        };

        buttonGroup.parents(".modal").modal('hide');

        $.ajax({
            type: "POST",
            dataType : "json",
            url:"/game/play",
            data : data,
            success : function(data, textStatus) {
                if(data.success) {
                    $(".error-message").hide();
                    redScore = $("#red-score");
                    redScore.css("width", data.red_score_percentage + "%");
                    redScore.text(data.red_score);

                    blueScore = $("#blue-score");
                    blueScore.css("width", data.blue_score_percentage + "%");
                    blueScore.text(data.blue_score);

                    if(data.game_over) {
                        $(".score-btn").hide();
                        $(".game-over-message").text("Game over!");
                        $(".game-over-message").show();
                    }
                }
                else {
                    var errorMsg = $(".error-message");
                    errorMsg.text("Oops! Something went wrong on our end.  Please try again.");
                    errorMsg.show();
                }
            },
            error : function(data, textStatus, errorThrown) {
                var errorMsg = $(".error-message");
                errorMsg.text("Oops! Something went wrong.  Please try again.");
                errorMsg.show();
            }
        });
    });
});