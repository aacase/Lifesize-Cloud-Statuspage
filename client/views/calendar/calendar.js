Template['calendar'].helpers({
});

Template['calendar'].events({
});


Template.calendar.rendered= function  () {
// 	var eventarray=[]	
// incidentCalendar.find().forEach(function(obj){
//     eventarray.push({title: obj.title, start: obj.createdAt})
// })
	$('.ui.modal.calendarModal').modal({onVisible: function () {
        $('.ui.modal.calendarModal').modal("refresh");
    }
	})

};

