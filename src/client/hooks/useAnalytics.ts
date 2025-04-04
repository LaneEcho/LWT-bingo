import { useCallback } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase/firebase-api';

export enum EventName {
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  USERNAME_UPDATED = 'username_updated',
  TILE_SELECTED = 'tile_selected',
  BINGO_CLICKED = 'bingo_clicked',
  SCORE_SUBMITTED = 'score_submitted',
  /**
   * When board is created
   */
  BOARD_INITIALIZED = 'board_initialized',
  /**
   * Board is reset by user
   */
  BOARD_RESET = 'board_reset',
}

const useAnalytics = () => {
  const track = useCallback(
    (eventName: EventName, eventParams: Record<string, any> = {}) => {
      if (eventName) {
        logEvent(analytics, eventName, eventParams);
      }
    },
    []
  );

  return track;
};

export default useAnalytics;
