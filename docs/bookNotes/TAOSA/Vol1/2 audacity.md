## 2. [Audacity](https://www.audacityteam.org/)

[Github](https://github.com/audacity/audacity)

Sound recording and editing software. The architecture is described as "like a city", there are some impressive buildings, and some less impressive buildings. It is hindered by licencing issues but gets around these by supporing standard APIs - so said licenced code may be plugged in by a user. Thinking in layers, the base is 3rd party cross platform libs that expose general audio (PortAudio) and GUI (wxWidgets) APIs. These are in seperate DLL files (rather than being compiled into the core file). Size and speed suffer for this, but it allows other DLLs to use them directly at run time - greater extensability.

An abstraction mistake. There's a small story about the original implementation being for mono and not stereo. So the code defaults to one channel, but has been modified to check for 2 channels later on in many places. Better if originally designed for `n` channels. This issue was also locked in by exposing a `GetLink` method to get the pair of a channel if it had one, this method has been used throughout and somewhat locked them in. The GUI architecture also has problems - mixes between plugin code, application code, and special cases with absolute positioning etc. They are hoping for a rewrite with greater abstractions - UI components with no required awareness of the greater context.

A drawback of the cross-platform libs: it runs 3 threads, each in their own way. A GUI thread created by wxWidgets and updated every 50ms. An audio thread created by PortAudio for recording and playback. And a buffer thread handled by the application code to keep thins snappy. This creates complexity but it is forced by the expectations of the plugins, had they rolled their own and abstraction could have been made but without all the cross-platform benefits.

Some audio is too big to be handled with speed, or even to fit in RAM. Audacity splits audio into ~1MB "block files" which are coordinated in an xml based .aup file. Edits only affect the relevant blocks. Block files also hold summary info which is used when zoomed out in place of processing the entire audio track. One issue on windows was lag with more than ~100 files were placed a single directory. So a hierarchy was created with never more than 100 files to a folder.

Audacity has grown organically, no plan was laied down, hence the city like code.

_The most applicable thing I've picked up from this is something like "non-array like arguments make code smell... a bit", or at least indicate that some thinking / explanation is required. Also, writing cross platform creates restrictions - glad I'm in the web space, going to stick here as much as I can!_