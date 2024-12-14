const fs         = require("fs");
const fileName   = "./input/day2.txt";
let   reports    = [];
let   safeLevels = [];
function prepareTheFile(fileName) {
  let fileContents = null;
  try {
    fileContents = fs.readFileSync(fileName, "utf-8");
    console.log("successfully read " + fileName);
  } catch (err) {
    console.log("failed to read " + fileName);
  }
      fileContents  = fileContents.split("\r\n");
  let splitContents = fileContents.map((item) => item.split(" ").map(Number));
  return splitContents;
}

function evalLevels(report) {
  let count = 0;
  let i     = 0;
  while (i < report.length - 1) {
      // descending
    if (report[i] < report[i + 1] && 
       report[i + 1] - report[i] < 4 && 
       report[i + 1] - report[i] > 0) {
      count++;
    } else {
      break;
    }
    i++;
  }
  if (count == report.length - 1) {
    return true;
  } else {
    count = 0;
  }
  i = 0;
  while (i < report.length - 1) {
      // ascending
    if (report[i] > report[i + 1] && 
        report[i] - report[i + 1] < 4 && 
        report[i] - report[i + 1] > 0) {
      count++;
    } else {
      break;
    }
    i++;
  }
  if (count == report.length - 1) {
    return true;
  } else {
    return false;
  }
}

function getSafeLevels(reports) {
  let safeLevels = [];
  reports.forEach((report) => {
    if (evalLevels(report) == true) {
      safeLevels.push(report);
    }
  });
  return safeLevels;
}

reports    = prepareTheFile(fileName);
safeLevels = getSafeLevels(reports);
console.log("Safe Report Count is : " + safeLevels.length);