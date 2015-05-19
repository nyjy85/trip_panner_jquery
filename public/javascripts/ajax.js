// this is for on click event for day button
function getDays(cd, self){
	$.ajax({
	    type: 'GET',
	    url: '/days', //url = the current domain + /days => tells client where to send the GET request
	    //data: someDataToSend,
	    success: function (responseData) {
	    	if(cd) cd.clearMarkersFromMap()
    		cd = self
    		cd.addMarkersToMap()
    		$('#itinerary #day-panel').replaceWith(self.$dayPanel)

	    }
	});
}

// this is for on click event for save button
function postDays(someDataToSend){
	$.ajax({
	    type: 'POST',
	    url: '/days',
	    data: someDataToSend,
	    success: function (responseData) {
	        console.log(responseData);
	    }
	});
}

// var data;
function getDaysOnId(id){
	$.ajax({
	    type: 'GET',
	    url: '/days/' + id,
	    // data: someDataToSend,
	    success: function (responseData) {
	    	if (jQuery.isEmptyObject(responseData)) return;

	    	var keys = Object.keys(responseData);
	    	addBack(keys[0], responseData.hotels);
	    	
	        responseData.restaurants.forEach(function(res){
	        	addBack(keys[1], res);
	        }); 
	        responseData.things.forEach(function(thing){
	        	addBack(keys[2], thing);
	        });

	        currentDay.addMarkersToMap();
	    }
	});
}

function deleteItin(id){
	$.ajax({
	    type: 'DELETE',
	    url: '/days/' + id,
	    // data: someDataToSend,
	    success: function (responseData) {
	        console.log('DELETE SUCCESS!!', responseData);
	    }
	});
}

function addBack(type, data){
	console.log('why is data undef?', type,":",data);
	currentDay.addActivity(type, data);
}

function deleteHotel(id, someDataToSend){
	$.ajax({
	    type: 'DELETE',
	    url: '/days/' + id+'/hotel/',
	    data: someDataToSend,
	    success: function (responseData) {
	        console.log('DELETE SUCCESS!!', responseData);
	    }
	});
}

