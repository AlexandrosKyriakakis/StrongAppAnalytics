import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
import datetime as dt

df = pd.read_csv ('../Data/strong.csv')
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

"""
# Print list of lists i.e. rows
Snatch = np.array([i[:-5] for i in list_of_rows if i[3]=='Snatch (Barbell)'])
#print([i[:-5] for i in list_of_rows if i[3]=='Front Squat (Barbell)'])

x = [i[0] for i in Snatch]
y = [float(i[-2]) for i in Snatch]
plt.plot(y)
plt.grid()
plt.ylabel('some numbers')
plt.show()
"""
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

#total_volume()


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
#best_set()


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
#total_volume_per_exercise()



# PR progression over time per given exercise
def PR_progression(exercise_name = "Snatch (Barbell)", with_plot = True):
   

# Max consecutive reps 