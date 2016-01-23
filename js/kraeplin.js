var tinggi = {};

$( document ).ready(function() {
	$(function() {
        $(this).bind("contextmenu", function(e) {
            e.preventDefault();
        });
    }); 
    //$( "#txtans_1_1" ).focus();

$("#btnstart").click(function(){
	$("#tbSheet").show();
	$("#countdown").show();
	$(".txtansrow"+currentRow).prop('disabled',false);
	$( "#txtans_1_1" ).focus();
	$("#btnstart").hide();
	timer.play();
});

$('.txtans').keydown(function(e) {
   var code = e.keyCode || e.which;
   if (code == '9') {
       return false;
   }

});
var currentRow = 1;
var timer = $.timer(function() {
	timer.toggle();
	if(currentRow != 45){
		$.alert('Pindah.',function(){
			$(".txtansrow"+currentRow).prop('disabled',true);
			currentRow = currentRow + 1;
			$(".txtansrow"+currentRow).prop('disabled',false);
			$( "#txtans_"+currentRow+"_1" ).focus();
			timer.toggle();
		});
	}
	else
	{
		$.alert('Finish.',function(data){
			$.ajax({
            url: "/kraeplin/insert.php",
	            type: "POST",
	            data: tinggi,
	            success: function(data)
	            {
	            	if(data)
	            	{
	            		alert("Terima kasih data Anda sudah kami simpan");
	            		$(".txtansrow"+currentRow).prop('disabled',true);
						currentRow = currentRow + 1;
						$(".txtansrow"+currentRow).prop('disabled',false);
	            	}
	            }
        	});
		});
		
		/*$.ajax({
			type: "POST",
			url: "/kraeplin/insert.php",
			dataType: 'json',
            data: tinggi,
            contentType: "application/json; charset=utf-8", 
			success: function(data){
				console.log(data);
				alert("sucess");
			},
			error: function(){
				alert("error!!!");
			}
		});*/
	}
	
}, 5000); //30000

});


function nextText(x, y, val, correct){
	var nextVal = parseInt(y)+1;
	if($.isNumeric(val))
	{	
		if(correct)
		{
			$("#hdcounter_"+x+"_"+y).val("1");
		}
		else
		{
			tinggi[x] = y;
			if($("#txtans_"+x+"_"+y).val() != $("#hdans_"+x+"_"+y).val())
				$("#hdstatus_"+x+"_"+y).val("1");
			else
				$("#hdstatus_"+x+"_"+y).val("0");
			$( "#txtans_"+x+"_" + nextVal).focus();
			currentRow = x;
		}
			
	}
}

function check(x, y, val){
	if(val.oldvalue != "")
		nextText(x, y, val, true);
}
