export default function import_data(all_workouts){
   let all_exercises = []
   let all_labels = all_workouts[0]
   for (let workout_index in all_workouts){
      if (workout_index == 0) continue;
      let current_workout = {}
      for (let label_index = 0; label_index < 12; label_index++){
         current_workout[all_labels[label_index].toLowerCase().replace(/\W/g, '_')] = all_workouts[workout_index][label_index]
      }
      all_exercises.push(current_workout)
   }
   return all_exercises
}