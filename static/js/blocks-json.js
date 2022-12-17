Blockly.defineBlocksWithJsonArray([
    {
        "type": "hio_application_initialize",
        "message0": "Application Initialization %1 %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "Application Initialization",
        "helpUrl": ""
    },
    {
        "type": "hio_application_task",
        "message0": "Application Task %1 Repeat every %2 ms %3 %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "TASK_INTERVAL",
                "value": 1000,
                "min": 100
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "Application Task",
        "helpUrl": ""
    },
    {
        "type": "variables_get_integer",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": [
                    "Integer"
                ],
                "defaultType": "Integer"
            }
        ],
        "output": "Number"
    },
    {
        "type": "variables_set_integer",
        "message0": "%{BKY_VARIABLES_SET}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": [
                    "Integer"
                ],
                "defaultType": "Integer"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null"
    },
    {
        "type": "variables_get_float",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": [
                    "Float"
                ],
                "defaultType": "Float"
            }
        ],
        "output": "Number"
    },
    {
        "type": "variables_set_float",
        "message0": "%{BKY_VARIABLES_SET}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": [
                    "Float"
                ],
                "defaultType": "Float"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null"
    },
    {
        "type": "hio_battery_initialize",
        "message0": "Initialize Battery Module %1 With Update Interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "UPDATE_INTERVAL",
                "value": 5000,
                "min": 1,
                "max": 1000000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_battery_event",
        "message0": "On Battery Module %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    [
                        "UPDATE",
                        "UPDATE"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "colour": "#FE45DD",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_battery_publish_voltage",
        "message0": "Publish Battery Voltage Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_button_initialize",
        "message0": "Initialize Button %1 Button GPIO %2 %3 Button Pull %4 %5 Default State %6",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "GPIO",
                "options": [
                    [
                        "TWR_GPIO_BUTTON",
                        "TWR_GPIO_BUTTON"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "PULL",
                "options": [
                    [
                        "TWR_GPIO_PULL_DOWN",
                        "TWR_GPIO_PULL_DOWN"
                    ],
                    [
                        "TWR_GPIO_PULL_NONE",
                        "TWR_GPIO_PULL_NONE"
                    ],
                    [
                        "TWR_GPIO_PULL_UP",
                        "TWR_GPIO_PULL_UP"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "DEFAULT_STATE",
                "options": [
                    [
                        "TRUE",
                        "TRUE"
                    ],
                    [
                        "FALSE",
                        "FALSE"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_button_event",
        "message0": "On Button %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    [
                        "PRESS",
                        "PRESS"
                    ],
                    [
                        "RELEASE",
                        "RELEASE"
                    ],
                    [
                        "CLICK",
                        "CLICK"
                    ],
                    [
                        "HOLD",
                        "HOLD"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_button_publish_click_count",
        "message0": "Publish Button Click Count Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_button_publish_hold_count",
        "message0": "Publish Button Hold Count Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_climate_initialize",
        "message0": "Initialize Climate Module %1 With Update Interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "UPDATE_INTERVAL",
                "value": 5000,
                "min": 1,
                "max": 1000000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_climate_event",
        "message0": "On Climate Module %1 Update %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    [
                        "THERMOMETER",
                        "THERMOMETER"
                    ],
                    [
                        "HYGROMETER",
                        "HYGROMETER"
                    ],
                    [
                        "LUX_METER",
                        "LUX_METER"
                    ],
                    [
                        "BAROMETER",
                        "BAROMETER"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_climate_publish_temperature",
        "message0": "Publish Climate Temperature Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_climate_publish_humidity",
        "message0": "Publish Climate Humidity Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_climate_publish_luminosity",
        "message0": "Publish Climate Luminosity Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_climate_publish_barometer",
        "message0": "Publish Climate Pressure and Altitude Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_co2_initialize",
        "message0": "Initialize CO2 Module %1 With Update Interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "UPDATE_INTERVAL",
                "value": 5000,
                "min": 1,
                "max": 1000000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_co2_event",
        "message0": "On CO2 Module %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    [
                        "UPDATE",
                        "UPDATE"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_co2_publish_co2",
        "message0": "Publish CO2 Value Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_coreTmp112_initialize",
        "message0": "Initialize Core Module Temperature Sensor %1 With Update interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "UPDATE_INTERVAL",
                "value": 5000,
                "min": 1,
                "max": 1000000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_coreTmp112_event",
        "message0": "On Core Temperature %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    [
                        "UPDATE",
                        "UPDATE"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_coreTmp112_publish_temperature_value",
        "message0": "Publish Core Temperature Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_initialize",
        "message0": "Initialize LCD Module",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_event",
        "message0": "On LCD Button %1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    [
                        "LEFT_PRESS",
                        "LEFT_PRESS"
                    ],
                    [
                        "LEFT_RELEASE",
                        "LEFT_RELEASE"
                    ],
                    [
                        "LEFT_CLICK",
                        "LEFT_CLICK"
                    ],
                    [
                        "LEFT_HOLD",
                        "LEFT_HOLD"
                    ],
                    [
                        "RIGHT_PRESS",
                        "RIGHT_PRESS"
                    ],
                    [
                        "RIGHT_RELEASE",
                        "RIGHT_RELEASE"
                    ],
                    [
                        "RIGHT_CLICK",
                        "RIGHT_CLICK"
                    ],
                    [
                        "RIGHT_HOLD",
                        "RIGHT_HOLD"
                    ],
                    [
                        "BOTH_HOLD",
                        "BOTH_HOLD"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_draw_string",
        "message0": "Draw String %1 on LCD %2 %3 Pixels from Left %4 %5 Pixels from Top",
        "args0": [
            {
                "type": "field_input",
                "name": "STRING",
                "text": "string"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "LEFT",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "TOP",
                "value": 0,
                "min": 0,
                "max": 128
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_draw_circle",
        "message0": "Draw Circle on LCD %1 Center: x: %2 y: %3 %4 Radius: %5",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "CENTER_X",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "field_number",
                "name": "CENTER_Y",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "RADIUS",
                "value": 0,
                "min": 0,
                "max": 128
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_draw_line",
        "message0": "Draw Line on LCD %1 Start: x: %2 y: %3 %4 End: x: %5 y: %6",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "START_X",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "field_number",
                "name": "START_Y",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "END_X",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "field_number",
                "name": "END_Y",
                "value": 0,
                "min": 0,
                "max": 128
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_draw_rectangle",
        "message0": "Draw Rectangle on LCD %1 Start: x: %2 y: %3 %4 End: x: %5 y: %6",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "START_X",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "field_number",
                "name": "START_Y",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "END_X",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "field_number",
                "name": "END_Y",
                "value": 0,
                "min": 0,
                "max": 128
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_draw_pixel",
        "message0": "Draw Pixel on LCD %1 %2 Pixels from Left %3 %4 Pixels from Top",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "LEFT",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "TOP",
                "value": 0,
                "min": 0,
                "max": 128
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_set_power_state",
        "message0": "Turn LCD %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    [
                        "ON",
                        "on"
                    ],
                    [
                        "OFF",
                        "off"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_clear",
        "message0": "Clear LCD",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_update",
        "message0": "Update LCD",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_set_font",
        "message0": "Set LCD Font Size to %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "FONT",
                "options": [
                    [
                        "11",
                        "twr_font_ubuntu_11"
                    ],
                    [
                        "13",
                        "twr_font_ubuntu_13"
                    ],
                    [
                        "15",
                        "twr_font_ubuntu_15"
                    ],
                    [
                        "24",
                        "twr_font_ubuntu_24"
                    ],
                    [
                        "28",
                        "twr_font_ubuntu_28"
                    ],
                    [
                        "33",
                        "twr_font_ubuntu_33"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_printf",
        "message0": "Print variable on LCD %1 %2 Pixels from Left %3 %4 Pixels from Top %5 Variable: %6",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "LEFT",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "TOP",
                "value": 0,
                "min": 0,
                "max": 128
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_led_blink",
        "message0": "LCD %1 LED Blink %2 Times",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LED",
                "options": [
                    [
                        "RED",
                        "lcdLedRed"
                    ],
                    [
                        "GREEN",
                        "lcdLedGreen"
                    ],
                    [
                        "BLUE",
                        "lcdLedBlue"
                    ]
                ]
            },
            {
                "type": "field_number",
                "name": "COUNT",
                "value": 5,
                "min": 1,
                "max": 50
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_led_pulse",
        "message0": "LCD %1 LED Pulse for %2 ms",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LED",
                "options": [
                    [
                        "RED",
                        "lcdLedRed"
                    ],
                    [
                        "GREEN",
                        "lcdLedGreen"
                    ],
                    [
                        "BLUE",
                        "lcdLedBlue"
                    ]
                ]
            },
            {
                "type": "field_number",
                "name": "DURATION",
                "value": 1000,
                "min": 1,
                "max": 1000000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_lcd_led_set_mode",
        "message0": "Set LCD %1 LED mode to %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "LED",
                "options": [
                    [
                        "RED",
                        "lcdLedRed"
                    ],
                    [
                        "GREEN",
                        "lcdLedGreen"
                    ],
                    [
                        "BLUE",
                        "lcdLedBlue"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "MODE",
                "options": [
                    [
                        "TWR_LED_MODE_BLINK",
                        "TWR_LED_MODE_BLINK"
                    ],
                    [
                        "TWR_LED_MODE_BLINK_FAST",
                        "TWR_LED_MODE_BLINK_FAST"
                    ],
                    [
                        "TWR_LED_MODE_BLINK_SLOW",
                        "TWR_LED_MODE_BLINK_SLOW"
                    ],
                    [
                        "TWR_LED_MODE_FLASH",
                        "TWR_LED_MODE_FLASH"
                    ],
                    [
                        "TWR_LED_MODE_OFF",
                        "TWR_LED_MODE_OFF"
                    ],
                    [
                        "TWR_LED_MODE_ON",
                        "TWR_LED_MODE_ON"
                    ],
                    [
                        "TWR_LED_MODE_TOGGLE",
                        "TWR_LED_MODE_TOGGLE"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_led_initialize",
        "message0": "Initialize LED",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_led_blink",
        "message0": "LED Blink %1 Times",
        "args0": [
            {
                "type": "field_number",
                "name": "COUNT",
                "value": 5,
                "min": 1,
                "max": 50
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_led_pulse",
        "message0": "LED Pulse For %1 ms",
        "args0": [
            {
                "type": "field_number",
                "name": "DURATION",
                "value": 1000,
                "min": 1,
                "max": 1000000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_led_set_mode",
        "message0": "Set LED Mode To %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MODE",
                "options": [
                    [
                        "TWR_LED_MODE_BLINK",
                        "TWR_LED_MODE_BLINK"
                    ],
                    [
                        "TWR_LED_MODE_BLINK_FAST",
                        "TWR_LED_MODE_BLINK_FAST"
                    ],
                    [
                        "TWR_LED_MODE_BLINK_SLOW",
                        "TWR_LED_MODE_BLINK_SLOW"
                    ],
                    [
                        "TWR_LED_MODE_FLASH",
                        "TWR_LED_MODE_FLASH"
                    ],
                    [
                        "TWR_LED_MODE_OFF",
                        "TWR_LED_MODE_OFF"
                    ],
                    [
                        "TWR_LED_MODE_ON",
                        "TWR_LED_MODE_ON"
                    ],
                    [
                        "TWR_LED_MODE_TOGGLE",
                        "TWR_LED_MODE_TOGGLE"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_ledStrip_initialize",
        "message0": "Initialize LED Strip %1 Number of LEDs %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "LEDS",
                "options": [
                    [
                        "36",
                        "36"
                    ],
                    [
                        "72",
                        "72"
                    ],
                    [
                        "144",
                        "144"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_logging_initialize",
        "message0": "Initialize Logging",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_logging_info",
        "message0": "Log Info %1 Message: %2 %3 Variable %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "MESSAGE",
                "text": "Info"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "VARIABLE"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_logging_debug",
        "message0": "Log Debug %1 Message: %2 %3 Variable %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "MESSAGE",
                "text": "Debug"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "VARIABLE"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_logging_error",
        "message0": "Log Error %1 Message: %2 %3 Variable %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "MESSAGE",
                "text": "Error"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "VARIABLE"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_logging_warning",
        "message0": "Log Warning %1 Message: %2 %3 Variable %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "MESSAGE",
                "text": "Warning"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "VARIABLE"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_pir_initialize",
        "message0": "Initialize Motion Detector %1 With Sensitivity %2",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "SENSITIVITY",
                "options": [
                    [
                        "TWR_MODULE_PIR_SENSITIVITY_LOW",
                        "TWR_MODULE_PIR_SENSITIVITY_LOW"
                    ],
                    [
                        "TWR_MODULE_PIR_SENSITIVITY_MEDIUM",
                        "TWR_MODULE_PIR_SENSITIVITY_MEDIUM"
                    ],
                    [
                        "TWR_MODULE_PIR_SENSITIVITY_HIGH",
                        "TWR_MODULE_PIR_SENSITIVITY_HIGH"
                    ],
                    [
                        "TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH",
                        "TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_pir_event",
        "message0": "On %1 Detected %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": [
                    [
                        "MOTION",
                        "MOTION"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_pir_publish_motion_count",
        "message0": "Publish Motion Event Count Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_power_initialize",
        "message0": "Initialize Power Module",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_power_relay_state_set",
        "message0": "Power Module Relay Set State %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    [
                        "ON",
                        "true"
                    ],
                    [
                        "OFF",
                        "false"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_radio_initialize",
        "message0": "Initialize Radio %1 Radio Mode %2 %3 Firmware Name %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "RADIO_MODE",
                "options": [
                    [
                        "TWR_RADIO_MODE_NODE_SLEEPING",
                        "TWR_RADIO_MODE_NODE_SLEEPING"
                    ],
                    [
                        "TWR_RADIO_MODE_NODE_LISTENING",
                        "TWR_RADIO_MODE_NODE_LISTENING"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "FIRMWARE_NAME",
                "text": "twr-blockly-firmware"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_radio_send_string",
        "message0": "Send string %1 Over the Radio %2 with Subtopic %3",
        "args0": [
            {
                "type": "field_input",
                "name": "STRING_TO_BE_SEND",
                "text": "STRING"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "SUBTOPIC",
                "text": "string"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_radio_send_integer",
        "message0": "Send Integer %1 Over the Radio %2 with Subtopic %3",
        "args0": [
            {
                "type": "input_value",
                "name": "INT_TO_BE_SEND"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "SUBTOPIC",
                "text": "integer"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_radio_send_float",
        "message0": "Send Float %1 Over the Radio %2 with Subtopic %3",
        "args0": [
            {
                "type": "input_value",
                "name": "INT_TO_BE_SEND"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "SUBTOPIC",
                "text": "float"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_radio_send_boolean",
        "message0": "Send Boolean %1 Over the Radio %2 with Subtopic %3",
        "args0": [
            {
                "type": "input_value",
                "name": "BOOL_TO_BE_SEND"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "SUBTOPIC",
                "text": "string"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_relay_initialize",
        "message0": "Initialize Relay Module on address %1 %2 With defult state %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "ADDRESS",
                "options": [
                    [
                        "TWR_MODULE_RELAY_I2C_ADDRESS_DEFAULT",
                        "TWR_MODULE_RELAY_I2C_ADDRESS_DEFAULT"
                    ],
                    [
                        "TWR_MODULE_RELAY_I2C_ADDRESS_ALTERNATE",
                        "TWR_MODULE_RELAY_I2C_ADDRESS_ALTERNATE"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "DEFAULT_STATE",
                "options": [
                    [
                        "TRUE",
                        "true"
                    ],
                    [
                        "FALSE",
                        "false"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_relay_set_state",
        "message0": "Set Relay State %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    [
                        "TRUE",
                        "true"
                    ],
                    [
                        "FALSE",
                        "false"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_relay_pulse",
        "message0": "Relay Send Pulse with Direction %1 %2 For %3 ms",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "DIRECTION",
                "options": [
                    [
                        "TRUE",
                        "true"
                    ],
                    [
                        "FALSE",
                        "false"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "DURATION",
                "value": 100,
                "min": 0,
                "max": 5000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "hio_relay_toggle",
        "message0": "Relay Toggle",
        "previousStatement": "null",
        "nextStatement": "null",
        "tooltip": "",
        "helpUrl": ""
    }
]);