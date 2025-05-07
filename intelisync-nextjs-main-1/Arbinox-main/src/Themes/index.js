import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { themeOptions } from "./typography";

const baseOptions = {
  palette: {
    primary: {
      main: "#fff", // Customize this color as needed
    },
    secondary: {
      main: "#9D9D9D", // Customize this color as needed
    },
    background: {
      main: "#080031", // Customize this color as needed
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFFCC",
    },
    // Add more color definitions as needed
  },
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(122, 105, 254, 0.25)",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          background: "#FFFFFF08",
          borderRadius: "12px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "200px",
          backgroundColor: "#1C1A1E",
        },
        paperAnchorDockedLeft: {
          borderRight: "0",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          color: "#FFFFFF !important",
          // background: "#1C1C23 ",
          padding: "12px",
          width: "40px",
          height: "40px",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-selected": {
            borderRadius: "50px",
            border: "1px solid rgba(0, 0, 0, 0.25)",
            background: "#88e68f",
            color: "#000",
          },
          "&.Mui-selected:hover": {
            border: "1px solid rgba(0, 0, 0, 0.25)",
            background: "#4ddd58",
            color: "#000",
          },
        },
      },
    },
    MuiTableHead: {
      root: {
        // background: "rgba(255, 255, 255, 0.01)",
        borderTop: "1px solid #636262",
        "&:hover": {
          backgroundColor: "none",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        // root: {
        //   background: "rgba(255, 255, 255, 0.03)",
        // },
      },
    },
    MuiTable: {
      styleOverrides: {
        // root: {
        //   background: "rgba(255, 255, 255, 0.03)",
        // },
      },
    },
    MuiTableRow: {
      root: {
        // borderBottom: "1px solid #636262",
        // "&:hover": {
        //   backgroundColor: "#ffffff14",
        // },
        //

        "&:last-child": {
          borderBottom: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: "22px 10px",
          fontWeight: 600,
          fontSize: 12,
          color: "#fff",
          whiteSpace: "pre",
        },
        body: {
          padding: "0 10px",
          color: "#FFFFFFBF",
          wordBreak: "break-word",
          fontSize: "12px",
          fontWeight: 400,
          borderBottom: "1px solid #FFFFFF08",
        },
        root: {
          padding: "10px 10px",
          color: "#fff",
          background: "transparent",
          borderBottom: "1px solid #FFFFFF08",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: "0px",
          border: "none",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          left: "5px",
        },
        track: {
          backgroundColor: "#FFFFFF1A",
          opacity: "1.38",
          height: "20px",
          borderRadius: "25px",
        },
        thumb: {
          background: "linear-gradient(90deg, #806DFF 0%, #4A33E7 100%)",

          width: "16px",
          height: "16px",
          marginTop: "5px",
        },
        root: {
          width: "61px",
          height: "43px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: "#222" },
        colorSecondary: {
          "&.Mui-focused": {
            color: "#222",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: "0px" },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: "#000000",
          fontSize: "22px",
          fontWeight: "600",
          lineHeight: "33px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        inputMultiline: {
          padding: "1px !important",
        },
        root: {
          borderRadius: "12px",
          background: "transparent",
          position: "relative",
          border: "1px solid #FFFFFF0D",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #FFFFFF0D",
            boxShadow: "none",
          },
        },
        notchedOutline: {
          background: "rgba(255, 255, 255, 0.05)",
        },
        input: {
          color: "#fff",
          padding: "16px",
          fontSize: "16px",
          fontWeight: "400",
          background: "transparent !important",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#fff",
          },
          "&:-internal-autofill-selected": {
            color: "#000",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          padding: "20px",
          width: "100%",
        },
        elevation1: {
          background: "#FFFFFF0D",
          borderRadius: "12px",
          padding: "10px 17px",
          boxShadow: "none",
        },
        elevation2: {
          position: "relative",
          zIndex: "999",
          padding: "20px",
          borderRadius: "12px",
          background: "#FFFFFF08",
          "@media(max-width:767px)": {
            padding: "15px !important",
          },
        },
        elevation3: {
          padding: "0px",
          background: "transparent",
          borderRadius: "0px",
          position: "relative",
          border: "none",
          boxShadow: "none",
        },
        root: {
          boxShadow: "none",
          color: "#fff",
          width: "Auto",
          // '&.MuiAccordion-root .MuiCollapse-wrapper': {
          //   marginTop: "20px !important",
          // },
          "&.MuiAccordion-root": {
            backgroundColor: "none !important",
            background: "none !important",
          },
          "&.MuiAccordion-root.Mui-expanded:last-of-type": {
            background: "none !important",
            backgroundColor: "none !important",
          },
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: 99999,
        },
        paper: {
          background: "rgba(255, 255, 255, 0.03)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          alignItems: "self-start",
        },
        gutters: {
          paddingLeft: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255, 255, 255, 0.40)",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "4px",
          fontSize: "12px",
        },
        colorSecondary: {
          "&.Mui-checked": { color: "#000" },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          paddingBottom: "0",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          paddingLeft: "0px !important",
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          borderTop: "none",
          borderBottom: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperScrollPaper: {
          Width: 450,
          maxWidth: "100%",
        },

        paper: {
          backgroundColor: "#1C1A1E !important",
          overflow: "auto",
          position: "relative",
          borderRadius: "12px",
          padding: "20px",
          backdropFilter: "blur(50px)",

          "@media(max-width:767px)": {
            margin: "16px",
          },
        },
        paperWidthSm: {
          maxWidth: "500px !important",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          position: "relative",
          border: "1px solid #FFFFFF0D",
          borderRadius: "8px",
          padding: "10px",
          background: "#FFFFFF0D",
          // "height": "48px",

          "&::before": {
            // borderBottom: "1px solid #ffffff",
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
          "&::after": {
            borderBottom: "none !important",
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransform: "scaleX(0)",
            MozTransform: "scaleX(0)",
            MsTransform: "scaleX(0)",
            transform: "scaleX(0)",
            WebkitTransition:
              "-webkit-transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 400,
          color: "#FFFFFF99",

          lineHeight: "20px",
          // textTransform: "math-auto",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          padding: "0px !important",
          backgroundColor: "#000", // Change the background color here
        },
        tag: {
          backgroundColor: "#000",
        },
        inputRoot: {
          minHeight: "46px !important",
          padding: "5px",
        },
        option: {
          color: "#fff",
          fontSize: "14px !important",
          fontWeight: "400",
          lineHeight: "18px",
          letterSpacing: "0px",
          textAlign: "left",
        },
        input: {
          width: "0",
          color: "#fff",
          fontSize: "13px !important",
          fontWeight: "400",
        },
      },
    },
    MuiButton: {
      root: {
        background: "red",
        textTransform: "capitalize",
        "&:hover": {
          textDecoration: "none",
          backgroundColor: "none",
          // border: "1px solid rgba(255, 255, 255, 0.60)",
        },
      },
      styleOverrides: {
        containedSecondary: {
          color: "#FFFFFF",
          padding: "14.7px 40px",
          textTransform: "capitalize",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "11.06px",
          fontFamily: "'Outfit', sans-serif",
          background: "#FFFFFF0D",
          lineHeight: "21.71px",
          border: "1px solid #FFFFFF1A",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            color: "#FFFFFF",
            background: "linear-gradient(180deg, #806DFF 0%, #4A33E7 100%)",
          },
          // "@media (max-width: 780px)": {
          //   padding: "10px 20px",
          // },
        },

        sizeLarge: {
          padding: "14.7px 55px",
          fontSize: "14px",
        },

        sizeSmall: {
          padding: "8px 30px",
          fontSize: "14px",
        },
        containedPrimary: {
          color: "#FFFFFF",
          padding: "14.7px 40px",
          textTransform: "capitalize",
          fontSize: "14px",
          fontWeight: "400",
          borderRadius: "11.06px",
          fontFamily: "'Outfit', sans-serif",
          background: "linear-gradient(180deg, #806DFF 0%, #4A33E7 100%)",
          lineHeight: "21.71px",
          border: "1px solid #9A8AFE",
          boxShadow: "0px 0.83px 14.69px 0px #FFFFFF6E inset",

          "&:hover": {
            boxShadow: "none",
            border: "1px solid #FFFFFF1A",
            color: "#FFFFFF",
            background: "#FFFFFF0D",
          },
        },
        outlinedPrimary: {
          fontSize: "15px !important",
          fontWeight: "500",
          borderRadius: "50px",
          whiteSpace: "pre",
          padding: "8px 35px",
          border: "1px solid #81E396 !important",
          "&:hover": {
            color: "#fff",
            boxShadow: "none !important",
            backgroundColor:
              "linear-gradient(180deg, #FDA645 0%, #FF00CD 100%)",
          },
        },
        outlinedSecondary: {
          color: "#000000",
          padding: "12.7px 40px",
          textTransform: "capitalize",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "52px",
          border: "1px solid #0000001A",
          background: "transparent",
          lineHeight: "20px",
          height: "52.38px !important",
          "&:hover": {
            color: "#000000",
            background: "#80EC00",
          },
          "@media (max-width: 780px)": {
            padding: "10px 20px",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#757575",
        },
        root: {
          // height: "48px",
          // padding: "16px 16px 10px 0px",
          background: "transparent",
          position: "relative",
          border: "1px solid #FFFFFF0D",
          color: "#FFFFFFBF",
          padding: "0px",
        },
      },
      select: {
        padding: "15px",
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          outline: "0",
          background: "rgba(255, 255, 255, 0.03)",
          boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
          borderRadius: "8px",
          backdropFilter: "blur(40px)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { paddingLeft: "20px" },
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          background: "transparent !important",
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          // padding: "0px 65px !important",
          "@media (max-width: 780px)": {
            // padding: "0px 16px !important",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none !important",
          cursor: "pointer",
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0c1719",
          color: "#fff",
          "& .MuiPickersArrowSwitcher-button": {
            // backgroundColor: "transparent !important",
            // color: "#000 !important",
          },
          "& .MuiPickersCalendarHeader-switchViewButton": {
            backgroundColor: "transparent !important",
            color: "#000 !important",
            marginLeft: "-15px !important",
          },
          "& .css-1jsy6pn-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
            {
              color: "#fff !important",
              backgroundColor: "#000 !important",
              border: "none !important",
              borderRadius: "10px !important",
            },
          "& .MuiPaper-root-MuiPickersPopper-paper": {
            background: "#000 !important",
          },
          "& .Mui-selected": {
            backgroundColor: "#88e58f !important",
            color: "#fff !important",
            border: "none !important",
            borderRadius: "10px !important",
          },
          "& .MuiPickersCalendarHeader-root": {
            paddingLeft: "30px",
          },
          "& .MuiDayCalendar-slideTransition": {
            minHeight: "210px !important",
          },
          "& .MuiPickersCalendarHeader-labelContainer": {
            fontSize: "15px",
          },
        },
      },
    },
  },
};

export const createCustomTheme = (config = {}) => {
  let theme = createTheme({ ...baseOptions, ...themeOptions });

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
