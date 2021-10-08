export default function max_consecutive_reps(all_workouts, exercise_name = "Snatch (Barbell)"){
   let most_reps = {"date":[], "most_reps":[]}
   let current_date = all_workouts[0]['date']
   let current_most_reps = 0

   for (let workout_index in all_workouts){
      let workout = all_workouts[workout_index];
      
      if (workout["exercise_name"] != exercise_name){
         continue;
      }
      if (current_most_reps <= workout['reps']){
         current_most_reps = workout["reps"]
      }
      if (workout['date'] != current_date){
         most_reps['date'].push(current_date)
         most_reps['most_reps'].push(current_most_reps)
         current_most_reps = 0
         current_date = workout["date"]
      }
   }
   if (current_most_reps != 0){
      most_reps['date'].push(current_date)
      most_reps['most_reps'].push(current_most_reps)
   }

   return most_reps
}