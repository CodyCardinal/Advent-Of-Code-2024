const fs = require("fs");
const fileName = "./input/day2.txt";
let reports = [];
let safeTolerance = 0;
let unSafeTolerance = 1;

function prepareTheFile(fileName) {
  let fileContents = null;
  try {
    fileContents = fs.readFileSync(fileName, "utf-8");
    console.log("successfully read " + fileName);
  } catch (err) {
    console.log("failed to read " + fileName);
  }
  fileContents = fileContents.split("\r\n");
  let splitContents = fileContents.map((item) => item.split(" ").map(Number));
  return splitContents;
}

function getLevels(reports, tolerance) {
  let safeLevels = [];
  let unSafeLevels = [];

  reports.forEach((report) => {
    if (evalLevels(report, tolerance)) {
      safeLevels.push(report);
    } else {
      unSafeLevels.push(report);
    }
  });

  return [safeLevels, unSafeLevels];
}

function evalLevels(report, tolerance) {
  function isAscending(report) {
    for (let i = 0; i < report.length - 1; i++) {
      if (report[i] >= report[i + 1] || report[i + 1] - report[i] > 3) {
        return false;
      }
    }
    return true;
  }

  function isDescending(report) {
    for (let i = 0; i < report.length - 1; i++) {
      if (report[i] <= report[i + 1] || report[i] - report[i + 1] > 3) {
        return false;
      }
    }
    return true;
  }

  if (isAscending(report) || isDescending(report)) {
    return true;
  }

  if (tolerance > 0) {
    for (let i = 0; i < report.length; i++) {
      let tempReport = report.slice(0, i).concat(report.slice(i + 1));
      if (evalLevels(tempReport, tolerance - 1)) {
        return true;
      }
    }
  }

  return false;
}

function testExamples() {
  const examples = [
    { report: [7, 6, 4, 2, 1], expected: true },
    { report: [1, 2, 7, 8, 9], expected: false },
    { report: [9, 7, 6, 2, 1], expected: false },
    { report: [1, 3, 2, 4, 5], expected: true },
    { report: [8, 6, 4, 4, 1], expected: true },
    { report: [1, 3, 6, 7, 9], expected: true },
  ];

  examples.forEach((example, index) => {
    const result = evalLevels(example.report, 1);
    console.log(`Example ${index + 1}: ${result === example.expected ? "Passed" : "Failed"}`);
  });
}

reports = prepareTheFile(fileName);
let [safeLevels, unSafeLevels]                  = getLevels(reports, safeTolerance);
let [safeLevelsWithTolerance, veryUnSafeLevels] = getLevels(unSafeLevels, unSafeTolerance);

console.log(`Day 2 Part 1: Safe levels with ${safeTolerance} tolerance: ${safeLevels.length}`);
console.log(`Day 2 Part 2: Safe levels with ${unSafeTolerance} tolerance: ${(safeLevelsWithTolerance.length + safeLevels.length)}`);

// testExamples();
