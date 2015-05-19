var days = []
var currentDay
var Day = function() {
  this.dayNum = days.length + 1
  this.drawDayBtn()
  this.drawDayPanel()
  this.hotels = []
  this.restaurants = []
  this.thingsToDo = []
  this.markers = []
}

Day.prototype.clearMarkersFromMap = function() {
  this.markers.forEach(function(marker) {
    marker.setMap(null)
  })
}
Day.prototype.addMarkersToMap = function() {
  this.markers.forEach(function(marker) {
    marker.setMap(map)
  })
}

Day.prototype.drawDayPanel = function() {
  this.$dayPanel = templates.get('day-panel');
  this.$dayPanel.append(this.dayNum);
}

Day.prototype.addActivity = function(type, activity) {
  var $list = $('#itinerary  .' + type + '-group')
 
  $listItem = templates.get('itinerary-item')
  $listItem.find('.title').text(activity.name)
  $list.append($listItem)

  var marker = drawLocation(activity.place[0].location)
  this.markers.push(marker)
  //find the right ul
  //get a new template
  //populate it
  //put it in the right ul
}

Day.prototype.clear = function(){
  var group = ["hotels", "restaurants", "thingsToDo"];
  group.forEach(function(element){
    $('#itinerary  .'+ element+'-group').html('');
  })
}

Day.prototype.drawDayBtn = function() {
  var self = this;

  var $dayBtn = templates.get('day-btn')//$('<button class="btn btn-circle day-btn">' + this.dayNum + '</button>')
  $dayBtn.text(this.dayNum)
  $('#add-day').before($dayBtn)

  $dayBtn.on('click', function() {
    // highlight the clicked button
    $('.current-day').removeClass('current-day');
    $(this).addClass('current-day');

    // render that day header
    var id = $(this).text();
    setDay(id);

    // clear markers from old day
    if(currentDay) currentDay.clearMarkersFromMap()
    currentDay = self

    // add markers to new day
    currentDay.addMarkersToMap()
    $('#itinerary #day-panel').replaceWith(self.$dayPanel);

    // clear old stuff
    self.clear();

    // render new stuff
    getDaysOnId(id);

  })
};


Day.prototype.removeItin = function(){
  this.clear();
  var id = this.dayNum;
  deleteItin(id);
};

function setDay(day){
  $('#day-title span').text("Day " + day);
}

$('#add-day').on('click', function() {
  days.push(new Day())
})

$("#remove").on("click", function(){
  currentDay.removeItin();
  currentDay = days[currentDay.dayNum-2];
  setDay(currentDay.dayNum);
  getDaysOnId(currentDay.dayNum);
  // currentDay.addActivity();

  days.splice(currentDay.dayNum-1, 1);
  $('.current-day').parent().find('.current-day').remove();
});


$(".panel-item").on('click', 'button', function(){
  // delete the individual activity from the database
  console.log('WHY YOU NO WORK!!!!');
  console.log('INNN DELETE');
  console.log('this is current day', currentDay.dayNum);
  deleteHotel(currentDay.dayNum);
  // delete from the DOM
  //
})


function deleteMe(self){
  console.log('WASSUP!!!!!!!!!!!!', $(self))
  deleteHotel(currentDay.dayNum, $(this));
}


