const fs       = require("fs");
const fileName = "./input/day1.txt";
let   left     = [];
let   right    = [];
let   lines    = [];

function prepareTheFile(fileName) {
  let fileContents = null;
  try {
    fileContents = fs.readFileSync(fileName, "utf-8");
    console.log("successfully read " + fileName);
  } catch (err) {
    console.log("failed to read " + fileName);
  }
  let lines = fileContents.split("\r\n");
  return lines;
}

function separateLists(lines) {
  let left  = [];
  let right = [];
  for (let each of lines) {
    let row = each.split("   ");
    left.push(parseInt(row[0]));
    right.push(parseInt(row[1]));
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  return { left, right };
}

function totalDistance(left, right) {
    // https://adventofcode.com/2024/day/1
  let sum = 0;
  let i   = 0;
  while (i < 1000) {
    if (left[i] > right[i]) {
      sum += left[i] - right[i];
      i++;
    }
    if (right[i] > left[i]) {
      sum += right[i] - left[i];
      i++;
    }
    if (right[i] == left[i]) {
      i++;
    }
  }
  // 2378066
  return sum;
}

function totalSimilarity(left, right) {
  let similarity = 0;
  let multiplier = 0;
  let l          = 0;
  let r          = 0;
  while (l < 1000) {
    while (r < 1000) {
      if (left[l] == right[r]) {
        multiplier++;
      }
      r++;
    }
    similarity += left[l] * multiplier;
    multiplier = 0;
    r = 0;
    l++;
  }
  // 18934359
  return similarity;
}

lines = prepareTheFile(fileName);
({ left, right } = separateLists(lines));
console.log("Total Distance is : " + totalDistance(left, right));
console.log("Total similarity is: " + totalSimilarity(left, right));