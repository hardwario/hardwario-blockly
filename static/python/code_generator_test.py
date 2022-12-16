import json
import re
import string
import random
from git import Repo
import subprocess
import os
import shutil

variables = {}

operators = {'logic_operation' : {'AND': '&&', 'OR': '||'}, 'logic_compare' : {'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='}, 'math_arithmetic' : {'ADD': '+', 'MINUS': '-', 'MULTIPLY': '*', 'DIVIDE': '/'}}

random_core_temperature_suffix = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(5)])

def add_initialization_part(block, output):
    if(block['type'] == 'hio_button_initialize'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_button_t button;\n---GLOBAL VARIABLE---")
        output += 'twr_button_init(&button, {gpio}, {pull}, 0);\n\t'.format(gpio=block['fields']['GPIO'], pull=block['fields']['PULL'])
        output += '---BUTTON SET EVENT HANDLER---\n\n\t'

    elif(block['type'] == 'hio_radio_initialize'):
        output += 'twr_radio_init({mode});\n\t'.format(mode=block['fields']['RADIO_MODE'])
        output += 'twr_radio_pairing_request("{name}", "1.0.0");\n\n\t'.format(name=block['fields']['FIRMWARE_NAME'])
    
    elif(block['type'] == 'hio_led_initialize'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_led_t led;\n---GLOBAL VARIABLE---")
        output += 'twr_led_init(&led, TWR_GPIO_LED, false, 0);\n\t'
        output += 'twr_led_pulse(&led, 2000);\n\n\t'
    
    elif(block['type'] == 'hio_logging_initialize'):
        output += 'twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);\n\t'
        output += 'twr_log_info("APPLICATION START");\n\n\t'

    elif(block['type'] == 'hio_core_tmp112_initialize'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_tmp112_t core_tmp112;\n---GLOBAL VARIABLE---")
        output = output.replace("---GLOBAL VARIABLE---", "float core_module_temperature_{random_suffix} = 9999;\n---GLOBAL VARIABLE---".format(random_suffix=random_core_temperature_suffix))
        output += 'twr_tmp112_init(&core_tmp112, TWR_I2C_I2C0, 0x49);\n\t'
        output += 'twr_tmp112_set_event_handler(&core_tmp112, core_tmp112_event_handler, NULL);\n\t'
        output += 'twr_tmp112_set_update_interval(&core_tmp112, {update_interval});\n\n\t'.format(update_interval=block['fields']['UPDATE_INTERVAL'])

        output = output.replace('---EVENT HANDLER---', 'void core_tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)\n{{\n\tif (event == TWR_TMP112_EVENT_UPDATE) {{\n\ttwr_tmp112_get_temperature_celsius(self, &core_module_temperature_{random_suffix});\n\t}}\n}}\n\n---EVENT HANDLER---'.format(random_suffix=random_core_temperature_suffix))

    elif(block['type'] == 'hio_pir_initialize'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_module_pir_t pir;\n---GLOBAL VARIABLE---")
        output += 'twr_module_pir_init(&pir);\n\t'
        output += 'twr_module_pir_set_sensitivity(&pir, {sensitivity});\n\n\t'.format(sensitivity=block['fields']['SENSITIVITY'])
        output += '---PIR SET EVENT HANDLER---\n\n\t'
        
    elif(block['type'] == 'hio_power_initialize'):
        output += 'twr_module_power_init();\n\t'

    elif(block['type'] == 'hio_led_strip_initialize'):
        if(not 'twr_module_power_init();' in output):
            output += 'twr_module_power_init();\n\t'

        output = output.replace("---GLOBAL VARIABLE---", '''#define LED_STRIP_COUNT {count}
                                
#define LED_STRIP_TYPE 4

#define LED_STRIP_SWAP_RG 0
---GLOBAL VARIABLE---'''.format(count=block['fields']['LEDS']))
        
        output = output.replace("---GLOBAL VARIABLE---", '''static uint32_t _twr_module_power_led_strip_dma_buffer[LED_STRIP_COUNT * LED_STRIP_TYPE * 2];
const twr_led_strip_buffer_t led_strip_buffer =
{
    .type = LED_STRIP_TYPE,
    .count = LED_STRIP_COUNT,
    .buffer = _twr_module_power_led_strip_dma_buffer
};

static struct
{
    enum
    {
        LED_STRIP_SHOW_COLOR = 0,
        LED_STRIP_SHOW_COMPOUND = 1,
        LED_STRIP_SHOW_EFFECT = 2,
        LED_STRIP_SHOW_THERMOMETER = 3

    } show;
    twr_led_strip_t self;
    uint32_t color;
    struct
    {
        uint8_t data[TWR_RADIO_NODE_MAX_COMPOUND_BUFFER_SIZE];
        int length;
    } compound;
    struct
    {
        float temperature;
        int8_t min;
        int8_t max;
        uint8_t white_dots;
        float set_point;
        uint32_t color;

    } thermometer;

    twr_scheduler_task_id_t update_task_id;

} led_strip = { .show = LED_STRIP_SHOW_COLOR, .color = 0 };\n---GLOBAL VARIABLE---''')
        output = output.replace("---GLOBAL VARIABLE---", '''---GLOBAL VARIABLE---\nvoid led_strip_update_task(void *param)
{
    (void) param;

    if (!twr_led_strip_is_ready(&led_strip.self))
    {
        twr_scheduler_plan_current_now();

        return;
    }

    twr_led_strip_write(&led_strip.self);

    twr_scheduler_plan_current_relative(250);
}\n''')

        output += '''twr_led_strip_init(&led_strip.self, twr_module_power_get_led_strip_driver(), &led_strip_buffer);\n\tled_strip.update_task_id = twr_scheduler_register(led_strip_update_task, NULL, 0);\n'''
        
    elif(block['type'] == 'hio_lcd_initialize'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_gfx_t *pgfx;\n---GLOBAL VARIABLE---")
        output += "twr_module_lcd_init();\n\t"
        output += 'pgfx = twr_module_lcd_get_gfx();\n\t'
        output += 'twr_gfx_set_font(pgfx, &twr_font_ubuntu_15);\n\t'
        output += 'twr_gfx_draw_string(pgfx, 50, 50, "LCD WORKING", true);\n\t'    
        output += 'twr_gfx_update(pgfx);\n'
    
    if 'next' in block.keys():
        output = add_initialization_part(block['next']['block'], output)

    return output

def add_action(action, json, output):
    if(json['type'] == 'hio_radio_send_string'):
        output = output.replace(action, '\t\ttwr_radio_pub_string("{subtopic}", "{value}");\n{action}'.format(subtopic=json['fields']['SUBTOPIC'], value=json['fields']['STRING_TO_BE_SEND'], action=action))
    elif(json['type'] == 'hio_radio_send_integer'):
        random_variable_name = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])
        output = output.replace(action, '\t\tint {random_name} = {value};\n\t\ttwr_radio_pub_int("{subtopic}", &{random_name});\n{action}'.format(random_name=random_variable_name, subtopic=json['fields']['SUBTOPIC'], value=json['fields']['INT_TO_BE_SEND'], action=action))
    elif(json['type'] == 'hio_radio_send_float'):
        random_variable_name = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])
        output = output.replace(action, '\t\tfloat {random_name} = {value};\n\t\ttwr_radio_pub_float("{subtopic}", &{random_name});\n{action}'.format(random_name=random_variable_name, subtopic=json['fields']['SUBTOPIC'], value=json['fields']['FLOAT_TO_BE_SEND'], action=action))
    elif(json['type'] == 'hio_radio_send_boolean'):
        random_variable_name = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])
        output = output.replace(action, '\t\tbool {random_name} = {value};\n\t\ttwr_radio_pub_bool("{subtopic}", &{random_name});\n{action}'.format(random_name=random_variable_name, subtopic=json['fields']['SUBTOPIC'], value=json['fields']['BOOL_TO_BE_SEND'], action=action))
    elif(json['type'] == 'hio_led_blink'):
        output = output.replace(action, '\t\ttwr_led_blink(&led, {count});\n{action}'.format(count=json['fields']['COUNT'], action=action))
    elif(json['type'] == 'hio_led_pulse'):
        output = output.replace(action, '\t\ttwr_led_pulse(&led, {duration});\n{action}'.format(duration=json['fields']['DURATION'], action=action))
    elif(json['type'] == 'hio_led_set_mode'):
        output = output.replace(action, '\t\ttwr_led_set_mode(&led, {mode});\n{action}'.format(mode=json['fields']['MODE'], action=action))
    elif(json['type'] == 'hio_button_publish_event_count'):
        action_lower = ((action.lower()).split('---')[1]).split(' ')[0]
        if(action_lower == 'click' or action_lower == 'hold'):
            action_event_variable = action_lower + '_button_event_count'
            if(action_lower == 'click'):
                event_name = 'PUSH'
            else:
                event_name = 'HOLD'
            if(action_event_variable in output):
                output = output.replace(action, '\t\ttwr_radio_pub_event_count(TWR_RADIO_PUB_EVENT_{event_name}_BUTTON, &{global_variable});\n{action}'.format(event_name=event_name, global_variable=action_event_variable, action=action))
            else:
                output = output.replace("---GLOBAL VARIABLE---", "uint16_t {global_variable} = 0;\n---GLOBAL VARIABLE---".format(global_variable=action_event_variable))
                output = output.replace(action, '\t\t{global_variable}++;\n{action}'.format(global_variable=action_event_variable,  action=action))
                output = output.replace(action, '\t\ttwr_radio_pub_event_count(TWR_RADIO_PUB_EVENT_{event_name}_BUTTON, &{global_variable});\n{action}'.format(event_name=event_name, global_variable=action_event_variable, action=action))

    elif('_logging_' in json['type']):
        
        log_type = json['type'].split('_')[-1]
        if 'inputs' in json.keys():
            if(json['inputs']['VARIABLE']['block']['type'] == 'hio_core_tmp112_value'):
                output = output.replace(action, '\t\ttwr_log_{log_type}("{message} %.2f", core_module_temperature_{random_suffix});\n{action}'.format(log_type=log_type, message=json['fields']['MESSAGE'], action=action, random_suffix=random_core_temperature_suffix))
        else:
            output = output.replace(action, '\t\ttwr_log_{log_type}("{message}");\n{action}'.format(log_type=log_type, message=json['fields']['MESSAGE'], action=action))
    elif(json['type'] == 'hio_power_relay_state_set'):
        state = 'false'
        if(json['fields']['STATE'] == 'ON'):
            state = 'true'
        output = output.replace(action, '\t\ttwr_module_power_relay_set_state({state});\n{action}'.format(state=state, action=action))

    elif(json['type'] == 'controls_if'):
        output = construct_if_statement(json, action, output)

    elif(json['type'] == 'controls_repeat_ext' or json['type'] == 'controls_whileUntil' or json['type'] == 'controls_for'):
        output = construct_loop(json, action, output)

    elif(json['type'] == 'variables_set'):
        output = output.replace(action, '\t\t{variable} = {value};\n{action}'.format(variable=variables[json['fields']['VAR']['id']], value=construct_sub_section(json['inputs']['VALUE']['block']), action=action))

    elif(json['type'] == 'math_change'):
        output = output.replace(action, '\t\t{variable} += {value};\n{action}'.format(variable=variables[json['fields']['VAR']['id']], value=construct_sub_section(json['inputs']['DELTA']['block']), action=action))
    
    elif(json['type'] == 'hio_lcd_draw_string'):
        output = output.replace(action, '\t\ttwr_gfx_draw_string(pgfx, {x}, {y}, "{text}", true);\n{action}'.format(x=json['fields']['LEFT'], y=json['fields']['TOP'], text=json['fields']['STRING'], action=action))

    elif(json['type'] == 'hio_lcd_draw_circle'):
        output = output.replace(action, '\t\ttwr_gfx_draw_circle(pgfx, {x}, {y}, {radius}, true);\n{action}'.format(x=json['fields']['CENTER_X'], y=json['fields']['CENTER_Y'], radius=json['fields']['RADIUS'], action=action))

    elif(json['type'] == 'hio_lcd_draw_line'):
        output = output.replace(action, '\t\ttwr_gfx_draw_line(pgfx, {x1}, {y1}, {x2}, {y2}, true);\n{action}'.format(x1=json['fields']['START_X'], y1=json['fields']['START_Y'], x2=json['fields']['END_X'], y2=json['fields']['END_Y'], action=action))

    elif(json['type'] == 'hio_lcd_draw_rectangle'):
        output = output.replace(action, '\t\ttwr_gfx_draw_rectangle(pgfx, {x1}, {y1}, {x2}, {y2}, true);\n{action}'.format(x1=json['fields']['START_X'], y1=json['fields']['START_Y'], x2=json['fields']['END_X'], y2=json['fields']['END_Y'], action=action))

    elif(json['type'] == 'hio_lcd_draw_pixel'):
        output = output.replace(action, '\t\ttwr_gfx_draw_pixel(pgfx, {x}, {y}, true);\n{action}'.format(x=json['fields']['LEFT'], y=json['fields']['TOP'], action=action))

    elif(json['type'] == 'hio_lcd_set_font'):
        output = output.replace(action, '\t\ttwr_gfx_set_font(pgfx, &{font});\n{action}'.format(font=json['fields']['FONT'], action=action))

    elif(json['type'] == 'hio_lcd_set_power_state'):
        if(json['fields']['STATE'] == 'ON'):
            output = output.replace(action, '\t\ttwr_module_lcd_on();\n{action}'.format(action=action))
        else:
            output = output.replace(action, '\t\ttwr_module_lcd_off();\n{action}'.format(action=action))
    
    elif(json['type'] == 'hio_lcd_clear'):
        output = output.replace(action, '\t\ttwr_gfx_clear(pgfx);\n{action}'.format(action=action))

    elif(json['type'] == 'hio_lcd_update'):
        output = output.replace(action, '\t\ttwr_gfx_update(pgfx);\n{action}'.format(action=action))

    if 'next' in json.keys():
        output = add_action(action, json['next']['block'], output)

    return output

def construct_loop(block, action, output):
    random_action_name = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])
    if(block['type'] == 'controls_repeat_ext'):
        random_variable_name = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])
        output = output.replace(action, '\t\tfor(int {random_variable_name} = 0; {random_variable_name} < ({count}); {random_variable_name}++){{\n---{random_action_name} ACTION---\t\t}}\n\t{action}'.format(random_variable_name=random_variable_name, count=construct_sub_section(block['inputs']['TIMES']['block']), random_action_name=random_action_name, action=action))
    elif(block['type'] == 'controls_whileUntil'):
        output = output.replace(action, '\t\twhile({condition}){{\n---{random_action_name} ACTION---\t\t}}\n\t{action}'.format(condition=construct_sub_section(block['inputs']['BOOL']['block']), random_action_name=random_action_name, action=action))
    elif(block['type'] == 'controls_for'):
        variable = variables[block['fields']['VAR']['id']]
        output = output.replace(action, '\t\tfor({variable} = ({from_value}); {variable} < ({to}); {variable}+=({by})){{\n---{random_action_name} ACTION---\t\t}}\n\t{action}'.format(variable=variable, from_value=construct_sub_section(block['inputs']['FROM']['block']), to=construct_sub_section(block['inputs']['TO']['block']), random_action_name=random_action_name, action=action, by=construct_sub_section(block['inputs']['BY']['block'])))

    output = add_action('---{random_action_name} ACTION---'.format(random_action_name=random_action_name), block['inputs']['DO']['block'], output)

    return output

def construct_if_statement(block, action, output):    
    if_index = 0
    else_present_random_signature = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])

    for if_statement in block['inputs']:
        if_random_signature = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])

        if("DO" in if_statement):
            continue

        if(if_index == 0 and "IF" in if_statement):
            if_json = block['inputs']['IF{index}'.format(index=if_index)]['block']
            if(else_present_random_signature in output):
                output = output.replace('---{else_present_random_signature}---'.format(else_present_random_signature=else_present_random_signature), '\tif(---{if_random_signature} CONDITION---){{\n\t\t---{if_random_signature} ACTION---\n\t\t}}\n\t\t---{else_present_random_signature}---'.format(if_random_signature=if_random_signature, else_present_random_signature=else_present_random_signature))
            else:
                output = output.replace(action, '\tif(---{if_random_signature} CONDITION---){{\n\t\t---{if_random_signature} ACTION---\n\t\t}}\n\t\t{action}'.format(if_random_signature=if_random_signature, action=action))

            if(if_json['type'] == 'logic_operation' or if_json['type'] == 'logic_compare'):
                output = output.replace('---{if_random_signature} CONDITION---'.format(if_random_signature=if_random_signature), '({left_side}) {operator} ({right_side})'.format(left_side=construct_sub_section(if_json['inputs']['A']['block']), operator=operators[if_json['type']][if_json['fields']['OP']], right_side=construct_sub_section(if_json['inputs']['B']['block'])))

            elif(if_json['type'] == 'logic_boolean'):
                if(if_json['fields']['BOOL'] == 'TRUE'):
                    output = output.replace('---{if_random_signature} CONDITION---'.format(if_random_signature=if_random_signature), 'true')
                elif(if_json['fields']['BOOL'] == 'FALSE'):
                    output = output.replace('---{if_random_signature} CONDITION---'.format(if_random_signature=if_random_signature), 'false')
            elif(if_json['type'] == 'logic_negate'):
                output = output.replace('---{if_random_signature} CONDITION---'.format(if_random_signature=if_random_signature), '(!({condition}))'.format(condition=construct_sub_section(if_json['inputs']['BOOL']['block'])))
                
            output = add_action('---{if_random_signature} ACTION---'.format(if_random_signature=if_random_signature), block['inputs']['DO{index}'.format(index=if_index)]['block'], output)

        elif(if_statement == 'ELSE'):
            if_json = block['inputs']['ELSE']['block']

            output = output.replace(action, '---{else_present_random_signature}---\n\t\telse{{\n\t\t---{if_random_signature} ACTION---\n\t\t}}\n\t\t{action}'.format(else_present_random_signature=else_present_random_signature, if_random_signature=if_random_signature, action=action))
        
            output = add_action('---{if_random_signature} ACTION---'.format(if_random_signature=if_random_signature), block['inputs']['ELSE']['block'], output)
        
        else:
            if_json = block['inputs']['IF{index}'.format(index=if_index)]['block']

            if(else_present_random_signature in output):
                output = output.replace('---{else_present_random_signature}---'.format(else_present_random_signature=else_present_random_signature), '\telse if(---{if_random_signature} CONDITION---){{\n\t\t---{if_random_signature} ACTION---\n\t\t}}\n\t\t---{else_present_random_signature}---'.format(if_random_signature=if_random_signature, else_present_random_signature=else_present_random_signature))
            else:
                output = output.replace(action, '\telse if(---{if_random_signature} CONDITION---){{\n\t\t---{if_random_signature} ACTION---\n\t\t}}\n\t\t{action}'.format(if_random_signature=if_random_signature, action=action))
            
            if(if_json['type'] == 'logic_operation' or if_json['type'] == 'logic_compare'):
                output = output.replace('---{if_random_signature} CONDITION---'.format(if_random_signature=if_random_signature), '({left_side}) {operator} ({right_side})'.format(left_side=construct_sub_section(if_json['inputs']['A']['block']), operator=operators[if_json['type']][if_json['fields']['OP']], right_side=construct_sub_section(if_json['inputs']['B']['block'])))

            elif(if_json['type'] == 'logic_boolean'):
                if(if_json['fields']['BOOL'] == 'TRUE'):
                    output = output.replace('---{if_random_signature} CONDITION---'.format(if_random_signature=if_random_signature), 'true')
                elif(if_json['fields']['BOOL'] == 'FALSE'):
                    output = output.replace('---{if_random_signature} CONDITION---'.format(if_random_signature=if_random_signature), 'false')
            elif(if_json['type'] == 'logic_negate'):
                output = output.replace('---{if_random_signature} CONDITION---'.format(if_random_signature=if_random_signature), '(!({condition}))'.format(condition=construct_sub_section(if_json['inputs']['BOOL']['block'])))

            output = add_action('---{if_random_signature} ACTION---'.format(if_random_signature=if_random_signature), block['inputs']['DO{index}'.format(index=if_index)]['block'], output)

        if(if_statement != 'ELSE'):
            if_index += 1
    return output

def construct_sub_section(block):
    if(block['type'] == 'logic_compare' or block['type'] == 'logic_operation' or block['type'] == 'math_arithmetic'):
        
        if(block['fields']['OP'] == 'POWER'):
            return 'pow(({left_side}), ({right_side}))'.format(left_side=construct_sub_section(block['inputs']['A']['block']), right_side=construct_sub_section(block['inputs']['B']['block']))
        else:
            return '({left_side}) {operator} ({right_side})'.format(left_side=construct_sub_section(block['inputs']['A']['block']), operator=operators[block['type']][block['fields']['OP']], right_side=construct_sub_section(block['inputs']['B']['block']))
    
    elif(block['type'] == 'math_number'):
        return block['fields']['NUM']
    elif(block['type'] == 'logic_boolean'):
        if(block['fields']['BOOL'] == 'TRUE'):
            return 'true'
        elif(block['fields']['BOOL'] == 'FALSE'):
            return 'false'
    elif(block['type'] == 'logic_negate'):
        return '(!({condition}))'.format(condition=construct_sub_section(block['inputs']['BOOL']['block']))
    elif(block['type'] == 'variables_get'):
        return variables[block['fields']['VAR']['id']]
    
def construct_application_task(block, output):
    interval = block['fields']['TASK_INTERVAL']
    output = output.replace('---APPLICATION TASK SCHEDULE---', '\ttwr_scheduler_plan_from_now(0, {interval});'.format(interval=interval))

    output = output.replace('---APPLICATION TASK---', 'void application_task()\r\n{\r\n---APPLICATION TASK ACTION---\r\n}')

    output = add_action('---APPLICATION TASK ACTION---', block['inputs']['hio_application_task']['block'], output)

    output = output.replace('---APPLICATION TASK ACTION---', '\ttwr_scheduler_plan_current_relative({interval});'.format(interval=interval))

    return output

def construct_event_handler(event_handler, output):
    if(event_handler['type'] == 'hio_button_event'):
        if '---BUTTON SET EVENT HANDLER---' in output:
            output = output.replace('---BUTTON SET EVENT HANDLER---', 'twr_button_set_event_handler(&button, button_event_handler, NULL);')
            output = output.replace('---EVENT HANDLER---', 'void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)\n{\n\t---BUTTON EVENT---\n}\n---EVENT HANDLER---')

        if('---ELSE BUTTON EVENT---' in output):
            output = output.replace('---ELSE BUTTON EVENT---', '''\telse if (event == TWR_BUTTON_EVENT_{event})\n\t{{\n\t---{event} ACTION---\n\t}}\n\t\t---ELSE BUTTON EVENT---'''.format(event=event_handler['fields']['NAME']))
        else:
            output = output.replace('---BUTTON EVENT---', '''if (event == TWR_BUTTON_EVENT_{event})\n\t{{\n\t---{event} ACTION---\n\t}}\n\t\t---ELSE BUTTON EVENT---'''.format(event=event_handler['fields']['NAME']))
        output = add_action('---{event} ACTION---'.format(event=event_handler['fields']['NAME']), event_handler['inputs']['BLOCKS']['block'], output)
    if(event_handler['type'] == 'hio_pir_event'):
        if '---PIR SET EVENT HANDLER---' in output:
            output = output.replace('---PIR SET EVENT HANDLER---', 'twr_module_pir_set_event_handler(&pir, pir_event_handler, NULL);')
            output = output.replace('---EVENT HANDLER---', 'void pir_event_handler(twr_module_pir_t *self, twr_module_pir_event_t event, void *event_param)\n{\n\t---PIR EVENT---\n}\n---EVENT HANDLER---')
        
        output = output.replace('---PIR EVENT---', '''if (event == TWR_MODULE_PIR_EVENT_MOTION)\n\t{\n\t---PIR ACTION---\n\t}\n\t\t''')

        output = add_action('---PIR ACTION---', event_handler['inputs']['BLOCKS']['block'], output)

    return output

def create_variables_list(data, output):
    for variable in data:
        variables[variable['id']] = variable['name']
        output = output.replace("---GLOBAL VARIABLE---", "int {variable_name} = 0;\n---GLOBAL VARIABLE---".format(variable_name=variable['name']))

    return output

def construct_initialization(application_init_json, output):
    output = """#include <application.h>

---GLOBAL VARIABLE---

---EVENT HANDLER---

void application_init(void)
{\n\t"""

    output = add_initialization_part(application_init_json['inputs']['BLOCKS']['block'], output)

    output = output[:-1]

    output += '---APPLICATION TASK SCHEDULE---\r\n}\r\n\r\n---APPLICATION TASK---'

    return output

def generate_code():  
    data = ''
    
    with open('output.json') as json_file:
        data = json.load(json_file)
        
    #print(json.dumps(data, indent = 4, sort_keys=True))

    output = ""

    print(variables)
    
    for i in data['blocks']['blocks']:
        if(i['type'] == 'hio_application_initialize'):
            output = construct_initialization(i, output)

    if('variables' in data):
        output = create_variables_list(data['variables'], output)

    for i in data['blocks']['blocks']:
        if(i['type'] == 'hio_button_event'):
            output = construct_event_handler(i, output)

        elif(i['type'] == 'hio_pir_event'):
            output = construct_event_handler(i, output)

    for i in data['blocks']['blocks']:
        if(i['type'] == 'hio_application_task'):
            output = construct_application_task(i, output)

    output = re.sub('---.*---', '', output)

    print(output)

    if os.path.exists('skeleton') and os.path.isdir('skeleton'):
        shutil.rmtree('skeleton')
        
    Repo.clone_from('https://github.com/hardwario/twr-skeleton.git', 'skeleton', recursive=True)

    with open('skeleton/src/application.c', 'w') as f:
        f.write(output)

    command = "cmake skeleton -B skeleton/obj/debug -G Ninja -DCMAKE_TOOLCHAIN_FILE=sdk/toolchain/toolchain.cmake -DTYPE=debug && ninja -C skeleton/obj/debug"
    ret = subprocess.run(command, capture_output=True, shell=True)
    print(ret.stdout.decode())
    
if __name__ == "__main__":
    generate_code()