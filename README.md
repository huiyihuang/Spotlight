# Spotlight
SI 669 Group Project

How to use git to collaborate:
  1.Before coding:
    a. git checkout -b <name of new branch>
  2. After coding:
    a. git push origin <branch name>
    b. create pull request
  3. After reviewed by team member:
    a. Merge to master brach
    b. git checkout master
    c. git pull

Pages now:
  1. Home, showing diaries users have saved
  2. Detail, allow users to create and update diaries
  
Data Model:
  1. Diary: events users saved(key,text,timestamp,image)
  2. Mood: everyday mood(key,type,timestamp)
  
Functions in Service:
  1. observable
  2. get diary by key
  3. get diaries
  4. add diary
  5. delete diary
  6. update diary 

  
