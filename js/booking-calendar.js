(function ($, Drupal) {
  Drupal.behaviors.bookingCalendar = {
    attach: function (context, settings) {
      const calendarEl = document.getElementById('booking-calendar');
      if (!calendarEl || calendarEl.classList.contains('fc')) return;

      // Ensure we get settings safely
      const config = settings.webform_booking_fullcalendar || {};
      const targetWebformId = config.webform_id || 'booking';
      
      // Calculate slot duration format (HH:mm:ss) from minutes
      const durationMinutes = parseInt(config.slot_duration || 60, 10);
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      const formattedDuration = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':00';

      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridDay,timeGridWeek'
        },
        events: settings.webform_bookings || [],
        
        // Dynamically apply the calculated duration (e.g., '01:00:00' or '00:30:00')
        slotDuration: formattedDuration, 
        
        dateClick: function(info) {
          const cleanDate = info.dateStr.split('+')[0].replace('T', ' ');
          const formUrl = '/form/' + targetWebformId + '?booking_auto=' + encodeURIComponent(cleanDate);
          
          window.open(formUrl, '_blank');
        }
      });
      calendar.render();
    }
  };
})(jQuery, Drupal);