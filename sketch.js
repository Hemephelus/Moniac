// Economics
let TRANSACTION_BALANCE= 2000
let GDP_Y = TRANSACTION_BALANCE;
let economic_rates = {
  TAX_RATE: 0.24,
  GOVERNMENT_EXPENDITURE_RATE: 0.45,
  AVERAGE_PROPENSITY_TO_CONSUME: 0.7,
  INVESTMENT_RATE: 0.50,
  AVERAGE_PROPENSITY_IMPORT: 0.5,
};

function updateValue(sliderName, elemId) {
  let x = document.getElementById(sliderName);
  economic_rates[sliderName] = +x.value / x.max;
  document.getElementById(elemId).innerHTML = `${x.value}%`;
}

function initializeValues() {
  let economic_rates_list = Object.entries(economic_rates)
  for(let i = 0; i < economic_rates_list.length; i++){
    let x = document.getElementById(economic_rates_list[i][0]);
    x.value= economic_rates_list[i][1]*100
    document.getElementById(economic_rates_list[i][0]+"_VALUE").innerHTML = `${x.value}%`;
  }
}
// Economics

initializeValues() 
//   let AUTONOMOUS_GOVERNMENT_EXPENDITURE = 0;
//   let AUTONOMOUS_EXPORT = 0;
//   let GOVERNMENT_SURPLUS = 0;
//   let IDLE_BALANCE = 0;
//   let IMPORT_AMOUNT = 0;
//   let EXPORT_AMOUNT = 0;
// Economics

let debug = false;
// A path object (series of connected points)
let paths = [];
// Two vehicles
let vehicles = [];
let boxes = [];
let mouseLocation;
let offset = 30;

let endAnchors = [];
let k = 0;
let canvas;

let mouseStates = {
  zoom_pan_tool: false,
  selection_tool: true,
};

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  // ZoomPanSetup(canvas);
  // Call a function to generate new Path object
  newPath();
  endAnchors.push(
    {
      pipe: "GDP_Y",
      textPosition: [width / 2.9, 60],
      rotation: 0,
      anchor: paths[0].points[4],
      nextIds: [1, 2],
      probabilities: [economic_rates['TAX_RATE'], 1 - economic_rates['TAX_RATE']],
    },

    {
      pipe: "Taxes",
      textPosition: [width / 2.45, height / 5 + offset * 2],
      rotation: 315,
      anchor: paths[1].points[1],
      nextIds: [3],
      probabilities: [1],
    },

    {
      pipe: "Disposable Income",
      textPosition: [width / 2.05, height / 3.5],
      rotation: 0,
      anchor: paths[2].points[1],
      nextIds: [6, 7],
      probabilities: [
        economic_rates['AVERAGE_PROPENSITY_TO_CONSUME'],
        1 - economic_rates['AVERAGE_PROPENSITY_TO_CONSUME'],
      ],
    },

    {
      pipe: "_Taxes_2",
      textPosition: [width / 2.0, height / 3.5],
      rotation: 0,
      anchor: paths[3].points[1],
      nextIds: [4, 5],
      probabilities: [
        economic_rates['GOVERNMENT_EXPENDITURE_RATE'],
        1 - economic_rates['GOVERNMENT_EXPENDITURE_RATE'],
      ],
    },

    {
      pipe: "Govt_Expt",
      textPosition: [width / 2.45, height / 1.95],
      rotation: 25,
      anchor: paths[4].points[1],
      nextIds: [11],
      probabilities: [1],
    },

    {
      pipe: "Govt_Surplus",
      textPosition: [width / 2.57, height / 1.6],
      rotation: 270,
      anchor: paths[5].points[1],
      nextIds: [null],
      probabilities: [1],
    },

    {
      pipe: "Consumption",
      textPosition: [width / 2.17, height / 2.01],
      rotation: 270,
      anchor: paths[6].points[1],
      nextIds: [11],
      probabilities: [1],
    },

    {
      pipe: "Savings",
      textPosition: [width / 2, height / 3.1],
      rotation: 15,
      anchor: paths[7].points[1],
      nextIds: [8],
      probabilities: [1],
    },

    {
      pipe: "_Savings_1",
      textPosition: [width / 2.05, height / 3.5],
      rotation: 0,
      anchor: paths[7].points[1],
      nextIds: [8],
      probabilities: [1],
    },

    {
      pipe: "_Savings_2",
      textPosition: [width / 2.05, height / 3.5],
      rotation: 0,
      anchor: paths[8].points[1],
      nextIds: [9, 10],
      probabilities: [
        economic_rates['INVESTMENT_RATE'],
        1 - economic_rates['INVESTMENT_RATE'],
      ],
    },

    {
      pipe: "Investment",
      textPosition: [width / 2, height / 2],
      rotation: 333,
      anchor: paths[9].points[1],
      nextIds: [11],
      probabilities: [1],
    },

    {
      pipe: "Idle_Reserves",
      textPosition: [width / 1.76, height / 2],
      rotation: 90,
      anchor: paths[10].points[1],
      nextIds: [null],
      probabilities: [1],
    },

    {
      pipe: "_Total_Expenditure",
      textPosition: [width / 2.05, height / 3.5],
      rotation: 0,
      anchor: paths[11].points[1],
      nextIds: [13, 12],
      probabilities: [
        economic_rates['AVERAGE_PROPENSITY_IMPORT'],
        1 - economic_rates['AVERAGE_PROPENSITY_IMPORT'],
      ],
    },

    {
      pipe: "Domestic_Expenditure",
      textPosition: [width / 2.13, height / 1.1],
      rotation: 270,
      anchor: paths[12].points[1],
      nextIds: [0],
      probabilities: [1],
    },

    {
      pipe: "Import",
      textPosition: [width / 2, height / 1.45],
      rotation: 30,
      anchor: paths[13].points[1],
      nextIds: [null],
      probabilities: [1],
    },

    {
      pipe: "Export",
      textPosition: [width / 2.0, height / 1.13],
      rotation: 315,
      anchor: paths[14].points[1],
      nextIds: [0],
      probabilities: [1],
    }
  );
  // We are now making random vehicles and storing them in an ArrayList
  for (let i = 0; i < TRANSACTION_BALANCE; i++) {
    newVehicle(width / 2 - offset, height - offset);
  }
  let numberOfBoxes = 2;
  createBoxes(numberOfBoxes, boxes);
}

function draw() {
  background(28, 79, 74);
  ZoomPanDraw();
  updateRates();

  mouseLocation = { x: mouseX, y: mouseY };

  for (let i = 0; i < paths.length; i++) {
    paths[i].display();
    let pathPoints = paths[i].points;
    for (let point of pathPoints) {
      point.move(mouseLocation);
      point.showSelected();
    }
  }

  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    // Path following and separation are worked on in this function
    v.applyBehaviors(vehicles, paths[v.pathId], debug);
    // Call the generic run method (update, borders, display, etc.)
    v.run();

    for (let j = 0; j < endAnchors.length; j++) {
      let endAnchor = endAnchors[j];

      if (endAnchor.anchor.intersects(v.position)) {
        v.pathId = selectNumber(endAnchor.nextIds, endAnchor.probabilities);
        if (v.pathId === null) {
          vehicles.splice(i, 1);
        }
      }
    }
  }

  for (let j = 0; j < endAnchors.length; j++) {
    let endAnchor = endAnchors[j];
    if (endAnchor.pipe[0] === "_") continue;
    fill(200);
    textSize(14);
    push();
    translate(endAnchor.textPosition[0], endAnchor.textPosition[1]);
    rotate(endAnchor.rotation);
    text(endAnchor.pipe, 0, 0);
    pop();
  }
}

if (mouseStates.selection_tool) {
  function mousePressed() {
    // translate(mouseX, mouseY);
    for (let box of boxes) {
      if (box.contains(mouseLocation)) {
        box.isSelected = true;
      }
    }

    for (let i = 0; i < paths.length; i++) {
      let pathPoints = paths[i].points;
      for (let j = 0; j < pathPoints.length; j++) {
        if (pathPoints[j].intersects(mouseLocation)) {
          pathPoints[j].isSelected = true;
        }
      }
    }
  }

  function updateRates() {
    let list = [
      [economic_rates['TAX_RATE'], 0],
      [economic_rates['AVERAGE_PROPENSITY_TO_CONSUME'], 2],
      [economic_rates['GOVERNMENT_EXPENDITURE_RATE'], 3],
      [economic_rates['INVESTMENT_RATE'], 9],
      [economic_rates['AVERAGE_PROPENSITY_IMPORT'], 12],
    ];
    // console.log(AVERAGE_PROPENSITY_TO_CONSUME);
    for (let [rate, index] of list) {
      endAnchors[index].probabilities[0] = rate;
      endAnchors[index].probabilities[1] = 1 - rate;
    }
  }

  function mouseReleased() {
    for (let box of boxes) {
      box.isSelected = false;
    }

    for (let i = 0; i < paths.length; i++) {
      let pathPoints = paths[i].points;

      for (let j = 0; j < pathPoints.length; j++) {
        pathPoints[j].isSelected = false;
      }
    }
  }
}

function keyPressed() {
  if (key == "d") {
    debug = !debug;
  }
}

function createBoxes(numberOfBoxes, boxes) {
  let box;
  for (let i = 0; i < numberOfBoxes; i++) {
    box = new Box(135, 10);
    boxes.push(box);
  }
}

function newPath() {
  // A path is a series of connected points
  // A more sophisticated path might be a curve

  // Income GDP_Y Pipe
  paths[0] = new Path();
  paths[0].addPoint(width / 2 - offset, height - offset);
  paths[0].addPoint(width / 3, height - offset);
  paths[0].addPoint(width / 3, offset);
  paths[0].addPoint(width / 2 - offset, offset);
  paths[0].addPoint(width / 2 - offset, height / 5);

  // Taxes Pipe
  paths[1] = new Path();
  paths[1].addPoint(width / 2 - offset, height / 5);
  paths[1].addPoint(width / 2.5, height / 5 + offset * 3);

  // Disposable Income
  paths[2] = new Path();
  paths[2].addPoint(width / 2 - offset, height / 5);
  paths[2].addPoint(width / 2 - offset, height / 5 + offset * 3);

  // Taxes Pipe 2
  paths[3] = new Path();
  paths[3].addPoint(width / 2.5, height / 5 + offset * 3);
  paths[3].addPoint(width / 2.5, height / 3 + offset * 3);

  // Government expenditure
  paths[4] = new Path();
  paths[4].addPoint(width / 2.5, height / 3 + offset * 3);
  paths[4].addPoint(width / 2 - offset, height / 2 + offset);

  //  Government Surplus
  paths[5] = new Path();
  paths[5].addPoint(width / 2.5, height / 3 + offset * 3);
  paths[5].addPoint(width / 2.5, height / 1.7 + offset);

  //  Consumption
  paths[6] = new Path();
  paths[6].addPoint(width / 2 - offset, height / 5 + offset * 3);
  paths[6].addPoint(width / 2 - offset, height / 2 + offset);

  //  Savings
  paths[7] = new Path();
  paths[7].addPoint(width / 2 - offset, height / 5 + offset * 3);
  paths[7].addPoint(width / 1.8, height / 4 + offset * 3);

  //  Savings 2
  paths[8] = new Path();
  paths[8].addPoint(width / 1.8, height / 4 + offset * 3);
  paths[8].addPoint(width / 1.8, height / 3 + offset * 3);

  //  Investments
  paths[9] = new Path();
  paths[9].addPoint(width / 1.8, height / 3 + offset * 3);
  paths[9].addPoint(width / 2 - offset, height / 2 + offset);

  //    Idle Reserves
  paths[10] = new Path();
  paths[10].addPoint(width / 1.8, height / 3 + offset * 3);
  paths[10].addPoint(width / 1.8, height / 2 + offset * 3);

  // Total Expenditure
  paths[11] = new Path();
  paths[11].addPoint(width / 2 - offset, height / 2 + offset);
  paths[11].addPoint(width / 2 - offset, height / 2 + offset * 3);

  //  Domestic Expenditure
  paths[12] = new Path();
  paths[12].addPoint(width / 2 - offset, height / 2 + offset * 3);
  paths[12].addPoint(width / 2 - offset, height - offset);

  //  Import
  paths[13] = new Path();
  paths[13].addPoint(width / 2 - offset, height / 2 + offset * 3);
  paths[13].addPoint(width / 1.8, height / 1.7 + offset * 3);

  //  Export
  paths[14] = new Path();
  paths[14].addPoint(width / 1.8, height / 1.5 + offset * 3);
  paths[14].addPoint(width / 2 - offset, height - offset);
}

function newVehicle(x, y) {
  let maxspeed = random(2, 4);
  let maxforce = 0.3;
  let pathId = 0;
  vehicles.push(new Vehicle(x, y, maxspeed, maxforce, pathId));
}

function selectNumber(numbers = [], probabilities = []) {
  var num = Math.random(),
    s = 0,
    lastIndex = probabilities.length - 1;

  for (var i = 0; i < lastIndex; ++i) {
    s += probabilities[i];

    if (num < s) {
      return numbers[i];
    }
  }

  return numbers[lastIndex];
}
