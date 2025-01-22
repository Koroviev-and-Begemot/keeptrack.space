/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeepTrackApiEvents, ToastMsgType } from '@app/interfaces';
import { keepTrackApi } from '@app/keepTrackApi';
import { ColorPick } from '@app/lib/color-pick';
import { getEl } from '@app/lib/get-el';
import { parseRgba } from '@app/lib/rgba';
import { rgbCss } from '@app/lib/rgbCss';
import { PersistenceManager, StorageKey } from '@app/singletons/persistence-manager';
import { LegendManager } from '@app/static/legend-manager';
import { OrbitCruncherType, OrbitDrawTypes } from '@app/webworker/orbitCruncher';
import settingsPng from '@public/img/icons/settings.png';
import { KeepTrackPlugin } from '../KeepTrackPlugin';
import { SoundNames } from '../sounds/SoundNames';
import { TimeMachine } from '../time-machine/time-machine';

/**
 * /////////////////////////////////////////////////////////////////////////////
 *
 * https://keeptrack.space
 *
 * @Copyright (C) 2016-2024 Theodore Kruczek
 * @Copyright (C) 2020-2024 Heather Kruczek
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

declare module '@app/interfaces' {
  interface UserSettings {
    isBlackEarth: boolean;
    isDrawMilkyWay: boolean;
  }
}

export class SettingsMenuPlugin extends KeepTrackPlugin {
  readonly id = 'SettingsMenuPlugin';
  dependencies_ = [];
  bottomIconElementName: string = 'settings-menu-icon';
  bottomIconImg = settingsPng;
  sideMenuElementName: string = 'settings-menu';
  sideMenuElementHtml: string = keepTrackApi.html`
  <div id="settings-menu" class="side-menu-parent start-hidden text-select">
    <div id="settings-content" class="side-menu">
      <div class="row">
        <form id="settings-form">
          <div id="settings-general">
            <div class="row center"></div>
            </br>
            <div class="row center">
              <button id="settings-submit" class="btn btn-ui waves-effect waves-light" type="submit" name="action">Update Settings &#9658;</button>
            </div>
            <div class="row center">
              <button id="settings-reset" class="btn btn-ui waves-effect waves-light" type="button" name="action">Reset to Defaults &#9658;</button>
            </div>
            <h5 class="center-align">General Settings</h5>
            <!-- <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide notional satellites">
                <input id="settings-notionalSats" type="checkbox" checked/>
                <span class="lever"></span>
                Show Notional Satellites
              </label>
            </div> -->
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide LEO satellites">
                <input id="settings-leoSats" type="checkbox" checked/>
                <span class="lever"></span>
                Show LEO Satellites
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide Starlink satellites">
                <input id="settings-starlinkSats" type="checkbox" checked/>
                <span class="lever"></span>
                Show Starlink Satellites
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide HEO satellites">
                <input id="settings-heoSats" type="checkbox" checked/>
                <span class="lever"></span>
                Show HEO Satellites
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide MEO satellites">
                <input id="settings-meoSats" type="checkbox" checked/>
                <span class="lever"></span>
                Show MEO Satellites
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide GEO satellites">
                <input id="settings-geoSats" type="checkbox" checked/>
                <span class="lever"></span>
                Show GEO Satellites
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide Payloads">
                <input id="settings-showPayloads" type="checkbox" checked/>
                <span class="lever"></span>
                Show Payloads
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide Rocket Bodies">
                <input id="settings-showRocketBodies" type="checkbox" checked/>
                <span class="lever"></span>
                Show Rocket Bodies
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide Debris">
                <input id="settings-showDebris" type="checkbox" checked/>
                <span class="lever"></span>
                Show Debris
              </label>
            </div>
            <!-- <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Planned feature - This will show agencies on the globe.">
                <input id="settings-showAgencies" type="checkbox" disabled/>
                <span class="lever"></span>
                Show Agencies
              </label>
            </div> -->
            <!-- <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable this to hide the camera widget">
                <input id="settings-drawCameraWidget" type="checkbox" checked/>
                <span class="lever"></span>
                Show Camera Widget
              </label>
            </div> -->
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable this to hide orbit lines">
                <input id="settings-drawOrbits" type="checkbox" checked/>
                <span class="lever"></span>
                Draw Orbits
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Enable this to show where a satellite was instead of where it is going">
                <input id="settings-drawTrailingOrbits" type="checkbox"/>
                <span class="lever"></span>
                Draw Trailing Orbits
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Orbits will be drawn using ECF vs ECI (Mainly for GEO Orbits)">
                <input id="settings-drawEcf" type="checkbox" />
                <span class="lever"></span>
                Draw Orbits in ECF
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Draw lines from sensor to satellites when in FOV">
                <input id="settings-isDrawInCoverageLines" type="checkbox" checked/>
                <span class="lever"></span>
                Draw FOV Lines
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Draw the Sun">
                <input id="settings-drawSun" type="checkbox" checked/>
                <span class="lever"></span>
                Draw the Sun
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Hides Earth Textures">
                <input id="settings-drawBlackEarth" type="checkbox"/>
                <span class="lever"></span>
                Draw Black Earth
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide the Atmosphere">
                <input id="settings-drawAtmosphere" type="checkbox" checked/>
                <span class="lever"></span>
                Draw Atmosphere
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Disable to hide the Aurora">
                <input id="settings-drawAurora" type="checkbox" checked/>
                <span class="lever"></span>
                Draw Aurora
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Change the Skybox to Gray">
                <input id="settings-graySkybox" type="checkbox" checked/>
                <span class="lever"></span>
                Draw Gray Background
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Draw Milky Way in Background">
                <input id="settings-drawMilkyWay" type="checkbox" checked/>
                <span class="lever"></span>
                Draw the Milky Way
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Display ECI Coordinates on Hover">
                <input id="settings-eciOnHover" type="checkbox"/>
                <span class="lever"></span>
                Display ECI on Hover
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Non-selectable satellites will be hidden instead of grayed out.">
                <input id="settings-hos" type="checkbox" />
                <span class="lever"></span>
                Hide Other Satellites
              </label>
            </div>
            <!-- <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Show confidence levels for satellite's element sets.">
                <input id="settings-confidence-levels" type="checkbox" />
                <span class="lever"></span>
                Show Confidence Levels
              </label>
            </div> -->
            <!-- <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Every 3 seconds a new satellite will be selected from FOV">
                <input id="settings-demo-mode" type="checkbox" />
                <span class="lever"></span>
                Enable Demo Mode
              </label>
            </div>
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Small text labels will appear next to all satellites in FOV.">
                <input id="settings-sat-label-mode" type="checkbox" checked />
                <span class="lever"></span>
                Enable Satellite Label Mode
              </label>
            </div> -->
            <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Time will freeze as you rotate the camera.">
                <input id="settings-freeze-drag" type="checkbox" />
                <span class="lever"></span>
                Enable Freeze Time on Click
              </label>
            </div>
            <!-- <div class="switch row">
              <label data-position="top" data-delay="50" data-tooltip="Time Machine stop showing toast messages.">
                <input id="settings-time-machine-toasts" type="checkbox" />
                <span class="lever"></span>
                Disable Time Machine Toasts
              </label>
            </div> -->
          </div>
          <div class="row light-blue darken-3" style="height:4px; display:block;"></div>
          <div id="settings-colors" class="row">
            <h5 class="center-align">Color Settings</h5>
            <div class="row">
              <div class="input-field col s6">
                <center>
                  <p>Active Payload</p>
                  <button id="settings-color-payloadActive" class="btn waves-effect waves-light"></button>
                </center>
              </div>
              <div class="input-field col s6">
                <center>
                  <p>Inactive Payload</p>
                  <button id="settings-color-payloadInactive" class="btn waves-effect waves-light"></button>
                </center>
              </div>
            </div>
            <div class="row">
            <div class="input-field col s6">
                <center>
                  <p>Rocket Body</p>
                  <button id="settings-color-rocketBody" class="btn waves-effect waves-light"></button>
                </center>
              </div>
              <div class="input-field col s6">
                <center>
                  <p>Debris</p>
                  <button id="settings-color-debris" class="btn waves-effect waves-light"></button>
                </center>
              </div>

            </div>
            <!-- <div class="row">
              <div class="input-field col s6">
                <center>
                  <p>Missile</p>
                  <button id="settings-color-missile" class="btn waves-effect waves-light"></button>
                </center>
              </div>
              <div class="input-field col s6">
                <center>
                  <p>Missile (FOV)</p>
                  <button id="settings-color-missileInview" class="btn waves-effect waves-light"></button>
                </center>
              </div>
            </div> -->
            <div class="row">
            <div class="input-field col s6">
                <center>
                  <p>In View</p>
                  <button id="settings-color-inview" class="btn waves-effect waves-light"></button>
                </center>
              </div>
              <div class="input-field col s6">
                <center>
                  <p>Unknown</p>
                  <button id="settings-color-unknown" class="btn waves-effect waves-light"></button>
                </center>
              </div>
            </div>
          </div>
          <div id="settings-opt" class="row">
            <div class="row">
              <h5 class="center-align">Settings Overrides</h5>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input value="150" id="maxSearchSats" type="text" data-position="top" data-delay="50" data-tooltip="Maximum satellites to display in search" />
                <label for="maxSearchSats" class="active">Maximum Satellites in Search</label>
              </div>
            </div>
            <!-- <div class="row">
              <div class="input-field col s12">
                <input value="30" id="satFieldOfView" type="text" data-position="top" data-delay="50" data-tooltip="What is the satellite's field of view in degrees" />
                <label for="satFieldOfView" class="active">Satellite Field of View</label>
              </div>
            </div> -->
          </div>
          <!-- <div id="fastCompSettings" class="row">
            <h5 class="center-align">Fast CPU Required</h5>
            <div class="switch row">
              <label>
                <input id="settings-snp" type="checkbox" />
                <span class="lever"></span>
                Show Next Pass on Hover
              </label>
            </div>
          </div> -->
        </form>
      </div>
    </div>
  </div>`;


  dragOptions = {
    minWidth: 300,
    maxWidth: 500,
    isDraggable: true,
  };
  isNotColorPickerInitialSetup = false;

  addHtml(): void {
    super.addHtml();
    keepTrackApi.register({
      event: KeepTrackApiEvents.uiManagerFinal,
      cbName: this.id,
      cb: () => {
        getEl('settings-form').addEventListener('change', SettingsMenuPlugin.onFormChange_);
        getEl('settings-form').addEventListener('submit', SettingsMenuPlugin.onSubmit_);
        getEl('settings-reset').addEventListener('click', SettingsMenuPlugin.resetToDefaults_);

        const colorPalette = [
          // Reds
          rgbCss([1.0, 0.0, 0.0, 1.0]), // Red
          rgbCss([1.0, 0.4, 0.4, 1.0]), // Light Red
          rgbCss([1.0, 0.0, 0.6, 1.0]), // Pink
          rgbCss([1.0, 0.75, 0.8, 1.0]), // Light Pink
          rgbCss([1.0, 0.0, 1.0, 1.0]), // Magenta

          // Oranges
          rgbCss([1.0, 0.5, 0.0, 1.0]), // Bright Orange
          rgbCss([1.0, 0.65, 0.0, 1.0]), // Orange
          rgbCss([0.85, 0.5, 0.0, 1.0]), // Dark Orange
          rgbCss([1.0, 0.8, 0.6, 1.0]), // Peach

          // Yellows
          rgbCss([1.0, 1.0, 0.0, 1.0]), // Yellow
          rgbCss([0.8, 0.4, 0.0, 1.0]), // Dark Yellow

          // Greens
          rgbCss([0.4, 0.8, 0.0, 1.0]), // Chartreuse
          rgbCss([0.0, 1.0, 0.0, 1.0]), // Lime Green
          rgbCss([0.2, 1.0, 0.0, 0.5]), // Dark Green (with transparency)
          rgbCss([0.5, 1.0, 0.5, 1.0]), // Mint Green
          rgbCss([0.6, 0.8, 0.2, 1.0]), // Olive Green

          // Cyans
          rgbCss([0.0, 1.0, 1.0, 1.0]), // Cyan
          rgbCss([0.0, 0.8, 0.8, 1.0]), // Light Blue
          rgbCss([0.0, 0.5, 0.5, 1.0]), // Teal
          rgbCss([0.0, 0.2, 0.4, 1.0]), // Dark Teal

          // Blues
          rgbCss([0.0, 0.0, 1.0, 0.85]), // Blue
          rgbCss([0.2, 0.4, 1.0, 1.0]), // Dark Blue
          rgbCss([0.0, 0.0, 0.5, 1.0]), // Navy Blue

          // Purples
          rgbCss([0.5, 0.0, 1.0, 1.0]), // Purple
          rgbCss([0.5, 0.0, 0.5, 1.0]), // Dark Purple
          rgbCss([0.8, 0.2, 0.8, 1.0]), // Violet

          // Browns
          rgbCss([0.5, 0.25, 0.0, 1.0]), // Brown
          rgbCss([0.6, 0.4, 0.2, 1.0]), // Tan
          rgbCss([0.9, 0.9, 0.5, 1.0]), // Beige

          // Grays
          rgbCss([0.5, 0.5, 0.5, 0.9]), // White
          rgbCss([1, 1, 1, 0.85]), // White2
          rgbCss([0.9, 0.9, 0.9, 1.0]), // Light Gray
          rgbCss([0.5, 0.5, 0.5, 1.0]), // Gray
          rgbCss([0.1, 0.1, 0.1, 1.0]), // Dark Gray
        ];

        ColorPick.initColorPick('#settings-color-payloadActive', {
          initialColor: rgbCss(settingsManager.colors?.celestrakDefaultActivePayload || [0.0, 1.0, 0.0, 0.85]),
          palette: colorPalette,
          onColorSelected: (colorpick: ColorPick) => this.onColorSelected_(colorpick, 'celestrakDefaultActivePayload'),
        });
        ColorPick.initColorPick('#settings-color-payloadInactive', {
          initialColor: rgbCss(settingsManager.colors?.celestrakDefaultInactivePayload || [1.0, 0.5, 0.0, 1.0]),
          palette: colorPalette,
          onColorSelected: (colorpick: ColorPick) => this.onColorSelected_(colorpick, 'celestrakDefaultInactivePayload'),
        });
        ColorPick.initColorPick('#settings-color-rocketBody', {
          initialColor: rgbCss(settingsManager.colors?.celestrakDefaultRocketBody || [1.0, 0.0, 0.0, 1.0]),
          palette: colorPalette,
          onColorSelected: (colorpick: ColorPick) => this.onColorSelected_(colorpick, 'celestrakDefaultRocketBody'),
        });
        ColorPick.initColorPick('#settings-color-debris', {
          initialColor: rgbCss(settingsManager.colors?.celestrakDefaultDebris || [0.5, 0.5, 0.5, 0.9]),
          palette: colorPalette,
          onColorSelected: (colorpick: ColorPick) => this.onColorSelected_(colorpick, 'celestrakDefaultDebris'),
        });
        ColorPick.initColorPick('#settings-color-inview', {
          initialColor: rgbCss(settingsManager.colors?.celestrakDefaultFov || [0.0, 0.0, 1.0, 0.85]),
          palette: colorPalette,
          onColorSelected: (colorpick: ColorPick) => this.onColorSelected_(colorpick, 'celestrakDefaultFov'),
        });
        /*
         * ColorPick.initColorPick('#settings-color-missile', {
         *   initialColor: rgbCss(settingsManager.colors?.missile || [1.0, 1.0, 0.0, 1.0]),
         *   palette: colorPalette,
         *   onColorSelected: (colorpick: ColorPick) => this.onColorSelected_(colorpick, 'missile'),
         * });
         * ColorPick.initColorPick('#settings-color-missileInview', {
         *   initialColor: rgbCss(settingsManager.colors?.missileInview || [1.0, 0.0, 0.0, 1.0]),
         *   palette: colorPalette,
         *   onColorSelected: (colorpick: ColorPick) => this.onColorSelected_(colorpick, 'missileInview'),
         * });
         */
        ColorPick.initColorPick('#settings-color-unknown', {
          initialColor: rgbCss(settingsManager.colors?.celestrakDefaultUnknown || [1, 1, 1, 0.85]),
          palette: colorPalette,
          onColorSelected: (colorpick: ColorPick) => this.onColorSelected_(colorpick, 'celestrakDefaultUnknown'),
        });
        this.isNotColorPickerInitialSetup = true;
      },
    });
  }

  addJs(): void {
    super.addJs();
    keepTrackApi.register({
      event: KeepTrackApiEvents.uiManagerFinal,
      cbName: this.id,
      cb: () => {
        SettingsMenuPlugin.syncOnLoad();
      },
    });
  }

  static syncOnLoad() {
    const drawCameraWidgetEl = <HTMLInputElement>getEl('settings-drawCameraWidget');

    if (drawCameraWidgetEl) {
      drawCameraWidgetEl.checked = settingsManager.drawCameraWidget;
      const cameraControlWidgetEl = getEl('camera-control-widget');

      if (cameraControlWidgetEl) {
        cameraControlWidgetEl.style.display = settingsManager.drawCameraWidget ? 'block' : 'none';
      }
    } else {
      settingsManager.drawCameraWidget = false;
    }

    const settingsElements = [
      { id: 'settings-notionalSats', setting: 'isShowNotionalSats' },
      { id: 'settings-leoSats', setting: 'isShowLeoSats' },
      { id: 'settings-starlinkSats', setting: 'isShowStarlinkSats' },
      { id: 'settings-heoSats', setting: 'isShowHeoSats' },
      { id: 'settings-meoSats', setting: 'isShowMeoSats' },
      { id: 'settings-geoSats', setting: 'isShowGeoSats' },
      { id: 'settings-showPayloads', setting: 'isShowPayloads' },
      { id: 'settings-showRocketBodies', setting: 'isShowRocketBodies' },
      { id: 'settings-showDebris', setting: 'isShowDebris' },
      { id: 'settings-showAgencies', setting: 'isShowAgencies' },
      { id: 'settings-drawOrbits', setting: 'isDrawOrbits' },
      { id: 'settings-drawTrailingOrbits', setting: 'isDrawTrailingOrbits' },
      { id: 'settings-drawEcf', setting: 'isOrbitCruncherInEcf' },
      { id: 'settings-isDrawInCoverageLines', setting: 'isDrawInCoverageLines' },
      { id: 'settings-drawSun', setting: 'isDrawSun' },
      { id: 'settings-drawBlackEarth', setting: 'isBlackEarth' },
      { id: 'settings-drawAtmosphere', setting: 'isDrawAtmosphere' },
      { id: 'settings-drawAurora', setting: 'isDrawAurora' },
      { id: 'settings-drawMilkyWay', setting: 'isDrawMilkyWay' },
      { id: 'settings-graySkybox', setting: 'isGraySkybox' },
      { id: 'settings-eciOnHover', setting: 'isEciOnHover' },
      { id: 'settings-hos', setting: 'colors.transparent[3] === 0' },
      { id: 'settings-confidence-levels', setting: 'isShowConfidenceLevels' },
      { id: 'settings-demo-mode', setting: 'isDemoModeOn' },
      { id: 'settings-sat-label-mode', setting: 'isSatLabelModeOn' },
      { id: 'settings-freeze-drag', setting: 'isFreezePropRateOnDrag' },
      { id: 'settings-time-machine-toasts', setting: 'isDisableTimeMachineToasts' },
    ];

    settingsElements.forEach(({ id, setting }) => {
      const element = <HTMLInputElement>getEl(id);

      if (element) {
        if (setting.includes('colors.transparent')) {
          element.checked = settingsManager.colors.transparent[3] === 0;
        } else {
          element.checked = settingsManager[setting];
        }
      }
    });

    const maxSearchSatsEl = <HTMLInputElement>getEl('maxSearchSats');

    if (maxSearchSatsEl) {
      maxSearchSatsEl.value = settingsManager.searchLimit.toString();
    }
    // (<HTMLInputElement>getEl('satFieldOfView')).value = settingsManager.selectedSatFOV.toString();
  }

  static preserveSettings() {
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_LEO_SATS, settingsManager.isShowLeoSats.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_STARLINK_SATS, settingsManager.isShowStarlinkSats.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_HEO_SATS, settingsManager.isShowHeoSats.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_MEO_SATS, settingsManager.isShowMeoSats.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_GEO_SATS, settingsManager.isShowGeoSats.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_PAYLOADS, settingsManager.isShowPayloads.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_ROCKET_BODIES, settingsManager.isShowRocketBodies.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DEBRIS, settingsManager.isShowDebris.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_AGENCIES, settingsManager.isShowAgencies.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_CAMERA_WIDGET, settingsManager.drawCameraWidget.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_ORBITS, settingsManager.isDrawOrbits.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_TRAILING_ORBITS, settingsManager.isDrawTrailingOrbits.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_ECF, settingsManager.isOrbitCruncherInEcf.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_IN_COVERAGE_LINES, settingsManager.isDrawInCoverageLines.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_SUN, settingsManager.isDrawSun.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_BLACK_EARTH, settingsManager.isBlackEarth.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_ATMOSPHERE, settingsManager.isDrawAtmosphere.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_AURORA, settingsManager.isDrawAurora.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DRAW_MILKY_WAY, settingsManager.isDrawMilkyWay.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_GRAY_SKYBOX, settingsManager.isGraySkybox.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_ECI_ON_HOVER, settingsManager.isEciOnHover.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_HOS, settingsManager.colors.transparent[3] === 0 ? 'true' : 'false');
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_CONFIDENCE_LEVELS, settingsManager.isShowConfidenceLevels.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DEMO_MODE, settingsManager.isDemoModeOn.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_SAT_LABEL_MODE, settingsManager.isSatLabelModeOn.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_FREEZE_PROP_RATE_ON_DRAG, settingsManager.isFreezePropRateOnDrag.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_DISABLE_TIME_MACHINE_TOASTS, settingsManager.isDisableTimeMachineToasts.toString());
    PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_SEARCH_LIMIT, settingsManager.searchLimit.toString());
  }

  private onColorSelected_(context: ColorPick, colorStr: string) {
    if (typeof context === 'undefined' || context === null) {
      throw new Error('context is undefined');
    }
    if (typeof colorStr === 'undefined' || colorStr === null) {
      throw new Error('colorStr is undefined');
    }

    context.element.style.cssText = `background-color: ${context.color} !important; color: ${context.color};`;
    if (this.isNotColorPickerInitialSetup) {
      settingsManager.colors[colorStr] = parseRgba(context.color);
      LegendManager.legendColorsChange();
      const colorSchemeManagerInstance = keepTrackApi.getColorSchemeManager();

      colorSchemeManagerInstance.setColorScheme(colorSchemeManagerInstance.currentColorScheme, true);
      PersistenceManager.getInstance().saveItem(StorageKey.SETTINGS_MANAGER_COLORS, JSON.stringify(settingsManager.colors));
    }
  }

  // eslint-disable-next-line complexity
  private static onFormChange_(e: any, isDMChecked?: boolean, isSLMChecked?: boolean) {
    if (typeof e === 'undefined' || e === null) {
      throw new Error('e is undefined');
    }

    switch (e.target?.id) {
      case 'settings-notionalSats':
      case 'settings-leoSats':
      case 'settings-starlinkSats':
      case 'settings-heoSats':
      case 'settings-meoSats':
      case 'settings-geoSats':
      case 'settings-showPayloads':
      case 'settings-showRocketBodies':
      case 'settings-showDebris':
      case 'settings-showAgencies':
      case 'settings-drawOrbits':
      case 'settings-drawCameraWidget':
      case 'settings-drawTrailingOrbits':
      case 'settings-drawEcf':
      case 'settings-isDrawInCoverageLines':
      case 'settings-drawSun':
      case 'settings-drawBlackEarth':
      case 'settings-drawAtmosphere':
      case 'settings-drawAurora':
      case 'settings-drawMilkyWay':
      case 'settings-graySkybox':
      case 'settings-eciOnHover':
      case 'settings-hos':
      case 'settings-confidence-levels':
      case 'settings-demo-mode':
      case 'settings-sat-label-mode':
      case 'settings-freeze-drag':
      case 'settings-time-machine-toasts':
      case 'settings-snp':
        if ((<HTMLInputElement>getEl(e.target.id))?.checked) {
          // Play sound for enabling option
          keepTrackApi.getSoundManager()?.play(SoundNames.TOGGLE_ON);
        } else {
          // Play sound for disabling option
          keepTrackApi.getSoundManager()?.play(SoundNames.TOGGLE_OFF);
        }
        break;
      default:
        break;
    }

    isDMChecked ??= (<HTMLInputElement>getEl('settings-demo-mode'))?.checked ?? false;
    isSLMChecked ??= (<HTMLInputElement>getEl('settings-sat-label-mode'))?.checked ?? false;

    if (isSLMChecked && (<HTMLElement>e.target).id === 'settings-demo-mode') {
      (<HTMLInputElement>getEl('settings-sat-label-mode')).checked = false;
      getEl('settings-demo-mode').classList.remove('lever:after');
    }

    if (isDMChecked && (<HTMLElement>e.target).id === 'settings-sat-label-mode') {
      (<HTMLInputElement>getEl('settings-demo-mode')).checked = false;
      getEl('settings-sat-label-mode').classList.remove('lever:after');
    }
  }

  private static resetToDefaults_() {
    keepTrackApi.getSoundManager().play(SoundNames.BUTTON_CLICK);
    settingsManager.isShowLeoSats = true;
    settingsManager.isShowHeoSats = true;
    settingsManager.isShowMeoSats = true;
    settingsManager.isShowGeoSats = true;
    settingsManager.isShowPayloads = true;
    settingsManager.isShowRocketBodies = true;
    settingsManager.isShowDebris = true;
    settingsManager.isShowAgencies = false;
    settingsManager.isDrawOrbits = true;
    settingsManager.drawCameraWidget = false;
    settingsManager.isDrawTrailingOrbits = false;
    settingsManager.isOrbitCruncherInEcf = false;
    settingsManager.isDrawInCoverageLines = true;
    settingsManager.isDrawSun = true;
    if (settingsManager.isBlackEarth) {
      settingsManager.isBlackEarth = false;
      keepTrackApi.getScene().earth.reloadEarthHiResTextures();
    }
    settingsManager.isDrawAtmosphere = true;
    settingsManager.isDrawAurora = true;
    settingsManager.isDrawMilkyWay = true;
    settingsManager.isGraySkybox = false;
    settingsManager.isEciOnHover = false;
    settingsManager.isDemoModeOn = false;
    settingsManager.isSatLabelModeOn = true;
    settingsManager.isFreezePropRateOnDrag = false;
    settingsManager.isDisableTimeMachineToasts = false;
    settingsManager.searchLimit = 600;
    SettingsMenuPlugin.preserveSettings();
    SettingsMenuPlugin.syncOnLoad();
  }

  // eslint-disable-next-line complexity
  private static onSubmit_(e: any) {
    if (typeof e === 'undefined' || e === null) {
      throw new Error('e is undefined');
    }
    e.preventDefault();

    const uiManagerInstance = keepTrackApi.getUiManager();
    const colorSchemeManagerInstance = keepTrackApi.getColorSchemeManager();

    keepTrackApi.getSoundManager()?.play(SoundNames.BUTTON_CLICK);

    settingsManager.isShowNotionalSats = (<HTMLInputElement>getEl('settings-notionalSats'))?.checked ?? false;
    settingsManager.isShowLeoSats = (<HTMLInputElement>getEl('settings-leoSats'))?.checked ?? false;
    settingsManager.isShowStarlinkSats = (<HTMLInputElement>getEl('settings-starlinkSats'))?.checked ?? false;
    settingsManager.isShowHeoSats = (<HTMLInputElement>getEl('settings-heoSats'))?.checked ?? false;
    settingsManager.isShowMeoSats = (<HTMLInputElement>getEl('settings-meoSats'))?.checked ?? false;
    settingsManager.isShowGeoSats = (<HTMLInputElement>getEl('settings-geoSats'))?.checked ?? false;
    settingsManager.isShowPayloads = (<HTMLInputElement>getEl('settings-showPayloads'))?.checked ?? false;
    settingsManager.isShowRocketBodies = (<HTMLInputElement>getEl('settings-showRocketBodies'))?.checked ?? false;
    settingsManager.isShowDebris = (<HTMLInputElement>getEl('settings-showDebris'))?.checked ?? false;
    settingsManager.isShowAgencies = (<HTMLInputElement>getEl('settings-showAgencies'))?.checked ?? false;
    settingsManager.isOrbitCruncherInEcf = (<HTMLInputElement>getEl('settings-drawEcf'))?.checked ?? false;
    settingsManager.isDrawInCoverageLines = (<HTMLInputElement>getEl('settings-isDrawInCoverageLines'))?.checked ?? false;
    settingsManager.isDrawSun = (<HTMLInputElement>getEl('settings-drawSun'))?.checked ?? false;
    if (settingsManager.isDrawSun) {
      keepTrackApi.getScene().drawTimeArray = Array(150).fill(16);
    }
    const isBlackEarthChanged = settingsManager.isBlackEarth !== (<HTMLInputElement>getEl('settings-drawBlackEarth'))?.checked;
    const isDrawAtmosphereChanged = settingsManager.isDrawAtmosphere !== (<HTMLInputElement>getEl('settings-drawAtmosphere'))?.checked;
    const isDrawAuroraChanged = settingsManager.isDrawAurora !== (<HTMLInputElement>getEl('settings-drawAurora'))?.checked;

    settingsManager.drawCameraWidget = (<HTMLInputElement>getEl('settings-drawCameraWidget'))?.checked ?? false;
    const ccWidgetCanvas = getEl('camera-control-widget');

    if (ccWidgetCanvas) {
      if (settingsManager.drawCameraWidget) {
        ccWidgetCanvas.style.display = 'block';
      } else {
        ccWidgetCanvas.style.display = 'none';
      }
    }

    settingsManager.isBlackEarth = (<HTMLInputElement>getEl('settings-drawBlackEarth'))?.checked ?? false;
    settingsManager.isDrawAtmosphere = (<HTMLInputElement>getEl('settings-drawAtmosphere'))?.checked ?? false;
    settingsManager.isDrawAurora = (<HTMLInputElement>getEl('settings-drawAurora'))?.checked ?? false;
    if (isBlackEarthChanged || isDrawAtmosphereChanged || isDrawAuroraChanged) {
      keepTrackApi.getScene().earth.reloadEarthHiResTextures();
    }

    const isDrawOrbitsChanged = settingsManager.isDrawOrbits !== (<HTMLInputElement>getEl('settings-drawOrbits'))?.checked;

    settingsManager.isDrawOrbits = (<HTMLInputElement>getEl('settings-drawOrbits'))?.checked ?? false;
    if (isDrawOrbitsChanged) {
      keepTrackApi.getOrbitManager().drawOrbitsSettingChanged();
    }
    settingsManager.isDrawTrailingOrbits = (<HTMLInputElement>getEl('settings-drawTrailingOrbits'))?.checked ?? false;

    if (keepTrackApi.getOrbitManager().orbitWorker) {
      if (settingsManager.isDrawTrailingOrbits) {
        keepTrackApi.getOrbitManager().orbitWorker.postMessage({
          typ: OrbitCruncherType.CHANGE_ORBIT_TYPE,
          orbitType: OrbitDrawTypes.TRAIL,
        });
      } else {
        keepTrackApi.getOrbitManager().orbitWorker.postMessage({
          typ: OrbitCruncherType.CHANGE_ORBIT_TYPE,
          orbitType: OrbitDrawTypes.ORBIT,
        });
      }
    }
    // Must come after the above checks

    const isDrawMilkyWayChanged = settingsManager.isDrawMilkyWay !== (<HTMLInputElement>getEl('settings-drawMilkyWay'))?.checked;
    const isGraySkyboxChanged = settingsManager.isGraySkybox !== (<HTMLInputElement>getEl('settings-graySkybox'))?.checked;

    settingsManager.isDrawMilkyWay = (<HTMLInputElement>getEl('settings-drawMilkyWay'))?.checked ?? false;
    settingsManager.isGraySkybox = (<HTMLInputElement>getEl('settings-graySkybox'))?.checked ?? false;

    if (isDrawMilkyWayChanged || isGraySkyboxChanged) {
      keepTrackApi.getScene().skybox.init(settingsManager, keepTrackApi.getRenderer().gl);
    }

    settingsManager.isEciOnHover = (<HTMLInputElement>getEl('settings-eciOnHover'))?.checked ?? false;
    const isHOSChecked = (<HTMLInputElement>getEl('settings-hos'))?.checked ?? false;

    settingsManager.colors.transparent = isHOSChecked ? [1.0, 1.0, 1.0, 0] : [1.0, 1.0, 1.0, 0.1];
    settingsManager.isShowConfidenceLevels = (<HTMLInputElement>getEl('settings-confidence-levels'))?.checked ?? false;
    settingsManager.isDemoModeOn = (<HTMLInputElement>getEl('settings-demo-mode'))?.checked ?? false;
    settingsManager.isSatLabelModeOn = (<HTMLInputElement>getEl('settings-sat-label-mode'))?.checked ?? false;
    settingsManager.isShowNextPass = (<HTMLInputElement>getEl('settings-snp'))?.checked ?? false;
    settingsManager.isFreezePropRateOnDrag = (<HTMLInputElement>getEl('settings-freeze-drag'))?.checked ?? false;

    settingsManager.isDisableTimeMachineToasts = (<HTMLInputElement>getEl('settings-time-machine-toasts'))?.checked ?? false;
    /*
     * TODO: These settings buttons should be inside the plugins themselves
     * Stop Time Machine
     */
    if (keepTrackApi.getPlugin(TimeMachine)) {
      keepTrackApi.getPlugin(TimeMachine).isMenuButtonActive = false;
    }

    /*
     * if (orbitManagerInstance.isTimeMachineRunning) {
     *   settingsManager.colors.transparent = orbitManagerInstance.tempTransColor;
     * }
     */
    keepTrackApi.getGroupsManager().clearSelect();
    colorSchemeManagerInstance.setColorScheme(colorSchemeManagerInstance.default, true); // force color recalc

    keepTrackApi.getPlugin(TimeMachine)?.setBottomIconToUnselected();

    colorSchemeManagerInstance.reloadColors();

    const newFieldOfView = parseInt((<HTMLInputElement>getEl('satFieldOfView'))?.value);

    if (isNaN(newFieldOfView) && getEl('satFieldOfView')) {
      (<HTMLInputElement>getEl('satFieldOfView')).value = '30';
      uiManagerInstance.toast('Invalid field of view value!', ToastMsgType.critical);
    }

    const maxSearchSats = parseInt((<HTMLInputElement>getEl('maxSearchSats')).value);

    if (isNaN(maxSearchSats) && getEl('maxSearchSats')) {
      (<HTMLInputElement>getEl('maxSearchSats')).value = settingsManager.searchLimit.toString();
      uiManagerInstance.toast('Invalid max search sats value!', ToastMsgType.critical);
    } else {
      settingsManager.searchLimit = maxSearchSats;
      uiManagerInstance.searchManager.doSearch(keepTrackApi.getUiManager().searchManager.getCurrentSearch());
    }

    colorSchemeManagerInstance.setColorScheme(colorSchemeManagerInstance.currentColorScheme, true);

    SettingsMenuPlugin.preserveSettings();
  }
}

