import {COLUMNS, ROWS} from "../CONST";

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomRow() {
  return randomIntFromInterval(0, ROWS);
}

export function getRandomColumn() {
  return randomIntFromInterval(0, COLUMNS);
}