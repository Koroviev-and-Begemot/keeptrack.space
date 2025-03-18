import { MenuMode, ToastMsgType } from '@app/interfaces';
import { keepTrackApi } from '@app/keepTrackApi';
import type { ColorSchemeManager } from '@app/singletons/color-scheme-manager';
import { GroupType } from '@app/singletons/object-group';
import { LegendManager } from '@app/static/legend-manager';
import historyPng from '@public/img/icons/history.png';
import { KeepTrackPlugin } from '../KeepTrackPlugin';

export class TimeMachine extends KeepTrackPlugin {
  readonly id = 'TimeMachine';
  static readonly TIME_BETWEEN_SATELLITES = 10000;
  dependencies_ = [];

  bottomIconCallback = () => {
    const groupManagerInstance = keepTrackApi.getGroupsManager();
    const colorSchemeManagerInstance = keepTrackApi.getColorSchemeManager();
    const orbitManagerInstance = keepTrackApi.getOrbitManager();

    if (this.isMenuButtonActive) {
      LegendManager.change('timeMachine');
      keepTrackApi.getUiManager().searchManager.hideResults();
      this.setBottomIconToSelected();
      this.historyOfSatellitesPlay();
    } else {
      this.isTimeMachineRunning = false;
      LegendManager.change('clear');
      settingsManager.colors.transparent = orbitManagerInstance.tempTransColor;
      groupManagerInstance.clearSelect();
      colorSchemeManagerInstance.setColorScheme(colorSchemeManagerInstance.default, true); // force color recalc
      this.setBottomIconToUnselected();
    }
  };


  bottomIconImg = historyPng;
  bottomIconLabel = 'Time Machine';
  historyOfSatellitesRunCount = 0;
  isTimeMachineRunning = false;

  menuMode: MenuMode[] = [MenuMode.BASIC, MenuMode.ADVANCED, MenuMode.ALL];

  historyOfSatellitesPlay() {
    this.isTimeMachineRunning = true;
    this.historyOfSatellitesRunCount++;
    keepTrackApi.getOrbitManager().tempTransColor = settingsManager.colors.transparent;
    settingsManager.colors.transparent = [0, 0, 0, 0];
    for (let yy = 0; yy <= 200; yy++) {
      let year = 57 + yy;

      if (year >= 100) {
        year -= 100;
      }
      setTimeout(
        (runCount) => {
          this.playNextSatellite(runCount, year);
        },
        settingsManager.timeMachineDelay * yy,
        this.historyOfSatellitesRunCount,
      );

      const currentYear = parseInt(new Date().getUTCFullYear().toString().slice(2, 4));

      if (year === currentYear) {
        break;
      }
    }
  }

  playNextSatellite(runCount: number, year: number) {
    if (!this.isTimeMachineRunning) {
      if (this.isMenuButtonActive) {
        this.setBottomIconToUnselected();
      }

      return;
    }
    const groupManagerInstance = keepTrackApi.getGroupsManager();
    const colorSchemeManagerInstance = keepTrackApi.getColorSchemeManager();

    // Kill all old async calls if run count updates
    if (runCount !== this.historyOfSatellitesRunCount) {
      return;
    }
    const yearGroup = groupManagerInstance.createGroup(GroupType.YEAR_OR_LESS, year);

    groupManagerInstance.selectGroup(yearGroup);
    yearGroup.updateOrbits();
    colorSchemeManagerInstance.setColorScheme(colorSchemeManagerInstance.group, false); // force color recalc

    if (!settingsManager.isDisableTimeMachineToasts) {
      if (year >= 57 && year < 100) {
        const timeMachineString = <string>(settingsManager.timeMachineString(year.toString()) || `Time Machine In Year 19${year}!`);

        keepTrackApi.getUiManager().toast(timeMachineString, ToastMsgType.normal, settingsManager.timeMachineLongToast);
      } else {
        const yearStr = year < 10 ? `0${year}` : `${year}`;
        const timeMachineString = <string>(settingsManager.timeMachineString(yearStr) || `Time Machine In Year 20${yearStr}!`);

        keepTrackApi.getUiManager().toast(timeMachineString, ToastMsgType.normal, settingsManager.timeMachineLongToast);
      }
    }

    if (year == parseInt(new Date().getUTCFullYear().toString().slice(2, 4))) {
      if (settingsManager.loopTimeMachine) {
        setTimeout(() => {
          this.historyOfSatellitesPlay();
        }, settingsManager.timeMachineDelayAtPresentDay);
      } else {
        setTimeout(() => {
          this.removeSatellite(runCount, colorSchemeManagerInstance);
        }, TimeMachine.TIME_BETWEEN_SATELLITES); // Linger for 10 seconds
      }
    }
  }

  removeSatellite(runCount: number, colorSchemeManager: ColorSchemeManager): void {
    const orbitManagerInstance = keepTrackApi.getOrbitManager();
    const groupManagerInstance = keepTrackApi.getGroupsManager();
    const colorSchemeManagerInstance = keepTrackApi.getColorSchemeManager();

    if (runCount !== this.historyOfSatellitesRunCount) {
      return;
    }
    if (!this.isMenuButtonActive) {
      return;
    }
    settingsManager.colors.transparent = <[number, number, number, number]>orbitManagerInstance.tempTransColor;
    this.isMenuButtonActive = false;
    this.isTimeMachineRunning = false;
    groupManagerInstance.clearSelect();
    colorSchemeManagerInstance.setColorScheme(colorSchemeManager.default, true);
  }
}

