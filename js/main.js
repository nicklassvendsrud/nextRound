$(function(){
    
    var name;
    var nameList = [];
    var previousName;
    var audioYodel = document.getElementById("audioYodel");
    
    var setEvents = function(){
        $("#nameTxt").focus(function(){
            $(this).val("");
        });
    
        $("#addNameBtn").click(function(){
            addName();
        });

         $("#nameTxt").keypress(function(event) {
            if (event.keyCode == 13) {
                addName();
            }
        });

        $("#startBtn").click(function(){
            if(nameList.length > 1){
                $( "#dialog" ).dialog( "open" );
                pickName();
                setTimeout(function(){
                    playYodel();
                }, 5000);
            }
            else{
                alert("You need to add two or more names to the list first!");
            }
        });
    }
    
    var pickName = function(){
        $("#nameRoller").removeClass("animPulsate");
        
        var namePickerInterval = setInterval(function(){
            $("#nameRoller").effect( "shake", {direction: 'up', distance: '10', times: '1'}, 200);
            var randomName = nameList[Math.floor(Math.random() * nameList.length)];
            while(randomName === previousName){
                randomName = nameList[Math.floor(Math.random() * nameList.length)];
            }
            previousName = randomName;
            $("#nameRoller").html(randomName); 
        }, 200);
        
        setTimeout(function(){
            clearInterval(namePickerInterval);
            
            //<<<<<Secret cheat code added, so that my father-in-law Karl always has to pay:>>>>>>
            var nameKarlFound = $.inArray("Karl", nameList);
            if(nameKarlFound >= 0){
                $("#nameRoller").html("Karl");
                $("#resultTxt").html("Karl always has to pay.");
            }else{
                $("#resultTxt").html("Pay up " + previousName + "!");
            }
            
            
            $("#nameRoller").addClass("animPulsate");  
        }, 5000);   
    }
    
    var addName = function(){
        name = $("#nameTxt").val();
        if(name !== "" && name !== "Name"){
            $("#nameTxt").val("");
            nameList.push(name);
            var namesP = $("#namesP").html();
            if(namesP === "&nbsp;")
                $("#namesP").append(name);
            else
                $("#namesP").append(", " + name);
        }
    }
    
    var resetNames = function(){
        name = "";
        nameList = [];
        $("#nameRoller").html("");
        $("#namesP").html("&nbsp;");
        $("#resultTxt").html("&nbsp;");
    }  
    
    var playYodel = function(){
        audioYodel.play();  
    }
    
    var dialogBox = $("#dialog").dialog({ 
        autoOpen: false, 
        modal: true,
        height: 300,
        maxHeight: window.innerHeight,
        width: 500,
        maxWidth: window.innerWidth,
        buttons: [
            { 
                text: "Roll again", 
                click: function() {
                    audioYodel.pause();
                    $("#resultTxt").html("&nbsp;");
                    pickName();
                } 
            },
            { 
                text: "Try again with new names", 
                click: function() {
                    audioYodel.pause();
                    resetNames();
                    $( this ).dialog( "close" ); 
                } 
            }
            ]
    });
    
    
    
    var init = function(){
        setEvents();
    }();
    
});