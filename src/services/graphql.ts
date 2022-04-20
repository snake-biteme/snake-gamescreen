import gql from "graphql-tag";

export const updatePosition = gql`
    subscription OnPositionUpdated($screenId: ID!) {
        onPositionUpdated(screenId: $screenId) {
            playerId
            screenId
            direction
            color
        }
    }
`;