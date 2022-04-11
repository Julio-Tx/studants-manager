import * as types from '../types';

const initialState = {
  buttonClicked: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  // Lidar e alterar o estado acima
  //
  // caso o botão seja clicado, criar uma novo estado e retornar o estado novo alterado (sem alterar o estado inicial)
  switch (action.type) {
    case types.BUTTON_CLICKED_SUCESS: {
      console.log('Sucess');
      const newState = { ...state };
      newState.buttonClicked = !newState.buttonClicked;
      return newState;
    }
    case types.BUTTON_CLICKED_FAILURE: {
      console.log('Error D:');
      return state;
    }
    case types.BUTTON_CLICKED_REQUEST: {
      console.log('Making request');
      return state;
    }

    default: {
      return state;
    }
  }
}
