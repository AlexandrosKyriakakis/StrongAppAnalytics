export default function AllExercises(all_workouts){
   let all_exercises = []
   for (let workout_index in all_workouts){
      let workout = all_workouts[workout_index]
      all_exercises.push(workout.exercise_name)
   }
   let set_of_all_exercises = Array.from(new Set(all_exercises)).sort()
   all_exercises = []
   for (let exercise_index in set_of_all_exercises){
      let exercise = set_of_all_exercises[exercise_index]
      all_exercises.push({label: exercise,value: exercise})
   }
   return all_exercises
}