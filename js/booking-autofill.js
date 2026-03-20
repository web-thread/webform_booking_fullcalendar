(function ($, Drupal) {
  Drupal.behaviors.bookingAutofill = {
    attach: function (context) {
      if (window.bookingAutofillHasRun) return;

      const urlParams = new URLSearchParams(window.location.search);
      const bookingData = urlParams.get('booking_auto');

      if (bookingData) {
        window.bookingAutofillHasRun = true; 
        
        // Split the data. It might be "2026-03-26 09:00:00" or just "2026-03-26"
        const parts = bookingData.split(' ');
        const targetDate = parts[0];
        let targetTime = parts[1]; // Might be undefined

        // If time exists, ensure it's strictly HH:mm (cut off the seconds)
        if (targetTime && targetTime.length > 5) {
          targetTime = targetTime.substring(0, 5); 
        }

        // 1. Poll for the Date element
        let dateAttempts = 0;
        const dateInterval = setInterval(() => {
          dateAttempts++;
          const $dateElement = $(`.calendar-day[data-date="${targetDate}"]`, context);
          
          if ($dateElement.length && !$dateElement.hasClass('past-date') && !$dateElement.hasClass('empty')) {
            clearInterval(dateInterval); 
            
            // Native DOM click is often more reliable for custom modules
            $dateElement.get(0).click(); 

            // 2. If a specific time was clicked, poll for the Time Slot
            if (targetTime) {
              let slotAttempts = 0;
              const slotInterval = setInterval(() => {
                slotAttempts++;
                
                // Now looking for exactly "09:00"
                const $slotElement = $(`.calendar-slot[data-time="${targetTime}"]`, context);
                
                if ($slotElement.length && $slotElement.hasClass('available')) {
                  clearInterval(slotInterval); 
                  
                  // Click the slot natively!
                  $slotElement.get(0).click(); 

                  // Force the hidden input just in case
                  setTimeout(() => {
                    const $inputField = $('#selected-slot-booking');
                    if ($inputField.length && !$inputField.val()) {
                       $inputField.val(`${targetDate} ${targetTime}`).trigger('change');
                    }
                  }, 300);

                } else if (slotAttempts > 20) {
                  clearInterval(slotInterval); 
                }
              }, 250);
            }
          } else if (dateAttempts > 40) {
            clearInterval(dateInterval); 
          }
        }, 250);
      }
    }
  };
})(jQuery, Drupal);