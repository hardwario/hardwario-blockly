#include <application.h>

twr_button_t button;
int i = 0;

void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
{
    if (event == TWR_BUTTON_EVENT_PRESS)
    {
        for (int w1sybIfxao3Y = 0; w1sybIfxao3Y < ((0) + (10)); w1sybIfxao3Y++)
        {
            twr_radio_pub_string("string", "STRING");
        }
        while (false)
        {
            twr_radio_pub_string("string", "STRING");
        }
        for (i = (6); i < (40); i += (3))
        {
            twr_radio_pub_string("string", "STRING");
        }
    }
}

void application_init(void)
{
    twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, 0);
    twr_button_set_event_handler(&button, button_event_handler, NULL);

    twr_radio_init(TWR_RADIO_MODE_NODE_SLEEPING);
    twr_radio_pairing_request("twr-blockly-firmware", "1.0.0");
}