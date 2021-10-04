import OneRepMax from "./OneRepMax.middleware";
export default function PR_progression(all_workouts, exercise_name = "Snatch (Barbell)"){
   let current_PR = 0
   let current_date = all_workouts[0]['date']
   let all_PRs = {"date":[current_date], "PR":[current_PR]}

   for (let workout_index in all_workouts){
      let workout = all_workouts[workout_index];
      
      if (workout["exercise_name"] != exercise_name){
         continue;
      }
      if (current_PR <= OneRepMax(workout["weight"],workout["reps"])){
         current_PR = OneRepMax(workout["weight"],workout["reps"])
         current_date = workout["date"]
         all_PRs.date.push(current_date)
         all_PRs.PR.push(current_PR)
      }

   }
   all_PRs.date.shift()
   all_PRs.PR.shift()

   return all_PRs
}