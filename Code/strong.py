import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
import datetime as dt
from simple_term_menu import TerminalMenu

df = pd.read_csv ('./Data/strong.csv')
#Num:    0        1              2           3              4           5        6        7        8        9        10             11
Keys = ["Date","Workout Name","Duration","Exercise Name","Set Order","Weight","Reps","Distance","Seconds","Notes","Workout Notes","RPE"]
# User list comprehension to create a list of lists from Dataframe rows
list_of_rows = [list(row) for row in df.values]
list_of_dict = []
for workout in list_of_rows:
   workout_dict = {}
   for key_index,data in enumerate(workout):
      if Keys[key_index] == 'Weight':
         workout_dict[Keys[key_index]] = float(data)
      elif Keys[key_index] == 'Reps':
         workout_dict[Keys[key_index]] = int(data)
      else:
         workout_dict[Keys[key_index]] = data
   list_of_dict.append(workout_dict)
#print(list_of_dict)
all_workouts = list_of_dict
all_exercise_names = list(set([i["Exercise Name"] for i in all_workouts]))
# 1RM
def OneRepMax(weight,reps):
   percentage = (100-(reps*2.5))/100
   return int(weight/percentage)

# Total Volume
def total_volume(with_plot = True):
   volume_of_every_workout = []
   current_date = all_workouts[0]['Date']
   total_volume_of_current_workout = 0
   for workout in all_workouts:
      if workout['Date'] != current_date:
         volume_of_every_workout.append({'Date':current_date,'Total Volume':total_volume_of_current_workout})
         total_volume_of_current_workout = 0
         current_date = workout['Date']
      total_volume_of_current_workout += workout["Weight"] * workout["Reps"] 
   if total_volume_of_current_workout != 0:
      volume_of_every_workout.append({'Date':current_date,'Total Volume':total_volume_of_current_workout})
   if with_plot:
      x_axis = []
      y_axis = []
      for i in volume_of_every_workout:
         x_axis.append( dt.datetime.fromisoformat( i["Date"] ))
         y_axis.append( i["Total Volume"] )

      clist = [(0, "red"), (0.125, "red"), (0.25, "orange"), (0.5, "green"), 
               (0.7, "green"), (0.75, "blue"), (1, "blue")]
      rvb = mcolors.LinearSegmentedColormap.from_list("", clist)
      color=rvb(np.array(y_axis)/max(y_axis))
      plt.style.use('dark_background')
      plt.rcParams["figure.figsize"] = (12,7)
      plt.bar(x_axis,y_axis,width = 0.9, color=color)
      plt.scatter(x_axis,y_axis, color=color)
      plt.title("Total volume per Workout")
      plt.xticks(rotation=45)
      plt.grid(axis='y', which='both')
      plt.ylabel("Total Volume")
      plt.xlabel("Date")
      plt.show()   
      
      plt.cla()
      plt.clf()
   return volume_of_every_workout




# Best set over time per given exercise
def best_set(exercise_name = "Snatch (Barbell)", with_plot = True):
   best_sets = []
   current_date = all_workouts[0]['Date']
   current_best_set = 0
   for workout in all_workouts:
      if workout["Exercise Name"] != exercise_name:
         continue
      if workout['Date'] != current_date:
         best_sets.append({"Date":current_date, "1RM":current_best_set})
         current_best_set = 0
         current_date = workout["Date"]
      if current_best_set <= OneRepMax(workout['Weight'],workout['Reps']):
         current_best_set = OneRepMax(workout['Weight'],workout['Reps'])
   if current_best_set != 0:
      best_sets.append({"Date":current_date, "1RM":current_best_set})
   if with_plot:
      x_axis = []
      y_axis = []
      for i in best_sets:
         x_axis.append( dt.datetime.fromisoformat( i["Date"] ))
         y_axis.append( i["1RM"] )
      plt.style.use('dark_background')
      plt.rcParams["figure.figsize"] = (12,7)
      plt.plot(x_axis,y_axis, color="red", linewidth = 2,
            marker='.', markerfacecolor='blue', markersize=10)
      plt.title("Best set of {} per Workout".format(exercise_name))
      plt.xticks(rotation=45)
      plt.grid()
      plt.ylabel("Best Set")
      plt.xlabel("Date")
      plt.show()   
      
      plt.cla()
      plt.clf()
   return best_sets



# Total volume over time per given exercise
def total_volume_per_exercise(exercise_name = "Snatch (Barbell)", with_plot = True):
   volume_of_every_set = []
   current_date = all_workouts[0]['Date']
   current_sets_volume = 0
   for workout in all_workouts:
      if workout["Exercise Name"] != exercise_name:
         continue
      if workout['Date'] != current_date:
         volume_of_every_set.append({"Date":current_date, "Volume":current_sets_volume})
         current_sets_volume = 0
         current_date = workout["Date"]
      current_sets_volume += workout["Weight"] * workout["Reps"] 
   if current_sets_volume != 0:
      volume_of_every_set.append({"Date":current_date, "Volume":current_sets_volume})
   if with_plot:
      x_axis = []
      y_axis = []
      for i in volume_of_every_set:
         x_axis.append( dt.datetime.fromisoformat( i["Date"] ))
         y_axis.append( i["Volume"] )
      plt.style.use('dark_background')
      plt.rcParams["figure.figsize"] = (12,7)
      plt.plot(x_axis,y_axis, color="red", linewidth = 2,
            marker='.', markerfacecolor='blue', markersize=10)
      plt.title("Volume of {} per Workout".format(exercise_name))
      plt.xticks(rotation=45)
      plt.grid()
      plt.ylabel("Volume")
      plt.xlabel("Date")
      plt.show()   
      
      plt.cla()
      plt.clf()
   return volume_of_every_set




# PR progression over time per given exercise
def PR_progression(exercise_name = "Snatch (Barbell)", with_plot = True):
   current_PR = 0
   current_date = all_workouts[0]['Date']
   all_PRs = [{"Date":current_date, "PR":current_PR}]
   for workout in all_workouts:
      if workout["Exercise Name"] != exercise_name:
         continue
      if current_PR <= OneRepMax(workout["Weight"],workout["Reps"]):
         current_PR = OneRepMax(workout["Weight"],workout["Reps"])
         current_date = workout["Date"]

         all_PRs.append({"Date":current_date, "PR":current_PR})
   all_PRs = all_PRs[1:]
   if with_plot:
      x_axis = []
      y_axis = []
      for i in all_PRs:
         x_axis.append( dt.datetime.fromisoformat( i["Date"] ))
         y_axis.append( i["PR"] )
      plt.style.use('dark_background')
      plt.rcParams["figure.figsize"] = (12,7)
      plt.plot(x_axis,y_axis, color="red", linewidth = 2,
            marker='.', markerfacecolor='blue', markersize=10)
      plt.title("PR of {} over Time".format(exercise_name))
      plt.xticks(rotation=45)
      plt.grid()
      plt.ylabel("PR")
      plt.xlabel("Date")
      plt.show()   
      
      plt.cla()
      plt.clf()
   return all_PRs





# Max consecutive reps 
def max_consecutive_reps(exercise_name = "Snatch (Barbell)", with_plot = True):
   most_reps = []
   current_date = all_workouts[0]['Date']
   current_most_reps = 0
   for workout in all_workouts:
      if workout["Exercise Name"] != exercise_name:
         continue
      if workout['Date'] != current_date:
         most_reps.append({"Date":current_date, "Most Reps":current_most_reps})
         current_most_reps = 0
         current_date = workout["Date"]
      if current_most_reps <= workout["Reps"]:
         current_most_reps = workout["Reps"]
   if current_most_reps != 0:
      most_reps.append({"Date":current_date, "Most Reps":current_most_reps})
   if with_plot:
      x_axis = []
      y_axis = []
      for i in most_reps:
         x_axis.append( dt.datetime.fromisoformat( i["Date"] ))
         y_axis.append( i["Most Reps"] )
      plt.style.use('dark_background')
      plt.rcParams["figure.figsize"] = (12,7)
      plt.plot(x_axis,y_axis, color="red", linewidth = 2,
            marker='.', markerfacecolor='blue', markersize=10)
      plt.title("Most Reps of {} per Workout".format(exercise_name))
      plt.xticks(rotation=45)
      plt.grid()
      plt.ylabel("Most Reps")
      plt.xlabel("Date")
      plt.show()   
      
      plt.cla()
      plt.clf()
   return most_reps



#total_volume()
#best_set()
#total_volume_per_exercise()
#PR_progression()
#max_consecutive_reps()


def main():  
   chosen_exercise = all_exercise_names[TerminalMenu(all_exercise_names).show()]
   all_graphs = ['Total Volume per Workout','Best Set per Exercise per Workout','Total Volume per Exercise per Workout','PR Progression per Exercise','Max Consecutive Reps per Exercise per Workout','EXIT']
   chosen_graph = all_graphs[TerminalMenu(all_graphs).show()]
   graph = {
      'Total Volume per Workout':total_volume,
      'Best Set per Exercise per Workout':best_set,
      'Total Volume per Exercise per Workout':total_volume_per_exercise,
      'PR Progression per Exercise':PR_progression,
      'Max Consecutive Reps per Exercise per Workout':max_consecutive_reps
   }
   if (chosen_graph == 'EXIT'):
      return
   if (chosen_graph == 'Total Volume per Workout'):
      graph[chosen_graph]()
   else:
      graph[chosen_graph](chosen_exercise)


if __name__ == "__main__":
    main()