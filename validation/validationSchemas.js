const acceptedData = require('./accepted_data');

function checkListData(value, listValue) {
  let val = value.toLowerCase();
  console.log(val);
  if (acceptedData[listValue] !== undefined) {
    if (acceptedData[listValue].includes(val)) {
      return (true);
    } else {
      return (false);
    }
  } else {
    return new Error(`List "${listValue}" does not exist in accepted data api call`);
  }
}

const validationSchemas = {
  saveNew: {
    url: {
      isURL: {
        options: {
          protocols: ['http', 'https'],
          require_tld: true,
          require_protocol: false,
          require_host: true,
          require_valid_protocol: true,
          allow_underscores: true,
          host_whitelist: false,
          host_blacklist: false,
          allow_trailing_dot: false,
          allow_protocol_relative_urls: false,
          disallow_auth: false
        },
        errorMessage: 'Must provide a valid URL'
      }
    },
    media_type: {
      custom: {
        options: (value) => {
          if (checkListData(value, 'media_type') === false) {
            return false
          } else {
            return true
          }
        },
        errorMessage: 'Not a valid media_type. Use the accepted data API to get and send this field.',
      },
      errorMessage: 'Must include media type get full list of acceptable media types here: https://assetsapi.responsewebops.com/docs/media-types',
    },
    media_channel: {
      custom: {
        options: (value) => {
          if (checkListData(value, 'media_channel') === false) {
            return false
          } else {
            return true
          }
        },
        errorMessage: 'Not a valid media_channel. Use the accepted data API to get and send this field.',
      },
      errorMessage: 'Must include media type get full list of acceptable media channels here: https://assetsapi.responsewebops.com/docs/media-channels',
    },
    property_type: {
      custom: {
        options: (value) => {
          if (checkListData(value, 'property_type') === false) {
            return false
          } else {
            return true
          }
        },
        errorMessage: 'Not a valid property_type. Use the accepted data API to get and send this field.',
      },
      errorMessage: 'Must include property_type get full list of acceptable property type here: https://assetsapi.responsewebops.com/docs/property-type',
    },
    platform_type: {
      custom: {
        options: (value) => {
          if (checkListData(value, 'platform') === false) {
            return false
          } else {
            return true
          }
        },
        errorMessage: 'Not a valid platform. Use the accepted data API to get and send this field.',
      },
      errorMessage: 'Must include platform. Get full list of acceptable platform types here: https://assetsapi.responsewebops.com/docs/platform-type',
    },
    draw_name: {
      custom: {
        options: (value) => {
          if (checkListData(value, 'draw_name') === false) {
            return false
          } else {
            return true
          }
        },
        errorMessage: 'Not a valid draw_name. Use the accepted data API to get and send this field.',
      },
      errorMessage: 'Must include draw_name. Get full list of acceptable draw_names here: https://assetsapi.responsewebops.com/docs/platform-type',
    },
    form_type: {
      isLength: {
        options: {
          min: 1,
          max: 120
        },
        errorMessage: 'Must be between 1 and 120 characters'
      },
      isAlphanumeric: {
        errorMessage: 'Must be alphanumeric and not contain special characters'
      }
    },
    'tags.*': {
      isLength: {
        options: {
          min: 1,
          max: 1000
        },
        errorMessage: 'Must be between 1 and 1000 characters'
      },
      escape: true
    },
    consversion_rate: {
      isInt: {
        options: {
          min: 0,
          max: 100
        },
        errorMessage: 'Must be an integer between 0 and 100'
      }
    },
    traffic_count: {
      isInt: {
        options: {
          min: 0,
          max: 100000000000
        },
        errorMessage: 'Must be an integer between 0 and 100000000000'
      }
    },
    test_reason: {
      isLength: {
        options: {
          min: 1,
          max: 1000
        },
        errorMessage: 'Must be between 1 and 1000 characters'
      },
      escape: true
    },
    test_conclusion: {
      isLength: {
        options: {
          min: 1,
          max: 1000
        },
        errorMessage: 'Must be between 1 and 1000 characters'
      },
      escape: true
    },
    archived: {
      isBoolean: true
    },
    compliance_approved: {
      isBoolean: true
    },
    compliance_update: {
      isBoolean: true
    },
    version: {
      isLength: {
        options: {
          min: 1,
          max: 120
        },
        errorMessage: 'Must be between 1 and 120 characters'
      },
      isAlphanumeric: {
        errorMessage: 'Must be alphanumeric and not contain special characters'
      }
    },
    updated_by: {
      isLength: {
        options: {
          min: 3,
          max: 200
        },
        errorMessage: 'Must be between 3 and 2000 characters'
      },
      isAlphanumeric: {
        errorMessage: 'Must be alphanumeric and not contain special characters'
      }
    },
    documentation_url: {
      isURL: {
        options: {
          protocols: ['http', 'https'],
          require_tld: true,
          require_protocol: false,
          require_host: true,
          require_valid_protocol: true,
          allow_underscores: true,
          host_whitelist: false,
          host_blacklist: false,
          allow_trailing_dot: false,
          allow_protocol_relative_urls: false,
          disallow_auth: false
        },
        errorMessage: 'Must provide a valid URL'
      }
    }
  }
};

module.exports = validationSchemas;