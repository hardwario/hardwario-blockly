Blockly.Blocks['hio_application_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Application Initialization");
    this.appendStatementInput("BLOCKS")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_button_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize Button");
    this.appendDummyInput()
      .appendField("Button GPIO")
      .appendField(new Blockly.FieldDropdown([["TWR_GPIO_BUTTON", "TWR_GPIO_BUTTON"]]), "GPIO");
    this.appendDummyInput()
      .appendField("Button pull")
      .appendField(new Blockly.FieldDropdown([["TWR_GPIO_PULL_DOWN", "TWR_GPIO_PULL_DOWN"], ["TWR_GPIO_PULL_NONE", "TWR_GPIO_PULL_NONE"], ["TWR_GPIO_PULL_UP", "TWR_GPIO_PULL_UP"]]), "PULL");
    this.appendDummyInput()
      .appendField("Default State")
      .appendField(new Blockly.FieldDropdown([["TRUE", "TRUE"], ["FALSE", "FALSE"]]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_button_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("On Button")
      .appendField(new Blockly.FieldDropdown([["PRESS", "PRESS"], ["RELEASE", "RELEASE"], ["CLICK", "CLICK"], ["HOLD", "HOLD"]]), "NAME");
    this.appendStatementInput("BLOCKS")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_radio_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize Radio");
    this.appendDummyInput()
      .appendField("Radio Mode")
      .appendField(new Blockly.FieldDropdown([["TWR_RADIO_MODE_NODE_SLEEPING", "TWR_RADIO_MODE_NODE_SLEEPING"], ["TWR_RADIO_MODE_NODE_LISTENING", "TWR_RADIO_MODE_NODE_LISTENING"]]), "RADIO_MODE");
    this.appendDummyInput()
      .appendField("Firmware Name")
      .appendField(new Blockly.FieldTextInput("twr-blockly-firmware"), "FIRMWARE_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_radio_send_string'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Send")
      .appendField(new Blockly.FieldTextInput("STRING"), "STRING_TO_BE_SEND")
      .appendField("over the radio");
    this.appendDummyInput()
      .appendField("with subtopic")
      .appendField(new Blockly.FieldTextInput("string"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_radio_send_integer'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Send")
      .appendField(new Blockly.FieldTextInput("1"), "INT_TO_BE_SEND")
      .appendField("over the radio");
    this.appendDummyInput()
      .appendField("with subtopic")
      .appendField(new Blockly.FieldTextInput("int"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_radio_send_float'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Send")
      .appendField(new Blockly.FieldTextInput("1.0"), "FLOAT_TO_BE_SEND")
      .appendField("over the radio");
    this.appendDummyInput()
      .appendField("with subtopic")
      .appendField(new Blockly.FieldTextInput("float"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_radio_send_boolean'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Send")
      .appendField(new Blockly.FieldDropdown([["true", "true"], ["false", "false"]]), "BOOL_TO_BE_SEND")
      .appendField("over the radio");
    this.appendDummyInput()
      .appendField("with subtopic")
      .appendField(new Blockly.FieldTextInput("bool"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_led_blink'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("LED Blink")
      .appendField(new Blockly.FieldTextInput("1"), "COUNT")
      .appendField("times");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_led_pulse'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("LED Pulse for")
      .appendField(new Blockly.FieldTextInput("1000"), "DURATION")
      .appendField("milliseconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_led_set_mode'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set LED mode to")
      .appendField(new Blockly.FieldDropdown([["TWR_LED_MODE_BLINK", "TWR_LED_MODE_BLINK"], ["TWR_LED_MODE_BLINK_FAST", "TWR_LED_MODE_BLINK_FAST"], ["TWR_LED_MODE_BLINK_SLOW", "TWR_LED_MODE_BLINK_SLOW"], ["TWR_LED_MODE_FLASH", "TWR_LED_MODE_FLASH"], ["TWR_LED_MODE_OFF", "TWR_LED_MODE_OFF"], ["TWR_LED_MODE_ON", "TWR_LED_MODE_ON"], ["TWR_LED_MODE_TOGGLE", "TWR_LED_MODE_TOGGLE"]]), "MODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_button_publish_event_count'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Publish button event over the radio");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_led_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize LED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_logging_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize Logging");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_logging_info'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Log Info");
    this.appendDummyInput()
      .appendField("Message:")
      .appendField(new Blockly.FieldTextInput("Info"), "MESSAGE");
    this.appendValueInput("VARIABLE")
      .setCheck(null)
      .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_logging_warning'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Log Warning");
    this.appendDummyInput()
      .appendField("Message:")
      .appendField(new Blockly.FieldTextInput("Warning"), "MESSAGE");
    this.appendValueInput("VARIABLE")
      .setCheck(null)
      .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_logging_debug'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Log Debug");
    this.appendDummyInput()
      .appendField("Message:")
      .appendField(new Blockly.FieldTextInput("Debug"), "MESSAGE");
    this.appendValueInput("VARIABLE")
      .setCheck(null)
      .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_logging_error'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Log Error");
    this.appendDummyInput()
      .appendField("Message:")
      .appendField(new Blockly.FieldTextInput("Error"), "MESSAGE");
    this.appendValueInput("VARIABLE")
      .setCheck(null)
      .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_core_tmp112_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize Core Module Temperature Sensor");
    this.appendDummyInput()
      .appendField("With Update interval")
      .appendField(new Blockly.FieldNumber(5000, 100, 40000), "UPDATE_INTERVAL")
      .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_core_tmp112_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Core Temperature");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_integer_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Integer")
      .appendField(new Blockly.FieldNumber(0), "VALUE");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_string_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("String")
      .appendField(new Blockly.FieldTextInput("text"), "VALUE");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_button_clicks_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Button Clicks");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_button_holds_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Button Holds");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_application_task'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Application Task");
    this.appendDummyInput()
      .appendField("Repeat every")
      .appendField(new Blockly.FieldNumber(1000, 100), "TASK_INTERVAL")
      .appendField("ms");
    this.appendStatementInput("BLOCKS")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_pir_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize Motion Detector");
    this.appendDummyInput()
      .appendField("With Sensitivity")
      .appendField(new Blockly.FieldDropdown([["TWR_MODULE_PIR_SENSITIVITY_LOW", "TWR_MODULE_PIR_SENSITIVITY_LOW"], ["TWR_MODULE_PIR_SENSITIVITY_MEDIUM", "TWR_MODULE_PIR_SENSITIVITY_MEDIUM"], ["TWR_MODULE_PIR_SENSITIVITY_HIGH", "TWR_MODULE_PIR_SENSITIVITY_HIGH"], ["TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH", "TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH"]]), "SENSITIVITY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_pir_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("On Movement Detected");
    this.appendStatementInput("BLOCKS")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_power_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize Power Module");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_ledStrip_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize LED Strip");
    this.appendDummyInput()
      .appendField("Number of LEDs: ")
      .appendField(new Blockly.FieldDropdown([["36", "36"], ["72", "72"], ["144", "144"]]), "LEDS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_power_relay_state_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Power Module Relay State");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_power_relay_state_set'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Power Module Relay Set State");
    this.appendDummyInput()
      .appendField("State: ")
      .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize LCD Module");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_draw_string'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Draw stirng ")
      .appendField(new Blockly.FieldTextInput("String"), "STRING")
      .appendField("on LCD");
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0, 0, 128), "LEFT")
      .appendField("pixels from left");
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0, 0, 128), "TOP")
      .appendField("pixels from top");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_draw_circle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Draw circle on LCD");
    this.appendDummyInput()
      .appendField("Center: x:")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "CENTER_X")
      .appendField("y:")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "CENTER_Y")
      .appendField("and");
    this.appendDummyInput()
      .appendField("Radius: ")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "RADIUS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_draw_line'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Draw line on LCD");
    this.appendDummyInput()
      .appendField("Start: x:")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "START_X")
      .appendField("y:")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "START_Y")
      .appendField("and");
    this.appendDummyInput()
      .appendField("End: x")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "END_X")
      .appendField("y:")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "END_Y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_draw_rectangle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Draw rectangle on LCD");
    this.appendDummyInput()
      .appendField("Start: x:")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "START_X")
      .appendField("y:")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "START_Y")
      .appendField("and");
    this.appendDummyInput()
      .appendField("End: x")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "END_X")
      .appendField("y:")
      .appendField(new Blockly.FieldNumber(0, 0, 128), "END_Y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_draw_pixel'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Draw pixel on LCD");
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0, 0, 128), "LEFT")
      .appendField("pixels from left");
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0, 0, 128), "TOP")
      .appendField("pixels from top");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_set_font'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set LCD font size to")
      .appendField(new Blockly.FieldDropdown([["11", "twr_font_ubuntu_11"], ["13", "twr_font_ubuntu_13"], ["15", "twr_font_ubuntu_15"], ["24", "twr_font_ubuntu_24"], ["28", "twr_font_ubuntu_28"], ["33", "twr_font_ubuntu_33"]]), "FONT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_set_power_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turn LCD ")
      .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_clear'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Clear LCD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_lcd_update'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Update LDC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_climate_initialize'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Initialize Climate Module");
    this.appendDummyInput()
      .appendField("With Update interval")
      .appendField(new Blockly.FieldNumber(5000, 100, 40000), "UPDATE_INTERVAL")
      .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_climate_temperature_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Climate Temperature");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_climate_humidity_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Climate Humidity");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_climate_illuminance_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Climate Illuminance ");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hio_climate_pressure_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Climate Atmospheric Pressure");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};