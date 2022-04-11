import React from 'react';
import apiClientAppSync from "../services/apiClientAppSync";
import gql from "graphql-tag";

function Screen() {

  const updatePosition = gql`
      subscription OnPositionUpdated($screenId: ID!) {
          onPositionUpdated(screenId: $screenId) {
              playerId
              screenId
              angle
              color
          }
      }
  `;

    const screenId = '123456789veryuniqueid1';
    let players = {};

    const realtimeResults = (data: any) => {
        const position = data.data.onPositionUpdated;

        console.log('realtime data: ', position);

        // let player = {
        //     playerId
        // };
        //
        // if (!Object.keys(players).includes(position.playerId)) {
        //     player = new Player(position.playerId, position.color);
        //     gameElement.append(player.getElement());
        //
        //     players[position.playerId] = player;
        // }
        //
        // player = players[position.playerId];
        //
        // player.updatePosition(position.angle);
        //
        // console.log(players);
    };

    apiClientAppSync.hydrated().then((client) => {
        const observable = client.subscribe({
            query: updatePosition,
            variables: {
                screenId: screenId,
            }
        });

        observable.subscribe({
            next: realtimeResults,
            complete: console.log,
            error: console.log,
        });
    });


    return (
        <div>Game</div>
    );
}

export default Screen;