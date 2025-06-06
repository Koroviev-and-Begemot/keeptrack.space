import { keepTrackApi } from '@app/keepTrackApi';
import { t7e, TranslationKey } from '@app/locales/keys';
import { SoundNames } from '@app/plugins/sounds/SoundNames';
import { SplashScreen } from '@app/static/splash-screen';
import { fadeIn, fadeOut } from './fade';
import { getEl } from './get-el';

const messages = ['cunningPlan', 'satIntel', 'science', 'math'];

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);


  const msg = messages[randomIndex];

  return t7e(`loadingScreenMsgs.${msg}` as TranslationKey);
};

/**
 * Show loading screen for a given time and then run callback
 *
 * Use -1 to show loading screen indefinitely and remove it manually
 */
export const showLoading = (callback?: () => void, delay?: number): void => {
  const loading = getEl('loading-screen', true);

  // Pick a random loading screen message

  if (!loading) {
    return;
  }
  SplashScreen.loadStr(getRandomMessage());

  keepTrackApi.getSoundManager().play(SoundNames.LOADING);

  fadeIn(loading, 'flex', 500);

  setTimeout(() => {
    if (callback) {
      // eslint-disable-next-line callback-return
      callback();
    }

    if (delay === -1) {
      return;
    }
    hideLoading();
  }, delay || 100);
};

export const showLoadingSticky = (): void => {
  const loading = getEl('loading-screen');

  if (!loading) {
    return;
  }

  fadeIn(loading, 'flex', 500);
};

export const hideLoading = () => {
  const loading = getEl('loading-screen');

  if (!loading) {
    return;
  }

  fadeOut(loading, 1000);
  keepTrackApi.getSoundManager().stop(SoundNames.LOADING);
};
