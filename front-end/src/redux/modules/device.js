/* ----------------- 액션 타입 ------------------ */
const CONNECT = 'device/CONNECT';
const DISCONNECT = 'device/DISCONNECT';
const SOUNDON = 'device/SOUNDON';
const SOUNDOFF = 'device/SOUNDOFF';
// 덕스 패턴에서는 액션 타입을 정의할 때 이와 같이 접두사를 붙임.
// 다른 모듈과 이름이 중복되지 않게 하기 위함.

/* ----------------- 액션 생성 함수 ------------------ */
export const connect = () => ({ type: CONNECT });
export const disconnect = () => ({ type: DISCONNECT });
export const soundOn = () => ({ type: SOUNDON });
export const soundOff = () => ({ type: SOUNDOFF });

/* ----------------- 모듈의 초기 상태 ------------------ */
const initialState = {
  isConnected: false,
  sound: false,
  step:0,
};

/* ----------------- 리듀서 ------------------ */
export default function device(state = initialState, action) {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        isConnected: true,
      };
    case DISCONNECT:
      return {
        ...state,
        isConnected: true,
      };
    case SOUNDON:
      return {
        ...state,
        sound: true,
      };
    case SOUNDOFF:
      return {
        ...state,
        sound: false,
      };
    default:
      return state;
  }
}