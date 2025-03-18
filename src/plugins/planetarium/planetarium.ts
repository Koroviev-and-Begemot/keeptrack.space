/**
 * /////////////////////////////////////////////////////////////////////////////
 *
 * planetarium.ts is a plugin for showing the satellites above from the perspective
 * of a view on the earth.
 *
 * https://keeptrack.space
 *
 * @Copyright (C) 2016-2025 Theodore Kruczek
 * @Copyright (C) 2020-2025 Heather Kruczek
 *
 * KeepTrack is free software: you can redistribute it and/or modify it under the
 * terms of the GNU Affero General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * KeepTrack is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * KeepTrack. If not, see <http://www.gnu.org/licenses/>.
 *
 * /////////////////////////////////////////////////////////////////////////////
 */

import { getEl } from '@app/lib/get-el';
import { CameraType } from '@app/singletons/camera';

import { keepTrackApi } from '@app/keepTrackApi';
import { LegendManager } from '@app/static/legend-manager';
import planetariumPng from '@public/img/icons/planetarium.png';
import { KeepTrackPlugin } from '../KeepTrackPlugin';
import { Astronomy } from '../astronomy/astronomy';
import { MenuMode } from '@app/interfaces';

export class Planetarium extends KeepTrackPlugin {
  readonly id = 'Planetarium';
  dependencies_: string[];

  menuMode: MenuMode[] = [MenuMode.BASIC, MenuMode.ADVANCED, MenuMode.ALL];

  bottomIconImg = planetariumPng;
  isRequireSensorSelected = true;
  isIconDisabledOnLoad = true;
  isIconDisabled = true;
  bottomIconCallback = (): void => {
    const renderer = keepTrackApi.getRenderer();
    const uiManagerInstance = keepTrackApi.getUiManager();

    if (this.isMenuButtonActive) {
      if (!this.verifySensorSelected()) {
        return;
      }

      keepTrackApi.getMainCamera().cameraType = CameraType.PLANETARIUM; // Activate Planetarium Camera Mode

      /*
       * Assume Sensor plugin is on because we are in planetarium view
       * TODO: This should explicitly check for the sensor plugin
       */
      try {
        getEl('cspocAllSensor').style.display = 'none';
        getEl('mwAllSensor').style.display = 'none';
        getEl('mdAllSensor').style.display = 'none';
        getEl('esocAllSensor').style.display = 'none';
        getEl('llAllSensor').style.display = 'none';
        getEl('rusAllSensor').style.display = 'none';
        getEl('prcAllSensor').style.display = 'none';
      } catch {
        // Do nothing
      }

      /*
       * TODO: implement fov information
       * getEl('fov-text').innerHTML = ('FOV: ' + (settingsManager.fieldOfView * 100).toFixed(2) + ' deg');
       */
      LegendManager.change('planetarium');

      keepTrackApi.getPlugin(Astronomy)?.setBottomIconToUnselected();
    } else {
      keepTrackApi.getMainCamera().isPanReset = true;
      keepTrackApi.getMainCamera().isLocalRotateReset = true;
      settingsManager.fieldOfView = 0.6;
      renderer.glInit();
      uiManagerInstance.hideSideMenus();
      const orbitManagerInstance = keepTrackApi.getOrbitManager();

      orbitManagerInstance.clearInViewOrbit(); // Clear Orbits if Switching from Planetarium View
      keepTrackApi.getMainCamera().cameraType = CameraType.DEFAULT; // Back to normal Camera Mode
      /*
       * TODO: implement fov information
       * getEl('fov-text').innerHTML = ('');
       */
    }
  };
}
