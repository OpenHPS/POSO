## Goal
The goal of this demonstrator is to show how POSO can be used to link multiple
positioning systems together. In this example we have three positioning systems:
- **Manual Geographical Positioning System**: Our first positioning system uses a map to select a position. This positioning system
works indepentantly and does not take the existing data into account.
- **Manual Indoor Positioning System**: We provide a non-trivial indoor positioning system that sets the position
of a user within a building. This positioning system works indepentantly and does not take the existing data into account.
- **Hybrid Positioning System**: Finally, our hybrid positioning system uses the data that exist to predict the position.