# MOTD-CBMP

Message of the day for SCP - Containment Breach Multiplayer

## Usage

- `F8` is the default toggle key.
- `motd.txt` is placed next to the server exe
- Make sure to place the scripts in the `scripts` folder, otherwise the scripts will not be sent (although not configurable, it is easy to change this if you want)
- The first 9 characters per line in `motd.txt` are the color values
- - `255255255` is white (`#FFFFFF`)
- - `255000000` is red (`#FF0000`)
- - `000255000` is green (`#00FF00`)
- - `000000255` is blue (`#0000FF`)
- The rest of the characters on the line is the actual line of text
- ASCII is really the only supported character-set at the moment, but feel free to modify the `Ascii` function in `str_util.gs` to try and fix that