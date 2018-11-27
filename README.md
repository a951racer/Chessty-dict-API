# Chess REST API

> This project creates a wrapper around a JavaScript chess dictionary exposing it as a REST API.  Also, adds game persistence (save and recall completed, or in-progress games) via MongoDB

Very generically, a chess dictionary takes as input the state of a game, defined by an international notation standard "fen", and a proposed move.  The dictionary then outputs whether the proposed move is valid or not. It also outputs several booleans indicating game state. If a player is in check, for example.

Although fairly simple, this project is an example of using Node.js and Express to access a computational engine and expose it as a RESTful interface.  The computational engine, chess dictionary, was an existing project and was not coded as part of this project.
