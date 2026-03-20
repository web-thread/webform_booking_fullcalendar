WEBFORM BOOKING FULLCALENDAR
----------------------------

INTRODUCTION
------------
The Webform Booking FullCalendar module extends the functionality of the 
Webform Booking module. It provides an interactive, Google Calendar-style 
administrative dashboard to view all submitted bookings. 

It also includes an auto-selection feature: clicking an empty date or time 
slot on the administrative calendar will open a new tab and automatically 
fill out the Webform for that specific slot, making phone or in-person 
booking entries seamless for site administrators.

REQUIREMENTS
------------
This module requires the following modules:
* Webform (https://www.drupal.org/project/webform)
* Webform Booking (https://www.drupal.org/project/webform_booking)
* Views (Drupal Core)

INSTALLATION
------------
1. Install as you would normally install a contributed Drupal module. 
2. Ensure you have the Webform Booking module installed and configured.

CONFIGURATION
-------------
1. Navigate to Administration > Configuration > System > Webform Booking FullCalendar 
   (/admin/config/system/webform-booking-fullcalendar).
2. Enter the machine name of your target booking Webform.
3. Enter the Slot Duration (in minutes) to match your Webform Booking element settings.
4. Go to your Webform's Form Settings (/admin/structure/webform/manage/[your_form_id]/settings/form)
   and check the box for "Allow all elements to be populated using query string parameters".

USAGE
-----
* The calendar dashboard is automatically created via a View. You can access it at:
  /admin/structure/webform/bookings-calendar
* Click on any empty day (in Month view) or specific hour (in Week/Day view) to 
  open the webform and auto-select that slot.
* Click on an existing booking to view the submission details.

MAINTAINERS
-----------
Current maintainers:
* Alexandros Pertsinidis (alexpertsi) - https://www.drupal.org/u/alexpertsi - https://web-thread.com

LICENCE
-----------
This project is licensed under the GNU General Public License, version 2 or later.
See [LICENSE.txt](LICENSE.txt) for the full license text.