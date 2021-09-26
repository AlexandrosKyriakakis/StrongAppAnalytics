import OneRepMax from "./OneRepMax.middleware";
export default function best_set(all_workouts, exercise_name = "Snatch (Barbell)"){
   let best_sets = {'date':[], '1RM':[]};
   let current_date = all_workouts[0]['date'];
   let current_best_set = 0;

   for (let workout_index in all_workouts){
      let workout = all_workouts[workout_index];
      if (workout["exercise_name"] != exercise_name){
         continue;
      }
      if (workout['date'] != current_date){
         best_sets['date'].push(current_date);
         best_sets['1RM'].push(current_best_set);
         current_best_set = 0;
         current_date = workout["date"];
      }
      if (current_best_set <= OneRepMax(workout['weight'],workout['reps'])){
         current_best_set = OneRepMax(workout['weight'],workout['reps']);
      }

   }
   if (current_best_set != 0){
      best_sets['date'].push(current_date);
      best_sets['1RM'].push(current_best_set);
   }

   return best_sets
}