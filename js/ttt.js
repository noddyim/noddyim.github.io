<script>
$(document).ready(function(){
  var move = 1;
  var turn = true;
  $("#dashboard tr td").click(function() {
    if ($(this).text()=="" && turn) {
      if ((move%2)==1) { $(this).append("X"); } 
      else { $(this).append("O"); }
      move++;
      if (ForWinner()!=-1 && ForWinner()!="") { 
        if (ForWinner()=="X") { alert("Player 1 wins!"); }
        else { alert("Player 2 wins!"); }
        turn = false; 
      }
    } 
  });
              function ForWinner() {
    var field1 = $("#dashboard tr:nth-child(1) td:nth-child(1)").text();
    var field2 = $("#dashboard tr:nth-child(1) td:nth-child(2)").text();
    var field3 = $("#dashboard tr:nth-child(1) td:nth-child(3)").text();
    var field4 = $("#dashboard tr:nth-child(2) td:nth-child(1)").text();
    var field5 = $("#dashboard tr:nth-child(2) td:nth-child(2)").text();
    var field6 = $("#dashboard tr:nth-child(2) td:nth-child(3)").text();
    var field7 = $("#dashboard tr:nth-child(3) td:nth-child(1)").text();
    var field8 = $("#dashboard tr:nth-child(3) td:nth-child(2)").text();
    var field9 = $("#dashboard tr:nth-child(3) td:nth-child(3)").text();
    if  ((field1==field2)&&(field2==field3)) { return field3; }
    else if ((field4==field5)&&(field5==field6)) { return field6; }
    else if ((field7==field8)&&(field8==field9)) { return field9; }
    else if ((field1==field4)&&(field4==field7)) { return field7; }
    else if ((field2==field5)&&(field5==field8)) { return field8; }
    else if ((field3==field6)&&(field6==field9)) { return field9; }
    else if ((field1==field5)&&(field5==field9)) { return field9; }
    else if ((field3==field5)&&(field5==field7)) { return field7; }
    return -1;
  }
});
</script>  
