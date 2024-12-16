const fs       = require("fs");
const fileName = "./input/day3.txt";

function prepareTheFile(fileName) {
  let fileContents = null;
  try {
    fileContents = fs.readFileSync(fileName, "utf-8");
    console.log("successfully read " + fileName);
  } catch (err) {
    console.log("failed to read " + fileName);
  }
  return fileContents;
}

function extractMul(input) {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    matches.push([parseInt(match[1]), parseInt(match[2])]);
  }

  return matches;
}

function totalMatches(matches) {
  let sumOfMatches = 0;
  let match;
  for (match of matches) {
    sumOfMatches += match[0] * match[1];
  }
  return sumOfMatches;
}

function extractListOfDos(input) {
  let   listOfDos = [];
  const regex     = /do\(\)(.*?)(don't\(\)|$)/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    listOfDos.push(match[1]);
  }

  return listOfDos;
}

function extractMulsFromDos(listOfDos) {
  const regex = /(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;
  const matches = [];
  let match;
  let isEnabled = true;

  while ((match = regex.exec(input)) !== null) {
    if (match[1] === "do()") {
      isEnabled = true;
    } else if (match[1] === "don't()") {
      isEnabled = false;
    } else if (isEnabled && match[2] && match[3]) {
      matches.push([parseInt(match[2]), parseInt(match[3])]);
    }
  }

  return matches;
}

let mulMemoryTotal = 0;
let input          = prepareTheFile(fileName);
let matches        = extractMul(input);
    mulMemoryTotal = totalMatches(matches);
console.log(`Day 3 Part 1 Total : ${mulMemoryTotal}`);

let dosMemoryTotal  = 0;
let listOfDos       = [];
let listOfMulsInDos = [];

listOfDos       = extractListOfDos(input);
listOfMulsInDos = extractMulsFromDos(listOfDos);
dosMemoryTotal  = totalMatches(listOfMulsInDos);
console.log(`Day 3 Part 2 Total : ${dosMemoryTotal}`);
