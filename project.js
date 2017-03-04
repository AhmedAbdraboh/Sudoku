$(function () {

	timerFun(1);
	var position=0;// to move between cells with this variable
	var rowArr=[0,1,2,3];// Indexes of td cells
	var valueArr=[1,2,3,4];//
	rowArr=shuffleFunction(rowArr);//to shuffle position of cells
	valueArr=shuffleFunction(valueArr);// to shuffle values of shuffled cells
	for(var i=0;i<4;i++){
			$("tr:eq("+i+") td:eq("+rowArr[i]+")").addClass('constant').text(valueArr[i]);
	}// end of shuffled cells loop
	$("td:eq(0)").addClass('focus');
	$("body").on("keydown",function (e) {
		if(e.which == 39){
			$(".focus").removeClass("focus");
			position++;
			if(position==16)
				position=0;
			$("td:eq("+position+")").addClass('focus');
		}//End of Right Arrow
		else if (e.which==37) {
			$(".focus").removeClass("focus");
			position--;
			if(position==-1)
				position=15;
			$("td:eq("+position+")").addClass('focus');
		}//End of left Arrow
		else if (e.which==38) {
			$(".focus").removeClass("focus");
			position=position-4;
			if(position<=-1)
				position=position+16;
			$("td:eq("+position+")").addClass('focus');
		}//End of Up Arrow
		else if (e.which==40) {
			$(".focus").removeClass("focus");
			position=position+4;
			if(position>=16)
				position=position-16;
			$("td:eq("+position+")").addClass('focus');

		}//End of Down Arrow
		else if (e.key==1||e.key==2||e.key==3||e.key==4) {
			if(!$(".focus").hasClass("constant"))
				$(".focus").text(e.key);
		}// End of numbers writing

	});// End of key down event

intervalID2=setInterval(function(){
	if(checkResult()){
		clearInterval(intervalID);// To stop first part of Timer
		$('body').off('keydown');
		$("#win").removeClass('hidden').addClass('lightbox').hide().show(3000);
		$("#game").css('opacity',0.5);
		clearInterval(intervalID2); // To stop checking result
		clearTimeout(timeoutID);//Stop second part of timer
	}
},100);// End of continous checking interval

$(".again").on("click",function(){
	location.reload();
	});//End of Again button
$(".close").on("click",function(){
	window.close();
	});//End of close button
});// End of onload event

function checkRows(){
	for(var i=0;i<4;i++){
		var sum=0;
		for(var j=0;j<4;j++){
			sum+=parseInt($("tr:eq("+i+") td:eq("+j+")").text());
		}
		if(sum!=10){
			// console.log(sum);
			return false;
		}
	}
	return true;
}// End of check rows function
function checkColumns(){
	for(var i=0;i<4;i++){
		var sum=0;
		for(var j=0;j<4;j++){
			sum+=parseInt($("tr:eq("+j+") td:eq("+i+")").text());
		}
		if(sum!=10){
			// console.log(sum);
			return false;
		}
	}
	return true;
}// End of check colums function
function checkResult(){
	if(checkRows()&&checkColumns())
		return true;
}//End of checking result function
function timerFun(time) {
		minutes = (time - 1);
		seconds = 60;
		intervalID = setInterval(function() {
				seconds--;
				if (seconds == -1) {
						seconds = 59;
						minutes--;
				}
				$("#timer").text(minutes + " : " + seconds);
		}, 1000);
		timeoutID=setTimeout(function() {
				clearInterval(intervalID);
				clearInterval(intervalID2);
				$('body').off('keydown');
				$("#lost").removeClass('hidden').addClass('lightbox').hide().show(3000);
				$("#game").css('opacity',0.5);
		}, (60*1000*time+1000));
}// End of timer function
function shuffleFunction(array) {
		var tmp, current, top = array.length;
		if (top)
				while (--top) {
						current = Math.floor(Math.random() * (top + 1));
						tmp = array[current];
						array[current] = array[top];
						array[top] = tmp;
				}
		return array;
}
