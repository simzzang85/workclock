var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = (canvas.height / 2);
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

var hour="";
var minute="";
var second="";
var desc="";

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, '#333');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){

    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    //checking
    addRowHandlers(hour,minute,second);

    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
    //workTime(hour, minute, second);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function addItem(){
  validation();
  //alert(hour+ "::"+minute+"::"+second+"::"+desc);
  if(desc==""||desc == null){
    return alert("Please input Title"); 
  }
  if(hour == "" || hour == null){
    return alert("Please input HOUR");
  }
  if(minute == 0 || minute == null){
    //return alert("Please input HOUR");
  }
  if(second == 0 || second == null){
    //return alert("Please input HOUR");
  }

  // Find a <table> element with id="myTable":
  var table = document.getElementById("tbl-item");
  // Create an empty <tr> element and add it to the 1st position of the table:
  // first is header, so start from second
  var row = table.insertRow(1);
  //add delete tag for each row
  var rows = table.getElementsByTagName("tr");
  rows[1].onclick = function(myrow){
    return function() { 
       var cell = myrow.getElementsByTagName("td")[1];
       var id = cell.innerHTML;
       //alert("id:" + this);
       delItem(this);
    };
  }(row);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  //var cell5 = row.insertCell(4);
  // Add some text to the new cells:
  cell1.innerHTML = desc;
  cell2.innerHTML = hour;
  cell3.innerHTML = minute==null ? 0 : minute;
  cell4.innerHTML = second==null ? 0 : second;
  //cell5.innerHTML = '<input type="button" value="Del" class="del-header"/>';
}
function delItem(x){
  //alert(x.rowIndex);
  document.getElementById("tbl-item").deleteRow(x.rowIndex);
}
function validation(){
  desc = document.getElementById("desc").value == null || document.getElementById("desc").value == "" ? "" : document.getElementById("desc").value;
  hour = document.getElementById("hour").value == null || document.getElementById("hour").value == "" ? 0 : document.getElementById("hour").value;
  minute = document.getElementById("minute").value == null || document.getElementById("minute").value == "" ? 0 : document.getElementById("minute").value;
  second = document.getElementById("second").value == null || document.getElementById("second").value == "" ? 0 : document.getElementById("second").value;
}
function addRowHandlers(curHour, curMin, curSec) {
  var table = document.getElementById("tbl-item");
  var rows = table.getElementsByTagName("tr");
  for (i = 1; i < rows.length; i++) {
      var row = table.rows[i];
      var cell1 = row.cells[0].innerHTML; //title
      var cell2 = row.cells[1].innerHTML; //hour
      var cell3 = row.cells[2].innerHTML; //min
      var cell4 = row.cells[3].innerHTML; //sec
      //var id = cell1.innerHTML;
      //alert("id:" + id);
      //if matched with saved list, alert
      if(cell2 == curHour){
        if(cell3 == curMin){
          if(cell4 == curSec){
            chkTime(cell2, cell3, cell4, cell1);
          }
        }
      }
  }
}
function chkTime(hour, min, sec, desc=""){
  var rtnMsg = desc;
  rtnMsg = "Current time " + hour + ":" + min +":"+sec+ " :" + desc;
  if(rtnMsg != ""){
    alert(rtnMsg);
  }else{
    //alert(rtnMsg);
  }
}
