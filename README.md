# FlopmanGame
### My entry for "The weekly game jam" #137

So this was an attempt at an entry for *The weekly game jam* #137. I ended up not completing it due to me running out of time that I allocated to the project.

I am writing a summery about my experiences and all that I learned and I will link it here when its complete.


## How can I see what has been made? 
#### Information
The game is very dark because it was going to be a horror game (*there are no horror elements implemented*) so if your monitor has bad contrast or black trueness you will struggle to see.

Another thing to mention is that you can only move forward 0 to 90 degrees left, think moving forwards away from 0,0 in +x and +y quadrent. This is because the math I figgured out only covered moving in that direction.

To move use `a` to look left `s` to look right, `w` to move forward, and `r` to move back (I think I implemented that). Those keys are the colemak wasd keys you can change them in the main js file. It doesnt have any walking speed so it looks around and moves `on key down` so if you system does multiple letter presses after you hold a key depending on your browser it can move arround by holding a key down.

This was only programmed with the latest version of chrome in mind so you may have differnt experiences depending on your browser

### The easy way
The easy way to run the game would be to use the [gitbook](https://pinkflufflyllama.github.io/Game-Jam-Entry/src/index.html) which will have the latest commits and pushes.

### The harder way
To run this locally you will need to run a http server because, atleast, chome doesnt allow loading es6 modules locally
