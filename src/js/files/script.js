// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
 import { isMobile } from "./functions.js";
 import { formsModules } from "./forms/forms.js";

 $(document).ready(function() {

	//E-mail Ajax Send
	$("#form-send").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});