# Spotlight
SI 669 Group Project
Team Members: Huiyi Huang, Ming-li Lee, Mingyue Gao

Install instructions:
  1. Clone the repo.
  2. Use <npm i> to install all required modules.
  3. Use <ionic lab> or <ionic serve> to run the app.

Tabs:
  1. Today
    - Quick Log: Quickly mark a photo during the day and complete the entry later in the evening.
    - Today's Highlights: Start the refelction process at the end of the day. First log your overall mood status of the day, and then write down at least three positive experience that happened today.

  2. Journal
    - Check all the logged entries.
    - Tap on each entry to see the details.

  3. Trend
    - View the line chart of the mood variation analysis.
    - View the photo gallery of the randomly selected ten photos that previously logged.


Pages:
  1. Home: 
    Shows the contents 'Today' tab, containing two buttons for the options of quick log or start the reflection. 
    If 'Today's Highlights' is selected, user will be directed to the Mood page.
    If 'Quick Log' is selected, an action sheet will be presented to let users choose between add photo with camera or from album. Certain native camera functions will be called after user make their choice. An alert for confirmation will be presented after user complete the quick log.

  2. Mood: 
    Show three mood icon for users to record their data. After user select one of the icon, he/she will be directed to the AddTodayHighlight page.
  
  3. AddTodayHighlight: 
    Shows today's highlight list for users to add entries. If there's no pre-logged photos, the highlight list will be blank. If there's already some logged data, there will be entry card with pre-logged photos for users to add texts.
    When user clicks add button or an existing entry, he/she will be directed to the CreateHighlight page to edit.
    When user clicks the remove icon on the right of each entry, the entry will be removed.
    When user has recorded three or more entries, a done button will appear for users to complete the process. When the done button is clicked, user will be directed to the Complete page.

  4. CreateHighlight: 
    Shows textarea for adding/editing text to a highlight, add photo button to insert a photo to this highlight from native photo album, save button to save this entry, and cancel button to cancel the edition.
    When user clicks the save button, he/she will be directed back to the AddTodayHighlight page to complete the process.
  
  5. Complete:
    Shows a message to let users know that today's process is completed.

  6. Journal:
    When user clicks the 'Journal' tab, he/she will be directed to this page, which shows all the logged entries. If user clicks one of the entry, he/she will be directed to the Detail page.
  
  7. Detail:
    Shows the content detail of a highlight and a back button to go back to the Journal page.

  8. Trend:
    Shows the line chart analysis of the mood trend of all entered data and a photo gallery of randomly selected 10 photos that previously logged.


Data Model:
  1. Diary: highlights users saved(key, text, year, month, day, image, hasimage)
  2. Mood: everyday mood(key, type, year, month, day)
  
Functions in Data Service:
  1. getObservable()
  2. notifySubscribers()
  3. getEntries()
  4. getMoods()
  5. getImgs()
  6. getDiaryByKey()
  7. getDiaryByDate()
  8. getMoodByKey()
  9. findDiaryByKey()
  10. findMoodByKey()
  11. removeDiary()
  12. addDiary()
  13. createQuickLog()
  14. addMood()
  15. updateDiary()
  16. updateMood()
  17. addPhotoFromAlbum()
  18. quickLogFromAlbum()
  19. quickLogWithCam()
  20. presentConfirmation()
  21. shuffle()

