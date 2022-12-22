const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
var format = require('xml-formatter');
const { exit } = require('process');

class BlockGenerator {
    constructor() {
        this.modules_path = path.join(__dirname, 'blocks');
        this.categories_path = path.join(__dirname, 'categories');

        this.modules = {};

        this.blocks = [];

        this.categories = {};

        this.load_modules();
        this.load_categories();

        this.generate_static_blocks();
        this.generate_dynamic_blocks();

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

    load_categories() {
        fs.readdirSync(this.categories_path).forEach(file => {
            let categories = yaml.load(fs.readFileSync(path.join(this.categories_path, file), 'utf8'));
            for (const [category, _] of Object.entries(categories['categories'])) {
                this.categories[category] = { 'configuration': categories['categories'][category], 'blocks': [] };
            }
        });
    }

    generate_categories_xml() {
        let xml = '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">';
        for (const [category, _] of Object.entries(this.categories)) {
            let colour = '#000000';
            if (this.categories[category]['configuration'] !== null && 'colour' in this.categories[category]['configuration']) {
                colour = this.categories[category]['configuration']['colour'];
            }
            if (category == 'Integer Variables') {
                xml += `<category name="${category}" colour="${colour}" custom="INTEGER_PALETTE">`;
            }
            else if (category == 'Float Variables') {
                xml += `<category name="${category}" colour="${colour}" custom="FLOAT_PALETTE">`;
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
            else {
                for (const block of this.categories[category]['blocks']) {
                    xml += `<block type="${block}"></block>`;
                }
            }
            xml += '</category>';
        }
        xml += '</xml>';

        xml = format(xml);

        fs.readFile(path.join(__dirname, '..', 'html', 'index.html.template'), 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var result = data.replace(/<!--CATEGORIES-->/g, xml);

            fs.writeFile(path.join(__dirname, '..', 'html', 'index.html'), result, 'utf8', function (err) {
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
        this.blocks.push(block);
        this.categories['Task']['blocks'].push(block['type']);

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
                }
            ],
            "previousStatement": 'null',
            "nextStatement": 'null',
        }
        this.blocks.push(block)

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
                }
            ],
            "previousStatement": "null",
            "nextStatement": "null",
        }
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
            if (this.categories['Initialization']['configuration'] !== null && 'colour' in this.categories['Initialization']['configuration']) {
                colour = this.categories['Initialization']['configuration']['colour'];
            }
            block["colour"] = colour;
        }
        block["tooltip"] = "";
        block["helpUrl"] = "";
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
            this.blocks.push(block);
            this.categories[category]['blocks'].push(block['type']);
        }
    }
}

module.exports.generate_blocks = function () {
    let block_generator = new BlockGenerator();
}