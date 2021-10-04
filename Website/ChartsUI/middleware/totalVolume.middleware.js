
export default function totalVolume(all_workouts){
   //console.log(all_workouts);
   let volume_of_every_workout = {'date':[],'total_volume':[]};
   let current_date = all_workouts[0]['date'];
   let total_volume_of_current_workout = 0;

   for (let workout_index in all_workouts){
      if (all_workouts[workout_index]['date'] != current_date){
         volume_of_every_workout.date.push(current_date);
         volume_of_every_workout.total_volume.push(total_volume_of_current_workout);
         //volume_of_every_workout.push({'date':current_date,'total_volume':total_volume_of_current_workout});
         total_volume_of_current_workout = 0;
         current_date = all_workouts[workout_index]['date'];
      }
      total_volume_of_current_workout += all_workouts[workout_index]["weight"] * all_workouts[workout_index]["reps"];
   }
   if (total_volume_of_current_workout != 0){
      volume_of_every_workout.date.push(current_date);
      volume_of_every_workout.total_volume.push(total_volume_of_current_workout);
      //volume_of_every_workout.push({'Date':current_date,'Total Volume':total_volume_of_current_workout});
   }
   return volume_of_every_workout;
   /*
   */
}