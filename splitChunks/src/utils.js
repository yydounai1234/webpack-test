import { SCORE } from './config'

export const add = function(score) {
  return ++ score
}

export const reduce = function(score) {
  return -- score
}

export const isFullMark = function(score) {
  return score >= SCORE
}

export const asyncRun = function() {
  console.log('异步运行的结果')
}