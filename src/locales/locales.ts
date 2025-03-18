import i18next, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import ja from './ja.json';
import ru from './ru.json';
import ukUA from './uk-UA.json';
import zh from './zh.json';


const opts: InitOptions = {
  interpolation: {
    escapeValue: false,
  },
  // lng: 'ukUA',
  fallbackLng: 'en',
  debug: false,
  resources: {
    de: {
      translation: de,
    },
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
    ja: {
      translation: ja,
    },
    ukUA: {
      translation: ukUA,
    },
    ru: {
      translation: ru,
    },
    zh: {
      translation: zh,
    },
  },
};

i18next.use(LanguageDetector).init(opts);

export interface LocaleInformation {
  plugins: {
    [pluginName: string]: {
      bottomIconLabel?: string;
      title?: string;
      helpBody?: string;
    };
  };
}

/**
 * This function is mainly for reloading the localization object
 * during testing
 * @returns localization object
 */
export const loadLocalization = () => ({
  plugins: {
    SensorListPlugin: {
      bottomIconLabel: i18next.t('plugins.SensorListPlugin.bottomIconLabel'),
      title: i18next.t('plugins.SensorListPlugin.title'),
      helpBody: i18next.t('plugins.SensorListPlugin.helpBody'),
    },
    SensorInfoPlugin: {
      bottomIconLabel: i18next.t('plugins.SensorInfoPlugin.bottomIconLabel'),
      title: i18next.t('plugins.SensorInfoPlugin.title'),
      helpBody: i18next.t('plugins.SensorInfoPlugin.helpBody'),
    },
    CustomSensorPlugin: {
      bottomIconLabel: i18next.t('plugins.CustomSensorPlugin.bottomIconLabel'),
      title: i18next.t('plugins.CustomSensorPlugin.title'),
      helpBody: i18next.t('plugins.CustomSensorPlugin.helpBody'),
    },
    LookAnglesPlugin: {
      bottomIconLabel: i18next.t('plugins.LookAnglesPlugin.bottomIconLabel'),
      title: i18next.t('plugins.LookAnglesPlugin.title'),
      helpBody: i18next.t('plugins.LookAnglesPlugin.helpBody'),
    },
    MultiSiteLookAnglesPlugin: {
      bottomIconLabel: i18next.t('plugins.MultiSiteLookAnglesPlugin.bottomIconLabel'),
      title: i18next.t('plugins.MultiSiteLookAnglesPlugin.title'),
      helpBody: i18next.t('plugins.MultiSiteLookAnglesPlugin.helpBody'),
    },
    SensorTimeline: {
      bottomIconLabel: i18next.t('plugins.SensorTimeline.bottomIconLabel'),
      title: i18next.t('plugins.SensorTimeline.title'),
      helpBody: i18next.t('plugins.SensorTimeline.helpBody'),
    },
    SatelliteTimeline: {
      bottomIconLabel: i18next.t('plugins.SatelliteTimeline.bottomIconLabel'),
      title: i18next.t('plugins.SatelliteTimeline.title'),
      helpBody: i18next.t('plugins.SatelliteTimeline.helpBody'),
    },
    WatchlistPlugin: {
      bottomIconLabel: i18next.t('plugins.WatchlistPlugin.bottomIconLabel'),
      title: i18next.t('plugins.WatchlistPlugin.title'),
      helpBody: i18next.t('plugins.WatchlistPlugin.helpBody'),
    },
    WatchlistOverlay: {
      bottomIconLabel: i18next.t('plugins.WatchlistOverlay.bottomIconLabel'),
      title: i18next.t('plugins.WatchlistOverlay.title'),
      helpBody: i18next.t('plugins.WatchlistOverlay.helpBody'),
    },
    ReportsPlugin: {
      bottomIconLabel: i18next.t('plugins.ReportsPlugin.bottomIconLabel'),
      title: i18next.t('plugins.ReportsPlugin.title'),
      helpBody: i18next.t('plugins.ReportsPlugin.helpBody'),
    },
    PolarPlotPlugin: {
      bottomIconLabel: i18next.t('plugins.PolarPlotPlugin.bottomIconLabel'),
      title: i18next.t('plugins.PolarPlotPlugin.title'),
      helpBody: i18next.t('plugins.PolarPlotPlugin.helpBody'),
    },
    NextLaunchesPlugin: {
      bottomIconLabel: i18next.t('plugins.NextLaunchesPlugin.bottomIconLabel'),
      title: i18next.t('plugins.NextLaunchesPlugin.title'),
      helpBody: i18next.t('plugins.NextLaunchesPlugin.helpBody'),
    },
    FindSatPlugin: {
      bottomIconLabel: i18next.t('plugins.FindSatPlugin.bottomIconLabel'),
      title: i18next.t('plugins.FindSatPlugin.title'),
      helpBody: i18next.t('plugins.FindSatPlugin.helpBody'),
    },
    ShortTermFences: {
      bottomIconLabel: i18next.t('plugins.ShortTermFences.bottomIconLabel'),
      title: i18next.t('plugins.ShortTermFences.title'),
      helpBody: i18next.t('plugins.ShortTermFences.helpBody'),
    },
    Collissions: {
      bottomIconLabel: i18next.t('plugins.Collissions.bottomIconLabel'),
      title: i18next.t('plugins.Collissions.title'),
      helpBody: i18next.t('plugins.Collissions.helpBody'),
    },
    TrackingImpactPredict: {
      bottomIconLabel: i18next.t('plugins.TrackingImpactPredict.bottomIconLabel'),
      title: i18next.t('plugins.TrackingImpactPredict.title'),
      helpBody: i18next.t('plugins.TrackingImpactPredict.helpBody'),
    },
    Breakup: {
      bottomIconLabel: i18next.t('plugins.Breakup.bottomIconLabel'),
      title: i18next.t('plugins.Breakup.title'),
      helpBody: i18next.t('plugins.Breakup.helpBody'),
    },
    DebrisScreening: {
      bottomIconLabel: i18next.t('plugins.DebrisScreening.bottomIconLabel'),
      title: i18next.t('plugins.DebrisScreening.title'),
      helpBody: i18next.t('plugins.DebrisScreening.helpBody'),
    },
    TransponderChannelData: {
      bottomIconLabel: i18next.t('plugins.TransponderChannelData.bottomIconLabel'),
      title: i18next.t('plugins.TransponderChannelData.title'),
      helpBody: i18next.t('plugins.TransponderChannelData.helpBody'),
    },
    EditSat: {
      bottomIconLabel: i18next.t('plugins.EditSat.bottomIconLabel'),
      title: i18next.t('plugins.EditSat.title'),
      helpBody: i18next.t('plugins.EditSat.helpBody'),
    },
    NewLaunch: {
      bottomIconLabel: i18next.t('plugins.NewLaunch.bottomIconLabel'),
      title: i18next.t('plugins.NewLaunch.title'),
      helpBody: i18next.t('plugins.NewLaunch.helpBody'),
    },
    MissilePlugin: {
      bottomIconLabel: i18next.t('plugins.MissilePlugin.bottomIconLabel'),
      title: i18next.t('plugins.MissilePlugin.title'),
      helpBody: i18next.t('plugins.MissilePlugin.helpBody'),
    },
    StereoMap: {
      bottomIconLabel: i18next.t('plugins.StereoMap.bottomIconLabel'),
      title: i18next.t('plugins.StereoMap.title'),
      helpBody: i18next.t('plugins.StereoMap.helpBody'),
    },
    SensorFov: {
      bottomIconLabel: i18next.t('plugins.SensorFov.bottomIconLabel'),
    },
    SensorSurvFence: {
      bottomIconLabel: i18next.t('plugins.SensorSurvFence.bottomIconLabel'),
    },
    SatelliteViewPlugin: {
      bottomIconLabel: i18next.t('plugins.SatelliteViewPlugin.bottomIconLabel'),
    },
    SatelliteFov: {
      bottomIconLabel: i18next.t('plugins.SatelliteFov.bottomIconLabel'),
      title: i18next.t('plugins.SatelliteFov.title'),
      helpBody: i18next.t('plugins.SatelliteFov.helpBody'),
    },
    Planetarium: {
      bottomIconLabel: i18next.t('plugins.Planetarium.bottomIconLabel'),
    },
    NightToggle: {
      bottomIconLabel: i18next.t('plugins.NightToggle.bottomIconLabel'),
    },
    SatConstellations: {
      bottomIconLabel: i18next.t('plugins.SatConstellations.bottomIconLabel'),
      title: i18next.t('plugins.SatConstellations.title'),
      helpBody: i18next.t('plugins.SatConstellations.helpBody'),
    },
    CountriesMenu: {
      bottomIconLabel: i18next.t('plugins.CountriesMenu.bottomIconLabel'),
      title: i18next.t('plugins.CountriesMenu.title'),
      helpBody: i18next.t('plugins.CountriesMenu.helpBody'),
    },
    ColorMenu: {
      bottomIconLabel: i18next.t('plugins.ColorMenu.bottomIconLabel'),
      title: i18next.t('plugins.ColorMenu.title'),
      helpBody: i18next.t('plugins.ColorMenu.helpBody'),
    },
    Screenshot: {
      bottomIconLabel: i18next.t('plugins.Screenshot.bottomIconLabel'),
    },
    LaunchCalendar: {
      bottomIconLabel: i18next.t('plugins.LaunchCalendar.bottomIconLabel'),
    },
    TimeMachine: {
      bottomIconLabel: i18next.t('plugins.TimeMachine.bottomIconLabel'),
    },
    SatellitePhotos: {
      bottomIconLabel: i18next.t('plugins.SatellitePhotos.bottomIconLabel'),
      title: i18next.t('plugins.SatellitePhotos.title'),
      helpBody: i18next.t('plugins.SatellitePhotos.helpBody'),
    },
    ScreenRecorder: {
      bottomIconLabel: i18next.t('plugins.ScreenRecorder.bottomIconLabel'),
    },
    Astronomy: {
      bottomIconLabel: i18next.t('plugins.Astronomy.bottomIconLabel'),
    },
    AnalysisMenu: {
      bottomIconLabel: i18next.t('plugins.AnalysisMenu.bottomIconLabel'),
      title: i18next.t('plugins.AnalysisMenu.title'),
      helpBody: i18next.t('plugins.AnalysisMenu.helpBody'),
    },
    SettingsMenuPlugin: {
      bottomIconLabel: i18next.t('plugins.SettingsMenuPlugin.bottomIconLabel'),
      title: i18next.t('plugins.SettingsMenuPlugin.title'),
      helpBody: i18next.t('plugins.SettingsMenuPlugin.helpBody'),
    },
    VideoDirectorPlugin: {
      bottomIconLabel: i18next.t('plugins.VideoDirectorPlugin.bottomIconLabel'),
      title: i18next.t('plugins.VideoDirectorPlugin.title'),
      helpBody: i18next.t('plugins.VideoDirectorPlugin.helpBody'),
    },
    Calculator: {
      bottomIconLabel: i18next.t('plugins.Calculator.bottomIconLabel'),
      title: i18next.t('plugins.Calculator.title'),
      helpBody: i18next.t('plugins.Calculator.helpBody'),
    },
    CreateSat: {
      bottomIconLabel: i18next.t('plugins.CreateSat.bottomIconLabel'),
      title: i18next.t('plugins.CreateSat.title'),
      helpBody: i18next.t('plugins.CreateSat.helpBody'),
    },
    DopsPlugin: {
      bottomIconLabel: i18next.t('plugins.DopsPlugin.bottomIconLabel'),
      title: i18next.t('plugins.DopsPlugin.title'),
      helpBody: i18next.t('plugins.DopsPlugin.helpBody'),
    },
    EciPlot: {
      bottomIconLabel: i18next.t('plugins.EciPlot.bottomIconLabel'),
      title: i18next.t('plugins.EciPlot.title'),
      helpBody: i18next.t('plugins.EciPlot.helpBody'),
    },
    EcfPlot: {
      bottomIconLabel: i18next.t('plugins.EcfPlot.bottomIconLabel'),
      title: i18next.t('plugins.EcfPlot.title'),
      helpBody: i18next.t('plugins.EcfPlot.helpBody'),
    },
    RicPlot: {
      bottomIconLabel: i18next.t('plugins.RicPlot.bottomIconLabel'),
      title: i18next.t('plugins.RicPlot.title'),
      helpBody: i18next.t('plugins.RicPlot.helpBody'),
    },
    Time2LonPlots: {
      bottomIconLabel: i18next.t('plugins.Time2LonPlots.bottomIconLabel'),
      title: i18next.t('plugins.Time2LonPlots.title'),
      helpBody: i18next.t('plugins.Time2LonPlots.helpBody'),
    },
    Lat2LonPlots: {
      bottomIconLabel: i18next.t('plugins.Lat2LonPlots.bottomIconLabel'),
      title: i18next.t('plugins.Lat2LonPlots.title'),
      helpBody: i18next.t('plugins.Lat2LonPlots.helpBody'),
    },
    Inc2AltPlots: {
      bottomIconLabel: i18next.t('plugins.Inc2AltPlots.bottomIconLabel'),
      title: i18next.t('plugins.Inc2AltPlots.title'),
      helpBody: i18next.t('plugins.Inc2AltPlots.helpBody'),
    },
    Inc2LonPlots: {
      bottomIconLabel: i18next.t('plugins.Inc2LonPlots.bottomIconLabel'),
      title: i18next.t('plugins.Inc2LonPlots.title'),
      helpBody: i18next.t('plugins.Inc2LonPlots.helpBody'),
    },
    GraphicsMenuPlugin: {
      bottomIconLabel: i18next.t('plugins.GraphicsMenuPlugin.bottomIconLabel'),
      title: i18next.t('plugins.GraphicsMenuPlugin.title'),
      helpBody: i18next.t('plugins.GraphicsMenuPlugin.helpBody'),
    },
  },
});

export const Localization: LocaleInformation = loadLocalization();
