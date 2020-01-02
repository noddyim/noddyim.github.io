var player;
var currentMessage;
var board;
var socket;

window.addEventListener("load", function(){
    player = "";
    currentMessage = document.getElementById("currentMessage");
    board = document.getElementById("board");
    socket = new WebSocket("ws://localhost:8080/JSConsole/ws/gameWebSocket");
    socket.onmessage = onWebSocketMessage;    
});

function onWebSocketMessage(event){
    var data = JSON.parse(event.data);
    currentMessage.innerHTML = event.data;
    
    if(data.action === "start"){
        player = data.player;
    }else {
        var table = document.createElement("table");
        var icon = player === "EXXES" ? "X" : "O";
        for(y = 0; y<3; y++){
            var row = document.createElement("tr");
            for(x = 0; x<3; x++){
                var cell = document.createElement("td");
                var value = data.board[x][y];
                if(value==="NONE"){
                    var button = document.createElement("input");
                    button.setAttribute("type","button");
                    if(player===data.currentTurn){
                        button.setAttribute("value", icon);
                        (function(xcopy, ycopy){
                            button.addEventListener("click", function(){
                                send(xcopy, ycopy);
                            });                            
                        })(x,y);
                    }else{
                        button.setAttribute("value", " ");
                        button.setAttribute("disabled", "disabled");
                    }
                    cell.appendChild(button);
                }
                if(value==="EXXES"){
                    cell.appendChild(document.createTextNode("X"));
                }
                if(value==="CIRCLE"){
                    cell.appendChild(document.createTextNode("O"));
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        while(board.firstChild){
            board.removeChild(board.firstChild);
        }
        board.appendChild(table);
    }
}

function send(x, y){
    message = {x:x, y:y, player:player};
    socket.send(JSON.stringify(message));
}