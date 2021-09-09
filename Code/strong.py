import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
df = pd.read_csv ('../Data/strong.csv')
#Num:    0        1              2           3              4           5        6        7        8        9        10             11
#Keys:  Date | Workout Name | Duration | Exercise Name | Set Order | Weight | Reps | Distance | Seconds | Notes | Workout Notes |  RPE
# User list comprehension to create a list of lists from Dataframe rows
list_of_rows = [list(row) for row in df.values]
# Print list of lists i.e. rows
FrontSquat = np.array([i[:-5] for i in list_of_rows if i[3]=='Snatch (Barbell)'])
#print([i[:-5] for i in list_of_rows if i[3]=='Front Squat (Barbell)'])

x = [i[0] for i in FrontSquat]
y = [float(i[-2]) for i in FrontSquat]
plt.plot(y)
plt.grid()
plt.ylabel('some numbers')
plt.show()