# To Do

[ ] Reduce CPU load by:
  [ ] making it easy (via configuration) to switch between stereo and mono
  [ ] reducing the number of out/in unit generators if possible
[ ] Add support for bypassing effects somehow. (Should all ugens have a bypass mode?)
[ ] Add support for MIDI input
  [x] create a modelized controller component
  [ ] create some form of indirection between MIDI notes and voices, such that they can be remapped (using a dynamic "MIDI learn" function, too) on the fly
  [ ] add support to Flocking for defining filters on flock.midi.connection, including channel, notes, controls, etc.
