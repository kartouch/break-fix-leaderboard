# Break Fix Leaderboard

Summit leaderboard for Break Fix challenge.

## Development commands

Start server: http-server

navigate to: /src


## Notes

1. Icons are set up for larger devices and defined explicitly in the .svgs.
   - Take this into consideration if you're viewing on a smaller device.
   - I made some modifications for font sizes on smaller devices, but the ideal screen size is 1920px.


2. A css animation in main.scss called listfade can help with transitioning between challenges.
   - You can also change the text inside of h2.challenge-subtitle on each transition.


3. Colors
   - Depending on the screen and color settings, you may need to adjust the final color profile at Summit. After testing the Engage leaderboard on a few different screens, we found that the color profile isn't consistent.


4. Zoom
   - You might need to adjust the zoom percentage depending on the screen size. I'm still tweaking the way everything scales. This is a "just in case" alternative.


Take a look at leaderboard.js to understand how the data is being passed through. We'll most likely make changes as Summit nears, so please pull down the latest as you test.


## To Do:

1. Add an animation for leaders changing rank
   - I'll include this, but it's entirely optional for Break Fix since you'll be transitioning on each challenge.

2. Fine tune design details and ensure that it scales well.


I'm still making minor edits to the overall style as I continue testing. Feel free to pull down the repo and start adapting the leaderboard into your game.
