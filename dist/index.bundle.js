"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([
  [57],
  {
    /***/ 611: /***/ () => {
      // CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/native.js
      var randomUUID =
        typeof crypto !== "undefined" &&
        crypto.randomUUID &&
        crypto.randomUUID.bind(crypto);
      /* harmony default export */ const esm_browser_native = {
        randomUUID,
      }; // CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
      // Unique ID creation requires a high quality random # generator. In the browser we therefore
      // require the crypto API and do not support built-in fallback to lower quality random number
      // generators (like Math.random()).

      var getRandomValues;
      var rnds8 = new Uint8Array(16);
      function rng() {
        // lazy load so that environments that need to polyfill have a chance to do so
        if (!getRandomValues) {
          // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
          getRandomValues =
            typeof crypto !== "undefined" &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto);
          if (!getRandomValues) {
            throw new Error(
              "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
            );
          }
        }
        return getRandomValues(rnds8);
      } // CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js
      /**
       * Convert array of 16 byte values to UUID string format of the form:
       * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
       */
      var byteToHex = [];
      for (var i = 0; i < 256; ++i) {
        byteToHex.push((i + 0x100).toString(16).slice(1));
      }
      function unsafeStringify(arr, offset = 0) {
        // Note: Be careful editing this code!  It's been tuned for performance
        // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
        //
        // Note to future-self: No, you can't remove the `toLowerCase()` call.
        // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
        return (
          byteToHex[arr[offset + 0]] +
          byteToHex[arr[offset + 1]] +
          byteToHex[arr[offset + 2]] +
          byteToHex[arr[offset + 3]] +
          "-" +
          byteToHex[arr[offset + 4]] +
          byteToHex[arr[offset + 5]] +
          "-" +
          byteToHex[arr[offset + 6]] +
          byteToHex[arr[offset + 7]] +
          "-" +
          byteToHex[arr[offset + 8]] +
          byteToHex[arr[offset + 9]] +
          "-" +
          byteToHex[arr[offset + 10]] +
          byteToHex[arr[offset + 11]] +
          byteToHex[arr[offset + 12]] +
          byteToHex[arr[offset + 13]] +
          byteToHex[arr[offset + 14]] +
          byteToHex[arr[offset + 15]]
        ).toLowerCase();
      }
      function stringify(arr, offset = 0) {
        var uuid = unsafeStringify(arr, offset);
        // Consistency check for valid UUID.  If this throws, it's likely due to one
        // of the following:
        // - One or more input array values don't map to a hex octet (leading to
        // "undefined" in the uuid)
        // - Invalid input values for the RFC `version` or `variant` fields
        if (!validate(uuid)) {
          throw TypeError("Stringified UUID is invalid");
        }
        return uuid;
      }
      /* harmony default export */ const esm_browser_stringify =
        /* unused pure expression or super */ null && stringify; // CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js
      function v4(options, buf, offset) {
        if (esm_browser_native.randomUUID && !buf && !options) {
          return esm_browser_native.randomUUID();
        }
        options = options || {};
        var rnds = options.random || (options.rng || rng)();

        // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
        rnds[6] = (rnds[6] & 0x0f) | 0x40;
        rnds[8] = (rnds[8] & 0x3f) | 0x80;

        // Copy bytes to buffer, if provided
        if (buf) {
          offset = offset || 0;
          for (var i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
          }
          return buf;
        }
        return unsafeStringify(rnds);
      }
      /* harmony default export */ const esm_browser_v4 = v4; // CONCATENATED MODULE: ./node_modules/date-fns/constructFrom.mjs
      /**
       * @name constructFrom
       * @category Generic Helpers
       * @summary Constructs a date using the reference date and the value
       *
       * @description
       * The function constructs a new date using the constructor from the reference
       * date and the given value. It helps to build generic functions that accept
       * date extensions.
       *
       * It defaults to `Date` if the passed reference date is a number or a string.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The reference date to take constructor from
       * @param value - The value to create the date
       *
       * @returns Date initialized using the given date and value
       *
       * @example
       * import { constructFrom } from 'date-fns'
       *
       * // A function that clones a date preserving the original type
       * function cloneDate<DateType extends Date(date: DateType): DateType {
       *   return constructFrom(
       *     date, // Use contrustor from the given date
       *     date.getTime() // Use the date value to create a new date
       *   )
       * }
       */
      function constructFrom(date, value) {
        if (date instanceof Date) {
          return new date.constructor(value);
        } else {
          return new Date(value);
        }
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_constructFrom =
        /* unused pure expression or super */ null && constructFrom; // CONCATENATED MODULE: ./node_modules/date-fns/_lib/defaultOptions.mjs

      let defaultOptions = {};

      function getDefaultOptions() {
        return defaultOptions;
      }

      function setDefaultOptions(newOptions) {
        defaultOptions = newOptions;
      } // CONCATENATED MODULE: ./node_modules/date-fns/getDefaultOptions.mjs

      /**
       * @name getDefaultOptions
       * @category Common Helpers
       * @summary Get default options.
       * @pure false
       *
       * @description
       * Returns an object that contains defaults for
       * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
       * arguments for all functions.
       *
       * You can change these with [setDefaultOptions](https://date-fns.org/docs/setDefaultOptions).
       *
       * @returns The default options
       *
       * @example
       * const result = getDefaultOptions()
       * //=> {}
       *
       * @example
       * setDefaultOptions({ weekStarsOn: 1, firstWeekContainsDate: 4 })
       * const result = getDefaultOptions()
       * //=> { weekStarsOn: 1, firstWeekContainsDate: 4 }
       */
      function getDefaultOptions_getDefaultOptions() {
        return Object.assign({}, getDefaultOptions());
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_getDefaultOptions =
        /* unused pure expression or super */ null &&
        getDefaultOptions_getDefaultOptions; // CONCATENATED MODULE: ./node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs

      const formatDistanceLocale = {
        lessThanXSeconds: {
          one: "less than a second",
          other: "less than {{count}} seconds",
        },

        xSeconds: {
          one: "1 second",
          other: "{{count}} seconds",
        },

        halfAMinute: "half a minute",

        lessThanXMinutes: {
          one: "less than a minute",
          other: "less than {{count}} minutes",
        },

        xMinutes: {
          one: "1 minute",
          other: "{{count}} minutes",
        },

        aboutXHours: {
          one: "about 1 hour",
          other: "about {{count}} hours",
        },

        xHours: {
          one: "1 hour",
          other: "{{count}} hours",
        },

        xDays: {
          one: "1 day",
          other: "{{count}} days",
        },

        aboutXWeeks: {
          one: "about 1 week",
          other: "about {{count}} weeks",
        },

        xWeeks: {
          one: "1 week",
          other: "{{count}} weeks",
        },

        aboutXMonths: {
          one: "about 1 month",
          other: "about {{count}} months",
        },

        xMonths: {
          one: "1 month",
          other: "{{count}} months",
        },

        aboutXYears: {
          one: "about 1 year",
          other: "about {{count}} years",
        },

        xYears: {
          one: "1 year",
          other: "{{count}} years",
        },

        overXYears: {
          one: "over 1 year",
          other: "over {{count}} years",
        },

        almostXYears: {
          one: "almost 1 year",
          other: "almost {{count}} years",
        },
      };

      const formatDistance = (token, count, options) => {
        let result;

        const tokenValue = formatDistanceLocale[token];
        if (typeof tokenValue === "string") {
          result = tokenValue;
        } else if (count === 1) {
          result = tokenValue.one;
        } else {
          result = tokenValue.other.replace("{{count}}", count.toString());
        }

        if (options?.addSuffix) {
          if (options.comparison && options.comparison > 0) {
            return "in " + result;
          } else {
            return result + " ago";
          }
        }

        return result;
      }; // CONCATENATED MODULE: ./node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs

      function buildFormatLongFn(args) {
        return (options = {}) => {
          // TODO: Remove String()
          const width = options.width
            ? String(options.width)
            : args.defaultWidth;
          const format = args.formats[width] || args.formats[args.defaultWidth];
          return format;
        };
      } // CONCATENATED MODULE: ./node_modules/date-fns/locale/en-US/_lib/formatLong.mjs

      const dateFormats = {
        full: "EEEE, MMMM do, y",
        long: "MMMM do, y",
        medium: "MMM d, y",
        short: "MM/dd/yyyy",
      };

      const timeFormats = {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a",
      };

      const dateTimeFormats = {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}",
      };

      const formatLong = {
        date: buildFormatLongFn({
          formats: dateFormats,
          defaultWidth: "full",
        }),

        time: buildFormatLongFn({
          formats: timeFormats,
          defaultWidth: "full",
        }),

        dateTime: buildFormatLongFn({
          formats: dateTimeFormats,
          defaultWidth: "full",
        }),
      }; // CONCATENATED MODULE: ./node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs

      const formatRelativeLocale = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P",
      };

      const formatRelative = (token, _date, _baseDate, _options) =>
        formatRelativeLocale[token]; // CONCATENATED MODULE: ./node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs

      /* eslint-disable no-unused-vars */

      /**
       * The localize function argument callback which allows to convert raw value to
       * the actual type.
       *
       * @param value - The value to convert
       *
       * @returns The converted value
       */

      /**
       * The map of localized values for each width.
       */

      /**
       * The index type of the locale unit value. It types conversion of units of
       * values that don't start at 0 (i.e. quarters).
       */

      /**
       * Converts the unit value to the tuple of values.
       */

      /**
       * The tuple of localized era values. The first element represents BC,
       * the second element represents AD.
       */

      /**
       * The tuple of localized quarter values. The first element represents Q1.
       */

      /**
       * The tuple of localized day values. The first element represents Sunday.
       */

      /**
       * The tuple of localized month values. The first element represents January.
       */

      function buildLocalizeFn(args) {
        return (value, options) => {
          const context = options?.context
            ? String(options.context)
            : "standalone";

          let valuesArray;
          if (context === "formatting" && args.formattingValues) {
            const defaultWidth =
              args.defaultFormattingWidth || args.defaultWidth;
            const width = options?.width ? String(options.width) : defaultWidth;

            valuesArray =
              args.formattingValues[width] ||
              args.formattingValues[defaultWidth];
          } else {
            const defaultWidth = args.defaultWidth;
            const width = options?.width
              ? String(options.width)
              : args.defaultWidth;

            valuesArray = args.values[width] || args.values[defaultWidth];
          }
          const index = args.argumentCallback
            ? args.argumentCallback(value)
            : value;

          // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
          return valuesArray[index];
        };
      } // CONCATENATED MODULE: ./node_modules/date-fns/locale/en-US/_lib/localize.mjs

      const eraValues = {
        narrow: ["B", "A"],
        abbreviated: ["BC", "AD"],
        wide: ["Before Christ", "Anno Domini"],
      };

      const quarterValues = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
      };

      // Note: in English, the names of days of the week and months are capitalized.
      // If you are making a new locale based on this one, check if the same is true for the language you're working on.
      // Generally, formatted dates should look like they are in the middle of a sentence,
      // e.g. in Spanish language the weekdays and months should be in the lowercase.
      const monthValues = {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],

        wide: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      };

      const dayValues = {
        narrow: ["S", "M", "T", "W", "T", "F", "S"],
        short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        wide: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      };

      const dayPeriodValues = {
        narrow: {
          am: "a",
          pm: "p",
          midnight: "mi",
          noon: "n",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night",
        },
        abbreviated: {
          am: "AM",
          pm: "PM",
          midnight: "midnight",
          noon: "noon",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night",
        },
        wide: {
          am: "a.m.",
          pm: "p.m.",
          midnight: "midnight",
          noon: "noon",
          morning: "morning",
          afternoon: "afternoon",
          evening: "evening",
          night: "night",
        },
      };

      const formattingDayPeriodValues = {
        narrow: {
          am: "a",
          pm: "p",
          midnight: "mi",
          noon: "n",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night",
        },
        abbreviated: {
          am: "AM",
          pm: "PM",
          midnight: "midnight",
          noon: "noon",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night",
        },
        wide: {
          am: "a.m.",
          pm: "p.m.",
          midnight: "midnight",
          noon: "noon",
          morning: "in the morning",
          afternoon: "in the afternoon",
          evening: "in the evening",
          night: "at night",
        },
      };

      const ordinalNumber = (dirtyNumber, _options) => {
        const number = Number(dirtyNumber);

        // If ordinal numbers depend on context, for example,
        // if they are different for different grammatical genders,
        // use `options.unit`.
        //
        // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
        // 'day', 'hour', 'minute', 'second'.

        const rem100 = number % 100;
        if (rem100 > 20 || rem100 < 10) {
          switch (rem100 % 10) {
            case 1:
              return number + "st";
            case 2:
              return number + "nd";
            case 3:
              return number + "rd";
          }
        }
        return number + "th";
      };

      const localize = {
        ordinalNumber,

        era: buildLocalizeFn({
          values: eraValues,
          defaultWidth: "wide",
        }),

        quarter: buildLocalizeFn({
          values: quarterValues,
          defaultWidth: "wide",
          argumentCallback: (quarter) => quarter - 1,
        }),

        month: buildLocalizeFn({
          values: monthValues,
          defaultWidth: "wide",
        }),

        day: buildLocalizeFn({
          values: dayValues,
          defaultWidth: "wide",
        }),

        dayPeriod: buildLocalizeFn({
          values: dayPeriodValues,
          defaultWidth: "wide",
          formattingValues: formattingDayPeriodValues,
          defaultFormattingWidth: "wide",
        }),
      }; // CONCATENATED MODULE: ./node_modules/date-fns/locale/_lib/buildMatchFn.mjs

      function buildMatchFn(args) {
        return (string, options = {}) => {
          const width = options.width;

          const matchPattern =
            (width && args.matchPatterns[width]) ||
            args.matchPatterns[args.defaultMatchWidth];
          const matchResult = string.match(matchPattern);

          if (!matchResult) {
            return null;
          }
          const matchedString = matchResult[0];

          const parsePatterns =
            (width && args.parsePatterns[width]) ||
            args.parsePatterns[args.defaultParseWidth];

          const key = Array.isArray(parsePatterns)
            ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
              findKey(parsePatterns, (pattern) => pattern.test(matchedString));

          let value;

          value = args.valueCallback ? args.valueCallback(key) : key;
          value = options.valueCallback
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
              options.valueCallback(value)
            : value;

          const rest = string.slice(matchedString.length);

          return { value, rest };
        };
      }

      function findKey(object, predicate) {
        for (const key in object) {
          if (
            Object.prototype.hasOwnProperty.call(object, key) &&
            predicate(object[key])
          ) {
            return key;
          }
        }
        return undefined;
      }

      function findIndex(array, predicate) {
        for (let key = 0; key < array.length; key++) {
          if (predicate(array[key])) {
            return key;
          }
        }
        return undefined;
      } // CONCATENATED MODULE: ./node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs

      function buildMatchPatternFn(args) {
        return (string, options = {}) => {
          const matchResult = string.match(args.matchPattern);
          if (!matchResult) return null;
          const matchedString = matchResult[0];

          const parseResult = string.match(args.parsePattern);
          if (!parseResult) return null;
          let value = args.valueCallback
            ? args.valueCallback(parseResult[0])
            : parseResult[0];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
          value = options.valueCallback ? options.valueCallback(value) : value;

          const rest = string.slice(matchedString.length);

          return { value, rest };
        };
      } // CONCATENATED MODULE: ./node_modules/date-fns/locale/en-US/_lib/match.mjs

      const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
      const parseOrdinalNumberPattern = /\d+/i;

      const matchEraPatterns = {
        narrow: /^(b|a)/i,
        abbreviated:
          /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i,
      };
      const parseEraPatterns = {
        any: [/^b/i, /^(a|c)/i],
      };

      const matchQuarterPatterns = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i,
      };
      const parseQuarterPatterns = {
        any: [/1/i, /2/i, /3/i, /4/i],
      };

      const matchMonthPatterns = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      };
      const parseMonthPatterns = {
        narrow: [
          /^j/i,
          /^f/i,
          /^m/i,
          /^a/i,
          /^m/i,
          /^j/i,
          /^j/i,
          /^a/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i,
        ],

        any: [
          /^ja/i,
          /^f/i,
          /^mar/i,
          /^ap/i,
          /^may/i,
          /^jun/i,
          /^jul/i,
          /^au/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i,
        ],
      };

      const matchDayPatterns = {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
      };
      const parseDayPatterns = {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
      };

      const matchDayPeriodPatterns = {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
      };
      const parseDayPeriodPatterns = {
        any: {
          am: /^a/i,
          pm: /^p/i,
          midnight: /^mi/i,
          noon: /^no/i,
          morning: /morning/i,
          afternoon: /afternoon/i,
          evening: /evening/i,
          night: /night/i,
        },
      };

      const match = {
        ordinalNumber: buildMatchPatternFn({
          matchPattern: matchOrdinalNumberPattern,
          parsePattern: parseOrdinalNumberPattern,
          valueCallback: (value) => parseInt(value, 10),
        }),

        era: buildMatchFn({
          matchPatterns: matchEraPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseEraPatterns,
          defaultParseWidth: "any",
        }),

        quarter: buildMatchFn({
          matchPatterns: matchQuarterPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseQuarterPatterns,
          defaultParseWidth: "any",
          valueCallback: (index) => index + 1,
        }),

        month: buildMatchFn({
          matchPatterns: matchMonthPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseMonthPatterns,
          defaultParseWidth: "any",
        }),

        day: buildMatchFn({
          matchPatterns: matchDayPatterns,
          defaultMatchWidth: "wide",
          parsePatterns: parseDayPatterns,
          defaultParseWidth: "any",
        }),

        dayPeriod: buildMatchFn({
          matchPatterns: matchDayPeriodPatterns,
          defaultMatchWidth: "any",
          parsePatterns: parseDayPeriodPatterns,
          defaultParseWidth: "any",
        }),
      }; // CONCATENATED MODULE: ./node_modules/date-fns/locale/en-US.mjs

      /**
       * @category Locales
       * @summary English locale (United States).
       * @language English
       * @iso-639-2 eng
       * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
       * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
       */
      const enUS = {
        code: "en-US",
        formatDistance: formatDistance,
        formatLong: formatLong,
        formatRelative: formatRelative,
        localize: localize,
        match: match,
        options: {
          weekStartsOn: 0 /* Sunday */,
          firstWeekContainsDate: 1,
        },
      };

      // Fallback for modularized imports:
      /* harmony default export */ const en_US =
        /* unused pure expression or super */ null && enUS; // CONCATENATED MODULE: ./node_modules/date-fns/toDate.mjs

      /**
       * @name toDate
       * @category Common Helpers
       * @summary Convert the given argument to an instance of Date.
       *
       * @description
       * Convert the given argument to an instance of Date.
       *
       * If the argument is an instance of Date, the function returns its clone.
       *
       * If the argument is a number, it is treated as a timestamp.
       *
       * If the argument is none of the above, the function returns Invalid Date.
       *
       * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param argument - The value to convert
       *
       * @returns The parsed date in the local time zone
       *
       * @example
       * // Clone the date:
       * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
       * //=> Tue Feb 11 2014 11:30:30
       *
       * @example
       * // Convert the timestamp to date:
       * const result = toDate(1392098430000)
       * //=> Tue Feb 11 2014 11:30:30
       */
      function toDate(argument) {
        const argStr = Object.prototype.toString.call(argument);

        // Clone the date
        if (
          argument instanceof Date ||
          (typeof argument === "object" && argStr === "[object Date]")
        ) {
          // Prevent the date to lose the milliseconds when passed to new Date() in IE10
          return new argument.constructor(+argument);
        } else if (
          typeof argument === "number" ||
          argStr === "[object Number]" ||
          typeof argument === "string" ||
          argStr === "[object String]"
        ) {
          // TODO: Can we get rid of as?
          return new Date(argument);
        } else {
          // TODO: Can we get rid of as?
          return new Date(NaN);
        }
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_toDate =
        /* unused pure expression or super */ null && toDate; // CONCATENATED MODULE: ./node_modules/date-fns/_lib/format/longFormatters.mjs

      const dateLongFormatter = (pattern, formatLong) => {
        switch (pattern) {
          case "P":
            return formatLong.date({ width: "short" });
          case "PP":
            return formatLong.date({ width: "medium" });
          case "PPP":
            return formatLong.date({ width: "long" });
          case "PPPP":
          default:
            return formatLong.date({ width: "full" });
        }
      };

      const timeLongFormatter = (pattern, formatLong) => {
        switch (pattern) {
          case "p":
            return formatLong.time({ width: "short" });
          case "pp":
            return formatLong.time({ width: "medium" });
          case "ppp":
            return formatLong.time({ width: "long" });
          case "pppp":
          default:
            return formatLong.time({ width: "full" });
        }
      };

      const dateTimeLongFormatter = (pattern, formatLong) => {
        const matchResult = pattern.match(/(P+)(p+)?/) || [];
        const datePattern = matchResult[1];
        const timePattern = matchResult[2];

        if (!timePattern) {
          return dateLongFormatter(pattern, formatLong);
        }

        let dateTimeFormat;

        switch (datePattern) {
          case "P":
            dateTimeFormat = formatLong.dateTime({ width: "short" });
            break;
          case "PP":
            dateTimeFormat = formatLong.dateTime({ width: "medium" });
            break;
          case "PPP":
            dateTimeFormat = formatLong.dateTime({ width: "long" });
            break;
          case "PPPP":
          default:
            dateTimeFormat = formatLong.dateTime({ width: "full" });
            break;
        }

        return dateTimeFormat
          .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
          .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
      };

      const longFormatters = {
        p: timeLongFormatter,
        P: dateTimeLongFormatter,
      }; // CONCATENATED MODULE: ./node_modules/date-fns/_lib/protectedTokens.mjs

      const dayOfYearTokenRE = /^D+$/;
      const weekYearTokenRE = /^Y+$/;

      const throwTokens = ["D", "DD", "YY", "YYYY"];

      function isProtectedDayOfYearToken(token) {
        return dayOfYearTokenRE.test(token);
      }

      function isProtectedWeekYearToken(token) {
        return weekYearTokenRE.test(token);
      }

      function warnOrThrowProtectedError(token, format, input) {
        const _message = message(token, format, input);
        console.warn(_message);
        if (throwTokens.includes(token)) throw new RangeError(_message);
      }

      function message(token, format, input) {
        const subject = token[0] === "Y" ? "years" : "days of the month";
        return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
      } // CONCATENATED MODULE: ./node_modules/date-fns/transpose.mjs

      /**
       * @name transpose
       * @category Generic Helpers
       * @summary Transpose the date to the given constructor.
       *
       * @description
       * The function transposes the date to the given constructor. It helps you
       * to transpose the date in the system time zone to say `UTCDate` or any other
       * date extension.
       *
       * @typeParam DateInputType - The input `Date` type derived from the passed argument.
       * @typeParam DateOutputType - The output `Date` type derived from the passed constructor.
       *
       * @param fromDate - The date to use values from
       * @param constructor - The date constructor to use
       *
       * @returns Date transposed to the given constructor
       *
       * @example
       * // Create July 10, 2022 00:00 in locale time zone
       * const date = new Date(2022, 6, 10)
       * //=> 'Sun Jul 10 2022 00:00:00 GMT+0800 (Singapore Standard Time)'
       *
       * @example
       * // Transpose the date to July 10, 2022 00:00 in UTC
       * transpose(date, UTCDate)
       * //=> 'Sun Jul 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)'
       */
      function transpose(fromDate, constructor) {
        const date =
          constructor instanceof Date
            ? constructFrom(constructor, 0)
            : new constructor(0);
        date.setFullYear(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          fromDate.getDate(),
        );
        date.setHours(
          fromDate.getHours(),
          fromDate.getMinutes(),
          fromDate.getSeconds(),
          fromDate.getMilliseconds(),
        );
        return date;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_transpose =
        /* unused pure expression or super */ null && transpose; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/Setter.mjs

      const TIMEZONE_UNIT_PRIORITY = 10;

      class Setter {
        subPriority = 0;

        validate(_utcDate, _options) {
          return true;
        }
      }

      class ValueSetter extends Setter {
        constructor(
          value,

          validateValue,

          setValue,

          priority,
          subPriority,
        ) {
          super();
          this.value = value;
          this.validateValue = validateValue;
          this.setValue = setValue;
          this.priority = priority;
          if (subPriority) {
            this.subPriority = subPriority;
          }
        }

        validate(date, options) {
          return this.validateValue(date, this.value, options);
        }

        set(date, flags, options) {
          return this.setValue(date, flags, this.value, options);
        }
      }

      class DateToSystemTimezoneSetter extends Setter {
        priority = TIMEZONE_UNIT_PRIORITY;
        subPriority = -1;
        set(date, flags) {
          if (flags.timestampIsSet) return date;
          return constructFrom(date, transpose(date, Date));
        }
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/Parser.mjs

      class Parser {
        run(dateString, token, match, options) {
          const result = this.parse(dateString, token, match, options);
          if (!result) {
            return null;
          }

          return {
            setter: new ValueSetter(
              result.value,
              this.validate,
              this.set,
              this.priority,
              this.subPriority,
            ),
            rest: result.rest,
          };
        }

        validate(_utcDate, _value, _options) {
          return true;
        }
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/EraParser.mjs

      class EraParser extends Parser {
        priority = 140;

        parse(dateString, token, match) {
          switch (token) {
            // AD, BC
            case "G":
            case "GG":
            case "GGG":
              return (
                match.era(dateString, { width: "abbreviated" }) ||
                match.era(dateString, { width: "narrow" })
              );

            // A, B
            case "GGGGG":
              return match.era(dateString, { width: "narrow" });
            // Anno Domini, Before Christ
            case "GGGG":
            default:
              return (
                match.era(dateString, { width: "wide" }) ||
                match.era(dateString, { width: "abbreviated" }) ||
                match.era(dateString, { width: "narrow" })
              );
          }
        }

        set(date, flags, value) {
          flags.era = value;
          date.setFullYear(value, 0, 1);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = ["R", "u", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/constants.mjs

      /**
       * @module constants
       * @summary Useful constants
       * @description
       * Collection of useful date constants.
       *
       * The constants could be imported from `date-fns/constants`:
       *
       * ```ts
       * import { maxTime, minTime } from "./constants/date-fns/constants";
       *
       * function isAllowedTime(time) {
       *   return time <= maxTime && time >= minTime;
       * }
       * ```
       */

      /**
       * @constant
       * @name daysInWeek
       * @summary Days in 1 week.
       */
      const daysInWeek = 7;

      /**
       * @constant
       * @name daysInYear
       * @summary Days in 1 year.
       *
       * @description
       * How many days in a year.
       *
       * One years equals 365.2425 days according to the formula:
       *
       * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
       * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
       */
      const daysInYear = 365.2425;

      /**
       * @constant
       * @name maxTime
       * @summary Maximum allowed time.
       *
       * @example
       * import { maxTime } from "./constants/date-fns/constants";
       *
       * const isValid = 8640000000000001 <= maxTime;
       * //=> false
       *
       * new Date(8640000000000001);
       * //=> Invalid Date
       */
      const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

      /**
       * @constant
       * @name minTime
       * @summary Minimum allowed time.
       *
       * @example
       * import { minTime } from "./constants/date-fns/constants";
       *
       * const isValid = -8640000000000001 >= minTime;
       * //=> false
       *
       * new Date(-8640000000000001)
       * //=> Invalid Date
       */
      const minTime = -maxTime;

      /**
       * @constant
       * @name millisecondsInWeek
       * @summary Milliseconds in 1 week.
       */
      const millisecondsInWeek = 604800000;

      /**
       * @constant
       * @name millisecondsInDay
       * @summary Milliseconds in 1 day.
       */
      const millisecondsInDay = 86400000;

      /**
       * @constant
       * @name millisecondsInMinute
       * @summary Milliseconds in 1 minute
       */
      const millisecondsInMinute = 60000;

      /**
       * @constant
       * @name millisecondsInHour
       * @summary Milliseconds in 1 hour
       */
      const millisecondsInHour = 3600000;

      /**
       * @constant
       * @name millisecondsInSecond
       * @summary Milliseconds in 1 second
       */
      const millisecondsInSecond = 1000;

      /**
       * @constant
       * @name minutesInYear
       * @summary Minutes in 1 year.
       */
      const minutesInYear = 525600;

      /**
       * @constant
       * @name minutesInMonth
       * @summary Minutes in 1 month.
       */
      const minutesInMonth = 43200;

      /**
       * @constant
       * @name minutesInDay
       * @summary Minutes in 1 day.
       */
      const minutesInDay = 1440;

      /**
       * @constant
       * @name minutesInHour
       * @summary Minutes in 1 hour.
       */
      const minutesInHour = 60;

      /**
       * @constant
       * @name monthsInQuarter
       * @summary Months in 1 quarter.
       */
      const monthsInQuarter = 3;

      /**
       * @constant
       * @name monthsInYear
       * @summary Months in 1 year.
       */
      const monthsInYear = 12;

      /**
       * @constant
       * @name quartersInYear
       * @summary Quarters in 1 year
       */
      const quartersInYear = 4;

      /**
       * @constant
       * @name secondsInHour
       * @summary Seconds in 1 hour.
       */
      const secondsInHour = 3600;

      /**
       * @constant
       * @name secondsInMinute
       * @summary Seconds in 1 minute.
       */
      const secondsInMinute = 60;

      /**
       * @constant
       * @name secondsInDay
       * @summary Seconds in 1 day.
       */
      const secondsInDay = secondsInHour * 24;

      /**
       * @constant
       * @name secondsInWeek
       * @summary Seconds in 1 week.
       */
      const secondsInWeek = secondsInDay * 7;

      /**
       * @constant
       * @name secondsInYear
       * @summary Seconds in 1 year.
       */
      const secondsInYear = secondsInDay * daysInYear;

      /**
       * @constant
       * @name secondsInMonth
       * @summary Seconds in 1 month
       */
      const secondsInMonth = secondsInYear / 12;

      /**
       * @constant
       * @name secondsInQuarter
       * @summary Seconds in 1 quarter.
       */
      const secondsInQuarter = secondsInMonth * 3; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/constants.mjs

      const numericPatterns = {
        month: /^(1[0-2]|0?\d)/, // 0 to 12
        date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
        dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
        week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
        hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
        hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
        hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
        hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
        minute: /^[0-5]?\d/, // 0 to 59
        second: /^[0-5]?\d/, // 0 to 59

        singleDigit: /^\d/, // 0 to 9
        twoDigits: /^\d{1,2}/, // 0 to 99
        threeDigits: /^\d{1,3}/, // 0 to 999
        fourDigits: /^\d{1,4}/, // 0 to 9999

        anyDigitsSigned: /^-?\d+/,
        singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
        twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
        threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
        fourDigitsSigned: /^-?\d{1,4}/, // 0 to 9999, -0 to -9999
      };

      const timezonePatterns = {
        basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
        basic: /^([+-])(\d{2})(\d{2})|Z/,
        basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
        extended: /^([+-])(\d{2}):(\d{2})|Z/,
        extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
      }; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/utils.mjs

      function mapValue(parseFnResult, mapFn) {
        if (!parseFnResult) {
          return parseFnResult;
        }

        return {
          value: mapFn(parseFnResult.value),
          rest: parseFnResult.rest,
        };
      }

      function parseNumericPattern(pattern, dateString) {
        const matchResult = dateString.match(pattern);

        if (!matchResult) {
          return null;
        }

        return {
          value: parseInt(matchResult[0], 10),
          rest: dateString.slice(matchResult[0].length),
        };
      }

      function parseTimezonePattern(pattern, dateString) {
        const matchResult = dateString.match(pattern);

        if (!matchResult) {
          return null;
        }

        // Input is 'Z'
        if (matchResult[0] === "Z") {
          return {
            value: 0,
            rest: dateString.slice(1),
          };
        }

        const sign = matchResult[1] === "+" ? 1 : -1;
        const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
        const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
        const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;

        return {
          value:
            sign *
            (hours * millisecondsInHour +
              minutes * millisecondsInMinute +
              seconds * millisecondsInSecond),
          rest: dateString.slice(matchResult[0].length),
        };
      }

      function parseAnyDigitsSigned(dateString) {
        return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
      }

      function parseNDigits(n, dateString) {
        switch (n) {
          case 1:
            return parseNumericPattern(numericPatterns.singleDigit, dateString);
          case 2:
            return parseNumericPattern(numericPatterns.twoDigits, dateString);
          case 3:
            return parseNumericPattern(numericPatterns.threeDigits, dateString);
          case 4:
            return parseNumericPattern(numericPatterns.fourDigits, dateString);
          default:
            return parseNumericPattern(
              new RegExp("^\\d{1," + n + "}"),
              dateString,
            );
        }
      }

      function parseNDigitsSigned(n, dateString) {
        switch (n) {
          case 1:
            return parseNumericPattern(
              numericPatterns.singleDigitSigned,
              dateString,
            );
          case 2:
            return parseNumericPattern(
              numericPatterns.twoDigitsSigned,
              dateString,
            );
          case 3:
            return parseNumericPattern(
              numericPatterns.threeDigitsSigned,
              dateString,
            );
          case 4:
            return parseNumericPattern(
              numericPatterns.fourDigitsSigned,
              dateString,
            );
          default:
            return parseNumericPattern(
              new RegExp("^-?\\d{1," + n + "}"),
              dateString,
            );
        }
      }

      function dayPeriodEnumToHours(dayPeriod) {
        switch (dayPeriod) {
          case "morning":
            return 4;
          case "evening":
            return 17;
          case "pm":
          case "noon":
          case "afternoon":
            return 12;
          case "am":
          case "midnight":
          case "night":
          default:
            return 0;
        }
      }

      function normalizeTwoDigitYear(twoDigitYear, currentYear) {
        const isCommonEra = currentYear > 0;
        // Absolute number of the current year:
        // 1 -> 1 AC
        // 0 -> 1 BC
        // -1 -> 2 BC
        const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;

        let result;
        if (absCurrentYear <= 50) {
          result = twoDigitYear || 100;
        } else {
          const rangeEnd = absCurrentYear + 50;
          const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
          const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
          result =
            twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
        }

        return isCommonEra ? result : 1 - result;
      }

      function isLeapYearIndex(year) {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/YearParser.mjs

      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
      class YearParser extends Parser {
        priority = 130;
        incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];

        parse(dateString, token, match) {
          const valueCallback = (year) => ({
            year,
            isTwoDigitYear: token === "yy",
          });

          switch (token) {
            case "y":
              return mapValue(parseNDigits(4, dateString), valueCallback);
            case "yo":
              return mapValue(
                match.ordinalNumber(dateString, {
                  unit: "year",
                }),
                valueCallback,
              );
            default:
              return mapValue(
                parseNDigits(token.length, dateString),
                valueCallback,
              );
          }
        }

        validate(_date, value) {
          return value.isTwoDigitYear || value.year > 0;
        }

        set(date, flags, value) {
          const currentYear = date.getFullYear();

          if (value.isTwoDigitYear) {
            const normalizedTwoDigitYear = normalizeTwoDigitYear(
              value.year,
              currentYear,
            );
            date.setFullYear(normalizedTwoDigitYear, 0, 1);
            date.setHours(0, 0, 0, 0);
            return date;
          }

          const year =
            !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
          date.setFullYear(year, 0, 1);
          date.setHours(0, 0, 0, 0);
          return date;
        }
      } // CONCATENATED MODULE: ./node_modules/date-fns/startOfWeek.mjs

      /**
       * The {@link startOfWeek} function options.
       */

      /**
       * @name startOfWeek
       * @category Week Helpers
       * @summary Return the start of a week for the given date.
       *
       * @description
       * Return the start of a week for the given date.
       * The result will be in the local timezone.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The original date
       * @param options - An object with options
       *
       * @returns The start of a week
       *
       * @example
       * // The start of a week for 2 September 2014 11:55:00:
       * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
       * //=> Sun Aug 31 2014 00:00:00
       *
       * @example
       * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
       * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
       * //=> Mon Sep 01 2014 00:00:00
       */
      function startOfWeek(date, options) {
        const defaultOptions = getDefaultOptions();
        const weekStartsOn =
          options?.weekStartsOn ??
          options?.locale?.options?.weekStartsOn ??
          defaultOptions.weekStartsOn ??
          defaultOptions.locale?.options?.weekStartsOn ??
          0;

        const _date = toDate(date);
        const day = _date.getDay();
        const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

        _date.setDate(_date.getDate() - diff);
        _date.setHours(0, 0, 0, 0);
        return _date;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_startOfWeek =
        /* unused pure expression or super */ null && startOfWeek; // CONCATENATED MODULE: ./node_modules/date-fns/getWeekYear.mjs

      /**
       * The {@link getWeekYear} function options.
       */

      /**
       * @name getWeekYear
       * @category Week-Numbering Year Helpers
       * @summary Get the local week-numbering year of the given date.
       *
       * @description
       * Get the local week-numbering year of the given date.
       * The exact calculation depends on the values of
       * `options.weekStartsOn` (which is the index of the first day of the week)
       * and `options.firstWeekContainsDate` (which is the day of January, which is always in
       * the first week of the week-numbering year)
       *
       * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The given date
       * @param options - An object with options.
       *
       * @returns The local week-numbering year
       *
       * @example
       * // Which week numbering year is 26 December 2004 with the default settings?
       * const result = getWeekYear(new Date(2004, 11, 26))
       * //=> 2005
       *
       * @example
       * // Which week numbering year is 26 December 2004 if week starts on Saturday?
       * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
       * //=> 2004
       *
       * @example
       * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
       * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
       * //=> 2004
       */
      function getWeekYear(date, options) {
        const _date = toDate(date);
        const year = _date.getFullYear();

        const defaultOptions = getDefaultOptions();
        const firstWeekContainsDate =
          options?.firstWeekContainsDate ??
          options?.locale?.options?.firstWeekContainsDate ??
          defaultOptions.firstWeekContainsDate ??
          defaultOptions.locale?.options?.firstWeekContainsDate ??
          1;

        const firstWeekOfNextYear = constructFrom(date, 0);
        firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
        firstWeekOfNextYear.setHours(0, 0, 0, 0);
        const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);

        const firstWeekOfThisYear = constructFrom(date, 0);
        firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
        firstWeekOfThisYear.setHours(0, 0, 0, 0);
        const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);

        if (_date.getTime() >= startOfNextYear.getTime()) {
          return year + 1;
        } else if (_date.getTime() >= startOfThisYear.getTime()) {
          return year;
        } else {
          return year - 1;
        }
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_getWeekYear =
        /* unused pure expression or super */ null && getWeekYear; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.mjs

      // Local week-numbering year
      class LocalWeekYearParser extends Parser {
        priority = 130;

        parse(dateString, token, match) {
          const valueCallback = (year) => ({
            year,
            isTwoDigitYear: token === "YY",
          });

          switch (token) {
            case "Y":
              return mapValue(parseNDigits(4, dateString), valueCallback);
            case "Yo":
              return mapValue(
                match.ordinalNumber(dateString, {
                  unit: "year",
                }),
                valueCallback,
              );
            default:
              return mapValue(
                parseNDigits(token.length, dateString),
                valueCallback,
              );
          }
        }

        validate(_date, value) {
          return value.isTwoDigitYear || value.year > 0;
        }

        set(date, flags, value, options) {
          const currentYear = getWeekYear(date, options);

          if (value.isTwoDigitYear) {
            const normalizedTwoDigitYear = normalizeTwoDigitYear(
              value.year,
              currentYear,
            );
            date.setFullYear(
              normalizedTwoDigitYear,
              0,
              options.firstWeekContainsDate,
            );
            date.setHours(0, 0, 0, 0);
            return startOfWeek(date, options);
          }

          const year =
            !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
          date.setFullYear(year, 0, options.firstWeekContainsDate);
          date.setHours(0, 0, 0, 0);
          return startOfWeek(date, options);
        }

        incompatibleTokens = [
          "y",
          "R",
          "u",
          "Q",
          "q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "i",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/startOfISOWeek.mjs

      /**
       * @name startOfISOWeek
       * @category ISO Week Helpers
       * @summary Return the start of an ISO week for the given date.
       *
       * @description
       * Return the start of an ISO week for the given date.
       * The result will be in the local timezone.
       *
       * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The original date
       *
       * @returns The start of an ISO week
       *
       * @example
       * // The start of an ISO week for 2 September 2014 11:55:00:
       * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
       * //=> Mon Sep 01 2014 00:00:00
       */
      function startOfISOWeek(date) {
        return startOfWeek(date, { weekStartsOn: 1 });
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_startOfISOWeek =
        /* unused pure expression or super */ null && startOfISOWeek; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.mjs

      // ISO week-numbering year
      class ISOWeekYearParser extends Parser {
        priority = 130;

        parse(dateString, token) {
          if (token === "R") {
            return parseNDigitsSigned(4, dateString);
          }

          return parseNDigitsSigned(token.length, dateString);
        }

        set(date, _flags, value) {
          const firstWeekOfYear = constructFrom(date, 0);
          firstWeekOfYear.setFullYear(value, 0, 4);
          firstWeekOfYear.setHours(0, 0, 0, 0);
          return startOfISOWeek(firstWeekOfYear);
        }

        incompatibleTokens = [
          "G",
          "y",
          "Y",
          "u",
          "Q",
          "q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.mjs

      class ExtendedYearParser extends Parser {
        priority = 130;

        parse(dateString, token) {
          if (token === "u") {
            return parseNDigitsSigned(4, dateString);
          }

          return parseNDigitsSigned(token.length, dateString);
        }

        set(date, _flags, value) {
          date.setFullYear(value, 0, 1);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "G",
          "y",
          "Y",
          "R",
          "w",
          "I",
          "i",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/QuarterParser.mjs

      class QuarterParser extends Parser {
        priority = 120;

        parse(dateString, token, match) {
          switch (token) {
            // 1, 2, 3, 4
            case "Q":
            case "QQ": // 01, 02, 03, 04
              return parseNDigits(token.length, dateString);
            // 1st, 2nd, 3rd, 4th
            case "Qo":
              return match.ordinalNumber(dateString, { unit: "quarter" });
            // Q1, Q2, Q3, Q4
            case "QQQ":
              return (
                match.quarter(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.quarter(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case "QQQQQ":
              return match.quarter(dateString, {
                width: "narrow",
                context: "formatting",
              });
            // 1st quarter, 2nd quarter, ...
            case "QQQQ":
            default:
              return (
                match.quarter(dateString, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.quarter(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.quarter(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        }

        validate(_date, value) {
          return value >= 1 && value <= 4;
        }

        set(date, _flags, value) {
          date.setMonth((value - 1) * 3, 1);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "Y",
          "R",
          "q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.mjs

      class StandAloneQuarterParser extends Parser {
        priority = 120;

        parse(dateString, token, match) {
          switch (token) {
            // 1, 2, 3, 4
            case "q":
            case "qq": // 01, 02, 03, 04
              return parseNDigits(token.length, dateString);
            // 1st, 2nd, 3rd, 4th
            case "qo":
              return match.ordinalNumber(dateString, { unit: "quarter" });
            // Q1, Q2, Q3, Q4
            case "qqq":
              return (
                match.quarter(dateString, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.quarter(dateString, {
                  width: "narrow",
                  context: "standalone",
                })
              );

            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case "qqqqq":
              return match.quarter(dateString, {
                width: "narrow",
                context: "standalone",
              });
            // 1st quarter, 2nd quarter, ...
            case "qqqq":
            default:
              return (
                match.quarter(dateString, {
                  width: "wide",
                  context: "standalone",
                }) ||
                match.quarter(dateString, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.quarter(dateString, {
                  width: "narrow",
                  context: "standalone",
                })
              );
          }
        }

        validate(_date, value) {
          return value >= 1 && value <= 4;
        }

        set(date, _flags, value) {
          date.setMonth((value - 1) * 3, 1);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "Y",
          "R",
          "Q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/MonthParser.mjs

      class MonthParser extends Parser {
        incompatibleTokens = [
          "Y",
          "R",
          "q",
          "Q",
          "L",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ];

        priority = 110;

        parse(dateString, token, match) {
          const valueCallback = (value) => value - 1;

          switch (token) {
            // 1, 2, ..., 12
            case "M":
              return mapValue(
                parseNumericPattern(numericPatterns.month, dateString),
                valueCallback,
              );
            // 01, 02, ..., 12
            case "MM":
              return mapValue(parseNDigits(2, dateString), valueCallback);
            // 1st, 2nd, ..., 12th
            case "Mo":
              return mapValue(
                match.ordinalNumber(dateString, {
                  unit: "month",
                }),
                valueCallback,
              );
            // Jan, Feb, ..., Dec
            case "MMM":
              return (
                match.month(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.month(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            // J, F, ..., D
            case "MMMMM":
              return match.month(dateString, {
                width: "narrow",
                context: "formatting",
              });
            // January, February, ..., December
            case "MMMM":
            default:
              return (
                match.month(dateString, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.month(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.month(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 11;
        }

        set(date, _flags, value) {
          date.setMonth(value, 1);
          date.setHours(0, 0, 0, 0);
          return date;
        }
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.mjs

      class StandAloneMonthParser extends Parser {
        priority = 110;

        parse(dateString, token, match) {
          const valueCallback = (value) => value - 1;

          switch (token) {
            // 1, 2, ..., 12
            case "L":
              return mapValue(
                parseNumericPattern(numericPatterns.month, dateString),
                valueCallback,
              );
            // 01, 02, ..., 12
            case "LL":
              return mapValue(parseNDigits(2, dateString), valueCallback);
            // 1st, 2nd, ..., 12th
            case "Lo":
              return mapValue(
                match.ordinalNumber(dateString, {
                  unit: "month",
                }),
                valueCallback,
              );
            // Jan, Feb, ..., Dec
            case "LLL":
              return (
                match.month(dateString, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.month(dateString, {
                  width: "narrow",
                  context: "standalone",
                })
              );

            // J, F, ..., D
            case "LLLLL":
              return match.month(dateString, {
                width: "narrow",
                context: "standalone",
              });
            // January, February, ..., December
            case "LLLL":
            default:
              return (
                match.month(dateString, {
                  width: "wide",
                  context: "standalone",
                }) ||
                match.month(dateString, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.month(dateString, {
                  width: "narrow",
                  context: "standalone",
                })
              );
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 11;
        }

        set(date, _flags, value) {
          date.setMonth(value, 1);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "Y",
          "R",
          "q",
          "Q",
          "M",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/startOfWeekYear.mjs

      /**
       * The {@link startOfWeekYear} function options.
       */

      /**
       * @name startOfWeekYear
       * @category Week-Numbering Year Helpers
       * @summary Return the start of a local week-numbering year for the given date.
       *
       * @description
       * Return the start of a local week-numbering year.
       * The exact calculation depends on the values of
       * `options.weekStartsOn` (which is the index of the first day of the week)
       * and `options.firstWeekContainsDate` (which is the day of January, which is always in
       * the first week of the week-numbering year)
       *
       * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The original date
       * @param options - An object with options
       *
       * @returns The start of a week-numbering year
       *
       * @example
       * // The start of an a week-numbering year for 2 July 2005 with default settings:
       * const result = startOfWeekYear(new Date(2005, 6, 2))
       * //=> Sun Dec 26 2004 00:00:00
       *
       * @example
       * // The start of a week-numbering year for 2 July 2005
       * // if Monday is the first day of week
       * // and 4 January is always in the first week of the year:
       * const result = startOfWeekYear(new Date(2005, 6, 2), {
       *   weekStartsOn: 1,
       *   firstWeekContainsDate: 4
       * })
       * //=> Mon Jan 03 2005 00:00:00
       */
      function startOfWeekYear(date, options) {
        const defaultOptions = getDefaultOptions();
        const firstWeekContainsDate =
          options?.firstWeekContainsDate ??
          options?.locale?.options?.firstWeekContainsDate ??
          defaultOptions.firstWeekContainsDate ??
          defaultOptions.locale?.options?.firstWeekContainsDate ??
          1;

        const year = getWeekYear(date, options);
        const firstWeek = constructFrom(date, 0);
        firstWeek.setFullYear(year, 0, firstWeekContainsDate);
        firstWeek.setHours(0, 0, 0, 0);
        const _date = startOfWeek(firstWeek, options);
        return _date;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_startOfWeekYear =
        /* unused pure expression or super */ null && startOfWeekYear; // CONCATENATED MODULE: ./node_modules/date-fns/getWeek.mjs

      /**
       * The {@link getWeek} function options.
       */

      /**
       * @name getWeek
       * @category Week Helpers
       * @summary Get the local week index of the given date.
       *
       * @description
       * Get the local week index of the given date.
       * The exact calculation depends on the values of
       * `options.weekStartsOn` (which is the index of the first day of the week)
       * and `options.firstWeekContainsDate` (which is the day of January, which is always in
       * the first week of the week-numbering year)
       *
       * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The given date
       * @param options - An object with options
       *
       * @returns The week
       *
       * @example
       * // Which week of the local week numbering year is 2 January 2005 with default options?
       * const result = getWeek(new Date(2005, 0, 2))
       * //=> 2
       *
       * @example
       * // Which week of the local week numbering year is 2 January 2005,
       * // if Monday is the first day of the week,
       * // and the first week of the year always contains 4 January?
       * const result = getWeek(new Date(2005, 0, 2), {
       *   weekStartsOn: 1,
       *   firstWeekContainsDate: 4
       * })
       * //=> 53
       */

      function getWeek(date, options) {
        const _date = toDate(date);
        const diff =
          +startOfWeek(_date, options) - +startOfWeekYear(_date, options);

        // Round the number of weeks to the nearest integer because the number of
        // milliseconds in a week is not constant (e.g. it's different in the week of
        // the daylight saving time clock shift).
        return Math.round(diff / millisecondsInWeek) + 1;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_getWeek =
        /* unused pure expression or super */ null && getWeek; // CONCATENATED MODULE: ./node_modules/date-fns/setWeek.mjs

      /**
       * The {@link setWeek} function options.
       */

      /**
       * @name setWeek
       * @category Week Helpers
       * @summary Set the local week to the given date.
       *
       * @description
       * Set the local week to the given date, saving the weekday number.
       * The exact calculation depends on the values of
       * `options.weekStartsOn` (which is the index of the first day of the week)
       * and `options.firstWeekContainsDate` (which is the day of January, which is always in
       * the first week of the week-numbering year)
       *
       * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to be changed
       * @param week - The week of the new date
       * @param options - An object with options
       *
       * @returns The new date with the local week set
       *
       * @example
       * // Set the 1st week to 2 January 2005 with default options:
       * const result = setWeek(new Date(2005, 0, 2), 1)
       * //=> Sun Dec 26 2004 00:00:00
       *
       * @example
       * // Set the 1st week to 2 January 2005,
       * // if Monday is the first day of the week,
       * // and the first week of the year always contains 4 January:
       * const result = setWeek(new Date(2005, 0, 2), 1, {
       *   weekStartsOn: 1,
       *   firstWeekContainsDate: 4
       * })
       * //=> Sun Jan 4 2004 00:00:00
       */
      function setWeek(date, week, options) {
        const _date = toDate(date);
        const diff = getWeek(_date, options) - week;
        _date.setDate(_date.getDate() - diff * 7);
        return _date;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_setWeek =
        /* unused pure expression or super */ null && setWeek; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.mjs

      // Local week of year
      class LocalWeekParser extends Parser {
        priority = 100;

        parse(dateString, token, match) {
          switch (token) {
            case "w":
              return parseNumericPattern(numericPatterns.week, dateString);
            case "wo":
              return match.ordinalNumber(dateString, { unit: "week" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(_date, value) {
          return value >= 1 && value <= 53;
        }

        set(date, _flags, value, options) {
          return startOfWeek(setWeek(date, value, options), options);
        }

        incompatibleTokens = [
          "y",
          "R",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "i",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/getISOWeekYear.mjs

      /**
       * @name getISOWeekYear
       * @category ISO Week-Numbering Year Helpers
       * @summary Get the ISO week-numbering year of the given date.
       *
       * @description
       * Get the ISO week-numbering year of the given date,
       * which always starts 3 days before the year's first Thursday.
       *
       * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The given date
       *
       * @returns The ISO week-numbering year
       *
       * @example
       * // Which ISO-week numbering year is 2 January 2005?
       * const result = getISOWeekYear(new Date(2005, 0, 2))
       * //=> 2004
       */
      function getISOWeekYear(date) {
        const _date = toDate(date);
        const year = _date.getFullYear();

        const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
        fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
        fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
        const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);

        const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
        fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
        fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
        const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

        if (_date.getTime() >= startOfNextYear.getTime()) {
          return year + 1;
        } else if (_date.getTime() >= startOfThisYear.getTime()) {
          return year;
        } else {
          return year - 1;
        }
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_getISOWeekYear =
        /* unused pure expression or super */ null && getISOWeekYear; // CONCATENATED MODULE: ./node_modules/date-fns/startOfISOWeekYear.mjs

      /**
       * @name startOfISOWeekYear
       * @category ISO Week-Numbering Year Helpers
       * @summary Return the start of an ISO week-numbering year for the given date.
       *
       * @description
       * Return the start of an ISO week-numbering year,
       * which always starts 3 days before the year's first Thursday.
       * The result will be in the local timezone.
       *
       * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The original date
       *
       * @returns The start of an ISO week-numbering year
       *
       * @example
       * // The start of an ISO week-numbering year for 2 July 2005:
       * const result = startOfISOWeekYear(new Date(2005, 6, 2))
       * //=> Mon Jan 03 2005 00:00:00
       */
      function startOfISOWeekYear(date) {
        const year = getISOWeekYear(date);
        const fourthOfJanuary = constructFrom(date, 0);
        fourthOfJanuary.setFullYear(year, 0, 4);
        fourthOfJanuary.setHours(0, 0, 0, 0);
        return startOfISOWeek(fourthOfJanuary);
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_startOfISOWeekYear =
        /* unused pure expression or super */ null && startOfISOWeekYear; // CONCATENATED MODULE: ./node_modules/date-fns/getISOWeek.mjs

      /**
       * @name getISOWeek
       * @category ISO Week Helpers
       * @summary Get the ISO week of the given date.
       *
       * @description
       * Get the ISO week of the given date.
       *
       * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The given date
       *
       * @returns The ISO week
       *
       * @example
       * // Which week of the ISO-week numbering year is 2 January 2005?
       * const result = getISOWeek(new Date(2005, 0, 2))
       * //=> 53
       */
      function getISOWeek(date) {
        const _date = toDate(date);
        const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);

        // Round the number of weeks to the nearest integer because the number of
        // milliseconds in a week is not constant (e.g. it's different in the week of
        // the daylight saving time clock shift).
        return Math.round(diff / millisecondsInWeek) + 1;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_getISOWeek =
        /* unused pure expression or super */ null && getISOWeek; // CONCATENATED MODULE: ./node_modules/date-fns/setISOWeek.mjs

      /**
       * @name setISOWeek
       * @category ISO Week Helpers
       * @summary Set the ISO week to the given date.
       *
       * @description
       * Set the ISO week to the given date, saving the weekday number.
       *
       * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to be changed
       * @param week - The ISO week of the new date
       *
       * @returns The new date with the ISO week set
       *
       * @example
       * // Set the 53rd ISO week to 7 August 2004:
       * const result = setISOWeek(new Date(2004, 7, 7), 53)
       * //=> Sat Jan 01 2005 00:00:00
       */
      function setISOWeek(date, week) {
        const _date = toDate(date);
        const diff = getISOWeek(_date) - week;
        _date.setDate(_date.getDate() - diff * 7);
        return _date;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_setISOWeek =
        /* unused pure expression or super */ null && setISOWeek; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.mjs

      // ISO week of year
      class ISOWeekParser extends Parser {
        priority = 100;

        parse(dateString, token, match) {
          switch (token) {
            case "I":
              return parseNumericPattern(numericPatterns.week, dateString);
            case "Io":
              return match.ordinalNumber(dateString, { unit: "week" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(_date, value) {
          return value >= 1 && value <= 53;
        }

        set(date, _flags, value) {
          return startOfISOWeek(setISOWeek(date, value));
        }

        incompatibleTokens = [
          "y",
          "Y",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/DateParser.mjs

      const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const DAYS_IN_MONTH_LEAP_YEAR = [
        31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
      ];

      // Day of the month
      class DateParser extends Parser {
        priority = 90;
        subPriority = 1;

        parse(dateString, token, match) {
          switch (token) {
            case "d":
              return parseNumericPattern(numericPatterns.date, dateString);
            case "do":
              return match.ordinalNumber(dateString, { unit: "date" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(date, value) {
          const year = date.getFullYear();
          const isLeapYear = isLeapYearIndex(year);
          const month = date.getMonth();
          if (isLeapYear) {
            return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
          } else {
            return value >= 1 && value <= DAYS_IN_MONTH[month];
          }
        }

        set(date, _flags, value) {
          date.setDate(value);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "Y",
          "R",
          "q",
          "Q",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.mjs

      class DayOfYearParser extends Parser {
        priority = 90;

        subpriority = 1;

        parse(dateString, token, match) {
          switch (token) {
            case "D":
            case "DD":
              return parseNumericPattern(numericPatterns.dayOfYear, dateString);
            case "Do":
              return match.ordinalNumber(dateString, { unit: "date" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(date, value) {
          const year = date.getFullYear();
          const isLeapYear = isLeapYearIndex(year);
          if (isLeapYear) {
            return value >= 1 && value <= 366;
          } else {
            return value >= 1 && value <= 365;
          }
        }

        set(date, _flags, value) {
          date.setMonth(0, value);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "Y",
          "R",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "E",
          "i",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/addDays.mjs

      /**
       * @name addDays
       * @category Day Helpers
       * @summary Add the specified number of days to the given date.
       *
       * @description
       * Add the specified number of days to the given date.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to be changed
       * @param amount - The amount of days to be added.
       *
       * @returns The new date with the days added
       *
       * @example
       * // Add 10 days to 1 September 2014:
       * const result = addDays(new Date(2014, 8, 1), 10)
       * //=> Thu Sep 11 2014 00:00:00
       */
      function addDays(date, amount) {
        const _date = toDate(date);
        if (isNaN(amount)) return constructFrom(date, NaN);
        if (!amount) {
          // If 0 days, no-op to avoid changing times in the hour before end of DST
          return _date;
        }
        _date.setDate(_date.getDate() + amount);
        return _date;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_addDays =
        /* unused pure expression or super */ null && addDays; // CONCATENATED MODULE: ./node_modules/date-fns/setDay.mjs

      /**
       * The {@link setDay} function options.
       */

      /**
       * @name setDay
       * @category Weekday Helpers
       * @summary Set the day of the week to the given date.
       *
       * @description
       * Set the day of the week to the given date.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to be changed
       * @param day - The day of the week of the new date
       * @param options - An object with options.
       *
       * @returns The new date with the day of the week set
       *
       * @example
       * // Set week day to Sunday, with the default weekStartsOn of Sunday:
       * const result = setDay(new Date(2014, 8, 1), 0)
       * //=> Sun Aug 31 2014 00:00:00
       *
       * @example
       * // Set week day to Sunday, with a weekStartsOn of Monday:
       * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
       * //=> Sun Sep 07 2014 00:00:00
       */
      function setDay(date, day, options) {
        const defaultOptions = getDefaultOptions();
        const weekStartsOn =
          options?.weekStartsOn ??
          options?.locale?.options?.weekStartsOn ??
          defaultOptions.weekStartsOn ??
          defaultOptions.locale?.options?.weekStartsOn ??
          0;

        const _date = toDate(date);
        const currentDay = _date.getDay();

        const remainder = day % 7;
        const dayIndex = (remainder + 7) % 7;

        const delta = 7 - weekStartsOn;
        const diff =
          day < 0 || day > 6
            ? day - ((currentDay + delta) % 7)
            : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7);
        return addDays(_date, diff);
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_setDay =
        /* unused pure expression or super */ null && setDay; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/DayParser.mjs

      // Day of week
      class DayParser extends Parser {
        priority = 90;

        parse(dateString, token, match) {
          switch (token) {
            // Tue
            case "E":
            case "EE":
            case "EEE":
              return (
                match.day(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            // T
            case "EEEEE":
              return match.day(dateString, {
                width: "narrow",
                context: "formatting",
              });
            // Tu
            case "EEEEEE":
              return (
                match.day(dateString, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            // Tuesday
            case "EEEE":
            default:
              return (
                match.day(dateString, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 6;
        }

        set(date, _flags, value, options) {
          date = setDay(date, value, options);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = ["D", "i", "e", "c", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/LocalDayParser.mjs

      // Local day of week
      class LocalDayParser extends Parser {
        priority = 90;
        parse(dateString, token, match, options) {
          const valueCallback = (value) => {
            // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
            const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
            return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
          };

          switch (token) {
            // 3
            case "e":
            case "ee": // 03
              return mapValue(
                parseNDigits(token.length, dateString),
                valueCallback,
              );
            // 3rd
            case "eo":
              return mapValue(
                match.ordinalNumber(dateString, {
                  unit: "day",
                }),
                valueCallback,
              );
            // Tue
            case "eee":
              return (
                match.day(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            // T
            case "eeeee":
              return match.day(dateString, {
                width: "narrow",
                context: "formatting",
              });
            // Tu
            case "eeeeee":
              return (
                match.day(dateString, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            // Tuesday
            case "eeee":
            default:
              return (
                match.day(dateString, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "short",
                  context: "formatting",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 6;
        }

        set(date, _flags, value, options) {
          date = setDay(date, value, options);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "y",
          "R",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "E",
          "i",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.mjs

      // Stand-alone local day of week
      class StandAloneLocalDayParser extends Parser {
        priority = 90;

        parse(dateString, token, match, options) {
          const valueCallback = (value) => {
            // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
            const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
            return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
          };

          switch (token) {
            // 3
            case "c":
            case "cc": // 03
              return mapValue(
                parseNDigits(token.length, dateString),
                valueCallback,
              );
            // 3rd
            case "co":
              return mapValue(
                match.ordinalNumber(dateString, {
                  unit: "day",
                }),
                valueCallback,
              );
            // Tue
            case "ccc":
              return (
                match.day(dateString, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.day(dateString, {
                  width: "short",
                  context: "standalone",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "standalone",
                })
              );

            // T
            case "ccccc":
              return match.day(dateString, {
                width: "narrow",
                context: "standalone",
              });
            // Tu
            case "cccccc":
              return (
                match.day(dateString, {
                  width: "short",
                  context: "standalone",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "standalone",
                })
              );

            // Tuesday
            case "cccc":
            default:
              return (
                match.day(dateString, {
                  width: "wide",
                  context: "standalone",
                }) ||
                match.day(dateString, {
                  width: "abbreviated",
                  context: "standalone",
                }) ||
                match.day(dateString, {
                  width: "short",
                  context: "standalone",
                }) ||
                match.day(dateString, {
                  width: "narrow",
                  context: "standalone",
                })
              );
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 6;
        }

        set(date, _flags, value, options) {
          date = setDay(date, value, options);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "y",
          "R",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "E",
          "i",
          "e",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/getISODay.mjs

      /**
       * @name getISODay
       * @category Weekday Helpers
       * @summary Get the day of the ISO week of the given date.
       *
       * @description
       * Get the day of the ISO week of the given date,
       * which is 7 for Sunday, 1 for Monday etc.
       *
       * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The given date
       *
       * @returns The day of ISO week
       *
       * @example
       * // Which day of the ISO week is 26 February 2012?
       * const result = getISODay(new Date(2012, 1, 26))
       * //=> 7
       */
      function getISODay(date) {
        const _date = toDate(date);
        let day = _date.getDay();

        if (day === 0) {
          day = 7;
        }

        return day;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_getISODay =
        /* unused pure expression or super */ null && getISODay; // CONCATENATED MODULE: ./node_modules/date-fns/setISODay.mjs

      /**
       * @name setISODay
       * @category Weekday Helpers
       * @summary Set the day of the ISO week to the given date.
       *
       * @description
       * Set the day of the ISO week to the given date.
       * ISO week starts with Monday.
       * 7 is the index of Sunday, 1 is the index of Monday etc.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to be changed
       * @param day - The day of the ISO week of the new date
       *
       * @returns The new date with the day of the ISO week set
       *
       * @example
       * // Set Sunday to 1 September 2014:
       * const result = setISODay(new Date(2014, 8, 1), 7)
       * //=> Sun Sep 07 2014 00:00:00
       */
      function setISODay(date, day) {
        const _date = toDate(date);
        const currentDay = getISODay(_date);
        const diff = day - currentDay;
        return addDays(_date, diff);
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_setISODay =
        /* unused pure expression or super */ null && setISODay; // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/ISODayParser.mjs

      // ISO day of week
      class ISODayParser extends Parser {
        priority = 90;

        parse(dateString, token, match) {
          const valueCallback = (value) => {
            if (value === 0) {
              return 7;
            }
            return value;
          };

          switch (token) {
            // 2
            case "i":
            case "ii": // 02
              return parseNDigits(token.length, dateString);
            // 2nd
            case "io":
              return match.ordinalNumber(dateString, { unit: "day" });
            // Tue
            case "iii":
              return mapValue(
                match.day(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                  match.day(dateString, {
                    width: "short",
                    context: "formatting",
                  }) ||
                  match.day(dateString, {
                    width: "narrow",
                    context: "formatting",
                  }),
                valueCallback,
              );
            // T
            case "iiiii":
              return mapValue(
                match.day(dateString, {
                  width: "narrow",
                  context: "formatting",
                }),
                valueCallback,
              );
            // Tu
            case "iiiiii":
              return mapValue(
                match.day(dateString, {
                  width: "short",
                  context: "formatting",
                }) ||
                  match.day(dateString, {
                    width: "narrow",
                    context: "formatting",
                  }),
                valueCallback,
              );
            // Tuesday
            case "iiii":
            default:
              return mapValue(
                match.day(dateString, {
                  width: "wide",
                  context: "formatting",
                }) ||
                  match.day(dateString, {
                    width: "abbreviated",
                    context: "formatting",
                  }) ||
                  match.day(dateString, {
                    width: "short",
                    context: "formatting",
                  }) ||
                  match.day(dateString, {
                    width: "narrow",
                    context: "formatting",
                  }),
                valueCallback,
              );
          }
        }

        validate(_date, value) {
          return value >= 1 && value <= 7;
        }

        set(date, _flags, value) {
          date = setISODay(date, value);
          date.setHours(0, 0, 0, 0);
          return date;
        }

        incompatibleTokens = [
          "y",
          "Y",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "E",
          "e",
          "c",
          "t",
          "T",
        ];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/AMPMParser.mjs

      class AMPMParser extends Parser {
        priority = 80;

        parse(dateString, token, match) {
          switch (token) {
            case "a":
            case "aa":
            case "aaa":
              return (
                match.dayPeriod(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            case "aaaaa":
              return match.dayPeriod(dateString, {
                width: "narrow",
                context: "formatting",
              });
            case "aaaa":
            default:
              return (
                match.dayPeriod(dateString, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        }

        set(date, _flags, value) {
          date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
          return date;
        }

        incompatibleTokens = ["b", "B", "H", "k", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.mjs

      class AMPMMidnightParser extends Parser {
        priority = 80;

        parse(dateString, token, match) {
          switch (token) {
            case "b":
            case "bb":
            case "bbb":
              return (
                match.dayPeriod(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            case "bbbbb":
              return match.dayPeriod(dateString, {
                width: "narrow",
                context: "formatting",
              });
            case "bbbb":
            default:
              return (
                match.dayPeriod(dateString, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        }

        set(date, _flags, value) {
          date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
          return date;
        }

        incompatibleTokens = ["a", "B", "H", "k", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.mjs

      // in the morning, in the afternoon, in the evening, at night
      class DayPeriodParser extends Parser {
        priority = 80;

        parse(dateString, token, match) {
          switch (token) {
            case "B":
            case "BB":
            case "BBB":
              return (
                match.dayPeriod(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );

            case "BBBBB":
              return match.dayPeriod(dateString, {
                width: "narrow",
                context: "formatting",
              });
            case "BBBB":
            default:
              return (
                match.dayPeriod(dateString, {
                  width: "wide",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "abbreviated",
                  context: "formatting",
                }) ||
                match.dayPeriod(dateString, {
                  width: "narrow",
                  context: "formatting",
                })
              );
          }
        }

        set(date, _flags, value) {
          date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
          return date;
        }

        incompatibleTokens = ["a", "b", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.mjs

      class Hour1to12Parser extends Parser {
        priority = 70;

        parse(dateString, token, match) {
          switch (token) {
            case "h":
              return parseNumericPattern(numericPatterns.hour12h, dateString);
            case "ho":
              return match.ordinalNumber(dateString, { unit: "hour" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(_date, value) {
          return value >= 1 && value <= 12;
        }

        set(date, _flags, value) {
          const isPM = date.getHours() >= 12;
          if (isPM && value < 12) {
            date.setHours(value + 12, 0, 0, 0);
          } else if (!isPM && value === 12) {
            date.setHours(0, 0, 0, 0);
          } else {
            date.setHours(value, 0, 0, 0);
          }
          return date;
        }

        incompatibleTokens = ["H", "K", "k", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.mjs

      class Hour0to23Parser extends Parser {
        priority = 70;

        parse(dateString, token, match) {
          switch (token) {
            case "H":
              return parseNumericPattern(numericPatterns.hour23h, dateString);
            case "Ho":
              return match.ordinalNumber(dateString, { unit: "hour" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 23;
        }

        set(date, _flags, value) {
          date.setHours(value, 0, 0, 0);
          return date;
        }

        incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.mjs

      class Hour0To11Parser extends Parser {
        priority = 70;

        parse(dateString, token, match) {
          switch (token) {
            case "K":
              return parseNumericPattern(numericPatterns.hour11h, dateString);
            case "Ko":
              return match.ordinalNumber(dateString, { unit: "hour" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 11;
        }

        set(date, _flags, value) {
          const isPM = date.getHours() >= 12;
          if (isPM && value < 12) {
            date.setHours(value + 12, 0, 0, 0);
          } else {
            date.setHours(value, 0, 0, 0);
          }
          return date;
        }

        incompatibleTokens = ["h", "H", "k", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.mjs

      class Hour1To24Parser extends Parser {
        priority = 70;

        parse(dateString, token, match) {
          switch (token) {
            case "k":
              return parseNumericPattern(numericPatterns.hour24h, dateString);
            case "ko":
              return match.ordinalNumber(dateString, { unit: "hour" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(_date, value) {
          return value >= 1 && value <= 24;
        }

        set(date, _flags, value) {
          const hours = value <= 24 ? value % 24 : value;
          date.setHours(hours, 0, 0, 0);
          return date;
        }

        incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/MinuteParser.mjs

      class MinuteParser extends Parser {
        priority = 60;

        parse(dateString, token, match) {
          switch (token) {
            case "m":
              return parseNumericPattern(numericPatterns.minute, dateString);
            case "mo":
              return match.ordinalNumber(dateString, { unit: "minute" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 59;
        }

        set(date, _flags, value) {
          date.setMinutes(value, 0, 0);
          return date;
        }

        incompatibleTokens = ["t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/SecondParser.mjs

      class SecondParser extends Parser {
        priority = 50;

        parse(dateString, token, match) {
          switch (token) {
            case "s":
              return parseNumericPattern(numericPatterns.second, dateString);
            case "so":
              return match.ordinalNumber(dateString, { unit: "second" });
            default:
              return parseNDigits(token.length, dateString);
          }
        }

        validate(_date, value) {
          return value >= 0 && value <= 59;
        }

        set(date, _flags, value) {
          date.setSeconds(value, 0);
          return date;
        }

        incompatibleTokens = ["t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.mjs

      class FractionOfSecondParser extends Parser {
        priority = 30;

        parse(dateString, token) {
          const valueCallback = (value) =>
            Math.trunc(value * Math.pow(10, -token.length + 3));
          return mapValue(
            parseNDigits(token.length, dateString),
            valueCallback,
          );
        }

        set(date, _flags, value) {
          date.setMilliseconds(value);
          return date;
        }

        incompatibleTokens = ["t", "T"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs

      /**
       * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
       * They usually appear for dates that denote time before the timezones were introduced
       * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
       * and GMT+01:00:00 after that date)
       *
       * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
       * which would lead to incorrect calculations.
       *
       * This function returns the timezone offset in milliseconds that takes seconds in account.
       */
      function getTimezoneOffsetInMilliseconds(date) {
        const _date = toDate(date);
        const utcDate = new Date(
          Date.UTC(
            _date.getFullYear(),
            _date.getMonth(),
            _date.getDate(),
            _date.getHours(),
            _date.getMinutes(),
            _date.getSeconds(),
            _date.getMilliseconds(),
          ),
        );
        utcDate.setUTCFullYear(_date.getFullYear());
        return +date - +utcDate;
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.mjs

      // Timezone (ISO-8601. +00:00 is `'Z'`)
      class ISOTimezoneWithZParser extends Parser {
        priority = 10;

        parse(dateString, token) {
          switch (token) {
            case "X":
              return parseTimezonePattern(
                timezonePatterns.basicOptionalMinutes,
                dateString,
              );
            case "XX":
              return parseTimezonePattern(timezonePatterns.basic, dateString);
            case "XXXX":
              return parseTimezonePattern(
                timezonePatterns.basicOptionalSeconds,
                dateString,
              );
            case "XXXXX":
              return parseTimezonePattern(
                timezonePatterns.extendedOptionalSeconds,
                dateString,
              );
            case "XXX":
            default:
              return parseTimezonePattern(
                timezonePatterns.extended,
                dateString,
              );
          }
        }

        set(date, flags, value) {
          if (flags.timestampIsSet) return date;
          return constructFrom(
            date,
            date.getTime() - getTimezoneOffsetInMilliseconds(date) - value,
          );
        }

        incompatibleTokens = ["t", "T", "x"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.mjs

      // Timezone (ISO-8601)
      class ISOTimezoneParser extends Parser {
        priority = 10;

        parse(dateString, token) {
          switch (token) {
            case "x":
              return parseTimezonePattern(
                timezonePatterns.basicOptionalMinutes,
                dateString,
              );
            case "xx":
              return parseTimezonePattern(timezonePatterns.basic, dateString);
            case "xxxx":
              return parseTimezonePattern(
                timezonePatterns.basicOptionalSeconds,
                dateString,
              );
            case "xxxxx":
              return parseTimezonePattern(
                timezonePatterns.extendedOptionalSeconds,
                dateString,
              );
            case "xxx":
            default:
              return parseTimezonePattern(
                timezonePatterns.extended,
                dateString,
              );
          }
        }

        set(date, flags, value) {
          if (flags.timestampIsSet) return date;
          return constructFrom(
            date,
            date.getTime() - getTimezoneOffsetInMilliseconds(date) - value,
          );
        }

        incompatibleTokens = ["t", "T", "X"];
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.mjs

      class TimestampSecondsParser extends Parser {
        priority = 40;

        parse(dateString) {
          return parseAnyDigitsSigned(dateString);
        }

        set(date, _flags, value) {
          return [constructFrom(date, value * 1000), { timestampIsSet: true }];
        }

        incompatibleTokens = "*";
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.mjs

      class TimestampMillisecondsParser extends Parser {
        priority = 20;

        parse(dateString) {
          return parseAnyDigitsSigned(dateString);
        }

        set(date, _flags, value) {
          return [constructFrom(date, value), { timestampIsSet: true }];
        }

        incompatibleTokens = "*";
      } // CONCATENATED MODULE: ./node_modules/date-fns/parse/_lib/parsers.mjs

      /*
       * |     | Unit                           |     | Unit                           |
       * |-----|--------------------------------|-----|--------------------------------|
       * |  a  | AM, PM                         |  A* | Milliseconds in day            |
       * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
       * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
       * |  d  | Day of month                   |  D  | Day of year                    |
       * |  e  | Local day of week              |  E  | Day of week                    |
       * |  f  |                                |  F* | Day of week in month           |
       * |  g* | Modified Julian day            |  G  | Era                            |
       * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
       * |  i! | ISO day of week                |  I! | ISO week of year               |
       * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
       * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
       * |  l* | (deprecated)                   |  L  | Stand-alone month              |
       * |  m  | Minute                         |  M  | Month                          |
       * |  n  |                                |  N  |                                |
       * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
       * |  p  |                                |  P  |                                |
       * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
       * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
       * |  s  | Second                         |  S  | Fraction of second             |
       * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
       * |  u  | Extended year                  |  U* | Cyclic year                    |
       * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
       * |  w  | Local week of year             |  W* | Week of month                  |
       * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
       * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
       * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
       *
       * Letters marked by * are not implemented but reserved by Unicode standard.
       *
       * Letters marked by ! are non-standard, but implemented by date-fns:
       * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
       * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
       *   i.e. 7 for Sunday, 1 for Monday, etc.
       * - `I` is ISO week of year, as opposed to `w` which is local week of year.
       * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
       *   `R` is supposed to be used in conjunction with `I` and `i`
       *   for universal ISO week-numbering date, whereas
       *   `Y` is supposed to be used in conjunction with `w` and `e`
       *   for week-numbering date specific to the locale.
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- It's ok, we want any here
      const parsers = {
        G: new EraParser(),
        y: new YearParser(),
        Y: new LocalWeekYearParser(),
        R: new ISOWeekYearParser(),
        u: new ExtendedYearParser(),
        Q: new QuarterParser(),
        q: new StandAloneQuarterParser(),
        M: new MonthParser(),
        L: new StandAloneMonthParser(),
        w: new LocalWeekParser(),
        I: new ISOWeekParser(),
        d: new DateParser(),
        D: new DayOfYearParser(),
        E: new DayParser(),
        e: new LocalDayParser(),
        c: new StandAloneLocalDayParser(),
        i: new ISODayParser(),
        a: new AMPMParser(),
        b: new AMPMMidnightParser(),
        B: new DayPeriodParser(),
        h: new Hour1to12Parser(),
        H: new Hour0to23Parser(),
        K: new Hour0To11Parser(),
        k: new Hour1To24Parser(),
        m: new MinuteParser(),
        s: new SecondParser(),
        S: new FractionOfSecondParser(),
        X: new ISOTimezoneWithZParser(),
        x: new ISOTimezoneParser(),
        t: new TimestampSecondsParser(),
        T: new TimestampMillisecondsParser(),
      }; // CONCATENATED MODULE: ./node_modules/date-fns/parse.mjs

      // Rexports of internal for libraries to use.
      // See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

      /**
       * The {@link parse} function options.
       */

      // This RegExp consists of three parts separated by `|`:
      // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
      //   (one of the certain letters followed by `o`)
      // - (\w)\1* matches any sequences of the same letter
      // - '' matches two quote characters in a row
      // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
      //   except a single quote symbol, which ends the sequence.
      //   Two quote characters do not end the sequence.
      //   If there is no matching single quote
      //   then the sequence will continue until the end of the string.
      // - . matches any single character unmatched by previous parts of the RegExps
      const formattingTokensRegExp =
        /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

      // This RegExp catches symbols escaped by quotes, and also
      // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
      const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

      const escapedStringRegExp = /^'([^]*?)'?$/;
      const doubleQuoteRegExp = /''/g;

      const notWhitespaceRegExp = /\S/;
      const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

      /**
       * @name parse
       * @category Common Helpers
       * @summary Parse the date.
       *
       * @description
       * Return the date parsed from string using the given format string.
       *
       * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
       * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       *
       * The characters in the format string wrapped between two single quotes characters (') are escaped.
       * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
       *
       * Format of the format string is based on Unicode Technical Standard #35:
       * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
       * with a few additions (see note 5 below the table).
       *
       * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
       * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
       *
       * ```javascript
       * parse('23 AM', 'HH a', new Date())
       * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
       * ```
       *
       * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
       *
       * Accepted format string patterns:
       * | Unit                            |Prior| Pattern | Result examples                   | Notes |
       * |---------------------------------|-----|---------|-----------------------------------|-------|
       * | Era                             | 140 | G..GGG  | AD, BC                            |       |
       * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
       * |                                 |     | GGGGG   | A, B                              |       |
       * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
       * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
       * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
       * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
       * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
       * |                                 |     | yyyyy   | ...                               | 2,4   |
       * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
       * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
       * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
       * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
       * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
       * |                                 |     | YYYYY   | ...                               | 2,4   |
       * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
       * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
       * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
       * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
       * |                                 |     | RRRRR   | ...                               | 2,4,5 |
       * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
       * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
       * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
       * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
       * |                                 |     | uuuuu   | ...                               | 2,4   |
       * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
       * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
       * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
       * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
       * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
       * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
       * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
       * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
       * |                                 |     | qq      | 01, 02, 03, 04                    |       |
       * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
       * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
       * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
       * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
       * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
       * |                                 |     | MM      | 01, 02, ..., 12                   |       |
       * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
       * |                                 |     | MMMM    | January, February, ..., December  | 2     |
       * |                                 |     | MMMMM   | J, F, ..., D                      |       |
       * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
       * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
       * |                                 |     | LL      | 01, 02, ..., 12                   |       |
       * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
       * |                                 |     | LLLL    | January, February, ..., December  | 2     |
       * |                                 |     | LLLLL   | J, F, ..., D                      |       |
       * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
       * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
       * |                                 |     | ww      | 01, 02, ..., 53                   |       |
       * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
       * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
       * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
       * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
       * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
       * |                                 |     | dd      | 01, 02, ..., 31                   |       |
       * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
       * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
       * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
       * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
       * |                                 |     | DDDD    | ...                               | 2     |
       * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
       * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
       * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
       * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
       * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
       * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
       * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
       * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
       * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
       * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
       * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
       * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
       * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
       * |                                 |     | ee      | 02, 03, ..., 01                   |       |
       * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
       * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
       * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
       * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
       * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
       * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
       * |                                 |     | cc      | 02, 03, ..., 01                   |       |
       * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
       * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
       * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
       * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
       * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
       * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
       * |                                 |     | aaaaa   | a, p                              |       |
       * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
       * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
       * |                                 |     | bbbbb   | a, p, n, mi                       |       |
       * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
       * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
       * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
       * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
       * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
       * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
       * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
       * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
       * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
       * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
       * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
       * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
       * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
       * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
       * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
       * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
       * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
       * |                                 |     | mm      | 00, 01, ..., 59                   |       |
       * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
       * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
       * |                                 |     | ss      | 00, 01, ..., 59                   |       |
       * | Seconds timestamp               |  40 | t       | 512969520                         |       |
       * |                                 |     | tt      | ...                               | 2     |
       * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
       * |                                 |     | SS      | 00, 01, ..., 99                   |       |
       * |                                 |     | SSS     | 000, 001, ..., 999                |       |
       * |                                 |     | SSSS    | ...                               | 2     |
       * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
       * |                                 |     | TT      | ...                               | 2     |
       * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
       * |                                 |     | XX      | -0800, +0530, Z                   |       |
       * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
       * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
       * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
       * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
       * |                                 |     | xx      | -0800, +0530, +0000               |       |
       * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
       * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
       * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
       * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
       * |                                 |     | PP      | May 29, 1453                      |       |
       * |                                 |     | PPP     | May 29th, 1453                    |       |
       * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
       * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
       * |                                 |     | pp      | 12:00:00 AM                       |       |
       * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
       * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
       * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
       * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
       * Notes:
       * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
       *    are the same as "stand-alone" units, but are different in some languages.
       *    "Formatting" units are declined according to the rules of the language
       *    in the context of a date. "Stand-alone" units are always nominative singular.
       *    In `format` function, they will produce different result:
       *
       *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
       *
       *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
       *
       *    `parse` will try to match both formatting and stand-alone units interchangably.
       *
       * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
       *    the single quote characters (see below).
       *    If the sequence is longer than listed in table:
       *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
       *      as wide as the sequence
       *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
       *      These variations are marked with "2" in the last column of the table.
       *
       * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
       *    These tokens represent the shortest form of the quarter.
       *
       * 4. The main difference between `y` and `u` patterns are B.C. years:
       *
       *    | Year | `y` | `u` |
       *    |------|-----|-----|
       *    | AC 1 |   1 |   1 |
       *    | BC 1 |   1 |   0 |
       *    | BC 2 |   2 |  -1 |
       *
       *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
       *
       *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
       *
       *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
       *
       *    while `uu` will just assign the year as is:
       *
       *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
       *
       *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
       *
       *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
       *    except local week-numbering years are dependent on `options.weekStartsOn`
       *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
       *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
       *
       * 5. These patterns are not in the Unicode Technical Standard #35:
       *    - `i`: ISO day of week
       *    - `I`: ISO week of year
       *    - `R`: ISO week-numbering year
       *    - `o`: ordinal number modifier
       *    - `P`: long localized date
       *    - `p`: long localized time
       *
       * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
       *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       *
       * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
       *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       *
       * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
       *    on the given locale.
       *
       *    using `en-US` locale: `P` => `MM/dd/yyyy`
       *    using `en-US` locale: `p` => `hh:mm a`
       *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
       *    using `pt-BR` locale: `p` => `HH:mm`
       *
       * Values will be assigned to the date in the descending order of its unit's priority.
       * Units of an equal priority overwrite each other in the order of appearance.
       *
       * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
       * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
       *
       * `referenceDate` must be passed for correct work of the function.
       * If you're not sure which `referenceDate` to supply, create a new instance of Date:
       * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
       * In this case parsing will be done in the context of the current date.
       * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
       * then `Invalid Date` will be returned.
       *
       * The result may vary by locale.
       *
       * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
       *
       * If parsing failed, `Invalid Date` will be returned.
       * Invalid Date is a Date, whose time value is NaN.
       * Time value of Date: http://es5.github.io/#x15.9.1.1
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param dateStr - The string to parse
       * @param formatStr - The string of tokens
       * @param referenceDate - defines values missing from the parsed dateString
       * @param options - An object with options.
       *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       *
       * @returns The parsed date
       *
       * @throws `options.locale` must contain `match` property
       * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       * @throws format string contains an unescaped latin alphabet character
       *
       * @example
       * // Parse 11 February 2014 from middle-endian format:
       * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
       * //=> Tue Feb 11 2014 00:00:00
       *
       * @example
       * // Parse 28th of February in Esperanto locale in the context of 2010 year:
       * import eo from 'date-fns/locale/eo'
       * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
       *   locale: eo
       * })
       * //=> Sun Feb 28 2010 00:00:00
       */
      function parse(dateStr, formatStr, referenceDate, options) {
        const defaultOptions = getDefaultOptions_getDefaultOptions();
        const locale = options?.locale ?? defaultOptions.locale ?? enUS;

        const firstWeekContainsDate =
          options?.firstWeekContainsDate ??
          options?.locale?.options?.firstWeekContainsDate ??
          defaultOptions.firstWeekContainsDate ??
          defaultOptions.locale?.options?.firstWeekContainsDate ??
          1;

        const weekStartsOn =
          options?.weekStartsOn ??
          options?.locale?.options?.weekStartsOn ??
          defaultOptions.weekStartsOn ??
          defaultOptions.locale?.options?.weekStartsOn ??
          0;

        if (formatStr === "") {
          if (dateStr === "") {
            return toDate(referenceDate);
          } else {
            return constructFrom(referenceDate, NaN);
          }
        }

        const subFnOptions = {
          firstWeekContainsDate,
          weekStartsOn,
          locale,
        };

        // If timezone isn't specified, it will be set to the system timezone
        const setters = [new DateToSystemTimezoneSetter()];

        const tokens = formatStr
          .match(longFormattingTokensRegExp)
          .map((substring) => {
            const firstCharacter = substring[0];
            if (firstCharacter in longFormatters) {
              const longFormatter = longFormatters[firstCharacter];
              return longFormatter(substring, locale.formatLong);
            }
            return substring;
          })
          .join("")
          .match(formattingTokensRegExp);

        const usedTokens = [];

        for (let token of tokens) {
          if (
            !options?.useAdditionalWeekYearTokens &&
            isProtectedWeekYearToken(token)
          ) {
            warnOrThrowProtectedError(token, formatStr, dateStr);
          }
          if (
            !options?.useAdditionalDayOfYearTokens &&
            isProtectedDayOfYearToken(token)
          ) {
            warnOrThrowProtectedError(token, formatStr, dateStr);
          }

          const firstCharacter = token[0];
          const parser = parsers[firstCharacter];
          if (parser) {
            const { incompatibleTokens } = parser;
            if (Array.isArray(incompatibleTokens)) {
              const incompatibleToken = usedTokens.find(
                (usedToken) =>
                  incompatibleTokens.includes(usedToken.token) ||
                  usedToken.token === firstCharacter,
              );
              if (incompatibleToken) {
                throw new RangeError(
                  `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`,
                );
              }
            } else if (
              parser.incompatibleTokens === "*" &&
              usedTokens.length > 0
            ) {
              throw new RangeError(
                `The format string mustn't contain \`${token}\` and any other token at the same time`,
              );
            }

            usedTokens.push({ token: firstCharacter, fullToken: token });

            const parseResult = parser.run(
              dateStr,
              token,
              locale.match,
              subFnOptions,
            );

            if (!parseResult) {
              return constructFrom(referenceDate, NaN);
            }

            setters.push(parseResult.setter);

            dateStr = parseResult.rest;
          } else {
            if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
              throw new RangeError(
                "Format string contains an unescaped latin alphabet character `" +
                  firstCharacter +
                  "`",
              );
            }

            // Replace two single quote characters with one single quote character
            if (token === "''") {
              token = "'";
            } else if (firstCharacter === "'") {
              token = cleanEscapedString(token);
            }

            // Cut token from string, or, if string doesn't match the token, return Invalid Date
            if (dateStr.indexOf(token) === 0) {
              dateStr = dateStr.slice(token.length);
            } else {
              return constructFrom(referenceDate, NaN);
            }
          }
        }

        // Check if the remaining input contains something other than whitespace
        if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
          return constructFrom(referenceDate, NaN);
        }

        const uniquePrioritySetters = setters
          .map((setter) => setter.priority)
          .sort((a, b) => b - a)
          .filter((priority, index, array) => array.indexOf(priority) === index)
          .map((priority) =>
            setters
              .filter((setter) => setter.priority === priority)
              .sort((a, b) => b.subPriority - a.subPriority),
          )
          .map((setterArray) => setterArray[0]);

        let date = toDate(referenceDate);

        if (isNaN(date.getTime())) {
          return constructFrom(referenceDate, NaN);
        }

        const flags = {};
        for (const setter of uniquePrioritySetters) {
          if (!setter.validate(date, subFnOptions)) {
            return constructFrom(referenceDate, NaN);
          }

          const result = setter.set(date, flags, subFnOptions);
          // Result is tuple (date, flags)
          if (Array.isArray(result)) {
            date = result[0];
            Object.assign(flags, result[1]);
            // Result is date
          } else {
            date = result;
          }
        }

        return constructFrom(referenceDate, date);
      }

      function cleanEscapedString(input) {
        return input
          .match(escapedStringRegExp)[1]
          .replace(doubleQuoteRegExp, "'");
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_parse =
        /* unused pure expression or super */ null && parse; // CONCATENATED MODULE: ./node_modules/date-fns/startOfDay.mjs

      /**
       * @name startOfDay
       * @category Day Helpers
       * @summary Return the start of a day for the given date.
       *
       * @description
       * Return the start of a day for the given date.
       * The result will be in the local timezone.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The original date
       *
       * @returns The start of a day
       *
       * @example
       * // The start of a day for 2 September 2014 11:55:00:
       * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
       * //=> Tue Sep 02 2014 00:00:00
       */
      function startOfDay(date) {
        const _date = toDate(date);
        _date.setHours(0, 0, 0, 0);
        return _date;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_startOfDay =
        /* unused pure expression or super */ null && startOfDay; // CONCATENATED MODULE: ./node_modules/date-fns/isWithinInterval.mjs

      /**
       * @name isWithinInterval
       * @category Interval Helpers
       * @summary Is the given date within the interval?
       *
       * @description
       * Is the given date within the interval? (Including start and end.)
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to check
       * @param interval - The interval to check
       *
       * @returns The date is within the interval
       *
       * @example
       * // For the date within the interval:
       * isWithinInterval(new Date(2014, 0, 3), {
       *   start: new Date(2014, 0, 1),
       *   end: new Date(2014, 0, 7)
       * })
       * //=> true
       *
       * @example
       * // For the date outside of the interval:
       * isWithinInterval(new Date(2014, 0, 10), {
       *   start: new Date(2014, 0, 1),
       *   end: new Date(2014, 0, 7)
       * })
       * //=> false
       *
       * @example
       * // For date equal to interval start:
       * isWithinInterval(date, { start, end: date })
       * // => true
       *
       * @example
       * // For date equal to interval end:
       * isWithinInterval(date, { start: date, end })
       * // => true
       */
      function isWithinInterval(date, interval) {
        const time = +toDate(date);
        const [startTime, endTime] = [
          +toDate(interval.start),
          +toDate(interval.end),
        ].sort((a, b) => a - b);

        return time >= startTime && time <= endTime;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_isWithinInterval =
        /* unused pure expression or super */ null && isWithinInterval; // CONCATENATED MODULE: ./src/utility.js

      function generateUniqueId() {
        return esm_browser_v4();
      }

      function isDate(date) {
        // console.log(`isDate: ${date instanceof Date && !isNaN(date)}`)
        return date instanceof Date && !isNaN(date);
      }

      function makeNewDate(dateString) {
        if (dateString) {
          if (dateString.length === 10) {
            const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
            return startOfDay(parsedDate);
          } else {
            return startOfDay(new Date(dateString));
          }
        } else {
          return startOfDay(new Date());
        }
      }

      function makeFutureDate(daysToAdd) {
        const currentDate = makeNewDate();
        const futureDate = addDays(currentDate, daysToAdd);
        return futureDate;
      }

      function isWithinOneWeek(dueDate, currentDate) {
        return isWithinInterval(dueDate, {
          start: currentDate,
          end: makeFutureDate(7),
        });
      } // CONCATENATED MODULE: ./src/TodoLogic.js
      class TodoItem {
        constructor({ name, desc, project, priority, dueDate, complete }) {
          this.id = generateUniqueId();
          this.name = name;
          this.desc = desc;
          this.project = project;
          this.priority = priority;
          this.dueDate = isDate(dueDate) ? dueDate : makeNewDate(dueDate);
          this.complete = complete || false;
        }

        toggleComplete() {
          this.complete = !this.complete;
        }
      }

      class TodoLogic {
        constructor() {
          this.todoList = [];
        }

        getTodos() {
          return this.todoList;
        }

        clearTodos() {
          this.todoList = [];
          this.saveToLocal();
        }

        isTodoListEmpty() {
          return this.todoList.length === 0;
        }

        createTodo(todoData) {
          const newTodo = new TodoItem(todoData);
          this.todoList.push(newTodo);
          this.saveToLocal();
          return newTodo;
        }

        deleteTodo(todoId) {
          const index = this.todoList.findIndex((todo) => todo.id === todoId);
          if (index !== -1) {
            this.todoList.splice(index, 1);
            this.saveToLocal();
          }
        }

        getTodoById(todoId) {
          const todo = this.todoList.find((todo) => todo.id === todoId);
          if (todo) {
            return todo;
          }
        }

        updateTodo(todoId, todoData) {
          const todo = this.todoList.find((todo) => todo.id === todoId);
          if (todo) {
            todo.name = todoData.name;
            todo.desc = todoData.desc;
            todo.project = todoData.project;
            todo.priority = todoData.priority;
            todo.dueDate = makeNewDate(todoData.dueDate);

            this.saveToLocal();
          }
        }

        todoItemToggleComplete(todoId) {
          const todo = this.todoList.find((todo) => todo.id === todoId);
          if (todo) {
            todo.toggleComplete();
            this.saveToLocal();
          }
        }

        saveToLocal() {
          localStorage.setItem("todoList", JSON.stringify(this.todoList));
        }
      } // CONCATENATED MODULE: ./src/ProjectLogic.js
      class ProjectLogic {
        constructor() {
          this.projectList = [];
        }

        getProjects() {
          return this.projectList;
        }

        clearProjects() {
          this.projectList = [];
          this.saveToLocal();
        }

        createProject(title) {
          if (!this.projectList.includes(title)) {
            this.projectList.push(title);
            this.saveToLocal();
          }
        }

        deleteProject(title) {
          const index = this.projectList.findIndex(
            (project) => project === title,
          );
          if (index !== -1) {
            this.projectList.splice(index, 1);
            this.saveToLocal();
          }
        }

        updateProject(title, newTitle) {
          const index = this.projectList.findIndex(
            (project) => project === title,
          );
          if (index !== -1) {
            this.projectList[index] = newTitle;
            this.saveToLocal();
          }
        }

        saveToLocal() {
          localStorage.setItem("projectList", JSON.stringify(this.projectList));
        }
      } // CONCATENATED MODULE: ./node_modules/date-fns/differenceInCalendarDays.mjs
      /**
       * @name differenceInCalendarDays
       * @category Day Helpers
       * @summary Get the number of calendar days between the given dates.
       *
       * @description
       * Get the number of calendar days between the given dates. This means that the times are removed
       * from the dates and then the difference in days is calculated.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param dateLeft - The later date
       * @param dateRight - The earlier date
       *
       * @returns The number of calendar days
       *
       * @example
       * // How many calendar days are between
       * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
       * const result = differenceInCalendarDays(
       *   new Date(2012, 6, 2, 0, 0),
       *   new Date(2011, 6, 2, 23, 0)
       * )
       * //=> 366
       * // How many calendar days are between
       * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
       * const result = differenceInCalendarDays(
       *   new Date(2011, 6, 3, 0, 1),
       *   new Date(2011, 6, 2, 23, 59)
       * )
       * //=> 1
       */
      function differenceInCalendarDays(dateLeft, dateRight) {
        const startOfDayLeft = startOfDay(dateLeft);
        const startOfDayRight = startOfDay(dateRight);

        const timestampLeft =
          +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
        const timestampRight =
          +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);

        // Round the number of days to the nearest integer because the number of
        // milliseconds in a day is not constant (e.g. it's different in the week of
        // the daylight saving time clock shift).
        return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_differenceInCalendarDays =
        /* unused pure expression or super */ null && differenceInCalendarDays; // CONCATENATED MODULE: ./node_modules/date-fns/startOfYear.mjs

      /**
       * @name startOfYear
       * @category Year Helpers
       * @summary Return the start of a year for the given date.
       *
       * @description
       * Return the start of a year for the given date.
       * The result will be in the local timezone.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The original date
       *
       * @returns The start of a year
       *
       * @example
       * // The start of a year for 2 September 2014 11:55:00:
       * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
       * //=> Wed Jan 01 2014 00:00:00
       */
      function startOfYear(date) {
        const cleanDate = toDate(date);
        const _date = constructFrom(date, 0);
        _date.setFullYear(cleanDate.getFullYear(), 0, 1);
        _date.setHours(0, 0, 0, 0);
        return _date;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_startOfYear =
        /* unused pure expression or super */ null && startOfYear; // CONCATENATED MODULE: ./node_modules/date-fns/getDayOfYear.mjs

      /**
       * @name getDayOfYear
       * @category Day Helpers
       * @summary Get the day of the year of the given date.
       *
       * @description
       * Get the day of the year of the given date.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The given date
       *
       * @returns The day of year
       *
       * @example
       * // Which day of the year is 2 July 2014?
       * const result = getDayOfYear(new Date(2014, 6, 2))
       * //=> 183
       */
      function getDayOfYear(date) {
        const _date = toDate(date);
        const diff = differenceInCalendarDays(_date, startOfYear(_date));
        const dayOfYear = diff + 1;
        return dayOfYear;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_getDayOfYear =
        /* unused pure expression or super */ null && getDayOfYear; // CONCATENATED MODULE: ./node_modules/date-fns/_lib/addLeadingZeros.mjs

      function addLeadingZeros(number, targetLength) {
        const sign = number < 0 ? "-" : "";
        const output = Math.abs(number).toString().padStart(targetLength, "0");
        return sign + output;
      } // CONCATENATED MODULE: ./node_modules/date-fns/_lib/format/lightFormatters.mjs

      /*
       * |     | Unit                           |     | Unit                           |
       * |-----|--------------------------------|-----|--------------------------------|
       * |  a  | AM, PM                         |  A* |                                |
       * |  d  | Day of month                   |  D  |                                |
       * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
       * |  m  | Minute                         |  M  | Month                          |
       * |  s  | Second                         |  S  | Fraction of second             |
       * |  y  | Year (abs)                     |  Y  |                                |
       *
       * Letters marked by * are not implemented but reserved by Unicode standard.
       */

      const lightFormatters = {
        // Year
        y(date, token) {
          // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
          // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
          // |----------|-------|----|-------|-------|-------|
          // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
          // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
          // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
          // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
          // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

          const signedYear = date.getFullYear();
          // Returns 1 for 1 BC (which is year 0 in JavaScript)
          const year = signedYear > 0 ? signedYear : 1 - signedYear;
          return addLeadingZeros(
            token === "yy" ? year % 100 : year,
            token.length,
          );
        },

        // Month
        M(date, token) {
          const month = date.getMonth();
          return token === "M"
            ? String(month + 1)
            : addLeadingZeros(month + 1, 2);
        },

        // Day of the month
        d(date, token) {
          return addLeadingZeros(date.getDate(), token.length);
        },

        // AM or PM
        a(date, token) {
          const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

          switch (token) {
            case "a":
            case "aa":
              return dayPeriodEnumValue.toUpperCase();
            case "aaa":
              return dayPeriodEnumValue;
            case "aaaaa":
              return dayPeriodEnumValue[0];
            case "aaaa":
            default:
              return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
          }
        },

        // Hour [1-12]
        h(date, token) {
          return addLeadingZeros(date.getHours() % 12 || 12, token.length);
        },

        // Hour [0-23]
        H(date, token) {
          return addLeadingZeros(date.getHours(), token.length);
        },

        // Minute
        m(date, token) {
          return addLeadingZeros(date.getMinutes(), token.length);
        },

        // Second
        s(date, token) {
          return addLeadingZeros(date.getSeconds(), token.length);
        },

        // Fraction of second
        S(date, token) {
          const numberOfDigits = token.length;
          const milliseconds = date.getMilliseconds();
          const fractionalSeconds = Math.trunc(
            milliseconds * Math.pow(10, numberOfDigits - 3),
          );
          return addLeadingZeros(fractionalSeconds, token.length);
        },
      }; // CONCATENATED MODULE: ./node_modules/date-fns/_lib/format/formatters.mjs

      const dayPeriodEnum = {
        am: "am",
        pm: "pm",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      };

      /*
       * |     | Unit                           |     | Unit                           |
       * |-----|--------------------------------|-----|--------------------------------|
       * |  a  | AM, PM                         |  A* | Milliseconds in day            |
       * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
       * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
       * |  d  | Day of month                   |  D  | Day of year                    |
       * |  e  | Local day of week              |  E  | Day of week                    |
       * |  f  |                                |  F* | Day of week in month           |
       * |  g* | Modified Julian day            |  G  | Era                            |
       * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
       * |  i! | ISO day of week                |  I! | ISO week of year               |
       * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
       * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
       * |  l* | (deprecated)                   |  L  | Stand-alone month              |
       * |  m  | Minute                         |  M  | Month                          |
       * |  n  |                                |  N  |                                |
       * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
       * |  p! | Long localized time            |  P! | Long localized date            |
       * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
       * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
       * |  s  | Second                         |  S  | Fraction of second             |
       * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
       * |  u  | Extended year                  |  U* | Cyclic year                    |
       * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
       * |  w  | Local week of year             |  W* | Week of month                  |
       * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
       * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
       * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
       *
       * Letters marked by * are not implemented but reserved by Unicode standard.
       *
       * Letters marked by ! are non-standard, but implemented by date-fns:
       * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
       * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
       *   i.e. 7 for Sunday, 1 for Monday, etc.
       * - `I` is ISO week of year, as opposed to `w` which is local week of year.
       * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
       *   `R` is supposed to be used in conjunction with `I` and `i`
       *   for universal ISO week-numbering date, whereas
       *   `Y` is supposed to be used in conjunction with `w` and `e`
       *   for week-numbering date specific to the locale.
       * - `P` is long localized date format
       * - `p` is long localized time format
       */

      const formatters = {
        // Era
        G: function (date, token, localize) {
          const era = date.getFullYear() > 0 ? 1 : 0;
          switch (token) {
            // AD, BC
            case "G":
            case "GG":
            case "GGG":
              return localize.era(era, { width: "abbreviated" });
            // A, B
            case "GGGGG":
              return localize.era(era, { width: "narrow" });
            // Anno Domini, Before Christ
            case "GGGG":
            default:
              return localize.era(era, { width: "wide" });
          }
        },

        // Year
        y: function (date, token, localize) {
          // Ordinal number
          if (token === "yo") {
            const signedYear = date.getFullYear();
            // Returns 1 for 1 BC (which is year 0 in JavaScript)
            const year = signedYear > 0 ? signedYear : 1 - signedYear;
            return localize.ordinalNumber(year, { unit: "year" });
          }

          return lightFormatters.y(date, token);
        },

        // Local week-numbering year
        Y: function (date, token, localize, options) {
          const signedWeekYear = getWeekYear(date, options);
          // Returns 1 for 1 BC (which is year 0 in JavaScript)
          const weekYear =
            signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

          // Two digit year
          if (token === "YY") {
            const twoDigitYear = weekYear % 100;
            return addLeadingZeros(twoDigitYear, 2);
          }

          // Ordinal number
          if (token === "Yo") {
            return localize.ordinalNumber(weekYear, { unit: "year" });
          }

          // Padding
          return addLeadingZeros(weekYear, token.length);
        },

        // ISO week-numbering year
        R: function (date, token) {
          const isoWeekYear = getISOWeekYear(date);

          // Padding
          return addLeadingZeros(isoWeekYear, token.length);
        },

        // Extended year. This is a single number designating the year of this calendar system.
        // The main difference between `y` and `u` localizers are B.C. years:
        // | Year | `y` | `u` |
        // |------|-----|-----|
        // | AC 1 |   1 |   1 |
        // | BC 1 |   1 |   0 |
        // | BC 2 |   2 |  -1 |
        // Also `yy` always returns the last two digits of a year,
        // while `uu` pads single digit years to 2 characters and returns other years unchanged.
        u: function (date, token) {
          const year = date.getFullYear();
          return addLeadingZeros(year, token.length);
        },

        // Quarter
        Q: function (date, token, localize) {
          const quarter = Math.ceil((date.getMonth() + 1) / 3);
          switch (token) {
            // 1, 2, 3, 4
            case "Q":
              return String(quarter);
            // 01, 02, 03, 04
            case "QQ":
              return addLeadingZeros(quarter, 2);
            // 1st, 2nd, 3rd, 4th
            case "Qo":
              return localize.ordinalNumber(quarter, { unit: "quarter" });
            // Q1, Q2, Q3, Q4
            case "QQQ":
              return localize.quarter(quarter, {
                width: "abbreviated",
                context: "formatting",
              });
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case "QQQQQ":
              return localize.quarter(quarter, {
                width: "narrow",
                context: "formatting",
              });
            // 1st quarter, 2nd quarter, ...
            case "QQQQ":
            default:
              return localize.quarter(quarter, {
                width: "wide",
                context: "formatting",
              });
          }
        },

        // Stand-alone quarter
        q: function (date, token, localize) {
          const quarter = Math.ceil((date.getMonth() + 1) / 3);
          switch (token) {
            // 1, 2, 3, 4
            case "q":
              return String(quarter);
            // 01, 02, 03, 04
            case "qq":
              return addLeadingZeros(quarter, 2);
            // 1st, 2nd, 3rd, 4th
            case "qo":
              return localize.ordinalNumber(quarter, { unit: "quarter" });
            // Q1, Q2, Q3, Q4
            case "qqq":
              return localize.quarter(quarter, {
                width: "abbreviated",
                context: "standalone",
              });
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case "qqqqq":
              return localize.quarter(quarter, {
                width: "narrow",
                context: "standalone",
              });
            // 1st quarter, 2nd quarter, ...
            case "qqqq":
            default:
              return localize.quarter(quarter, {
                width: "wide",
                context: "standalone",
              });
          }
        },

        // Month
        M: function (date, token, localize) {
          const month = date.getMonth();
          switch (token) {
            case "M":
            case "MM":
              return lightFormatters.M(date, token);
            // 1st, 2nd, ..., 12th
            case "Mo":
              return localize.ordinalNumber(month + 1, { unit: "month" });
            // Jan, Feb, ..., Dec
            case "MMM":
              return localize.month(month, {
                width: "abbreviated",
                context: "formatting",
              });
            // J, F, ..., D
            case "MMMMM":
              return localize.month(month, {
                width: "narrow",
                context: "formatting",
              });
            // January, February, ..., December
            case "MMMM":
            default:
              return localize.month(month, {
                width: "wide",
                context: "formatting",
              });
          }
        },

        // Stand-alone month
        L: function (date, token, localize) {
          const month = date.getMonth();
          switch (token) {
            // 1, 2, ..., 12
            case "L":
              return String(month + 1);
            // 01, 02, ..., 12
            case "LL":
              return addLeadingZeros(month + 1, 2);
            // 1st, 2nd, ..., 12th
            case "Lo":
              return localize.ordinalNumber(month + 1, { unit: "month" });
            // Jan, Feb, ..., Dec
            case "LLL":
              return localize.month(month, {
                width: "abbreviated",
                context: "standalone",
              });
            // J, F, ..., D
            case "LLLLL":
              return localize.month(month, {
                width: "narrow",
                context: "standalone",
              });
            // January, February, ..., December
            case "LLLL":
            default:
              return localize.month(month, {
                width: "wide",
                context: "standalone",
              });
          }
        },

        // Local week of year
        w: function (date, token, localize, options) {
          const week = getWeek(date, options);

          if (token === "wo") {
            return localize.ordinalNumber(week, { unit: "week" });
          }

          return addLeadingZeros(week, token.length);
        },

        // ISO week of year
        I: function (date, token, localize) {
          const isoWeek = getISOWeek(date);

          if (token === "Io") {
            return localize.ordinalNumber(isoWeek, { unit: "week" });
          }

          return addLeadingZeros(isoWeek, token.length);
        },

        // Day of the month
        d: function (date, token, localize) {
          if (token === "do") {
            return localize.ordinalNumber(date.getDate(), { unit: "date" });
          }

          return lightFormatters.d(date, token);
        },

        // Day of year
        D: function (date, token, localize) {
          const dayOfYear = getDayOfYear(date);

          if (token === "Do") {
            return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
          }

          return addLeadingZeros(dayOfYear, token.length);
        },

        // Day of week
        E: function (date, token, localize) {
          const dayOfWeek = date.getDay();
          switch (token) {
            // Tue
            case "E":
            case "EE":
            case "EEE":
              return localize.day(dayOfWeek, {
                width: "abbreviated",
                context: "formatting",
              });
            // T
            case "EEEEE":
              return localize.day(dayOfWeek, {
                width: "narrow",
                context: "formatting",
              });
            // Tu
            case "EEEEEE":
              return localize.day(dayOfWeek, {
                width: "short",
                context: "formatting",
              });
            // Tuesday
            case "EEEE":
            default:
              return localize.day(dayOfWeek, {
                width: "wide",
                context: "formatting",
              });
          }
        },

        // Local day of week
        e: function (date, token, localize, options) {
          const dayOfWeek = date.getDay();
          const localDayOfWeek =
            (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
          switch (token) {
            // Numerical value (Nth day of week with current locale or weekStartsOn)
            case "e":
              return String(localDayOfWeek);
            // Padded numerical value
            case "ee":
              return addLeadingZeros(localDayOfWeek, 2);
            // 1st, 2nd, ..., 7th
            case "eo":
              return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
            case "eee":
              return localize.day(dayOfWeek, {
                width: "abbreviated",
                context: "formatting",
              });
            // T
            case "eeeee":
              return localize.day(dayOfWeek, {
                width: "narrow",
                context: "formatting",
              });
            // Tu
            case "eeeeee":
              return localize.day(dayOfWeek, {
                width: "short",
                context: "formatting",
              });
            // Tuesday
            case "eeee":
            default:
              return localize.day(dayOfWeek, {
                width: "wide",
                context: "formatting",
              });
          }
        },

        // Stand-alone local day of week
        c: function (date, token, localize, options) {
          const dayOfWeek = date.getDay();
          const localDayOfWeek =
            (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
          switch (token) {
            // Numerical value (same as in `e`)
            case "c":
              return String(localDayOfWeek);
            // Padded numerical value
            case "cc":
              return addLeadingZeros(localDayOfWeek, token.length);
            // 1st, 2nd, ..., 7th
            case "co":
              return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
            case "ccc":
              return localize.day(dayOfWeek, {
                width: "abbreviated",
                context: "standalone",
              });
            // T
            case "ccccc":
              return localize.day(dayOfWeek, {
                width: "narrow",
                context: "standalone",
              });
            // Tu
            case "cccccc":
              return localize.day(dayOfWeek, {
                width: "short",
                context: "standalone",
              });
            // Tuesday
            case "cccc":
            default:
              return localize.day(dayOfWeek, {
                width: "wide",
                context: "standalone",
              });
          }
        },

        // ISO day of week
        i: function (date, token, localize) {
          const dayOfWeek = date.getDay();
          const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
          switch (token) {
            // 2
            case "i":
              return String(isoDayOfWeek);
            // 02
            case "ii":
              return addLeadingZeros(isoDayOfWeek, token.length);
            // 2nd
            case "io":
              return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
            // Tue
            case "iii":
              return localize.day(dayOfWeek, {
                width: "abbreviated",
                context: "formatting",
              });
            // T
            case "iiiii":
              return localize.day(dayOfWeek, {
                width: "narrow",
                context: "formatting",
              });
            // Tu
            case "iiiiii":
              return localize.day(dayOfWeek, {
                width: "short",
                context: "formatting",
              });
            // Tuesday
            case "iiii":
            default:
              return localize.day(dayOfWeek, {
                width: "wide",
                context: "formatting",
              });
          }
        },

        // AM or PM
        a: function (date, token, localize) {
          const hours = date.getHours();
          const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

          switch (token) {
            case "a":
            case "aa":
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              });
            case "aaa":
              return localize
                .dayPeriod(dayPeriodEnumValue, {
                  width: "abbreviated",
                  context: "formatting",
                })
                .toLowerCase();
            case "aaaaa":
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "narrow",
                context: "formatting",
              });
            case "aaaa":
            default:
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "wide",
                context: "formatting",
              });
          }
        },

        // AM, PM, midnight, noon
        b: function (date, token, localize) {
          const hours = date.getHours();
          let dayPeriodEnumValue;
          if (hours === 12) {
            dayPeriodEnumValue = dayPeriodEnum.noon;
          } else if (hours === 0) {
            dayPeriodEnumValue = dayPeriodEnum.midnight;
          } else {
            dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
          }

          switch (token) {
            case "b":
            case "bb":
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              });
            case "bbb":
              return localize
                .dayPeriod(dayPeriodEnumValue, {
                  width: "abbreviated",
                  context: "formatting",
                })
                .toLowerCase();
            case "bbbbb":
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "narrow",
                context: "formatting",
              });
            case "bbbb":
            default:
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "wide",
                context: "formatting",
              });
          }
        },

        // in the morning, in the afternoon, in the evening, at night
        B: function (date, token, localize) {
          const hours = date.getHours();
          let dayPeriodEnumValue;
          if (hours >= 17) {
            dayPeriodEnumValue = dayPeriodEnum.evening;
          } else if (hours >= 12) {
            dayPeriodEnumValue = dayPeriodEnum.afternoon;
          } else if (hours >= 4) {
            dayPeriodEnumValue = dayPeriodEnum.morning;
          } else {
            dayPeriodEnumValue = dayPeriodEnum.night;
          }

          switch (token) {
            case "B":
            case "BB":
            case "BBB":
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              });
            case "BBBBB":
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "narrow",
                context: "formatting",
              });
            case "BBBB":
            default:
              return localize.dayPeriod(dayPeriodEnumValue, {
                width: "wide",
                context: "formatting",
              });
          }
        },

        // Hour [1-12]
        h: function (date, token, localize) {
          if (token === "ho") {
            let hours = date.getHours() % 12;
            if (hours === 0) hours = 12;
            return localize.ordinalNumber(hours, { unit: "hour" });
          }

          return lightFormatters.h(date, token);
        },

        // Hour [0-23]
        H: function (date, token, localize) {
          if (token === "Ho") {
            return localize.ordinalNumber(date.getHours(), { unit: "hour" });
          }

          return lightFormatters.H(date, token);
        },

        // Hour [0-11]
        K: function (date, token, localize) {
          const hours = date.getHours() % 12;

          if (token === "Ko") {
            return localize.ordinalNumber(hours, { unit: "hour" });
          }

          return addLeadingZeros(hours, token.length);
        },

        // Hour [1-24]
        k: function (date, token, localize) {
          let hours = date.getHours();
          if (hours === 0) hours = 24;

          if (token === "ko") {
            return localize.ordinalNumber(hours, { unit: "hour" });
          }

          return addLeadingZeros(hours, token.length);
        },

        // Minute
        m: function (date, token, localize) {
          if (token === "mo") {
            return localize.ordinalNumber(date.getMinutes(), {
              unit: "minute",
            });
          }

          return lightFormatters.m(date, token);
        },

        // Second
        s: function (date, token, localize) {
          if (token === "so") {
            return localize.ordinalNumber(date.getSeconds(), {
              unit: "second",
            });
          }

          return lightFormatters.s(date, token);
        },

        // Fraction of second
        S: function (date, token) {
          return lightFormatters.S(date, token);
        },

        // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
        X: function (date, token, _localize) {
          const timezoneOffset = date.getTimezoneOffset();

          if (timezoneOffset === 0) {
            return "Z";
          }

          switch (token) {
            // Hours and optional minutes
            case "X":
              return formatTimezoneWithOptionalMinutes(timezoneOffset);

            // Hours, minutes and optional seconds without `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XX`
            case "XXXX":
            case "XX": // Hours and minutes without `:` delimiter
              return formatTimezone(timezoneOffset);

            // Hours, minutes and optional seconds with `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XXX`
            case "XXXXX":
            case "XXX": // Hours and minutes with `:` delimiter
            default:
              return formatTimezone(timezoneOffset, ":");
          }
        },

        // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
        x: function (date, token, _localize) {
          const timezoneOffset = date.getTimezoneOffset();

          switch (token) {
            // Hours and optional minutes
            case "x":
              return formatTimezoneWithOptionalMinutes(timezoneOffset);

            // Hours, minutes and optional seconds without `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xx`
            case "xxxx":
            case "xx": // Hours and minutes without `:` delimiter
              return formatTimezone(timezoneOffset);

            // Hours, minutes and optional seconds with `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xxx`
            case "xxxxx":
            case "xxx": // Hours and minutes with `:` delimiter
            default:
              return formatTimezone(timezoneOffset, ":");
          }
        },

        // Timezone (GMT)
        O: function (date, token, _localize) {
          const timezoneOffset = date.getTimezoneOffset();

          switch (token) {
            // Short
            case "O":
            case "OO":
            case "OOO":
              return "GMT" + formatTimezoneShort(timezoneOffset, ":");
            // Long
            case "OOOO":
            default:
              return "GMT" + formatTimezone(timezoneOffset, ":");
          }
        },

        // Timezone (specific non-location)
        z: function (date, token, _localize) {
          const timezoneOffset = date.getTimezoneOffset();

          switch (token) {
            // Short
            case "z":
            case "zz":
            case "zzz":
              return "GMT" + formatTimezoneShort(timezoneOffset, ":");
            // Long
            case "zzzz":
            default:
              return "GMT" + formatTimezone(timezoneOffset, ":");
          }
        },

        // Seconds timestamp
        t: function (date, token, _localize) {
          const timestamp = Math.trunc(date.getTime() / 1000);
          return addLeadingZeros(timestamp, token.length);
        },

        // Milliseconds timestamp
        T: function (date, token, _localize) {
          const timestamp = date.getTime();
          return addLeadingZeros(timestamp, token.length);
        },
      };

      function formatTimezoneShort(offset, delimiter = "") {
        const sign = offset > 0 ? "-" : "+";
        const absOffset = Math.abs(offset);
        const hours = Math.trunc(absOffset / 60);
        const minutes = absOffset % 60;
        if (minutes === 0) {
          return sign + String(hours);
        }
        return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
      }

      function formatTimezoneWithOptionalMinutes(offset, delimiter) {
        if (offset % 60 === 0) {
          const sign = offset > 0 ? "-" : "+";
          return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
        }
        return formatTimezone(offset, delimiter);
      }

      function formatTimezone(offset, delimiter = "") {
        const sign = offset > 0 ? "-" : "+";
        const absOffset = Math.abs(offset);
        const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
        const minutes = addLeadingZeros(absOffset % 60, 2);
        return sign + hours + delimiter + minutes;
      } // CONCATENATED MODULE: ./node_modules/date-fns/isDate.mjs

      /**
       * @name isDate
       * @category Common Helpers
       * @summary Is the given value a date?
       *
       * @description
       * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
       *
       * @param value - The value to check
       *
       * @returns True if the given value is a date
       *
       * @example
       * // For a valid date:
       * const result = isDate(new Date())
       * //=> true
       *
       * @example
       * // For an invalid date:
       * const result = isDate(new Date(NaN))
       * //=> true
       *
       * @example
       * // For some value:
       * const result = isDate('2014-02-31')
       * //=> false
       *
       * @example
       * // For an object:
       * const result = isDate({})
       * //=> false
       */
      function isDate_isDate(value) {
        return (
          value instanceof Date ||
          (typeof value === "object" &&
            Object.prototype.toString.call(value) === "[object Date]")
        );
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_isDate =
        /* unused pure expression or super */ null && isDate_isDate; // CONCATENATED MODULE: ./node_modules/date-fns/isValid.mjs

      /**
       * @name isValid
       * @category Common Helpers
       * @summary Is the given date valid?
       *
       * @description
       * Returns false if argument is Invalid Date and true otherwise.
       * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
       * Invalid Date is a Date, whose time value is NaN.
       *
       * Time value of Date: http://es5.github.io/#x15.9.1.1
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to check
       *
       * @returns The date is valid
       *
       * @example
       * // For the valid date:
       * const result = isValid(new Date(2014, 1, 31))
       * //=> true
       *
       * @example
       * // For the value, convertable into a date:
       * const result = isValid(1393804800000)
       * //=> true
       *
       * @example
       * // For the invalid date:
       * const result = isValid(new Date(''))
       * //=> false
       */
      function isValid(date) {
        if (!isDate_isDate(date) && typeof date !== "number") {
          return false;
        }
        const _date = toDate(date);
        return !isNaN(Number(_date));
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_isValid =
        /* unused pure expression or super */ null && isValid; // CONCATENATED MODULE: ./node_modules/date-fns/format.mjs

      // Rexports of internal for libraries to use.
      // See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

      // This RegExp consists of three parts separated by `|`:
      // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
      //   (one of the certain letters followed by `o`)
      // - (\w)\1* matches any sequences of the same letter
      // - '' matches two quote characters in a row
      // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
      //   except a single quote symbol, which ends the sequence.
      //   Two quote characters do not end the sequence.
      //   If there is no matching single quote
      //   then the sequence will continue until the end of the string.
      // - . matches any single character unmatched by previous parts of the RegExps
      const format_formattingTokensRegExp =
        /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

      // This RegExp catches symbols escaped by quotes, and also
      // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
      const format_longFormattingTokensRegExp =
        /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

      const format_escapedStringRegExp = /^'([^]*?)'?$/;
      const format_doubleQuoteRegExp = /''/g;
      const format_unescapedLatinCharacterRegExp = /[a-zA-Z]/;

      /**
       * The {@link format} function options.
       */

      /**
       * @name format
       * @alias formatDate
       * @category Common Helpers
       * @summary Format the date.
       *
       * @description
       * Return the formatted date string in the given format. The result may vary by locale.
       *
       * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
       * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       *
       * The characters wrapped between two single quotes characters (') are escaped.
       * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
       * (see the last example)
       *
       * Format of the string is based on Unicode Technical Standard #35:
       * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
       * with a few additions (see note 7 below the table).
       *
       * Accepted patterns:
       * | Unit                            | Pattern | Result examples                   | Notes |
       * |---------------------------------|---------|-----------------------------------|-------|
       * | Era                             | G..GGG  | AD, BC                            |       |
       * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
       * |                                 | GGGGG   | A, B                              |       |
       * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
       * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
       * |                                 | yy      | 44, 01, 00, 17                    | 5     |
       * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
       * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
       * |                                 | yyyyy   | ...                               | 3,5   |
       * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
       * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
       * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
       * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
       * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
       * |                                 | YYYYY   | ...                               | 3,5   |
       * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
       * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
       * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
       * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
       * |                                 | RRRRR   | ...                               | 3,5,7 |
       * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
       * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
       * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
       * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
       * |                                 | uuuuu   | ...                               | 3,5   |
       * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
       * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
       * |                                 | QQ      | 01, 02, 03, 04                    |       |
       * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
       * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
       * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
       * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
       * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
       * |                                 | qq      | 01, 02, 03, 04                    |       |
       * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
       * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
       * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
       * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
       * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
       * |                                 | MM      | 01, 02, ..., 12                   |       |
       * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
       * |                                 | MMMM    | January, February, ..., December  | 2     |
       * |                                 | MMMMM   | J, F, ..., D                      |       |
       * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
       * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
       * |                                 | LL      | 01, 02, ..., 12                   |       |
       * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
       * |                                 | LLLL    | January, February, ..., December  | 2     |
       * |                                 | LLLLL   | J, F, ..., D                      |       |
       * | Local week of year              | w       | 1, 2, ..., 53                     |       |
       * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
       * |                                 | ww      | 01, 02, ..., 53                   |       |
       * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
       * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
       * |                                 | II      | 01, 02, ..., 53                   | 7     |
       * | Day of month                    | d       | 1, 2, ..., 31                     |       |
       * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
       * |                                 | dd      | 01, 02, ..., 31                   |       |
       * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
       * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
       * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
       * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
       * |                                 | DDDD    | ...                               | 3     |
       * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
       * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
       * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
       * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
       * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
       * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
       * |                                 | ii      | 01, 02, ..., 07                   | 7     |
       * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
       * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
       * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
       * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
       * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
       * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
       * |                                 | ee      | 02, 03, ..., 01                   |       |
       * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
       * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
       * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
       * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
       * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
       * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
       * |                                 | cc      | 02, 03, ..., 01                   |       |
       * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
       * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
       * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
       * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
       * | AM, PM                          | a..aa   | AM, PM                            |       |
       * |                                 | aaa     | am, pm                            |       |
       * |                                 | aaaa    | a.m., p.m.                        | 2     |
       * |                                 | aaaaa   | a, p                              |       |
       * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
       * |                                 | bbb     | am, pm, noon, midnight            |       |
       * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
       * |                                 | bbbbb   | a, p, n, mi                       |       |
       * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
       * |                                 | BBBB    | at night, in the morning, ...     | 2     |
       * |                                 | BBBBB   | at night, in the morning, ...     |       |
       * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
       * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
       * |                                 | hh      | 01, 02, ..., 11, 12               |       |
       * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
       * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
       * |                                 | HH      | 00, 01, 02, ..., 23               |       |
       * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
       * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
       * |                                 | KK      | 01, 02, ..., 11, 00               |       |
       * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
       * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
       * |                                 | kk      | 24, 01, 02, ..., 23               |       |
       * | Minute                          | m       | 0, 1, ..., 59                     |       |
       * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
       * |                                 | mm      | 00, 01, ..., 59                   |       |
       * | Second                          | s       | 0, 1, ..., 59                     |       |
       * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
       * |                                 | ss      | 00, 01, ..., 59                   |       |
       * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
       * |                                 | SS      | 00, 01, ..., 99                   |       |
       * |                                 | SSS     | 000, 001, ..., 999                |       |
       * |                                 | SSSS    | ...                               | 3     |
       * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
       * |                                 | XX      | -0800, +0530, Z                   |       |
       * |                                 | XXX     | -08:00, +05:30, Z                 |       |
       * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
       * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
       * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
       * |                                 | xx      | -0800, +0530, +0000               |       |
       * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
       * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
       * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
       * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
       * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
       * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
       * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
       * | Seconds timestamp               | t       | 512969520                         | 7     |
       * |                                 | tt      | ...                               | 3,7   |
       * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
       * |                                 | TT      | ...                               | 3,7   |
       * | Long localized date             | P       | 04/29/1453                        | 7     |
       * |                                 | PP      | Apr 29, 1453                      | 7     |
       * |                                 | PPP     | April 29th, 1453                  | 7     |
       * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
       * | Long localized time             | p       | 12:00 AM                          | 7     |
       * |                                 | pp      | 12:00:00 AM                       | 7     |
       * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
       * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
       * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
       * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
       * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
       * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
       * Notes:
       * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
       *    are the same as "stand-alone" units, but are different in some languages.
       *    "Formatting" units are declined according to the rules of the language
       *    in the context of a date. "Stand-alone" units are always nominative singular:
       *
       *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
       *
       *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
       *
       * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
       *    the single quote characters (see below).
       *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
       *    the output will be the same as default pattern for this unit, usually
       *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
       *    are marked with "2" in the last column of the table.
       *
       *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
       *
       *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
       *
       *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
       *
       *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
       *
       *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
       *
       * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
       *    The output will be padded with zeros to match the length of the pattern.
       *
       *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
       *
       * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
       *    These tokens represent the shortest form of the quarter.
       *
       * 5. The main difference between `y` and `u` patterns are B.C. years:
       *
       *    | Year | `y` | `u` |
       *    |------|-----|-----|
       *    | AC 1 |   1 |   1 |
       *    | BC 1 |   1 |   0 |
       *    | BC 2 |   2 |  -1 |
       *
       *    Also `yy` always returns the last two digits of a year,
       *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
       *
       *    | Year | `yy` | `uu` |
       *    |------|------|------|
       *    | 1    |   01 |   01 |
       *    | 14   |   14 |   14 |
       *    | 376  |   76 |  376 |
       *    | 1453 |   53 | 1453 |
       *
       *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
       *    except local week-numbering years are dependent on `options.weekStartsOn`
       *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
       *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
       *
       * 6. Specific non-location timezones are currently unavailable in `date-fns`,
       *    so right now these tokens fall back to GMT timezones.
       *
       * 7. These patterns are not in the Unicode Technical Standard #35:
       *    - `i`: ISO day of week
       *    - `I`: ISO week of year
       *    - `R`: ISO week-numbering year
       *    - `t`: seconds timestamp
       *    - `T`: milliseconds timestamp
       *    - `o`: ordinal number modifier
       *    - `P`: long localized date
       *    - `p`: long localized time
       *
       * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
       *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       *
       * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
       *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The original date
       * @param format - The string of tokens
       * @param options - An object with options
       *
       * @returns The formatted date string
       *
       * @throws `date` must not be Invalid Date
       * @throws `options.locale` must contain `localize` property
       * @throws `options.locale` must contain `formatLong` property
       * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
       * @throws format string contains an unescaped latin alphabet character
       *
       * @example
       * // Represent 11 February 2014 in middle-endian format:
       * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
       * //=> '02/11/2014'
       *
       * @example
       * // Represent 2 July 2014 in Esperanto:
       * import { eoLocale } from 'date-fns/locale/eo'
       * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
       *   locale: eoLocale
       * })
       * //=> '2-a de julio 2014'
       *
       * @example
       * // Escape string by single quote characters:
       * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
       * //=> "3 o'clock"
       */
      function format(date, formatStr, options) {
        const defaultOptions = getDefaultOptions();
        const locale = options?.locale ?? defaultOptions.locale ?? enUS;

        const firstWeekContainsDate =
          options?.firstWeekContainsDate ??
          options?.locale?.options?.firstWeekContainsDate ??
          defaultOptions.firstWeekContainsDate ??
          defaultOptions.locale?.options?.firstWeekContainsDate ??
          1;

        const weekStartsOn =
          options?.weekStartsOn ??
          options?.locale?.options?.weekStartsOn ??
          defaultOptions.weekStartsOn ??
          defaultOptions.locale?.options?.weekStartsOn ??
          0;

        const originalDate = toDate(date);

        if (!isValid(originalDate)) {
          throw new RangeError("Invalid time value");
        }

        let parts = formatStr
          .match(format_longFormattingTokensRegExp)
          .map((substring) => {
            const firstCharacter = substring[0];
            if (firstCharacter === "p" || firstCharacter === "P") {
              const longFormatter = longFormatters[firstCharacter];
              return longFormatter(substring, locale.formatLong);
            }
            return substring;
          })
          .join("")
          .match(format_formattingTokensRegExp)
          .map((substring) => {
            // Replace two single quote characters with one single quote character
            if (substring === "''") {
              return { isToken: false, value: "'" };
            }

            const firstCharacter = substring[0];
            if (firstCharacter === "'") {
              return {
                isToken: false,
                value: format_cleanEscapedString(substring),
              };
            }

            if (formatters[firstCharacter]) {
              return { isToken: true, value: substring };
            }

            if (firstCharacter.match(format_unescapedLatinCharacterRegExp)) {
              throw new RangeError(
                "Format string contains an unescaped latin alphabet character `" +
                  firstCharacter +
                  "`",
              );
            }

            return { isToken: false, value: substring };
          });

        // invoke localize preprocessor (only for french locales at the moment)
        if (locale.localize.preprocessor) {
          parts = locale.localize.preprocessor(originalDate, parts);
        }

        const formatterOptions = {
          firstWeekContainsDate,
          weekStartsOn,
          locale,
        };

        return parts
          .map((part) => {
            if (!part.isToken) return part.value;

            const token = part.value;

            if (
              (!options?.useAdditionalWeekYearTokens &&
                isProtectedWeekYearToken(token)) ||
              (!options?.useAdditionalDayOfYearTokens &&
                isProtectedDayOfYearToken(token))
            ) {
              warnOrThrowProtectedError(token, formatStr, String(date));
            }

            const formatter = formatters[token[0]];
            return formatter(
              originalDate,
              token,
              locale.localize,
              formatterOptions,
            );
          })
          .join("");
      }

      function format_cleanEscapedString(input) {
        const matched = input.match(format_escapedStringRegExp);

        if (!matched) {
          return input;
        }

        return matched[1].replace(format_doubleQuoteRegExp, "'");
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_format =
        /* unused pure expression or super */ null && format; // CONCATENATED MODULE: ./node_modules/date-fns/constructNow.mjs

      /**
       * @name constructNow
       * @category Generic Helpers
       * @summary Constructs a new current date using the passed value constructor.
       * @pure false
       *
       * @description
       * The function constructs a new current date using the constructor from
       * the reference date. It helps to build generic functions that accept date
       * extensions and use the current date.
       *
       * It defaults to `Date` if the passed reference date is a number or a string.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The reference date to take constructor from
       *
       * @returns Current date initialized using the given date constructor
       *
       * @example
       * import { constructNow, isSameDay } from 'date-fns'
       *
       * function isToday<DateType extends Date>(
       *   date: DateType | number | string,
       * ): boolean {
       *   // If we were to use `new Date()` directly, the function would  behave
       *   // differently in different timezones and return false for the same date.
       *   return isSameDay(date, constructNow(date));
       * }
       */
      function constructNow(date) {
        return constructFrom(date, Date.now());
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_constructNow =
        /* unused pure expression or super */ null && constructNow; // CONCATENATED MODULE: ./node_modules/date-fns/isSameDay.mjs

      /**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check

 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
      function isSameDay(dateLeft, dateRight) {
        const dateLeftStartOfDay = startOfDay(dateLeft);
        const dateRightStartOfDay = startOfDay(dateRight);

        return +dateLeftStartOfDay === +dateRightStartOfDay;
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_isSameDay =
        /* unused pure expression or super */ null && isSameDay; // CONCATENATED MODULE: ./node_modules/date-fns/isToday.mjs

      /**
       * @name isToday
       * @category Day Helpers
       * @summary Is the given date today?
       * @pure false
       *
       * @description
       * Is the given date today?
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to check
       *
       * @returns The date is today
       *
       * @example
       * // If today is 6 October 2014, is 6 October 14:00:00 today?
       * const result = isToday(new Date(2014, 9, 6, 14, 0))
       * //=> true
       */
      function isToday(date) {
        return isSameDay(date, constructNow(date));
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_isToday =
        /* unused pure expression or super */ null && isToday; // CONCATENATED MODULE: ./node_modules/date-fns/isTomorrow.mjs

      /**
       * @name isTomorrow
       * @category Day Helpers
       * @summary Is the given date tomorrow?
       * @pure false
       *
       * @description
       * Is the given date tomorrow?
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The date to check
       *
       * @returns The date is tomorrow
       *
       * @example
       * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
       * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
       * //=> true
       */
      function isTomorrow(date) {
        return isSameDay(date, addDays(constructNow(date), 1));
      }

      // Fallback for modularized imports:
      /* harmony default export */ const date_fns_isTomorrow =
        /* unused pure expression or super */ null && isTomorrow; // CONCATENATED MODULE: ./src/View.js

      class TodoView {
        constructor() {
          this.todoList = document.getElementById("todoList");

          this.dialogBtn = document.getElementById("dialogBtn");
          this.closeDialogBtn = document.getElementById("closeDialogBtn");
          this.addTodoDialog = document.getElementById("addTodoDialog");
          this.todoForm = document.getElementById("todoForm");

          this.addProjectBtn = document.getElementById("addProjectBtn");
          this.closeProjectDialogBtn = document.getElementById(
            "closeProjectDialogBtn",
          );
          this.addProjectDialog = document.getElementById("addProjectDialog");
          this.projectForm = document.getElementById("projectForm");

          this.collapseProjectsBtn = document.getElementById(
            "collapseProjectsBtn",
          );

          this.settingsDialog = document.getElementById("settingsDialog");
          this.openSettingsBtn = document.getElementById("openSettingsBtn");
          this.closeSettingsBtn = document.getElementById("closeSettingsBtn");
          this.deleteAllBtn = document.getElementById("deleteAll");
          this.restoreDefaultsBtn = document.getElementById("restoreDefaults");

          this.themeBtn = document.getElementById("themeBtn");
          this.finishedTodosBtn = document.getElementById("finishedTodosBtn");
          this.pageTabs = document
            .getElementById("pageTabs")
            .getElementsByTagName("button");
          this.projectTabs = document
            .getElementById("projectTabs")
            .getElementsByTagName("button");

          this.nameInputs = document.getElementsByClassName("name-box");
          this.descInputs = document.getElementsByClassName("desc-box");

          this.initEventHandlers();
        }

        initEventHandlers() {
          this.themeBtn.addEventListener("click", () =>
            this.handleChangeTheme(),
          );

          this.dialogBtn.addEventListener("click", () =>
            this.handleOpenDialog(this.addTodoDialog),
          );

          this.closeDialogBtn.addEventListener("click", () =>
            this.handleCloseDialog(this.addTodoDialog),
          );

          this.todoForm.addEventListener("submit", (e) =>
            this.handleSubmitTodo(e),
          );

          this.addProjectBtn.addEventListener("click", () =>
            this.handleOpenDialog(this.addProjectDialog),
          );

          this.closeProjectDialogBtn.addEventListener("click", () =>
            this.handleCloseDialog(this.addProjectDialog),
          );

          this.projectForm.addEventListener("submit", (e) =>
            this.handleSubmitProject(e),
          );

          Array.from(this.nameInputs).forEach((input) => {
            input.addEventListener("input", (e) =>
              this.autoGrowInput(e.target),
            );
          });

          Array.from(this.descInputs).forEach((input) => {
            input.addEventListener("input", (e) =>
              this.autoGrowInput(e.target),
            );
          });

          Array.from(this.pageTabs).forEach((button) => {
            button.addEventListener("click", (e) => this.handleChangePage(e));
          });

          this.finishedTodosBtn.addEventListener("click", (e) =>
            this.handleChangePage(e),
          );

          this.collapseProjectsBtn.addEventListener("click", () =>
            this.handleCollapseProjects(),
          );

          this.openSettingsBtn.addEventListener("click", () =>
            this.handleOpenDialog(this.settingsDialog),
          );

          this.closeSettingsBtn.addEventListener("click", () =>
            this.handleCloseDialog(this.settingsDialog),
          );

          this.deleteAllBtn.addEventListener("click", () =>
            this.handleDeleteAll(),
          );

          this.restoreDefaultsBtn.addEventListener("click", () =>
            this.handleRestoreDefaults(),
          );
        }

        handleSubmitProject(e) {
          const submitter = e.submitter;
          if (submitter.id === "project-create-button") {
            this.handleCreateProjectSubmit();
          } else if (submitter.id === "project-update-button") {
            this.handleUpdateProjectSubmit();
          }
        }

        handleCreateProjectSubmit() {
          const projectName = this.getProjectFormInput();
          this.controller.controlCreateProject(projectName);
          this.todoForm.reset();
        }

        handleUpdateProjectSubmit() {
          const selectedProject = document.querySelector(".selected-project");
          const oldName = selectedProject.textContent.slice(2);
          const newName = this.getProjectFormInput();

          this.controller.controlUpdateProject(oldName, newName);
          this.projectForm.reset();

          const todoList = this.controller.controlGetTodos();
          todoList.forEach((todo) => {
            if (todo.project === oldName) {
              todo.project = newName;
              this.controller.controlUpdateTodo(todo.id, todo);
            }
          });
        }

        handleSubmitTodo(e) {
          const submitter = e.submitter;
          if (submitter.id === "todo-create-button") {
            this.handleCreateTodoSubmit();
          } else if (submitter.id === "todo-update-button") {
            this.handleUpdateTodoSubmit();
          }
        }

        handleCreateTodoSubmit() {
          const todoData = this.getTodoFormInputs();
          this.controller.controlCreateTodo(todoData);
          this.todoForm.reset();
        }

        handleUpdateTodoSubmit() {
          const selectedTodo = document.querySelector(".selected-todo");
          const newData = this.getTodoFormInputs();
          this.controller.controlUpdateTodo(selectedTodo.id, newData);
          this.todoForm.reset();
        }

        getProjectFormInput() {
          const projectInput = document.getElementById("projectName");
          return projectInput.value;
        }

        setProjectFormInput(projectName) {
          const projectInput = document.getElementById("projectName");
          projectInput.value = projectName;
        }

        getTodoFormInputs() {
          const nameInput = document.getElementById("name");
          const descInput = document.getElementById("desc");
          const projectInput = document.getElementById("project");
          const priorityInput = document.getElementById("priority");
          const dateInput = document.getElementById("date");

          const todoData = {
            name: nameInput.value,
            desc: descInput.value,
            dueDate: dateInput.value,
            priority: priorityInput.value,
            project: projectInput.value,
          };

          return todoData;
        }

        setTodoFormInputs(todoData) {
          const nameInput = document.getElementById("name");
          const descInput = document.getElementById("desc");
          const projectInput = document.getElementById("project");
          const priorityInput = document.getElementById("priority");
          const dateInput = document.getElementById("date");

          console.log(todoData);
          nameInput.value = todoData.name;
          descInput.value = todoData.desc;
          projectInput.value = todoData.project;
          priorityInput.value = todoData.priority;
          dateInput.value = format(todoData.dueDate, "yyyy-MM-dd");
        }

        displayTodoItems(todoList) {
          this.todoList.innerHTML = "";
          const selectedTab = document.querySelector(".selected");
          this.styleSelectedTab(selectedTab);

          // if TodoLogic!todoList is empty, displays 'no todos' message
          if (todoList.length === 0) {
            this.handleNoTodos();
            return;
          }

          todoList = this.filterTodosByTab(todoList, selectedTab);

          // sorts todo list by due date (ascending)
          todoList.sort(
            (todo1, todo2) =>
              makeNewDate(todo1.dueDate) - makeNewDate(todo2.dueDate),
          );

          todoList.forEach((todo) => {
            this.handleAddTodo(todo);
          });

          // if View!todoList is empty, displays 'no todos' message
          if (this.todoList.innerHTML === "") {
            this.handleNoTodos();
          }
        }

        filterTodosByTab(todoList, currentTab) {
          let filteredTodos = todoList;

          if (currentTab.id === "finishedTodosBtn") {
            filteredTodos = todoList.filter((todo) => todo.complete === true);
            return filteredTodos;
          }
          // else:
          filteredTodos = todoList.filter((todo) => todo.complete === false);

          switch (currentTab.textContent) {
            case "Inbox":
              filteredTodos = filteredTodos.filter(
                (todo) => todo.project.toLowerCase() === "Inbox".toLowerCase(),
              );
              break;

            case "Today":
              filteredTodos = filteredTodos.filter((todo) =>
                isToday(todo.dueDate),
              );
              break;

            case "Tommorow":
              filteredTodos = filteredTodos.filter((todo) =>
                isTomorrow(todo.dueDate),
              );
              break;

            case "Week":
              filteredTodos = filteredTodos.filter((todo) =>
                isWithinOneWeek(todo.dueDate, makeNewDate()),
              );
              break;

            case "All":
              break;

            default:
              filteredTodos = filteredTodos.filter((todo) =>
                currentTab.textContent.includes(todo.project),
              );
              break;
          }
          return filteredTodos;
        }

        handleNoTodos() {
          const noTodosMsg = document.createElement("p");
          noTodosMsg.textContent = "No todos left in sight!";
          this.todoList.appendChild(noTodosMsg);
        }

        handleAddTodo(todo) {
          // todo container
          const todoDiv = document.createElement("div");
          todoDiv.classList.add("todo");
          todoDiv.id = todo.id;

          // todo container levels:
          // 1. title + controls
          const todoLv1 = document.createElement("div");
          // 2. description
          const todoLv2 = document.createElement("div");
          // 3. project
          const todoLv3 = document.createElement("div");

          // todo info
          const todoTitle = document.createElement("span");
          const todoDesc = document.createElement("span");
          const todoProject = document.createElement("span");
          const todoDate = document.createElement("span");
          const todoPriority = document.createElement("span");

          todoTitle.textContent = todo.name;
          todoDesc.textContent = todo.desc;
          todoProject.textContent = `# ${todo.project}`;

          if (isDate(todo.dueDate)) {
            todoDate.textContent = format(todo.dueDate, "d MMM yyyy");
          }

          todoTitle.classList.add("todo-title");
          todoDesc.classList.add("todo-desc");
          todoProject.classList.add("todo-project");
          todoDate.classList.add("todo-date");

          if (todo.priority.toLowerCase() !== "priority") {
            todoPriority.textContent = todo.priority;
            todoPriority.classList.add("todo-priority");
            if (todo.priority.toLowerCase() === "urgent")
              todoPriority.classList.add("p1");
            else if (todo.priority.toLowerCase() === "important")
              todoPriority.classList.add("p2");
            else todoPriority.classList.add("p3");
          }

          // toggle todo complete component
          const check_circle = document.createElement("div");
          check_circle.classList.add("check-circle");
          check_circle.addEventListener("click", (e) =>
            this.handleToggleComplete(e),
          );
          if (todo.complete === true) {
            check_circle.classList.add("mark-complete");
          }

          // edit todo component
          const editBtn = document.createElement("span");
          editBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h43.92l427.93-427.92-43.93-43.93L200-243.92V-200Zm-40 40v-100.77l527.23-527.77q6.15-5.48 13.57-8.47 7.43-2.99 15.49-2.99t15.62 2.54q7.55 2.54 13.94 9.15l42.69 42.93q6.61 6.38 9.04 14 2.42 7.63 2.42 15.25 0 8.13-2.74 15.56-2.74 7.42-8.72 13.57L260.77-160H160Zm600.77-556.31-44.46-44.46 44.46 44.46ZM649.5-649.5l-21.58-22.35 43.93 43.93-22.35-21.58Z"/></svg>';
          editBtn.addEventListener("click", (e) => this.handleEditTodo(e));

          // delete todo component
          const deleteBtn = document.createElement("span");
          deleteBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/></svg>';
          deleteBtn.addEventListener("click", (e) => this.handleDeleteTodo(e));

          const editDeleteSpan = document.createElement("span");
          editDeleteSpan.classList.add("todo-edit-buttons");
          editDeleteSpan.classList.add("opacity-0");
          editDeleteSpan.appendChild(editBtn);
          editDeleteSpan.appendChild(deleteBtn);

          const line = document.createElement("div");
          line.classList.add("line");

          // appending to todo levels
          todoLv1.appendChild(check_circle);
          todoLv1.appendChild(todoTitle);
          todoLv1.appendChild(todoPriority);
          todoLv1.appendChild(todoDate);

          todoLv2.appendChild(todoDesc);

          todoLv3.appendChild(editDeleteSpan);
          todoLv3.appendChild(todoProject);

          // appending levels to todo container
          todoDiv.appendChild(todoLv1);
          todoDiv.appendChild(todoLv2);
          todoDiv.appendChild(todoLv3);

          // appending todo container to todo list
          this.todoList.appendChild(todoDiv);
          this.todoList.appendChild(line);

          // todo hovering event listener
          // note: using arrow function, 'this' inside the listener function refers to the class (= the outer scope)
          todoDiv.addEventListener("mouseenter", this.handleTodoHover);
          todoDiv.addEventListener("mouseleave", this.handleTodoHover);
        }

        handleDeleteTodo(e) {
          let todoItem = e.target;
          if (todoItem.nodeName === "path")
            todoItem =
              todoItem.parentElement.parentElement.parentElement.parentElement
                .parentElement;
          else if (todoItem.nodeName === "svg")
            todoItem =
              todoItem.parentElement.parentElement.parentElement.parentElement;
          this.controller.controlDeleteTodo(todoItem.id);
        }

        handleEditTodo(e) {
          let todoItem = e.target;
          if (todoItem.nodeName === "path")
            todoItem =
              todoItem.parentElement.parentElement.parentElement.parentElement
                .parentElement;
          else if (todoItem.nodeName === "svg")
            todoItem =
              todoItem.parentElement.parentElement.parentElement.parentElement;

          todoItem.classList.add("selected-todo");
          const submitter = document.querySelector(".todo-submit-button");
          submitter.id = "todo-update-button";

          const oldData = this.controller.controlGetTodoById(todoItem.id);
          this.setTodoFormInputs(oldData);
          this.handleOpenDialog(this.addTodoDialog);
        }

        handleToggleComplete(e) {
          const todoItem = e.target.parentElement.parentElement;
          this.controller.controlToggleComplete(todoItem.id);
        }

        handleTodoHover(e) {
          const editBtn = this.querySelector(".todo-edit-buttons");
          if (e.type === "mouseenter") editBtn.classList.remove("opacity-0");
          else editBtn.classList.add("opacity-0");
        }

        displayProjects() {
          // to prevent error if the selected tab was a project (switch to default [All])
          // Future solution: add IDs to projects (+ desc)
          const defaultTab = document.querySelector(".default-tab");
          this.styleSelectedTab(defaultTab);

          // removes all projects from dropdown
          const projectDropdown = document.getElementById("project");
          projectDropdown.innerHTML = "";

          // removes all projects from sidebar
          const projectNav = document.getElementById("projectTabs");
          projectNav.innerHTML = "";

          const projectList = this.controller.controlGetProjects();
          projectList.forEach((project) => {
            // displays projects in dialog dropdown
            const option = document.createElement("option");
            option.textContent = project;
            projectDropdown.appendChild(option);

            // skips displaying 'inbox' in sidebar
            if (project.toLowerCase() === "inbox") return;

            // edit todo component
            const editBtn = document.createElement("span");
            editBtn.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h43.92l427.93-427.92-43.93-43.93L200-243.92V-200Zm-40 40v-100.77l527.23-527.77q6.15-5.48 13.57-8.47 7.43-2.99 15.49-2.99t15.62 2.54q7.55 2.54 13.94 9.15l42.69 42.93q6.61 6.38 9.04 14 2.42 7.63 2.42 15.25 0 8.13-2.74 15.56-2.74 7.42-8.72 13.57L260.77-160H160Zm600.77-556.31-44.46-44.46 44.46 44.46ZM649.5-649.5l-21.58-22.35 43.93 43.93-22.35-21.58Z"/></svg>';
            editBtn.addEventListener("click", (e) => this.handleEditProject(e));

            // delete todo component
            const deleteBtn = document.createElement("span");
            deleteBtn.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/></svg>';
            deleteBtn.addEventListener("click", (e) =>
              this.handleDeleteProject(e),
            );

            const editDeleteSpan = document.createElement("span");
            editDeleteSpan.classList.add("todo-edit-buttons");
            editDeleteSpan.classList.add("opacity-0");
            editDeleteSpan.appendChild(editBtn);
            editDeleteSpan.appendChild(deleteBtn);

            // displays project in sidebar
            const button = document.createElement("button");
            button.textContent = `# ${project}`;
            projectNav.appendChild(button);

            button.appendChild(editDeleteSpan);

            button.addEventListener("click", (e) => this.handleChangePage(e));

            button.addEventListener("mouseenter", this.handleTodoHover);
            button.addEventListener("mouseleave", this.handleTodoHover);
          });
        }

        handleDeleteProject(e) {
          let projectItem = e.target;
          if (projectItem.nodeName === "path")
            projectItem =
              projectItem.parentElement.parentElement.parentElement
                .parentElement;
          else if (projectItem.nodeName === "svg")
            projectItem = projectItem.parentElement.parentElement.parentElement;

          const projectName = projectItem.textContent.slice(2);
          this.controller.controlDeleteProject(projectName);

          const todoList = this.controller.controlGetTodos();
          todoList.forEach((todo) => {
            if (todo.project === projectName) {
              todo.project = "Inbox";
              this.controller.controlUpdateTodo(todo.id, todo);
            }
          });
        }

        handleEditProject(e) {
          let projectItem = e.target;
          if (projectItem.nodeName === "path")
            projectItem =
              projectItem.parentElement.parentElement.parentElement
                .parentElement;
          else if (projectItem.nodeName === "svg")
            projectItem = projectItem.parentElement.parentElement.parentElement;

          projectItem.classList.add("selected-project");
          const submitter = document.querySelector(".project-submit-button");
          submitter.id = "project-update-button";

          const oldName = projectItem.textContent.slice(2);
          this.setProjectFormInput(oldName);
          this.handleOpenDialog(this.addProjectDialog);
        }

        handleOpenDialog(dialog) {
          const submitter = dialog.querySelector(".submit-btn");
          if (submitter) {
            if (submitter.id === "todo-create-button") {
              submitter.textContent = "Add todo";
            } else if (submitter.id === "todo-update-button") {
              submitter.textContent = "Update todo";
            } else if (submitter.id === "project-create-button") {
              submitter.textContent = "Create project";
            } else if (submitter.id === "project-update-button") {
              submitter.textContent = "Update project";
            }
          }
          dialog.showModal();
        }

        handleCloseDialog(dialog) {
          const submitter = dialog.querySelector(".submit-btn");
          if (submitter.id === "todo-update-button") {
            submitter.id = "todo-create-button";
          } else if (submitter.id === "project-update-button") {
            submitter.id = "project-create-button";
          }
          this.clearInputs(dialog);
          dialog.close();
        }

        handleChangeTheme() {
          document.documentElement.classList.toggle("dark");
          document.getElementById("lightModeIcon").classList.toggle("hidden");
          document.getElementById("darkModeIcon").classList.toggle("hidden");
        }

        styleSelectedTab(selectedTab) {
          // remove styling from all unselected tabs
          Array.from(this.pageTabs).forEach((button) => {
            button.classList.remove("selected-tab");
            button.classList.remove("selected");
          });

          Array.from(this.projectTabs).forEach((button) => {
            button.classList.remove("selected-tab");
            button.classList.remove("selected");
          });

          this.finishedTodosBtn.classList.remove("selected-link");
          this.finishedTodosBtn.classList.remove("selected");

          // add styling to selected tab
          selectedTab.classList.add("selected");

          if (selectedTab.classList.contains("link")) {
            selectedTab.classList.add("selected-link");
          } else {
            selectedTab.classList.add("selected-tab");
          }

          const title = document.getElementById("pageTitle");
          title.textContent = selectedTab.textContent.replace("# ", "");
        }

        handleChangePage(e) {
          let clickedTab = e;

          if (e instanceof PointerEvent) {
            clickedTab = e.target;
            if (clickedTab.nodeName === "path")
              clickedTab = clickedTab.parentElement.parentElement;
            else if (clickedTab.nodeName === "svg")
              clickedTab = clickedTab.parentElement;
          }

          if (
            e.target.parentElement.parentElement.classList.contains(
              "todo-edit-buttons",
            ) ||
            e.target.parentElement.parentElement.parentElement.classList.contains(
              "todo-edit-buttons",
            )
          ) {
            return;
          }

          this.styleSelectedTab(clickedTab);

          const todoList = this.controller.controlGetTodos();
          this.displayTodoItems(todoList);
        }

        clearInputs(parentElement) {
          const inputs = Array.from(
            parentElement.querySelectorAll("input"),
          ).concat(Array.from(document.querySelectorAll("textarea")));
          inputs.forEach((input) => (input.value = ""));
        }

        autoGrowInput(element) {
          element.style.height = "5px";
          element.style.height = element.scrollHeight + "px";
        }

        handleCollapseProjects(e) {
          document.getElementById("projectTabs").classList.toggle("hidden");
        }

        handleDeleteAll() {
          this.controller.controlDeleteAll();
        }

        handleRestoreDefaults() {
          this.controller.controlRestoreDefaults();
        }
      } // CONCATENATED MODULE: ./src/Controller.js
      class TodoController {
        constructor(todoLogic, projectLogic, view) {
          this.todoLogic = todoLogic;
          this.projectLogic = projectLogic;
          this.view = view;

          this.view.controller = this;
        }

        init() {
          this.loadTodos();
          this.loadProjects();
          this.controlTodosDisplay();
          this.controlProjectDisplay();
        }

        loadTodos() {
          const storedTodos = localStorage.getItem("todoList");
          if (storedTodos) {
            this.initStoredTodos();
          } else {
            this.initDefaultTodos();
          }
        }

        loadProjects() {
          const storedProjects = localStorage.getItem("projectList");
          if (storedProjects) {
            this.initStoredProjects();
          } else {
            this.initDefaultProjects();
          }
        }

        initDefaultProjects() {
          const defaultProjects = ["Inbox", "Chores", "Math Study", "Workout"];
          defaultProjects.forEach((project) =>
            this.projectLogic.createProject(project),
          );
        }

        initStoredProjects() {
          const storedProjects = JSON.parse(
            localStorage.getItem("projectList"),
          );
          if (storedProjects.length === 0) {
            this.projectLogic.createProject("Inbox");
            return;
          }
          storedProjects.forEach((project) =>
            this.projectLogic.createProject(project),
          );
        }

        initDefaultTodos() {
          const defaultTodos = [
            {
              name: "Cleanup",
              desc: "Deep clean bedroom, living room, bathroom, and kitchen.",
              project: "Chores",
              priority: "Low",
              dueDate: makeFutureDate(7),
            },
            {
              name: "Medical Checkup",
              desc: "Go to my scheduled appointment for examination.",
              project: "Inbox",
              priority: "Urgent",
              dueDate: makeFutureDate(3),
            },
            {
              name: "Study Differential Equations",
              desc: "Continue through the textbook until page 130.",
              project: "Math Study",
              priority: "Important",
              dueDate: makeFutureDate(0),
            },
          ];

          defaultTodos.forEach((todo) => this.todoLogic.createTodo(todo));
        }

        initStoredTodos() {
          const storedTodos = JSON.parse(localStorage.getItem("todoList"));
          storedTodos.forEach((todo) => this.todoLogic.createTodo(todo));
        }

        controlTodosDisplay() {
          const todoList = this.todoLogic.getTodos();
          this.view.displayTodoItems(todoList);
        }

        controlProjectDisplay() {
          const projectList = this.projectLogic.getProjects();
          this.view.displayProjects(projectList);
        }

        // todo methods
        controlCreateTodo(todoData) {
          this.todoLogic.createTodo(todoData);
          this.controlTodosDisplay();
        }

        controlDeleteTodo(todoId) {
          this.todoLogic.deleteTodo(todoId);
          this.controlTodosDisplay();
        }

        controlGetTodoById(todoId) {
          return this.todoLogic.getTodoById(todoId);
        }

        controlGetTodos() {
          return this.todoLogic.getTodos();
        }

        controlUpdateTodo(todoId, todoData) {
          this.todoLogic.updateTodo(todoId, todoData);
          this.controlTodosDisplay();
        }

        controlToggleComplete(todoId) {
          this.todoLogic.todoItemToggleComplete(todoId);
          this.controlTodosDisplay();
        }

        // project methods
        controlCreateProject(projectTitle) {
          this.projectLogic.createProject(projectTitle);
          this.controlProjectDisplay();
        }

        controlGetProjects() {
          return this.projectLogic.getProjects();
        }

        controlDeleteProject(projectTitle) {
          this.projectLogic.deleteProject(projectTitle);
          this.controlProjectDisplay();
        }

        controlUpdateProject(oldName, newName) {
          this.projectLogic.updateProject(oldName, newName);
          this.controlProjectDisplay();
        }

        controlDeleteAll() {
          this.todoLogic.clearTodos();
          this.projectLogic.clearProjects();
          this.init();
        }

        controlRestoreDefaults() {
          this.todoLogic.clearTodos();
          this.projectLogic.clearProjects();
          localStorage.clear();
          this.init();
        }
      } // CONCATENATED MODULE: ./src/index.js
      document.addEventListener("DOMContentLoaded", () => {
        const todoLogic = new TodoLogic();
        const projectLogic = new ProjectLogic();
        const view = new TodoView();

        const controller = new TodoController(todoLogic, projectLogic, view);
        controller.init();
      });

      /***/
    },
  },
  /******/ (__webpack_require__) => {
    // webpackRuntimeModules
    /******/ var __webpack_exec__ = (moduleId) =>
      __webpack_require__((__webpack_require__.s = moduleId));
    /******/ var __webpack_exports__ = __webpack_exec__(611);
    /******/
  },
]);
