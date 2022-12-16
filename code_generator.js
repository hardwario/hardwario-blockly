const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const format = require("python-format-js");
const { type } = require('express/lib/response');

class CodeGenerator {
    constructor() {
        this.blocks_path = path.join(__dirname, 'blocks');

        this.blocks = {};

        this.variable_types = { 'Integer': 'int', 'Float': 'float' };

        this.indent = 0;

        this.operators = {
            'logic_operation': { 'AND': '&&', 'OR': '||' },
            'logic_compare': { 'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>=' },
            'math_arithmetic': { 'ADD': '+', 'MINUS': '-', 'MULTIPLY': '*', 'DIVIDE': '/' }
        }

        this.load_blocks();
    }

    load_blocks() {
        fs.readdirSync(this.blocks_path).forEach(file => {
            let file_name = file.split('.')[0];
            let module = yaml.load(fs.readFileSync(path.join(this.blocks_path, file), 'utf8'));
            this.blocks[file_name] = module[file_name];
        });
    }

    generate_code(data) {
        data = JSON.parse(data);

        this.global_variable = []
        this.variables = {}
        this.application_init = []
        this.application_task = []
        this.event_handlers = {}

        if ('variables' in data) {
            this.generate_variables(data['variables'])
        }

        for (let block in data['blocks']['blocks']) {
            block = data['blocks']['blocks'][block]
            if (block['type'] == 'hio_application_initialize') {
                if ('inputs' in block) {
                    this.indent += 1
                    this.next(block['inputs']['BLOCKS'], this.application_init)
                }
            }
        }

        for (let block in data['blocks']['blocks']) {
            block = data['blocks']['blocks'][block]
            if (block['type'] == 'hio_application_task') {
                if ('inputs' in block) {
                    this.indent = 1
                    this.application_init.push('\ttwr_scheduler_plan_from_now(0, {TASK_INTERVAL});'.format(block['fields']))
                    this.next(block['inputs']['BLOCKS'], this.application_task)
                    this.application_task.push('\ttwr_scheduler_plan_current_relative({TASK_INTERVAL});'.format(block['fields']))
                }
                this.indent = 0
            }

            if (block['type'].includes('event')) {
                let name = block['type'].substring("hio_".length, block['type'].length - "_event".length)
                let full_event_name = this.blocks[name]['handler']['events']['prefix'] + block['fields']['NAME']
                if ('inputs' in block) {
                    this.event_handlers[full_event_name] = []
                    this.next(block['inputs']['BLOCKS'], this.event_handlers[full_event_name])
                }
            }
        }

        console.log(this.variables)
        console.log(this.global_variable)
        console.log(this.application_init)
        console.log(this.application_task)
        console.log(this.event_handlers)

    }

    generate_variables(variables) {
        for (let variable in variables) {
            this.variables[variables[variable]['id']] = { 'name': variables[variable]['name'], 'type': variables[variable]['type'] };
            this.global_variable.push(("{variable_type} {variable_name} = 0;".format({ variable_type: this.variable_types[variables[variable]['type']], variable_name: variables[variable]['name'] })));
        }
    }

    next(next, event_handler) {
        if ('block' in next) {
            let block = next['block']
            if (block['type'].includes('_initialize')) {
                let name = block['type'].substring("hio_".length, block['type'].length - "_initialize".length)
                let block_definition = this.blocks[name]
                if (block_definition) {
                    if ('handler' in block_definition) {
                        let indent = this.indent
                        this.indent = 2
                        this.add_event_handler(name + '_handler', name)
                        this.indent = indent
                    }
                    if ('global_variable' in block_definition) {
                        for (let code of block_definition['global_variable']) {
                            if ('fields' in block) {
                                code = code.format(block['fields'])
                            }
                            this.global_variable.push(code)
                        }
                    }

                    let random_variable_name = randomString(12);
                    if ('application_init' in block_definition) {
                        for (let code of block_definition['application_init']['code']) {
                            if ('fields' in block) {
                                block['fields']['RANDOM_VARIABLE'] = random_variable_name
                                code = code.format(block['fields'])
                            }
                            this.application_init.push(('\t'.repeat(this.indent)) + code);
                        }
                        this.application_init.push('');
                    }
                }
            }
            else {
                let name = block['type'].substring("hio_".length, block['type'].length);
                let action = name.substring(name.indexOf('_') + 1, name.length);
                let module = name.substring(0, name.indexOf('_'));
                let block_definition = this.blocks[module];
                if (block_definition) {
                    let random_variable_name = randomString(12);
                    for (let code of block_definition['action'][action]['code']) {
                        if ('fields' in block) {
                            if ('inputs' in block) {
                                for (let input in block['inputs']) {
                                    block['fields'][input] = this.generate_sub_section(block['inputs'][input]['block'])
                                }
                            }
                            block['fields']['RANDOM_VARIABLE'] = random_variable_name
                            code = code.format(block['fields'])
                        }
                        event_handler.push(('\t'.repeat(this.indent)) + code);
                    }
                    event_handler.push('');
                }
                else if (block['type'] == 'controls_if') {
                    this.generate_if_statement(block, event_handler);
                }
                else if (block['type'] == 'controls_repeat_ext' || block['type'] == 'controls_whileUntil' || block['type'] == 'controls_for') {
                    this.generate_loop(block, event_handler)
                }
                else if (block['type'] == 'variables_set_integer') {
                    let code = '{variable} = (int)({value});'.format({variable : this.variables[block['fields']['VAR']['id']]['name'], value : this.generate_sub_section(block['inputs']['VALUE']['block'])})
                    event_handler.push(('\t'.repeat(this.indent)) + code)
                }
                else if (block['type'] == 'variables_set_float') {
                    let code = '{variable} = (float)({value});'.format({variable : this.variables[block['fields']['VAR']['id']]['name'], value : this.generate_sub_section(block['inputs']['VALUE']['block'])})
                    event_handler.push(('\t'.repeat(this.indent)) + code)
                }
            }
        }
        if ('next' in next) {
            this.next(next['next'], event_handler)
        }
    }

    generate_sub_section(block) {
        if (block['type'] == 'logic_compare' || block['type'] == 'logic_operation' || block['type'] == 'math_arithmetic') {
            if (block['fields']['OP'] == 'POWER') {
                return 'pow(({left_side}), ({right_side}))'.format({left_side : this.generate_sub_section(block['inputs']['A']['block']), right_side : this.generate_sub_section(block['inputs']['B']['block'])})
            }
            else {
                return '({left_side}) {operator} ({right_side})'.format({left_side : this.generate_sub_section(block['inputs']['A']['block']), operator : this.operators[block['type']][block['fields']['OP']], right_side : this.generate_sub_section(block['inputs']['B']['block'])})
            }
        }
        else if (block['type'] == 'math_number') {
            return block['fields']['NUM']
        }
        else if (block['type'] == 'logic_boolean') {
            if (block['fields']['BOOL'] == 'TRUE') {
                return 'true'
            }
            else if (block['fields']['BOOL'] == 'FALSE') {
                return 'false'
            }
        }
        else if (block['type'] == 'logic_negate') {
            return '(!({condition}))'.format({condition : self.generate_sub_section(block['inputs']['BOOL']['block'])})
        }
        else if (block['type'].includes('variables_get')) {
            return this.variables[block['fields']['VAR']['id']]['name']
        }
        else if (block['type'].startswith('hio_') && block['type'].endswith('_value')) {
            return block['type'].substring("hio_".length);
        }
    }

    generate_if_statement(block, event_handler) {
        let if_index = 0;

        if (!('inputs' in block)) {
            return
        }
        for (let if_statement in block['inputs']) {

            if (if_statement.includes("DO")) {
                continue
            }

            if (if_index == 0 && if_statement.includes("IF")) {
                let if_json = block['inputs'][('IF{}'.format(String(if_index)))]['block'];
                let condition_start = ('\t'.repeat(this.indent)) + 'if(';
                let condition = '';

                if (if_json['type'] == 'logic_operation' || if_json['type'] == 'logic_compare') {
                    condition = '({left_side}) {operator} ({right_side})'.format({left_side : this.generate_sub_section(if_json['inputs']['A']['block']), operator : this.operators[if_json['type']][if_json['fields']['OP']], right_side : this.generate_sub_section(if_json['inputs']['B']['block'])})
                }
                else if (if_json['type'] == 'logic_boolean') {
                    if (if_json['fields']['BOOL'] == 'TRUE') {
                        condition = 'true'
                    }
                    else if (if_json['fields']['BOOL'] == 'FALSE') {
                        condition = 'false'
                    }
                }
                else if (if_json['type'] == 'logic_negate') {
                    condition = '(!({condition}))'.format({condition : self.generate_sub_section(if_json['inputs']['BOOL']['block'])})
                }

                else if (if_json['type'].startswith('hio_') && if_json['type'].endswith('_value')) {
                    condition = '({condition})'.format({condition : if_json['type'].substring("hio_".length)});
                }

                event_handler.push(condition_start + condition + ') {')

                if ("DO{}".format(String(if_index)) in block['inputs']) {
                    this.indent += 1
                    this.next(block['inputs']['DO{}'.format(String(if_index))], event_handler)
                    this.indent -= 1
                }
                event_handler.push(('\t'.repeat(this.indent)) + '}')
            }
            else if (if_statement == 'ELSE') {
                let if_json = block['inputs']['ELSE']['block']

                event_handler.push(('\t'.repeat(this.indent)) + 'else {')

                this.indent += 1
                this.next(block['inputs']['ELSE'], event_handler)
                this.indent -= 1

                event_handler.push(('\t'.repeat(this.indent)) + '}')
            }
            else {
                let if_json = block['inputs']['IF{}'.format(String(if_index))]['block']

                let condition_start = ('\t'.repeat(this.indent)) + 'else if('
                let condition = '';

                if (if_json['type'] == 'logic_operation' || if_json['type'] == 'logic_compare') {
                    condition = '({left_side}) {operator} ({right_side})'.format({left_side : this.generate_sub_section(if_json['inputs']['A']['block']), operator : this.operators[if_json['type']][if_json['fields']['OP']], right_side : this.generate_sub_section(if_json['inputs']['B']['block'])})
                }
                else if (if_json['type'] == 'logic_boolean') {
                    if (if_json['fields']['BOOL'] == 'TRUE') {
                        condition = 'true'
                    }
                    else if (if_json['fields']['BOOL'] == 'FALSE') {
                        condition = 'false'
                    }
                }
                else if (if_json['type'] == 'logic_negate') {
                    condition = '(!({condition}))'.format({condition : self.generate_sub_section(if_json['inputs']['BOOL']['block'])})
                }

                else if (if_json['type'].startswith('hio_') && if_json['type'].endswith('_value')) {
                    condition = '({condition})'.format({condition : if_json['type'].substring("hio_".length)});
                }

                event_handler.push(condition_start + condition + ') {')

                if ('DO{}'.format(String(if_index)) in block['inputs']) {
                    this.indent += 1
                    this.next(block['inputs']['DO{}'.format(String(if_index))], event_handler)
                    this.indent -= 1
                }
                event_handler.push(('\t'.repeat(this.indent)) + '}')
            }
            if (if_statement != 'ELSE') {
                if_index += 1
            }
        }
    }

    generate_loop(block, event_handler) {
        if(block['type'] == 'controls_repeat_ext'){
            let random_variable_name = randomString(12);
            event_handler.push(('\t'.repeat(this.indent)) + 'for(int {random_variable_name} = 0; {random_variable_name} < ({count}); {random_variable_name}++) {{'.format({random_variable_name : random_variable_name, count : this.generate_sub_section(block['inputs']['TIMES']['block'])}))
        }
        else if(block['type'] == 'controls_whileUntil'){
            event_handler.push(('\t'.repeat(this.indent)) + 'while({condition}) {{'.format({condition : this.generate_sub_section(block['inputs']['BOOL']['block'])}))
        }
        else if(block['type'] == 'controls_for'){
            let variable = this.variables[block['fields']['VAR']['id']]['name']
            let from = this.generate_sub_section(block['inputs']['FROM']['block'])
            let to = this.generate_sub_section(block['inputs']['TO']['block'])
            let by = this.generate_sub_section(block['inputs']['BY']['block'])
            event_handler.push(('\t'.repeat(this.indent)) + 'for({variable} = {from}; {variable} < {to}; {variable} += {by}) {{'.format({variable : variable, from : from, to : to, by : by}))
        }

        this.indent += 1
        this.next(block['inputs']['DO'], event_handler)
        this.indent -= 1

        event_handler.push(('\t'.repeat(this.indent)) + '}')
    }

    add_event_handler(event_handler, name) {

        let block_definition = this.blocks[name];

        if (!(event_handler in this.event_handlers)) {
            this.event_handlers[event_handler] = {};
        }
        for (let event in block_definition['handler']['events']['enum']) {
            let full_event_name = block_definition['handler']['events']['prefix'] + event;
            if (!(full_event_name in this.event_handlers)) {
                this.event_handlers[event_handler][full_event_name] = [];
                if (block_definition['handler']['events']['enum'][event]) {
                    for (let code of block_definition['handler']['events']['enum'][event]) {
                        console.log(code);
                        if (code.includes('}')) {
                            this.indent -= 1;
                        }
                        this.event_handlers[event_handler][full_event_name].push(('\t'.repeat(this.indent)) + code);
                        if (code.includes('}')) {
                            this.indent += 1;
                        }
                    }
                }
            }
        }
    }
}

module.exports = new CodeGenerator;

function randomChar() {
    var index = Math.floor(Math.random() * 62);
    // Generate Number character
    if (index < 10) {
        return 'a';
        // Generate capital letters
    } else if (index < 36) {
        return String.fromCharCode(index + 55);
    } else {
        // Generate small-case letters
        return String.fromCharCode(index + 61);
    }
}

function randomString(length) {
    var result = "";
    while (length > 0) {
        result += randomChar();
        length--;
    }
    return result;
}