# Break Fix Leaderboard

Summit leaderboard for the Break Fix challenge.

## Development commands

Start server: http-server

navigate to: /src


## Notes

1. Icons are set up for larger devices and defined explicitly in the .svgs.
   - Take this into consideration if you're viewing on a smaller device.


2. A css animation in main.scss called listfade can help with transitioning between challenges.
   - You can also change the text inside of h2.challenge-subtitle on each transition.


3. Color Profile
   - Depending on the screen and color settings, you may need to adjust the final color profile. I'm viewing this on a retina display and found inconsistencies on other screens.


4. Zoom
   - You might need to adjust the zoom percentage depending on the screen size. I'm still tweaking the way everything scales. This is a "just in case" alternative, but it works fine.


Take a look at leaderboard.js to understand how the data is being passed through. We'll most likely make a few changes as Summit nears, so please pull down the latest as you test.


## To Do:

1. Add an animation for leaders changing rank
   - I'll include this, but it's entirely optional for Break Fix since you'll be transitioning on each challenge.

2. Fine tune design details and ensure that it scales well.


I'm still making minor edits to the overall style as I continue testing. Feel free to pull down the repo and start adapting the leaderboard into your game.
