"use strict";

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
var format = require('xml-formatter');
const { exit } = require('process');

class BlockGenerator {
    constructor() {
        this.modules_path = path.join(__dirname, 'blocks');
        this.categories_path = path.join(__dirname, 'categories');

        const appDataPath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
        this.user_folder = path.join(appDataPath, 'HARDWARIO Blockly');
        this.user_blocks_path = path.join(appDataPath, 'HARDWARIO Blockly', 'blocks');
        this.user_categories_folder_path = path.join(appDataPath, 'HARDWARIO Blockly', 'categories');
        this.user_categories_path = path.join(appDataPath, 'HARDWARIO Blockly', 'categories', 'categories.yml');

        this.modules = {};
        this.user_modules = {};

        this.blocks = [];

        this.categories = {};
        this.user_categories = {};

        this.load_modules();
        this.load_user_modules();

        this.load_categories();

        this.generate_static_blocks();
        this.generate_dynamic_blocks();
        this.generate_user_blocks();

        this.generate_categories_xml();
        this.generate_blocks_json();
    }

    generate_blocks_json() {
        var blocks_json = 'Blockly.defineBlocksWithJsonArray(' + JSON.stringify(this.blocks, null, 4) + ');'

        fs.writeFile(path.join(__dirname, '..', 'static', 'js', 'blocks-json.js'), blocks_json, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    }

    load_modules() {
        fs.readdirSync(this.modules_path).forEach(file => {
            let file_name = file.split('.')[0];
            let module = yaml.load(fs.readFileSync(path.join(this.modules_path, file), 'utf8'));
            this.modules[file_name] = module[file_name];
        });
    }

    load_user_modules() {
        fs.readdirSync(this.user_blocks_path).forEach(file => {
            try {
                let file_name = file.split('.')[0];
                let module = yaml.load(fs.readFileSync(path.join(this.user_blocks_path, file), 'utf8'));
                this.user_modules[file_name] = module[file_name];
            }
            catch (e) {
                console.log(e);
            }
        });
    }

    load_categories() {
        let categories = yaml.load(fs.readFileSync(path.join(this.categories_path, 'categories.yml'), 'utf8'));
        for (const [category, _] of Object.entries(categories['categories'])) {
            this.categories[category] = { 'configuration': categories['categories'][category], 'blocks': [] };
        }

        let user_categories = yaml.load(fs.readFileSync(path.join(this.user_categories_folder_path, 'categories.yml'), 'utf8'));
        if(user_categories !== null && user_categories !== undefined && user_categories['categories'] !== null && user_categories['categories'] !== undefined)
        {
            for (const [category, _] of Object.entries(user_categories['categories'])) {
                this.categories[category] = { 'configuration': user_categories['categories'][category], 'blocks': [] };
                this.user_categories[category] = null;
            }
        }
    }

    generate_categories_xml() {
        let not_separated = true;
        let xml = '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">';
        for (const [category, _] of Object.entries(this.categories)) {
            if (category in this.user_categories && not_separated) {
                xml += `<sep></sep>`;
                not_separated = false;
            }

            let colour = '#000000';
            if (this.categories[category]['configuration'] !== null && 'colour' in this.categories[category]['configuration']) {
                colour = this.categories[category]['configuration']['colour'];
            }
            if (category == 'Variables') {
                xml += `<category name="${category}" colour="${colour}" custom="VARIABLES">`;
            }
            else if (category == 'Functions') {
                xml += `<category name="${category}" colour="${colour}" custom="PROCEDURE">`;
            }
            else if (category == 'Task') {
                xml += `<category name="${category}" colour="${colour}" custom="TASK">`;
            }
            else if (category == 'Text') {
                xml += `<category name="${category}" colour="${colour}" custom="TEXT">`;
            }

            else {
                xml += `<category name="${category}" colour="${colour}">`;
            }
            if (category === 'Logic') {
                xml += `<block type="controls_if"></block>`;
                xml += `<block type="logic_compare"></block>`;
                xml += `<block type="logic_operation"></block>`;
                xml += `<block type="logic_negate"></block>`;
                xml += `<block type="logic_boolean"></block>`;
            }
            else if (category === 'Loops') {
                xml += `<block type="controls_repeat_ext"></block>`;
                xml += `<block type="controls_whileUntil"></block>`;
                xml += `<block type="controls_for"></block>`;
            }
            else if (category === 'Math') {
                xml += `<block type="math_number"></block>`;
                xml += `<block type="math_arithmetic"></block>`;
            }
            else if (category == 'Text') {
                xml += `<block type="text"></block>`;
            }
            else {
                for (const block of this.categories[category]['blocks']) {
                    xml += `<block type="${block}">`;
                    let name = block.substring("hio_".length, block.length);
                    let action = name.substring(name.indexOf('_') + 1, name.length);
                    let module = name.substring(0, name.indexOf('_'));
                    if (this.modules[module] != undefined &&
                        this.modules[module]['action'] != undefined &&
                        this.modules[module]['action'][action] != undefined &&
                        this.modules[module]['action'][action]['block'] != undefined &&
                        this.modules[module]['action'][action]['block']['arguments'] != undefined) {
                        for (const argument of Object.entries(this.modules[module]['action'][action]['block']['arguments'])) {
                            var argument_name = argument[0];
                            var argument_values = argument[1];
                            if (argument_values.type == 'input') {
                                if (argument_values.check == 'String') {
                                    xml += `<value name="${argument_name}">`;
                                    xml += `<block type="text">`;
                                    xml += `<field name="TEXT">${argument_values.value}</field>`;
                                    xml += `</block>`;
                                    xml += `</value>`;
                                }
                                else if (argument_values.check == 'Number') {
                                    xml += `<value name="${argument_name}">`;
                                    xml += `<block type="math_number">`;
                                    xml += `<field name="NUM">${argument_values.value}</field>`;
                                    xml += `</block>`;
                                    xml += `</value>`;
                                }
                            }
                        }
                    }
                    else if (this.modules[module] != undefined &&
                        this.modules[module]['application_init'] != undefined &&
                        this.modules[module]['application_init']['block'] != undefined &&
                        this.modules[module]['application_init']['block']['arguments'] != undefined) {
                        for (const argument of Object.entries(this.modules[module]['application_init']['block']['arguments'])) {
                            var argument_name = argument[0];
                            var argument_values = argument[1];
                            if (argument_values.type == 'input') {
                                if (argument_values.check == 'String') {
                                    xml += `<value name="${argument_name}">`;
                                    xml += `<block type="text">`;
                                    xml += `<field name="TEXT">${argument_values.value}</field>`;
                                    xml += `</block>`;
                                    xml += `</value>`;
                                }
                                else if (argument_values.check == 'Number') {
                                    xml += `<value name="${argument_name}">`;
                                    xml += `<block type="math_number">`;
                                    xml += `<field name="NUM">${argument_values.value}</field>`;
                                    xml += `</block>`;
                                    xml += `</value>`;
                                }
                            }
                        }
                    }
                    xml += `</block>`;
                }
            }
            xml += '</category>';
        }
        xml += '</xml>';

        xml = format(xml, {
            collapseContent: true,
        });

        fs.readFile(path.join(__dirname, '..', 'views', 'blocksEditor.template.ejs'), 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var result = data.replace(/<!--CATEGORIES-->/g, xml);

            fs.writeFile(path.join(__dirname, '..', 'views', 'blocksEditor.ejs'), result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });
    }

    generate_static_blocks() {
        let block = {};

        block['type'] = 'hio_application_initialize';
        block['message0'] = 'Application Initialization %1 %2';
        block['args0'] = [
            {
                'type': 'input_dummy'
            },
            {
                'type': 'input_statement',
                'name': 'BLOCKS'
            }
        ];
        block['tooltip'] = 'Application Initialization';
        block['helpUrl'] = '';
        block['inputsInline'] = true;
        let colour = '#000000';
        if (this.categories['Initialization']['configuration'] !== null && 'colour' in this.categories['Initialization']['configuration']) {
            colour = this.categories['Initialization']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);
        this.categories['Initialization']['blocks'].push(block['type']);

        block = {};
        block['type'] = 'hio_application_task';
        block['message0'] = 'Application Task %1 Repeat every %2 ms %3 %4';
        block['args0'] = [
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
        ];
        block['tooltip'] = 'Application Task';
        block['helpUrl'] = '';
        block['inputsInline'] = true;
        colour = '#000000';
        if (this.categories['Task']['configuration'] !== null && 'colour' in this.categories['Task']['configuration']) {
            colour = this.categories['Task']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);
        this.categories['Task']['blocks'].push(block['type']);

        block = {};
        block['type'] = 'hio_task_do';
        block['message0'] = 'Task %1 %2 %3';
        block['args0'] = [
            {
                "type": "field_variable",
                "name": "TASK_NAME",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": ["Task"],
                "defaultType": "Task"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ];
        block['tooltip'] = 'Task';
        block['helpUrl'] = '';
        block['inputsInline'] = true;
        colour = '#000000';
        if (this.categories['Task']['configuration'] !== null && 'colour' in this.categories['Task']['configuration']) {
            colour = this.categories['Task']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);

        block = {
            "type": "variables_get_task",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                    "variableTypes": ["Task"],
                    "defaultType": "Task"
                }
            ],
            "output": "Task",
        }
        colour = '#000000';
        if (this.categories['Task']['configuration'] !== null && 'colour' in this.categories['Task']['configuration']) {
            colour = this.categories['Task']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);

        block = {
            "type": "variables_get_integer",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                    "variableTypes": ["Integer"],
                    "defaultType": "Integer"
                }
            ],
            "output": "Number",
        }
        colour = '#000000';
        if (this.categories['Variables']['configuration'] !== null && 'colour' in this.categories['Variables']['configuration']) {
            colour = this.categories['Variables']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);

        block = {
            "type": "variables_set_integer",
            "message0": "%{BKY_VARIABLES_SET}",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                    "variableTypes": ["Integer"],
                    "defaultType": "Integer"
                },
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "Number"
                }
            ],
            "previousStatement": 'null',
            "nextStatement": 'null',
        }
        colour = '#000000';
        if (this.categories['Variables']['configuration'] !== null && 'colour' in this.categories['Variables']['configuration']) {
            colour = this.categories['Variables']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);

        block = {
            "type": "variables_get_float",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                    "variableTypes": ["Float"],
                    "defaultType": "Float"
                }
            ],
            "output": "Number",
        }
        colour = '#000000';
        if (this.categories['Variables']['configuration'] !== null && 'colour' in this.categories['Variables']['configuration']) {
            colour = this.categories['Variables']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);

        block = {
            "type": "variables_set_float",
            "message0": "%{BKY_VARIABLES_SET}",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                    "variableTypes": ["Float"],
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
        }
        colour = '#000000';
        if (this.categories['Variables']['configuration'] !== null && 'colour' in this.categories['Variables']['configuration']) {
            colour = this.categories['Variables']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);

        block = {
            "type": "variables_get_string",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                    "variableTypes": ["String"],
                    "defaultType": "String"
                }
            ],
            "output": "String",
        }
        colour = '#000000';
        if (this.categories['Text']['configuration'] !== null && 'colour' in this.categories['Text']['configuration']) {
            colour = this.categories['Text']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);

        block = {
            "type": "variables_set_string",
            "message0": "%{BKY_VARIABLES_SET}",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                    "variableTypes": ["String"],
                    "defaultType": "String"
                },
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "String"
                }
            ],
            "previousStatement": 'null',
            "nextStatement": 'null',
        }
        colour = '#000000';
        if (this.categories['Text']['configuration'] !== null && 'colour' in this.categories['Text']['configuration']) {
            colour = this.categories['Text']['configuration']['colour'];
        }
        block["colour"] = colour;
        this.blocks.push(block);
    }

    generate_dynamic_blocks() {
        for (const [module_name, module_content] of Object.entries(this.modules)) {
            if ('application_init' in module_content) {
                this.generate_module_initialization(module_content, module_name);
            }
            if ('handler' in module_content) {
                this.generate_module_event_handler(module_content, module_name);
            }
            if ('action' in module_content) {
                this.generate_module_actions(module_content, module_name);
            }
        }
    }

    generate_user_blocks() {
        for (const [module_name, module_content] of Object.entries(this.user_modules)) {
            try {
                if ('application_init' in module_content) {
                    this.generate_module_initialization(module_content, module_name);
                }
            }
            catch (e) {
                console.log(e);
            }
            try {
                if ('handler' in module_content) {
                    this.generate_module_event_handler(module_content, module_name);
                }
            }
            catch (e) {
                console.log(e);
            }
            try {
                if ('action' in module_content) {
                    this.generate_module_actions(module_content, module_name);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    generate_module_initialization(module_content, module_name) {
        let block = {};
        let block_yaml = module_content['application_init']['block'];
        block['type'] = 'hio_' + module_name + '_initialize';
        block['message0'] = '';
        block_yaml['text'].forEach(function (text, _) {
            if (text === block_yaml['text'].at(-1)) {
                block['message0'] += text;
            }
            else {
                block['message0'] += text + ' ';
            }
        });
        if ('arguments' in block_yaml) {
            block['args0'] = [];
            for (const [argument, argument_yaml] of Object.entries(block_yaml['arguments'])) {
                if (argument_yaml['type'] == 'new_line') {
                    block['args0'].push({
                        'type': 'input_dummy'
                    });
                }
                else if (argument_yaml['type'] == 'number') {
                    block['args0'].push({
                        'type': 'field_number',
                        'name': argument,
                        'value': argument_yaml['value'],
                        'min': argument_yaml['min'],
                        'max': argument_yaml['max']
                    });
                }
                else if (argument_yaml['type'] == 'dropdown') {
                    block['args0'].push({
                        'type': 'field_dropdown',
                        'name': argument,
                        'options': argument_yaml['options']
                    });
                }
                else if (argument_yaml['type'] == 'text') {
                    block['args0'].push({
                        'type': 'field_input',
                        'name': argument,
                        'text': argument_yaml['value']
                    });
                }
                else if (argument_yaml['type'] == 'input') {
                    block['args0'].push({
                        'type': 'input_value',
                        'name': argument,
                        'check': argument_yaml['check']
                    });
                }
            }

        }
        block["previousStatement"] = 'null';
        block["nextStatement"] = 'null';
        if ('colour' in block_yaml) {
            block["colour"] = block_yaml['colour'];
        }
        else {
            let colour = '#000000';
            let category = module_content['category'][0];
            if (category in this.categories) {
                if (this.categories[category]['configuration'] !== null && 'colour' in this.categories[category]['configuration']) {
                    colour = this.categories[category]['configuration']['colour'];
                }
            }
            block["colour"] = colour;
        }
        block["tooltip"] = "";
        block["helpUrl"] = "";
        block['inputsInline'] = true;
        this.blocks.push(block);
        this.categories['Initialization']['blocks'].push(block['type']);
    }

    generate_module_event_handler(module_content, module_name) {
        let block = {};
        let category = module_content['category'][0];
        let handler_yaml = module_content['handler'];

        block['type'] = 'hio_' + module_name + '_event';
        block['message0'] = handler_yaml['block']['text'] + ' %2 %3';

        let events = [];

        for (const [event, _] of Object.entries(handler_yaml['events']['enum'])) {
            events.push([event, event]);
        }

        block['args0'] = [
            {
                'type': 'field_dropdown',
                'name': 'NAME',
                'options': events
            },
            {
                'type': 'input_dummy'
            },
            {
                'type': 'input_statement',
                'name': 'BLOCKS'
            }
        ];
        if ('colour' in handler_yaml) {
            block["colour"] = handler_yaml['colour'];
        }
        else {
            let colour = '#000000';
            if (this.categories[category]['configuration'] !== null && 'colour' in this.categories[category]['configuration']) {
                colour = this.categories[category]['configuration']['colour'];
            }
            block["colour"] = colour;
        }
        block["tooltip"] = "";
        block["helpUrl"] = "";
        block['inputsInline'] = true;
        this.blocks.push(block);
        this.categories[category]['blocks'].push(block['type']);
    }

    generate_module_actions(module_content, module_name) {
        let actions_yaml = module_content['action'];
        let category = module_content['category'][0];

        for (const [action, _] of Object.entries(actions_yaml)) {
            let block = {};
            let block_yaml = actions_yaml[action]['block'];

            block['type'] = 'hio_' + module_name + '_' + action;
            block['message0'] = '';
            block_yaml['text'].forEach(function (text, _) {
                if (text === block_yaml['text'].at(-1)) {
                    block['message0'] += text;
                }
                else {
                    block['message0'] += text + ' ';
                }
            });
            if ('arguments' in block_yaml) {
                block['args0'] = [];
                for (const [argument, argument_yaml] of Object.entries(block_yaml['arguments'])) {
                    if (argument_yaml['type'] == 'new_line') {
                        block['args0'].push({
                            'type': 'input_dummy'
                        });
                    }
                    else if (argument_yaml['type'] == 'number') {
                        block['args0'].push({
                            'type': 'field_number',
                            'name': argument,
                            'value': argument_yaml['value'],
                            'min': argument_yaml['min'],
                            'max': argument_yaml['max']
                        });
                    }
                    else if (argument_yaml['type'] == 'dropdown') {
                        block['args0'].push({
                            'type': 'field_dropdown',
                            'name': argument,
                            'options': argument_yaml['options']
                        });
                    }
                    else if (argument_yaml['type'] == 'text') {
                        block['args0'].push({
                            'type': 'field_input',
                            'name': argument,
                            'text': argument_yaml['value']
                        });
                    }
                    else if (argument_yaml['type'] == 'input') {
                        block['args0'].push({
                            'type': 'input_value',
                            'name': argument,
                            'check': argument_yaml['check']
                        });
                    }
                }
            }

            block["previousStatement"] = 'null';
            block["nextStatement"] = 'null';
            if ('colour' in block_yaml) {
                block["colour"] = block_yaml['colour'];
            }
            else {
                let colour = '#000000';
                if (this.categories[category]['configuration'] !== null && 'colour' in this.categories[category]['configuration']) {
                    colour = this.categories[category]['configuration']['colour'];
                }
                block["colour"] = colour;
            }
            block["tooltip"] = "";
            block["helpUrl"] = "";
            block['inputsInline'] = true;
            this.blocks.push(block);
            this.categories[category]['blocks'].push(block['type']);
        }
    }
}

module.exports.generate_blocks = function () {
    let block_generator = new BlockGenerator();
}