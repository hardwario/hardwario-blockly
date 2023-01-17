#include <application.h>

twr_button_t button;
twr_tmp112_t core_tmp112;
float core_module_temperature_gRsDc = 9999;

void core_tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)
{
    if (event == TWR_TMP112_EVENT_UPDATE)
    {
        twr_tmp112_get_temperature_celsius(self, &core_module_temperature_gRsDc);
    }
}

void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
{
    if (event == TWR_BUTTON_EVENT_PRESS)
    {
        twr_log_info("Info");
        twr_log_warning("Warning");
        twr_log_debug("Debug");
        twr_log_error("Error");
        twr_log_debug("Debug %.2f", core_module_temperature_gRsDc);
    }
}

void application_init(void)
{
    twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, 0);
    twr_button_set_event_handler(&button, button_event_handler, NULL);

    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);
    twr_log_info("APPLICATION START");

    twr_tmp112_init(&core_tmp112, TWR_I2C_I2C0, 0x49);
    twr_tmp112_set_event_handler(&core_tmp112, core_tmp112_event_handler, NULL);
    twr_tmp112_set_update_interval(&core_tmp112, 5000);
}