<?php

namespace Drupal\webform_booking_fullcalendar\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Configure Webform Booking FullCalendar settings.
 */
class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'webform_booking_fullcalendar_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['webform_booking_fullcalendar.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('webform_booking_fullcalendar.settings');

    $form['help_text'] = [
      '#type' => 'markup',
      '#markup' => '<h3>Setup Instructions</h3>
        <p>Follow these steps to ensure the calendar works perfectly:</p>
        <ol>
          <li>Ensure your Webform has an element with the machine key <strong>booking</strong>.</li>
          <li>Go to your <a href="/admin/structure/webform/manage/' . ($config->get('webform_id') ?: 'booking') . '/settings/form" target="_blank">Webform Form Settings</a> and check <strong>Allow all elements to be populated using query string parameters</strong>.</li>
          <li>You can edit the View that generates the data here: <a href="/admin/structure/views/view/booking_admin_calendar" target="_blank">Edit Booking View</a>.</li>
          <li>View your actual calendar here: <a href="/admin/structure/webform/bookings-calendar" target="_blank">Go to Calendar</a>.</li>
        </ol>',
    ];

    $form['webform_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Webform Machine Name'),
      '#description' => $this->t('Enter the machine name of the webform used for bookings (e.g., <em>booking</em>).'),
      '#default_value' => $config->get('webform_id') ?: 'booking',
      '#required' => TRUE,
    ];

    $form['slot_duration'] = [
      '#type' => 'number',
      '#title' => $this->t('Slot Duration (minutes)'),
      '#description' => $this->t('Enter the duration of each time slot in minutes to match your Webform Booking element setting.<br><strong>Note:</strong> If you change this value, you must: <ol><li>Clear your Drupal caches.</li><li>Do a Hard Refresh (Ctrl+F5 or Cmd+Shift+R) on your admin calendar page.</li></ol>'),
      '#default_value' => $config->get('slot_duration') ?: 60,
      '#min' => 10,
      '#max' => 1440,
      '#required' => TRUE,
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('webform_booking_fullcalendar.settings')
      ->set('webform_id', $form_state->getValue('webform_id'))
      ->set('slot_duration', $form_state->getValue('slot_duration')) // Save the new setting
      ->save();
    parent::submitForm($form, $form_state);
  }

}