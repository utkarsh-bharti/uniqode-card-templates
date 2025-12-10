/**
 * Language Dropdown Component
 * 
 * Reusable language selection dropdown for all card layouts
 * Handles multi-language support with automatic data switching
 * 
 * Usage in any layout:
 * 1. Call renderLanguageDropdown() in getTemplate()
 * 2. Call attachLanguageDropdownListeners() in attachEventListeners()
 * 3. Pass language_data and default_language in cardData
 */

import { CARD_EVENTS } from '../../shared/constants/events.js';

// Language codes from beaconstac_server/web/beaconstac/dbc/constants.py LANGUAGE_CODES
const LANGUAGE_CODES = {
  "ab": "Abkhazian",
  "aa": "Afar",
  "af": "Afrikaans",
  "af-NA": "Afrikaans (Namibia)",
  "af-ZA": "Afrikaans (South Africa)",
  "ak": "Akan",
  "ak-GH": "Akan (Ghana)",
  "sq": "Albanian",
  "sq-AL": "Albanian (Albania)",
  "am": "Amharic",
  "am-ET": "Amharic (Ethiopia)",
  "ar": "Arabic",
  "ar-DZ": "Arabic (Algeria)",
  "ar-BH": "Arabic (Bahrain)",
  "ar-EG": "Arabic (Egypt)",
  "ar-IQ": "Arabic (Iraq)",
  "ar-JO": "Arabic (Jordan)",
  "ar-KW": "Arabic (Kuwait)",
  "ar-LB": "Arabic (Lebanon)",
  "ar-LY": "Arabic (Libya)",
  "ar-MA": "Arabic (Morocco)",
  "ar-OM": "Arabic (Oman)",
  "ar-QA": "Arabic (Qatar)",
  "ar-SA": "Arabic (Saudi Arabia)",
  "ar-SD": "Arabic (Sudan)",
  "ar-SY": "Arabic (Syria)",
  "ar-TN": "Arabic (Tunisia)",
  "ar-AE": "Arabic (United Arab Emirates)",
  "ar-YE": "Arabic (Yemen)",
  "hy": "Armenian",
  "hy-AM": "Armenian (Armenia)",
  "as": "Assamese",
  "as-IN": "Assamese (India)",
  "asa": "Asu",
  "asa-TZ": "Asu (Tanzania)",
  "ay": "Aymara",
  "az": "Azerbaijani",
  "az-Cyrl": "Azerbaijani (Cyrillic)",
  "az-Cyrl_AZ": "Azerbaijani (Cyrillic, Azerbaijan)",
  "az-Latn": "Azerbaijani (Latin)",
  "az-Latn_AZ": "Azerbaijani (Latin, Azerbaijan)",
  "bm": "Bambara",
  "bm-ML": "Bambara (Mali)",
  "ba": "Bashkir",
  "eu": "Basque",
  "eu-ES": "Basque (Spain)",
  "be": "Belarusian",
  "be-BY": "Belarusian (Belarus)",
  "bem": "Bemba",
  "bem-ZM": "Bemba (Zambia)",
  "bez": "Bena",
  "bez-TZ": "Bena (Tanzania)",
  "bn": "Bengali",
  "bn-BD": "Bengali (Bangladesh)",
  "bn-IN": "Bengali (India)",
  "dz": "Bhutani",
  "bh": "Bihari",
  "bi": "Bislama",
  "bs": "Bosnian",
  "bs-BA": "Bosnian (Bosnia and Herzegovina)",
  "br": "Breton",
  "bg": "Bulgarian",
  "bg-BG": "Bulgarian (Bulgaria)",
  "my": "Burmese",
  "my-MM": "Burmese (Myanmar [Burma])",
  "be": "Byelorussian",
  "km": "Cambodian",
  "yue-Hant_HK": "Cantonese (Traditional, Hong Kong SAR China)",
  "ca": "Catalan",
  "ca-ES": "Catalan (Spain)",
  "tzm": "Central Morocco Tamazight",
  "tzm-Latn": "Central Morocco Tamazight (Latin)",
  "tzm-Latn_MA": "Central Morocco Tamazight (Latin, Morocco)",
  "chr": "Cherokee",
  "chr-US": "Cherokee (United States)",
  "cgg": "Chiga",
  "cgg-UG": "Chiga (Uganda)",
  "zh": "Chinese",
  "zh-Hans": "Chinese (Simplified Han)",
  "zh-Hans_CN": "Chinese (Simplified Han, China)",
  "zh-Hans_HK": "Chinese (Simplified Han, Hong Kong SAR China)",
  "zh-Hans_MO": "Chinese (Simplified Han, Macau SAR China)",
  "zh-Hans_SG": "Chinese (Simplified Han, Singapore)",
  "zh-Hant": "Chinese (Traditional Han)",
  "zh-Hant_HK": "Chinese (Traditional Han, Hong Kong SAR China)",
  "zh-Hant_MO": "Chinese (Traditional Han, Macau SAR China)",
  "zh-Hant_TW": "Chinese (Traditional Han, Taiwan)",
  "kw": "Cornish",
  "kw-GB": "Cornish (United Kingdom)",
  "co": "Corsican",
  "hr": "Croatian",
  "hr-HR": "Croatian (Croatia)",
  "cs": "Czech",
  "cs-CZ": "Czech (Czech Republic)",
  "da": "Danish",
  "da-DK": "Danish (Denmark)",
  "nl": "Dutch",
  "nl-BE": "Dutch (Belgium)",
  "nl-NL": "Dutch (Netherlands)",
  "ebu": "Embu",
  "ebu-KE": "Embu (Kenya)",
  "en": "English",
  "en-AS": "English (American Samoa)",
  "en-AU": "English (Australia)",
  "en-BE": "English (Belgium)",
  "en-BZ": "English (Belize)",
  "en-BW": "English (Botswana)",
  "en-CA": "English (Canada)",
  "en-GU": "English (Guam)",
  "en-HK": "English (Hong Kong SAR China)",
  "en-IN": "English (India)",
  "en-IE": "English (Ireland)",
  "en-IL": "English (Israel)",
  "en-JM": "English (Jamaica)",
  "en-MY": "English (Malaysia)",
  "en-MT": "English (Malta)",
  "en-MH": "English (Marshall Islands)",
  "en-MU": "English (Mauritius)",
  "en-NA": "English (Namibia)",
  "en-NZ": "English (New Zealand)",
  "en-MP": "English (Northern Mariana Islands)",
  "en-PK": "English (Pakistan)",
  "en-PH": "English (Philippines)",
  "en-SG": "English (Singapore)",
  "en-ZA": "English (South Africa)",
  "en-TT": "English (Trinidad and Tobago)",
  "en-UM": "English (U.S. Minor Outlying Islands)",
  "en-VI": "English (U.S. Virgin Islands)",
  "en-GB": "English (United Kingdom)",
  "en-US": "English (United States)",
  "en-ZW": "English (Zimbabwe)",
  "eo": "Esperanto",
  "et": "Estonian",
  "et-EE": "Estonian (Estonia)",
  "ee": "Ewe",
  "ee-GH": "Ewe (Ghana)",
  "ee-TG": "Ewe (Togo)",
  "fo": "Faeroese",
  "fo": "Faroese",
  "fo-FO": "Faroese (Faroe Islands)",
  "fj": "Fiji",
  "fil": "Filipino",
  "fil-PH": "Filipino (Philippines)",
  "fi": "Finnish",
  "fi-FI": "Finnish (Finland)",
  "fr": "French",
  "fr-BE": "French (Belgium)",
  "fr-BJ": "French (Benin)",
  "fr-BF": "French (Burkina Faso)",
  "fr-BI": "French (Burundi)",
  "fr-CM": "French (Cameroon)",
  "fr-CA": "French (Canada)",
  "fr-CF": "French (Central African Republic)",
  "fr-TD": "French (Chad)",
  "fr-KM": "French (Comoros)",
  "fr-CG": "French (Congo - Brazzaville)",
  "fr-CD": "French (Congo - Kinshasa)",
  "fr-CI": "French (Côte dIvoire)",
  "fr-DJ": "French (Djibouti)",
  "fr-GQ": "French (Equatorial Guinea)",
  "fr-FR": "French (France)",
  "fr-GA": "French (Gabon)",
  "fr-GP": "French (Guadeloupe)",
  "fr-GN": "French (Guinea)",
  "fr-LU": "French (Luxembourg)",
  "fr-MG": "French (Madagascar)",
  "fr-ML": "French (Mali)",
  "fr-MQ": "French (Martinique)",
  "fr-MC": "French (Monaco)",
  "fr-NE": "French (Niger)",
  "fr-RW": "French (Rwanda)",
  "fr-RE": "French (Réunion)",
  "fr-BL": "French (Saint Barthélemy)",
  "fr-MF": "French (Saint Martin)",
  "fr-SN": "French (Senegal)",
  "fr-CH": "French (Switzerland)",
  "fr-TG": "French (Togo)",
  "fy": "Frisian",
  "ff": "Fulah",
  "ff-SN": "Fulah (Senegal)",
  "gl": "Galician",
  "gl-ES": "Galician (Spain)",
  "lg": "Ganda",
  "lg-UG": "Ganda (Uganda)",
  "ka": "Georgian",
  "ka-GE": "Georgian (Georgia)",
  "de": "German",
  "de-AT": "German (Austria)",
  "de-BE": "German (Belgium)",
  "de-DE": "German (Germany)",
  "de-LI": "German (Liechtenstein)",
  "de-LU": "German (Luxembourg)",
  "de-CH": "German (Switzerland)",
  "el": "Greek",
  "el-CY": "Greek (Cyprus)",
  "el-GR": "Greek (Greece)",
  "kl": "Greenlandic",
  "gn": "Guarani",
  "gu": "Gujarati",
  "gu-IN": "Gujarati (India)",
  "guz": "Gusii",
  "guz-KE": "Gusii (Kenya)",
  "ha": "Hausa",
  "ha-Latn": "Hausa (Latin)",
  "ha-Latn_GH": "Hausa (Latin, Ghana)",
  "ha-Latn_NE": "Hausa (Latin, Niger)",
  "ha-Latn_NG": "Hausa (Latin, Nigeria)",
  "haw": "Hawaiian",
  "haw-US": "Hawaiian (United States)",
  "he": "Hebrew",
  "he-IL": "Hebrew (Israel)",
  "hi": "Hindi",
  "hi-IN": "Hindi (India)",
  "hu": "Hungarian",
  "hu-HU": "Hungarian (Hungary)",
  "is": "Icelandic",
  "is-IS": "Icelandic (Iceland)",
  "ig": "Igbo",
  "ig-NG": "Igbo (Nigeria)",
  "id": "Indonesian",
  "id-ID": "Indonesian (Indonesia)",
  "ia": "Interlingua",
  "ie": "Interlingue",
  "iu": "Inuktitut",
  "ik": "Inupiak",
  "ga": "Irish",
  "ga-IE": "Irish (Ireland)",
  "it": "Italian",
  "it-IT": "Italian (Italy)",
  "it-CH": "Italian (Switzerland)",
  "ja": "Japanese",
  "ja-JP": "Japanese (Japan)",
  "jw": "Javanese",
  "kea": "Kabuverdianu",
  "kea-CV": "Kabuverdianu (Cape Verde)",
  "kab": "Kabyle",
  "kab-DZ": "Kabyle (Algeria)",
  "kl": "Kalaallisut",
  "kl-GL": "Kalaallisut (Greenland)",
  "kln": "Kalenjin",
  "kln-KE": "Kalenjin (Kenya)",
  "kam": "Kamba",
  "kam-KE": "Kamba (Kenya)",
  "kn": "Kannada",
  "kn-IN": "Kannada (India)",
  "ks": "Kashmiri",
  "kk": "Kazakh",
  "kk-Cyrl": "Kazakh (Cyrillic)",
  "kk-Cyrl_KZ": "Kazakh (Cyrillic, Kazakhstan)",
  "km": "Khmer",
  "km-KH": "Khmer (Cambodia)",
  "ki": "Kikuyu",
  "ki-KE": "Kikuyu (Kenya)",
  "rw": "Kinyarwanda",
  "rw-RW": "Kinyarwanda (Rwanda)",
  "ky": "Kirghiz",
  "rn": "Kirundi",
  "kok": "Konkani",
  "kok-IN": "Konkani (India)",
  "ko": "Korean",
  "ko-KR": "Korean (South Korea)",
  "khq": "Koyra Chiini",
  "khq-ML": "Koyra Chiini (Mali)",
  "ses": "Koyraboro Senni",
  "ses-ML": "Koyraboro Senni (Mali)",
  "ku": "Kurdish",
  "lag": "Langi",
  "lag-TZ": "Langi (Tanzania)",
  "lo": "Laothian",
  "la": "Latin",
  "lv": "Latvian",
  "lv-LV": "Latvian (Latvia)",
  "lv": "Lettish",
  "ln": "Lingala",
  "lt": "Lithuanian",
  "lt-LT": "Lithuanian (Lithuania)",
  "luo": "Luo",
  "luo-KE": "Luo (Kenya)",
  "luy": "Luyia",
  "luy-KE": "Luyia (Kenya)",
  "mk": "Macedonian",
  "mk-MK": "Macedonian (Macedonia)",
  "jmc": "Machame",
  "jmc-TZ": "Machame (Tanzania)",
  "kde": "Makonde",
  "kde-TZ": "Makonde (Tanzania)",
  "mg": "Malagasy",
  "mg-MG": "Malagasy (Madagascar)",
  "ms": "Malay",
  "ms-BN": "Malay (Brunei)",
  "ms-MY": "Malay (Malaysia)",
  "ml": "Malayalam",
  "ml-IN": "Malayalam (India)",
  "mt": "Maltese",
  "mt-MT": "Maltese (Malta)",
  "gv": "Manx",
  "gv-GB": "Manx (United Kingdom)",
  "mi": "Maori",
  "mr": "Marathi",
  "mr-IN": "Marathi (India)",
  "mas": "Masai",
  "mas-KE": "Masai (Kenya)",
  "mas-TZ": "Masai (Tanzania)",
  "mer": "Meru",
  "mer-KE": "Meru (Kenya)",
  "mo": "Moldavian",
  "mn": "Mongolian",
  "mfe": "Morisyen",
  "mfe-MU": "Morisyen (Mauritius)",
  "naq": "Nama",
  "naq-NA": "Nama (Namibia)",
  "na": "Nauru",
  "ne": "Nepali",
  "ne-IN": "Nepali (India)",
  "ne-NP": "Nepali (Nepal)",
  "nd": "North Ndebele",
  "nd-ZW": "North Ndebele (Zimbabwe)",
  "no": "Norwegian",
  "nb": "Norwegian Bokmål",
  "nb-NO": "Norwegian Bokmål (Norway)",
  "nn": "Norwegian Nynorsk",
  "nn-NO": "Norwegian Nynorsk (Norway)",
  "nyn": "Nyankole",
  "nyn-UG": "Nyankole (Uganda)",
  "oc": "Occitan",
  "or": "Oriya",
  "or-IN": "Oriya (India)",
  "om": "Oromo",
  "om-ET": "Oromo (Ethiopia)",
  "om-KE": "Oromo (Kenya)",
  "ps": "Pashto",
  "ps-AF": "Pashto (Afghanistan)",
  "fa": "Persian",
  "fa-AF": "Persian (Afghanistan)",
  "fa-IR": "Persian (Iran)",
  "pl": "Polish",
  "pl-PL": "Polish (Poland)",
  "pt": "Portuguese",
  "pt-BR": "Portuguese (Brazil)",
  "pt-GW": "Portuguese (Guinea-Bissau)",
  "pt-MZ": "Portuguese (Mozambique)",
  "pt-PT": "Portuguese (Portugal)",
  "pa": "Punjabi",
  "pa-Arab": "Punjabi (Arabic)",
  "pa-Arab_PK": "Punjabi (Arabic, Pakistan)",
  "pa-Guru": "Punjabi (Gurmukhi)",
  "pa-Guru_IN": "Punjabi (Gurmukhi, India)",
  "ps": "Pushto",
  "qu": "Quechua",
  "rm": "Rhaeto",
  "ro": "Romanian",
  "ro-MD": "Romanian (Moldova)",
  "ro-RO": "Romanian (Romania)",
  "rm": "Romansh",
  "rm-CH": "Romansh (Switzerland)",
  "rof": "Rombo",
  "rof-TZ": "Rombo (Tanzania)",
  "ru": "Russian",
  "ru-MD": "Russian (Moldova)",
  "ru-RU": "Russian (Russia)",
  "ru-UA": "Russian (Ukraine)",
  "rwk": "Rwa",
  "rwk-TZ": "Rwa (Tanzania)",
  "saq": "Samburu",
  "saq-KE": "Samburu (Kenya)",
  "sm": "Samoan",
  "sg": "Sango",
  "sg-CF": "Sango (Central African Republic)",
  "sg": "Sangro",
  "sa": "Sanskrit",
  "gd": "Scots",
  "seh": "Sena",
  "seh-MZ": "Sena (Mozambique)",
  "sr": "Serbian",
  "sr-Cyrl": "Serbian (Cyrillic)",
  "sr-Cyrl_BA": "Serbian (Cyrillic, Bosnia and Herzegovina)",
  "sr-Cyrl_ME": "Serbian (Cyrillic, Montenegro)",
  "sr-Cyrl_RS": "Serbian (Cyrillic, Serbia)",
  "sr-Latn": "Serbian (Latin)",
  "sr-Latn_BA": "Serbian (Latin, Bosnia and Herzegovina)",
  "sr-Latn_ME": "Serbian (Latin, Montenegro)",
  "sr-Latn_RS": "Serbian (Latin, Serbia)",
  "sh": "Serbo",
  "st": "Sesotho",
  "tn": "Setswana",
  "sn": "Shona",
  "sn-ZW": "Shona (Zimbabwe)",
  "ii": "Sichuan Yi",
  "ii-CN": "Sichuan Yi (China)",
  "sd": "Sindhi",
  "si": "Singhalese",
  "si": "Sinhala",
  "si-LK": "Sinhala (Sri Lanka)",
  "ss": "Siswati",
  "sk": "Slovak",
  "sk-SK": "Slovak (Slovakia)",
  "sl": "Slovenian",
  "sl-SI": "Slovenian (Slovenia)",
  "xog": "Soga",
  "xog-UG": "Soga (Uganda)",
  "so": "Somali",
  "so-DJ": "Somali (Djibouti)",
  "so-ET": "Somali (Ethiopia)",
  "so-KE": "Somali (Kenya)",
  "so-SO": "Somali (Somalia)",
  "es": "Spanish",
  "es-AR": "Spanish (Argentina)",
  "es-BO": "Spanish (Bolivia)",
  "es-CL": "Spanish (Chile)",
  "es-CO": "Spanish (Colombia)",
  "es-CR": "Spanish (Costa Rica)",
  "es-DO": "Spanish (Dominican Republic)",
  "es-EC": "Spanish (Ecuador)",
  "es-SV": "Spanish (El Salvador)",
  "es-GQ": "Spanish (Equatorial Guinea)",
  "es-GT": "Spanish (Guatemala)",
  "es-HN": "Spanish (Honduras)",
  "es-419": "Spanish (Latin America)",
  "es-MX": "Spanish (Mexico)",
  "es-NI": "Spanish (Nicaragua)",
  "es-PA": "Spanish (Panama)",
  "es-PY": "Spanish (Paraguay)",
  "es-PE": "Spanish (Peru)",
  "es-PR": "Spanish (Puerto Rico)",
  "es-ES": "Spanish (Spain)",
  "es-US": "Spanish (United States)",
  "es-UY": "Spanish (Uruguay)",
  "es-VE": "Spanish (Venezuela)",
  "su": "Sudanese",
  "sw": "Swahili",
  "sw-KE": "Swahili (Kenya)",
  "sw-TZ": "Swahili (Tanzania)",
  "sv": "Swedish",
  "sv-FI": "Swedish (Finland)",
  "sv-SE": "Swedish (Sweden)",
  "gsw": "Swiss German",
  "gsw-CH": "Swiss German (Switzerland)",
  "shi": "Tachelhit",
  "shi-Latn": "Tachelhit (Latin)",
  "shi-Latn_MA": "Tachelhit (Latin, Morocco)",
  "shi-Tfng": "Tachelhit (Tifinagh)",
  "shi-Tfng_MA": "Tachelhit (Tifinagh, Morocco)",
  "tl": "Tagalog",
  "dav": "Taita",
  "dav-KE": "Taita (Kenya)",
  "tg": "Tajik",
  "ta": "Tamil",
  "ta-IN": "Tamil (India)",
  "ta-LK": "Tamil (Sri Lanka)",
  "tt": "Tatar",
  "te": "Telugu",
  "te-IN": "Telugu (India)",
  "teo": "Teso",
  "teo-KE": "Teso (Kenya)",
  "teo-UG": "Teso (Uganda)",
  "th": "Thai",
  "th-TH": "Thai (Thailand)",
  "bo": "Tibetan",
  "bo-CN": "Tibetan (China)",
  "bo-IN": "Tibetan (India)",
  "ti": "Tigrinya",
  "ti-ER": "Tigrinya (Eritrea)",
  "ti-ET": "Tigrinya (Ethiopia)",
  "to": "Tonga",
  "to-TO": "Tonga (Tonga)",
  "ts": "Tsonga",
  "tr": "Turkish",
  "tr-TR": "Turkish (Turkey)",
  "tk": "Turkmen",
  "tw": "Twi",
  "ug": "Uigur",
  "uk": "Ukrainian",
  "uk-UA": "Ukrainian (Ukraine)",
  "ur": "Urdu",
  "ur-IN": "Urdu (India)",
  "ur-PK": "Urdu (Pakistan)",
  "uz": "Uzbek",
  "uz-Arab": "Uzbek (Arabic)",
  "uz-Arab_AF": "Uzbek (Arabic, Afghanistan)",
  "uz-Cyrl": "Uzbek (Cyrillic)",
  "uz-Cyrl_UZ": "Uzbek (Cyrillic, Uzbekistan)",
  "uz-Latn": "Uzbek (Latin)",
  "uz-Latn_UZ": "Uzbek (Latin, Uzbekistan)",
  "vi": "Vietnamese",
  "vi-VN": "Vietnamese (Vietnam)",
  "vo": "Volapuk",
  "vun": "Vunjo",
  "vun-TZ": "Vunjo (Tanzania)",
  "cy": "Welch",
  "cy": "Welsh",
  "cy-GB": "Welsh (United Kingdom)",
  "wo": "Wolof",
  "xh": "Xhosa",
  "yi": "Yiddish",
  "yo": "Yoruba",
  "yo-NG": "Yoruba (Nigeria)",
  "za": "Zhuang",
  "zu": "Zulu",
  "zu-ZA": "Zulu (South Africa)"
};

export const LanguageDropdownMixin = {
  /**
   * Get HTML template for language dropdown
   * @returns {string} HTML string for the dropdown
   */
  getLanguageDropdownTemplate: function () {
    return `
      <style>
        /* Language dropdown - positioned at top right inside card */
        .uqc-language-dropdown-container {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.4);
          border: 0;
          border-radius: 4px;
        }

        .uqc-language-dropdown-container.hidden {
          display: none;
        }

        .uqc-language-select {
          background-color: transparent;
          color: #FFFFFF;
          font-family: 'Work Sans', sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          text-align: center;
          text-align-last: center;
          text-overflow: ellipsis;
          max-width: 20ch;
          border: 0;
          padding: 8px;
          padding-right: 32px;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          user-select: none;
          cursor: pointer;
          position: relative;
          z-index: 1;
        }

        .uqc-language-select:focus {
          outline: none;
        }

        .uqc-language-select:focus-visible {
          outline: none;
        }

        /* Dropdown arrow */
        .uqc-language-dropdown-container::after {
          content: '';
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid #FFFFFF;
          pointer-events: none;
          z-index: 0;
        }
      </style>

      <div class="uqc-language-dropdown-container hidden" id="uqc-language-dropdown">
        <select class="uqc-language-select" id="uqc-language-select">
          <!-- Options will be populated dynamically -->
        </select>
      </div>
    `;
  },

  /**
   * Render and populate the language dropdown
   * Called during component render
   */
  renderLanguageDropdown: function () {
    const { language_data, default_language } = this._cardData || {};
    const { showLanguageDropdown } = this._config || {};

    const container = this._shadowRoot.querySelector('#uqc-language-dropdown');
    const select = this._shadowRoot.querySelector('#uqc-language-select');

    if (!container || !select) return;

    // Auto-detect if card is multi-lingual (has language_data with at least one language)
    const isMultiLingual = language_data && Object.keys(language_data).length > 0;
    
    // Priority: config > auto-detect
    // If config explicitly sets false, hide. Otherwise show if multi-lingual.
    const shouldShow = showLanguageDropdown ?? isMultiLingual;
    
    if (!shouldShow) {
      container.classList.add('hidden');
      return;
    }

    // At this point, we should show the dropdown
    container.classList.remove('hidden');

    // Get current selected language (preserve selection across re-renders)
    const currentSelection = this._currentLanguage || '';

    // Build language options
    const languages = this.getAvailableLanguages();

    // Clear existing options
    select.innerHTML = '';

    // Add default language option
    const defaultLangCode = default_language || 'en';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = LANGUAGE_CODES[defaultLangCode] || defaultLangCode.toUpperCase();
    defaultOption.selected = (currentSelection === '');
    select.appendChild(defaultOption);

    // Add other language options (use uppercase language codes)
    languages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = lang.label;  // Already uppercase from getAvailableLanguages
      option.selected = (currentSelection === lang.code);
      select.appendChild(option);
    });

    console.log('%c[LanguageDropdown] Dropdown rendered with languages:', 'color: #3b82f6', languages);
    console.log('%c[LanguageDropdown] Current selection:', 'color: #3b82f6', currentSelection || 'default');
  },

  /**
   * Get list of available languages from language_data
   * @returns {Array} Array of language objects with code and label
   */
  getAvailableLanguages: function () {
    const { language_data } = this._cardData || {};
    if (!language_data) return [];

    return Object.keys(language_data).map(code => ({
      code: code,
      label: `${LANGUAGE_CODES[code] || code.toUpperCase()}`
    }));
  },

  /**
   * Get language-specific card data
   * @param {string} langCode - Language code (empty string for default)
   * @returns {object} Card data for the selected language
   */
  getLanguageData: function (langCode) {
    // Use original card data to get clean default data
    const sourceData = this._originalCardData || this._cardData || {};
    const { language_data, default_language, ...defaultData } = sourceData;

    // Return default data if no language code or no language data available
    if (!langCode || !language_data) {
      return defaultData;
    }

    // Return language-specific data if it exists
    if (language_data[langCode]) {
      // Merge with default data (language-specific data overrides)
      return {
        ...defaultData,
        ...language_data[langCode],
        // Preserve language_data and default_language for future switches
        language_data,
        default_language
      };
    }

    // Fallback to default data
    return defaultData;
  },

  /**
   * Attach event listener to language dropdown
   * Called during attachEventListeners()
   */
  attachLanguageDropdownListeners: function () {
    const select = this._shadowRoot.querySelector('#uqc-language-select');

    if (!select) return;

    select.addEventListener('change', (e) => {
      const selectedLang = e.target.value;

      console.log('%c[LanguageDropdown] Language changed to:', 'color: #3b82f6', selectedLang || 'default');

      // Store the current language selection
      this._currentLanguage = selectedLang;

      // Get language-specific data
      const languageData = this.getLanguageData(selectedLang);

      // Store original full card data if not already stored
      if (!this._originalCardData) {
        this._originalCardData = { ...this._cardData };
      }

      // Update internal card data with language-specific data
      this._cardData = {
        ...this._originalCardData,
        ...languageData
      };

      // Re-render the card with new language data
      this.render();

      // Emit language-change event for external listeners
      this.emitEvent(CARD_EVENTS.LANGUAGE_CHANGE, {
        language: selectedLang || this._cardData.default_language || 'en',
        cardData: languageData
      });
    });
  }
};

