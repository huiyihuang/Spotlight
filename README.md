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
  1. Home: the access to Today page & a list including all entries in the database as references
  2. AddTodayHighlight: add button to add a new highlight, highlight list to show added highlights before complete
  3. CreateHighlight: textarea for adding text to a highlight, add photo button to insert a photo to this highlight (native functions remained to be added)
  
Data Model:
  1. Diary: highlights users saved(key, text, year, month, day, image, hasimage)
  2. Mood: everyday mood(key, type, year, month, day)
  
Functions in Service:
  1. observable
  2. get diary by key
  3. get diaries
  4. add diary
  5. delete diary
  6. update diary
  7. get diary by date

  
