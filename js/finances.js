var amount = ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
var amt = "amt";
var elementID;
var number = 0;
var income = 0;
var total;
var amtKept = 0;
var table;
var row;
var cell1;
var cell2;

//document.getElementById("calculate").onclick = calculate;

function calculate(){

	total = 0;

	//alert("amount:"+amount);

	table = document.getElementById("spendingTable");

	for(var i = 1; i < table.rows.length-3; i++){
		elementID = amt.concat(new String(i));
		amount[i] = document.getElementById(elementID).value;
		if(document.getElementById(elementID).value == "" || document.getElementById(elementID).value == null){
			amount[i] = "0";
		}
		number = parseInt(amount[i]);
		total += number;
		//alert("table rows1 cells i value:"+document.getElementById(cell2.id).value);//table.rows[1].cells[i].value);
		//alert("amount:"+amount[i]);
	}
	//alert("after forloop amt:"+amount);

	income = (document.getElementById("income").value)*2;

	amtKept = (income - total)/2;

	document.getElementById("total").innerHTML = total;
	document.getElementById("saved").innerHTML = amtKept;
}

function addRow(){
	
	table = document.getElementById("spendingTable");
	var billName = prompt("Whats the name of this bill?");
	if(billName == "" || billName == null)
	{
		billName = prompt("Sorry, Invalid input. Whats the name of this bill?");
	}
	var dollarAmt = prompt("How much is "+billName+" per month?");
	if(dollarAmt == "" || dollarAmt == null)
	{
		billName = prompt("Sorry, Invalid input. How much is "+billName+" per month?");
	}

	if(table.rows.length < 21){

		row = table.insertRow(table.rows.length-3);

		cell1 = row.insertCell(0);
		cell1.innerHTML = billName;//"<tr><td><input type=\"text\" id=\"name"+(table.rows.length-3)+"\" size=\"35\"></td>";
		cell2 = row.insertCell(1);
		cell2.innerHTML = "$"+dollarAmt;//"<td><span>$</span><input type=\"text\" id=\"amt"+(table.rows.length-3)+"\" size=\"10\"></td></tr>";
		amount[table.rows.length-3] = dollarAmt;
		//cell2.id=amt.concat(new String(table.rows.length-4));
		//alert("cell2 value:"+cell2.id);
		//amount[table.rows.length-3] = cell2.id;		
	}
	else{
		alert("You can only have 20 rows");
	}
}

function delRow(){
	table = document.getElementById("spendingTable");
	if(table.rows.length > 5){
		row = table.deleteRow(table.rows.length-4);
		amount[table.rows.length-4] = 0;
	}
	else{
		alert("You need at least 1 row");
	}
}
