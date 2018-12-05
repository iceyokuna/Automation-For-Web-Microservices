export default {
  "global": {
    "colors": {
      "brand": "#01a982",
      "focus": "#2AD2C9",
      "accent-1": "#2AD2C9",
      "accent-2": "#614767",
      "accent-3": "#ff8d6d",
      "neutral-1": "#425563",
      "neutral-2": "#5F7A76",
      "neutral-3": "#80746E",
      "neutral-4": "#767676",
      "status-critical": "#F04953",
      "status-error": "#F04953",
      "status-warning": "#FFD144",
      "status-ok": "#01a982",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "primary-light": '#56dbb2',
      "primary-dark": '#007955',
      "secondary": '#546e7a',
      "secondary-light": '#819ca9',
      "secondary-dark": '#29434e',
      "light-0": '#ffffff'
    },
    "font": {
      "family": "'Metric', Arial, sans-serif",
      "face": "\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Regular.woff\") format('woff');\n        }\n\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Bold.woff\") format('woff');\n          font-weight: 700;\n        }\n\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Semibold.woff\") format('woff');\n          font-weight: 600;\n        }\n\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Light.woff\") format('woff');\n          font-weight: 100;\n        }\n      "
    }
  },
  tab: {
    active: {
      color: 'brand',
    },
    hover: {
      // background: "secondary-light"
    },
    color: 'secondary-light',
    border: {
      color: 'secondary-light',
      active: {
        color: 'brand',
      }
    },
  },
  "anchor": {
    "textDecoration": "underline",
    "color": {
      "dark": "#FFFFFF",
      "light": "#000000"
    }
  },
  "button": {
    "padding": {
      "vertical": "5px",
      "horizontal": "5px"
    },
    "border": {
      "radius": "0px"
    },
    "colors": {
      "accent": "#ff8d6d",
      "secondary": "rgba(51,51,51,0.6)"
    },
    "extend": "letter-spacing: 0.04167em;"
  },
  "checkBox": {
    "icon": {
      "extend": [
        "\n        box-sizing: border-box;\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: ",
        null,
        ";\n        height: ",
        null,
        ";\n      "
      ]
    }
  },
  "clock": {
    "analog": {
      "second": {
        "color": {
          "dark": "#01a982",
          "light": "#01a982"
        }
      }
    }
  },
  "icon": {
    "colors": {
      "brand": "#01a982",
      "focus": "#2AD2C9",
      "accent-1": "#2AD2C9",
      "accent-2": "#614767",
      "accent-3": "#ff8d6d",
      "neutral-1": "#425563",
      "neutral-2": "#5F7A76",
      "neutral-3": "#80746E",
      "neutral-4": "#767676",
      "status-critical": "#F04953",
      "status-error": "#F04953",
      "status-warning": "#FFD144",
      "status-ok": "#01a982",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "primary-light": '#56dbb2',
      "primary-dark": '#007955',
      "secondary": '#546e7a',
      "secondary-light": '#819ca9',
      "secondary-dark": '#29434e'
    }
  }
}