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
  1. Home: the access to AddTodayHighlight page & a list including all entries in the database as references for the convenience of development
  2. AddTodayHighlight: add button to add a new highlight, highlight list to show added highlights before complete
  3. CreateHighlight: textarea for adding text to a highlight, add photo button to insert a photo to this highlight from native photo album
  
Data Model:
  1. Diary: highlights users saved(key, text, year, month, day, image, hasimage)
  2. Mood: everyday mood(key, type, year, month, day)
  
Functions in Service:
  1. observable
  2. get diary by key
  3. get diaries
  4. get diary by date
  5. add diary
  6. delete diary
  7. update diary
  8. add photo from album
