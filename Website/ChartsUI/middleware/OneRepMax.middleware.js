import {floor} from 'math';
export default function OneRepMax(weight,reps){
   let percentage = (100-(reps*2.5))/100
   return floor(weight/percentage)
}