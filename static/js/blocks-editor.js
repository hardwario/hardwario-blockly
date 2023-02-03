var toolbox = document.getElementById("toolbox");

var options = {
  toolbox: toolbox,
  collapse: false,
  comments: false,
  disable: false,
  maxBlocks: Infinity,
  trashcan: false,
  horizontalLayout: false,
  toolboxPosition: 'start',
  css: true,
  media: 'https://blockly-demo.appspot.com/static/media/',
  rtl: false,
  scrollbars: true,
  sounds: true,
  oneBasedIndex: true,
};

// On page load function
window.addEventListener('load', switchCode);
window.addEventListener('load', loadWorkspace);

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject('blocklyDiv', options);
var onresize = function (e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

checkCategories();

workspace.registerButtonCallback('createInteger', createIntegerVariable)

function createIntegerVariable() {
  Blockly.Variables.createVariableButtonHandler(workspace, null, 'Integer');
}

workspace.registerButtonCallback('createFloat', createFloatVariable)

function createFloatVariable() {
  Blockly.Variables.createVariableButtonHandler(workspace, null, 'Float');
}

// Returns an arry of XML nodes.
var variablesFlyout = function (workspace) {
  var blockList = [];

  var label = document.createElement('label');
  label.setAttribute('text', 'Integer Variables');
  blockList.push(label);

  var integerVariablesList = workspace.getVariablesOfType('Integer');
  var button = document.createElement('button');
  button.setAttribute('text', 'Create Integer');
  button.setAttribute('callbackKey', 'createInteger');

  blockList.push(button);

  if (integerVariablesList.length != 0) {
    var block = document.createElement('block');
    block.setAttribute('type', 'variables_set_integer');
    var field = document.createElement('field');
    field.setAttribute('name', 'VAR');
    field.setAttribute('id', integerVariablesList[0].getId());
    field.setAttribute('variabletype', 'Integer');
    field.innerText = integerVariablesList[0].name;
    block.appendChild(field);
    blockList.push(block);
  }

  for (var i = 0; i < integerVariablesList.length; i++) {
    var block = document.createElement('block');
    block.setAttribute('type', 'variables_get_integer');
    var field = document.createElement('field');
    field.setAttribute('name', 'VAR');
    field.setAttribute('id', integerVariablesList[i].getId());
    field.setAttribute('variabletype', 'Integer');
    field.innerText = integerVariablesList[i].name;
    block.appendChild(field);
    blockList.push(block);
  }
  var label = document.createElement('label');
  label.setAttribute('text', 'Float Variables');
  blockList.push(label);

  var floatVariablesList = workspace.getVariablesOfType('Float');
  var button = document.createElement('button');
  button.setAttribute('text', 'Create Float');
  button.setAttribute('callbackKey', 'createFloat');

  blockList.push(button);

  if (floatVariablesList.length != 0) {
    var block = document.createElement('block');
    block.setAttribute('type', 'variables_set_float');
    var field = document.createElement('field');
    field.setAttribute('name', 'VAR');
    field.setAttribute('id', floatVariablesList[0].getId());
    field.setAttribute('variabletype', 'Float');
    field.innerText = floatVariablesList[0].name;
    block.appendChild(field);
    blockList.push(block);
  }

  for (var i = 0; i < floatVariablesList.length; i++) {
    var block = document.createElement('block');
    block.setAttribute('type', 'variables_get_float');
    var field = document.createElement('field');
    field.setAttribute('name', 'VAR');
    field.setAttribute('id', floatVariablesList[i].getId());
    field.setAttribute('variabletype', 'Float');
    field.innerText = floatVariablesList[i].name;
    block.appendChild(field);
    blockList.push(block);
  }

  return blockList;
};

var floatVariablesFlyout = function (workspace) {
  var blockList = [];


  return blockList;
};

workspace.registerToolboxCategoryCallback(
  'VARIABLES', variablesFlyout);

function checkUniqueBlock(block_type, event) {
  for (const block of workspace.blockDB.values()) {
    if (block.hue_ == null) {
      continue;
    }
    if (block.type == block_type && block.id != event.ids[0]) {
      workspace.getBlockById(event.ids[0]).dispose()
      return true;
    }
  }
  return false;
}

function checkCategories() {
  var categories = {
    'blockly-2': false,
    'blockly-3': false,
    'blockly-4': false,
    'blockly-5': false,
    'blockly-6': false,
    'blockly-7': false,
    'blockly-8': false,
    'blockly-9': false,
    'blockly-a': false,
    'blockly-b': false,
  }
  for (const category of workspace.toolbox_.contents_) {
    if (category.toolboxItemDef_.kind == 'SEP') {
      continue;
    }
    document.getElementById(category.id_).style.display = '';
  }
  for (const block of workspace.blockDB.values()) {
    if (block.type == 'hio_button_initialize') {
      categories['blockly-2'] = true;
      document.getElementById('blockly-2').style.display = '';
      //workspace.createVariable('button_click_count', 'Integer');
      //workspace.createVariable('button_hold_count', 'Integer');
    }
    else if (block.type == 'hio_radio_initialize') {
      categories['blockly-3'] = true;
      document.getElementById('blockly-3').style.display = '';
    }
    else if (block.type == 'hio_led_initialize') {
      categories['blockly-4'] = true;
      document.getElementById('blockly-4').style.display = '';
    }
    else if (block.type == 'hio_logging_initialize') {
      categories['blockly-5'] = true;
      document.getElementById('blockly-5').style.display = '';
    }
    else if (block.type == 'hio_coreTmp112_initialize') {
      categories['blockly-6'] = true;
      workspace.createVariable('core_tmp112_value', 'Float');
      document.getElementById('blockly-6').style.display = '';
    }
    else if (block.type == 'hio_pir_initialize') {
      categories['blockly-7'] = true;
      document.getElementById('blockly-7').style.display = '';
    }
    else if (block.type == 'hio_power_initialize') {
      categories['blockly-8'] = true;
      document.getElementById('blockly-8').style.display = '';
    }
    else if (block.type == 'hio_lcd_initialize') {
      categories['blockly-9'] = true;
      document.getElementById('blockly-9').style.display = '';
    }
    else if (block.type == 'hio_climate_initialize') {
      categories['blockly-a'] = true;
      workspace.createVariable('climate_temperature_value', 'Float');
      workspace.createVariable('climate_humidity_value', 'Float');
      workspace.createVariable('climate_illuminance_value', 'Float');
      workspace.createVariable('climate_pressure_value', 'Float');
      workspace.createVariable('climate_altitude_value', 'Float');
      document.getElementById('blockly-a').style.display = '';
    }
    else if (block.type == 'hio_battery_initialize') {
      categories['blockly-b'] = true;
      workspace.createVariable('battery_voltage_value', 'Float');
    }
  }
  for (const [key, value] of Object.entries(categories)) {
    if (value == false) {
      document.getElementById(key).style.display = 'none';
    }
  }
}

function checkBlocks() {
  for (const block of workspace.blockDB.values()) {
    if (block.type == 'hio_button_initialize') {
      document.getElementById('blockly-2').style.display = '';
    }
  }
}

function onBlockEvent(event) {
  if (event.type == Blockly.Events.BLOCK_CREATE) {

    if (workspace.getBlockById(event.ids[0]).type.includes('init')) {
      if (checkUniqueBlock(workspace.getBlockById(event.ids[0]).type, event)) {
        return;
      }
      else {
        checkCategories();
        checkBlocks();
      }
    }
  }
  else if (event.type == Blockly.Events.BLOCK_DELETE) {
    checkCategories();
  }
  if (event.type == Blockly.Events.BLOCK_MOVE) {
    console.log("block moved");
  }
  if (event.type == Blockly.Events.BLOCK_CREATE || event.type == Blockly.Events.BLOCK_DELETE ||
    event.type == Blockly.Events.BLOCK_CHANGE || event.type == Blockly.Events.BLOCK_MOVE ||
    event.type == Blockly.Events.VAR_CREATE || event.type == Blockly.Events.VAR_DELETE ||
    event.type == Blockly.Events.VAR_RENAME) {
    update_code();
  }
}

function switchCode() {
  var switch_button = document.getElementById("switchCode_button");
  var code_div = document.getElementById("code");
  if (code_div.style.display === "none") {
    switch_button.innerText = "Hide Code";
    code_div.style.display = "block";
    $(".grid-container").css("display", "grid").css("grid-template-columns", "1fr 1fr");
  } else {
    switch_button.innerText = "Show Code";
    code_div.style.display = "none";
    $(".grid-container").css("display", "grid").css("grid-template-columns", "1fr");
  }

  onresize();
  update_code();
}

function update_code() {
  $.ajax({
    url: "/update_code",
    type: "GET",
    data: {
      Code: exportJSON(),
    },

  }).done(function (data) {
    editor.setValue(data);
  });
}

function exportWorkspace() {
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_text = Blockly.Xml.domToPrettyText(xml);
  var blob = new Blob([xml_text], { type: "text/plain;charset=utf-8" });

  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.href = url
  link.download = project + ".xml";
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

function importWorkspace() {
  Blockly.getMainWorkspace().clear()
  var file = document.getElementById('importFile').files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    var xml = Blockly.Xml.textToDom(contents);
    Blockly.Xml.domToWorkspace(xml, workspace);
  };
  reader.readAsText(file);
}

function loadWorkspace() {
  if(project === "" && example === "")
  {
    //TODO: Return to home page
  }
  else if(project !== "") {
    $.ajax({
      url: "/load_project",
      type: "GET",
      data: {
        name: project
      },
    }).done(function (data) {
      var xml = Blockly.Xml.textToDom(data);
      Blockly.Xml.domToWorkspace(xml, Blockly.getMainWorkspace());
    }
    );
  }
  else if(example !== "") {
    $.ajax({
      url: "/load_example",
      type: "GET",
      data: {
        name: example
      },
    }).done(function (data) {
      document.getElementById('saveWorkspaceButton').style.display = 'none';
      console.log(data);
      var xml = Blockly.Xml.textToDom(data);
      Blockly.Xml.domToWorkspace(xml, Blockly.getMainWorkspace());
    }
    );
  }
}

workspace.addChangeListener(onBlockEvent);

function saveWorkspace() {
  var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
  var xml_text = Blockly.Xml.domToPrettyText(xml);

  //Send data to server
  $.ajax({
    url: "/save_project",
    type: "POST",
    data: {
      data: xml_text,
      name: project
    },
  }).done(function (data) {
    alert(data);
  }
  );
}

function restore() {
  Blockly.getMainWorkspace().clear();
  if (typeof (Storage) !== "undefined") {
    if (localStorage.length > 0) {
      var nameOfTheProject = prompt("Please enter the name of the project", "workspace");
      var xml = Blockly.Xml.textToDom(localStorage.getItem("hio_project_" + nameOfTheProject));
      Blockly.Xml.domToWorkspace(xml, Blockly.getMainWorkspace());
    }
  }
}

function loadProject(name) {
  Blockly.getMainWorkspace().clear();
  if (typeof (Storage) !== "undefined") {
    if (localStorage.length > 0) {
      var xml = Blockly.Xml.textToDom(localStorage.getItem("hio_project_" + name));
      Blockly.Xml.domToWorkspace(xml, Blockly.getMainWorkspace());
    }
  }
}

function deleteSavedProjects() {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("hio_project_")) {
          localStorage.removeItem(key);
        }
      }
    }
  }
}

function clear() {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.length > 0) {
      var nameOfTheProject = prompt("Please enter the name of the project", "workspace");
      localStorage.removeItem("hio_project_" + nameOfTheProject);
    }
  }
}

async function connectDevices() {
  navigator.serial.requestPort();
}

function exportJSON() {
  var jsonOriginal = Blockly.serialization.workspaces.save(workspace);

  var json = JSON.stringify(jsonOriginal);

  return json;
}