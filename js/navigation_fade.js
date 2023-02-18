function fadeButtons(){
    $(document).ready(function(){
        $('nav a, button, footer a').mouseover(function(){
            $(this).fadeTo(150, 0.3);
        });
        $('nav a, button, footer a').mouseout(function(){
            $(this).fadeTo(150, 1);
        });
    
        $('nav a, button, footer a').click(function(){
            $(this).fadeTo(0, 1);
        });
    });
}
fadeButtons();