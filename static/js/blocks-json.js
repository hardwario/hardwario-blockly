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
        "helpUrl": "",
        "inputsInline": true,
        "colour": "#A50427"
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
        "helpUrl": "",
        "inputsInline": true,
        "colour": "#A50427"
    },
    {
        "type": "hio_task_do",
        "message0": "Task %1 %2 %3",
        "args0": [
            {
                "type": "field_variable",
                "name": "TASK_NAME",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": [
                    "Task"
                ],
                "defaultType": "Task"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        "tooltip": "Task",
        "helpUrl": "",
        "inputsInline": true,
        "colour": "#A50427"
    },
    {
        "type": "variables_get_task",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": [
                    "Task"
                ],
                "defaultType": "Task"
            }
        ],
        "output": "Task",
        "colour": "#A50427"
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
        "output": "Number",
        "colour": "#A55B80"
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
                "name": "VALUE",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A55B80"
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
        "output": "Number",
        "colour": "#A55B80"
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
                "name": "VALUE",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A55B80"
    },
    {
        "type": "variables_get_string",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": [
                    "String"
                ],
                "defaultType": "String"
            }
        ],
        "output": "String",
        "colour": "#5BA58C"
    },
    {
        "type": "variables_set_string",
        "message0": "%{BKY_VARIABLES_SET}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": [
                    "String"
                ],
                "defaultType": "String"
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "String"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5BA58C"
    },
    {
        "type": "hio_barometerTag_initialize",
        "message0": "Initialize Barometer Tag %1 With Update interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#AD6469",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_barometerTag_event",
        "message0": "On Barometer %1 %2 %3",
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
        "colour": "#AD6469",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_barometerTag_publish_barometer_value",
        "message0": "Publish Barometer Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#AD6469",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_battery_initialize",
        "message0": "Initialize Battery Module %1 With Update Interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#125f44",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#125f44",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_battery_publish_voltage",
        "message0": "Publish Battery Voltage Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#125f44",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_battery_publish_percentage",
        "message0": "Publish Battery Percentage Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#125f44",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                        "BUTTON",
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
                        "DOWN",
                        "TWR_GPIO_PULL_DOWN"
                    ],
                    [
                        "NONE",
                        "TWR_GPIO_PULL_NONE"
                    ],
                    [
                        "UP",
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
        "colour": "#1D5310",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#1D5310",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_button_publish_click_count",
        "message0": "Publish Button Click Count Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#1D5310",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_button_publish_hold_count",
        "message0": "Publish Button Hold Count Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#1D5310",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_climate_initialize",
        "message0": "Initialize Climate Module %1 With Update Interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#873467",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#873467",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_climate_publish_temperature",
        "message0": "Publish Climate Temperature Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#873467",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_climate_publish_humidity",
        "message0": "Publish Climate Humidity Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#873467",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_climate_publish_luminosity",
        "message0": "Publish Climate Luminosity Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#873467",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_climate_publish_barometer",
        "message0": "Publish Climate Pressure and Altitude Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#873467",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_co2_initialize",
        "message0": "Initialize CO2 Module %1 With Update Interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#844F19",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#844F19",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_co2_publish_co2",
        "message0": "Publish CO2 Value Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#844F19",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_coreTmp112_initialize",
        "message0": "Initialize Core Module Temperature Sensor %1 With Update interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#4A0C1B",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#4A0C1B",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_coreTmp112_publish_temperature_value",
        "message0": "Publish Core Temperature Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#4A0C1B",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_floodDetector_initialize",
        "message0": "Initialize Flood Detector %1 With Update interval (ms) %2 %3 On Sensor Module Channel %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "CHANNEL",
                "options": [
                    [
                        "A",
                        "TWR_FLOOD_DETECTOR_TYPE_LD_81_SENSOR_MODULE_CHANNEL_A"
                    ],
                    [
                        "B",
                        "TWR_FLOOD_DETECTOR_TYPE_LD_81_SENSOR_MODULE_CHANNEL_B"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5B3F4F",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_floodDetector_event",
        "message0": "On Flood Detector %1 %2 %3",
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
        "colour": "#5B3F4F",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_humidityTag_initialize",
        "message0": "Initialize Humidity Tag %1 Revision %2 With Update interval %3 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "REVISION",
                "options": [
                    [
                        "R1",
                        "TWR_TAG_HUMIDITY_REVISION_R1"
                    ],
                    [
                        "R2",
                        "TWR_TAG_HUMIDITY_REVISION_R2"
                    ],
                    [
                        "R3",
                        "TWR_TAG_HUMIDITY_REVISION_R3"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#336F87",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_humidityTag_event",
        "message0": "On Humidity %1 %2 %3",
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
        "colour": "#336F87",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_humidityTag_publish_humidity_value",
        "message0": "Publish Humidity Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#336F87",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_initialize",
        "message0": "Initialize LCD Module",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_draw_string",
        "message0": "Draw String on LCD %1 Pixels from Left %2 Pixels from Top %3",
        "args0": [
            {
                "type": "input_value",
                "name": "STRING",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TOP",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_draw_circle",
        "message0": "Draw Circle on LCD %1 Center: x: %2 y: %3 Radius: %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "CENTER_X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "CENTER_Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "RADIUS",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_draw_line",
        "message0": "Draw Line on LCD %1 Start: x: %2 y: %3 End: x: %4 y: %5",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "START_X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "START_Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "END_X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "END_Y",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_draw_rectangle",
        "message0": "Draw Rectangle on LCD %1 Start: x: %2 y: %3 End: x: %4 y: %5",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "START_X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "START_Y",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "END_X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "END_Y",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_draw_pixel",
        "message0": "Draw Pixel on LCD %1 Pixels from Left %2 Pixels from Top %3",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TOP",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_clear",
        "message0": "Clear LCD",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_update",
        "message0": "Update LCD",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_printf",
        "message0": "Print variable on LCD %1 Pixels from Left %2 Pixels from Top %3 Variable: %4",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "LEFT",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "TOP",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "VARIABLE"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                "type": "input_value",
                "name": "COUNT",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                        "BLINK",
                        "TWR_LED_MODE_BLINK"
                    ],
                    [
                        "BLINK FAST",
                        "TWR_LED_MODE_BLINK_FAST"
                    ],
                    [
                        "BLINK SLOW",
                        "TWR_LED_MODE_BLINK_SLOW"
                    ],
                    [
                        "FLASH",
                        "TWR_LED_MODE_FLASH"
                    ],
                    [
                        "OFF",
                        "TWR_LED_MODE_OFF"
                    ],
                    [
                        "ON",
                        "TWR_LED_MODE_ON"
                    ],
                    [
                        "TOGGLE",
                        "TWR_LED_MODE_TOGGLE"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_enable_pll",
        "message0": "Enable PLL",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_lcd_disable_pll",
        "message0": "Disable PLL",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5A1AA1",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_led_initialize",
        "message0": "Initialize LED",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#571E00",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_led_blink",
        "message0": "LED Blink %1 Times",
        "args0": [
            {
                "type": "input_value",
                "name": "COUNT",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#571E00",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_led_pulse",
        "message0": "LED Pulse For %1 ms",
        "args0": [
            {
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#571E00",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                        "BLINK",
                        "TWR_LED_MODE_BLINK"
                    ],
                    [
                        "BLINK FAST",
                        "TWR_LED_MODE_BLINK_FAST"
                    ],
                    [
                        "BLINK SLOW",
                        "TWR_LED_MODE_BLINK_SLOW"
                    ],
                    [
                        "FLASH",
                        "TWR_LED_MODE_FLASH"
                    ],
                    [
                        "OFF",
                        "TWR_LED_MODE_OFF"
                    ],
                    [
                        "ON",
                        "TWR_LED_MODE_ON"
                    ],
                    [
                        "TOGGLE",
                        "TWR_LED_MODE_TOGGLE"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#571E00",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#000000",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_logging_initialize",
        "message0": "Initialize Logging",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#052F38",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                "text": "info"
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
        "colour": "#008000",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                "text": "debug"
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
        "colour": "#BF40BF",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                "text": "error"
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
        "colour": "#FF0000",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                "text": "warning"
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
        "colour": "#FFA500",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_luxMeterTag_initialize",
        "message0": "Initialize Lux Meter Tag %1 With Update interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#2B8C3B",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_luxMeterTag_event",
        "message0": "On Lux Meter %1 %2 %3",
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
        "colour": "#2B8C3B",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_luxMeterTag_publish_lux_value",
        "message0": "Publish Lux Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#2B8C3B",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                        "LOW",
                        "TWR_MODULE_PIR_SENSITIVITY_LOW"
                    ],
                    [
                        "MEDIUM",
                        "TWR_MODULE_PIR_SENSITIVITY_MEDIUM"
                    ],
                    [
                        "HIGH",
                        "TWR_MODULE_PIR_SENSITIVITY_HIGH"
                    ],
                    [
                        "VERY HIGH",
                        "TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH"
                    ]
                ]
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5F5F0D",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#5F5F0D",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_pir_publish_motion_count",
        "message0": "Publish Motion Event Count Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#5F5F0D",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_power_initialize",
        "message0": "Initialize Power Module",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#64391F",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#64391F",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                        "SLEEPING",
                        "TWR_RADIO_MODE_NODE_SLEEPING"
                    ],
                    [
                        "LISTENING",
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
        "colour": "#C54F38",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_radio_send_string",
        "message0": "Send string %1 Over the Radio %2 with Subtopic %3",
        "args0": [
            {
                "type": "input_value",
                "name": "STRING_TO_BE_SEND",
                "check": "String"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SUBTOPIC",
                "check": "String"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#C54F38",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_radio_send_integer",
        "message0": "Send Integer %1 Over the Radio %2 with Subtopic %3",
        "args0": [
            {
                "type": "input_value",
                "name": "INT_TO_BE_SEND",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SUBTOPIC",
                "check": "String"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#C54F38",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_radio_send_float",
        "message0": "Send Float %1 Over the Radio %2 with Subtopic %3",
        "args0": [
            {
                "type": "input_value",
                "name": "FLOAT_TO_BE_SEND",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SUBTOPIC",
                "check": "String"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#C54F38",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_radio_send_boolean",
        "message0": "Send Boolean %1 Over the Radio %2 with Subtopic %3",
        "args0": [
            {
                "type": "input_value",
                "name": "BOOL_TO_BE_SEND",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "SUBTOPIC",
                "check": "String"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#C54F38",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                        "Default",
                        "TWR_MODULE_RELAY_I2C_ADDRESS_DEFAULT"
                    ],
                    [
                        "Alternate",
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
        "colour": "#A01D09",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
        "colour": "#A01D09",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
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
                "type": "input_value",
                "name": "DURATION",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A01D09",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_relay_toggle",
        "message0": "Relay Toggle",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A01D09",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_task_run_application_task",
        "message0": "Run Application Task Now",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A50427",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_task_run_task_now",
        "message0": "Run Task %1 Now",
        "args0": [
            {
                "type": "input_value",
                "name": "TASK",
                "check": "Task"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A50427",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_task_run_task_in_time",
        "message0": "Run Task %1 %2 ms From Now",
        "args0": [
            {
                "type": "input_value",
                "name": "TASK",
                "check": "Task"
            },
            {
                "type": "field_number",
                "name": "TIME",
                "value": 5000,
                "min": 1,
                "max": 1000000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A50427",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_task_run_current_task_now",
        "message0": "Run Current Task Now",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A50427",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_task_run_current_task_in_time",
        "message0": "Run Current Task %1 ms From Now",
        "args0": [
            {
                "type": "field_number",
                "name": "TIME",
                "value": 5000,
                "min": 1,
                "max": 1000000
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#A50427",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_temperatureTag_initialize",
        "message0": "Initialize Temperature Tag %1 With Update interval %2 ms",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "UPDATE_INTERVAL",
                "check": "Number"
            }
        ],
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#733794",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_temperatureTag_event",
        "message0": "On Temperature %1 %2 %3",
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
        "colour": "#733794",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    },
    {
        "type": "hio_temperatureTag_publish_temperature_value",
        "message0": "Publish Temperature Over the Radio",
        "previousStatement": "null",
        "nextStatement": "null",
        "colour": "#733794",
        "tooltip": "",
        "helpUrl": "",
        "inputsInline": true
    }
]);