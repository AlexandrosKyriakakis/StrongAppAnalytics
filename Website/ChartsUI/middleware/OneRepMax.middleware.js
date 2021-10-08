import {floor} from 'math';
export default function OneRepMax(weight,reps){
   let percentage = 1+reps/30
   return floor(weight*percentage)
}