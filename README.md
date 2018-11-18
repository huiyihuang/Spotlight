# Spotlight
SI 669 Group Project

How to use git to collaborate:
  Before coding:
    git checkout -b <name of new branch>
  After coding:
    git push origin <branch name>
    create pull request
  After reviewed by team member:
    Merge to master brach
    git checkout master
    git pull

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

  
