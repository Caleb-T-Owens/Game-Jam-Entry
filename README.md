# FlopmanGame
### My entry for "The weekly game jam" #137

So this was an attempt at an entry for *The weekly game jam* #137. I ended up not completing it due to me running out of time that I allocated to the project.

I am writing a summery about my experiences and all that I learned and I will link it here when its complete.


## How can I see what has been made? 
#### Information
The game is very dark because it was going to be a horror game (*there are no horror elements implemented*) so if your monitor has bad contrast or black trueness you will struggle to see.

Another thing to mention is that you can only move forward 0 to 90 degrees left, think moving forwards away from 0,0 in +x and +y quadrant. This is because the math I figured out only covered moving in that direction.

To move use `a` to look left `s` to look right, `w` to move forward, and `r` to move back (I think I implemented that). Those keys are the colemak wasd keys you can change them in the main js file. It doesn't have any walking speed so it looks around and moves `on key down` so if you system does multiple letter presses after you hold a key depending on your browser it can move around by holding a key down.

This was only programmed with the latest version of chrome in mind so you may have different experiences depending on your browser

### The easy way
The easy way to run the game would be to use the [gitbook](https://pinkflufflyllama.github.io/Game-Jam-Entry/src/index.html) which will have the latest commits and pushes.

### The harder way
To run this locally you will need to run a http server because, at least, chrome doesn't allow loading es6 modules locally
#### How to install apache2 http server on ubuntu 19
1. Install apache2 `sudo apt install apache2`. If you have a firewall you may need to allow port 80.
2. Put the repo in the `var/www/html` or inside `var/www/html` make a folder link to the repo folder `ln -s LINK_TO_REPO LINK_NAME`. I use the latter method but it may be considered less secure.