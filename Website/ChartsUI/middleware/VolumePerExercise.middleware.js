export default function volume_per_exercise(all_workouts, exercise_name = "Snatch (Barbell)"){
   let volume_of_every_set = {'date':[],'volume':[]}
   let current_date = all_workouts[0]['date']
   let current_sets_volume = 0

   for (let workout_index in all_workouts){
      let workout = all_workouts[workout_index];
      if (workout["exercise_name"] != exercise_name){
         continue;
      }
      if (workout['date'] != current_date){
         volume_of_every_set['date'].push(current_date);
         volume_of_every_set['volume'].push(current_sets_volume);
         current_sets_volume = 0;
         current_date = workout["date"];
      }
      current_sets_volume += workout["weight"] * workout["reps"]
   }
   if (current_sets_volume != 0){
      volume_of_every_set['date'].push(current_date);
      volume_of_every_set['volume'].push(current_sets_volume);
   }

   return volume_of_every_set
}
