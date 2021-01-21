var canvas = new fabric.Canvas("canvas");
let selections = [];

createDrawing();

let clickedOnObject = false;

canvas.on("mouse:down", function (e) {
  console.log("mouse:DOWN", e.objCanvas.type);
  if (!clickedOnObject) {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  } else {
    clickedOnObject = false;
  }
  // clicked item will be
  // console.log("created", e);
  // selections = [];
});

canvas.on("selection:created", function (e) {
  // clicked item will be
  clickedOnObject = true;
  console.log("created", e);
  // selections = [];
});

canvas.on("selection:updated", function (e) {
  // clicked item will be
  console.log("updated", e);
  // selections = [];
});

canvas.on("selection:cleared", function (e) {
  // clicked item will be
  console.log("cleared", e);
  // selections = [];
});

function makeSelect(data, index) {
  const allSelectionIndexes = selections
    .map((d) => d.cIndex)
    .sort((a, b) => a - b);

  if (!allSelectionIndexes.includes(index)) {
    if (allSelectionIndexes.length > 0) {
      const leftSelectionIndex = allSelectionIndexes[0];
      const righhtSelectionIndex =
        allSelectionIndexes[allSelectionIndexes.length - 1];
      const allowedIndexs = [leftSelectionIndex - 1, righhtSelectionIndex + 1];

      if (allowedIndexs.includes(index)) {
        data["cIndex"] = index;
        selections.push(data);
      }
    } else {
      data["cIndex"] = index;
      selections.push(data);
    }
  } else {
    selections = selections.filter((d) => d.cIndex !== index);
  }
  $("#total").html(selections.length);
  multiSelect();
}

function createDrawing() {
  [100, 180, 260, 340].map((d, i) => {
    var rect = new fabric.Rect({
      top: 100,
      left: d,
      width: 60,
      height: 70,
      fill: ["red", "blue", "green", "gray"][i],
    });

    canvas.add(rect);
    // canvas.item(i).hasControls = false;

    let indexNum = i;
    // rect.on("object:selected", function (e) {
    //   // e.target should be the circle
    //   console.log(e);
    //   // makeSelect(e.target, indexNum);
    // });
  });

  // canvas.on("object:selected", function (e) {
  //   console.log(e);
  // });
}

function multiSelect() {
  canvas.discardActiveObject();
  //   const groupObjects = canvas.getObjects().filter((d, i) => {
  //     return selections.includes(i);
  //   });

  var sel = new fabric.ActiveSelection(selections, {
    canvas: canvas,
    borderColor: "red",
    hasControls: false,
    borderScaleFactor: 2,
    padding: 5,
  });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
}

function reset() {
  selections = [];
  canvas.discardActiveObject();
  canvas.requestRenderAll();

  $("#total").html("-");
}
