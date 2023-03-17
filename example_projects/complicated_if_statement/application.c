#include <application.h>

twr_button_t button;

void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
{
    if (event == TWR_BUTTON_EVENT_PRESS)
    {
        if ((0) == (0))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((0) != (0))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((0) < (0))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((0) <= (0))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((0) > (0))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((0) >= (0))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((true) && (true))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((true) || (true))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if (((!(true))) && (true))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((!(((0) + (0)) == ((0) - (0)))))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if (((0) * (0)) == ((0) / (5)))
        {
            twr_radio_pub_string("string", "STRING");
        }
        else if ((pow((0), (0))) == (pow((0), (0))))
        {
            twr_radio_pub_string("string", "STRING");
        }

        else
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
