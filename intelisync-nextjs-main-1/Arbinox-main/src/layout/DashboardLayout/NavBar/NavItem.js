import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, Button, Collapse, ListItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { borderBottom, borderLeft, styled } from "@mui/system"; // Import styled from @mui/system
import { useRouter } from "next/router";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "block",
  paddingTop: 0,
  paddingBottom: 0,
  [theme.breakpoints.up("md")]: {
    // display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  "& .MuiSvgIcon-root": {
    color: "rgba(255, 255, 255, 0.4)",
    transition: "color 0.3s",
  },
}));

const StyledButton = styled(Button)(({ theme, open }) => ({
  color: open ? "#fff" : "#000",
  textTransform: "none",
  letterSpacing: 0,
  width: "100%",
  fontSize: "14px",
  padding: "14px 16px",
  fontWeight: 600,
  justifyContent: "flex-start",
  marginBottom: "15px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
  "&:hover": {
    color: "#000000",
    backgroundColor: "#FFFFFF08",
    "& $icon": {
      color: "#fff",
    },
    "& span": {
      color: "#fff !important",
      justifyContent: "center",
    },
  },
  "& svg": {
    color: open ? "#fff" : "",
    margin: "0 6px",
  },
  "&.Mui-disabled": {
    color: "#fff !important",
  },
  "&:hover, &.active": {
    color: "#fff",
    backgroundColor: "#FFFFFF08",
    "& svg": {
      color: "#fff",
    },
    "& span": {
      color: "#fff !important",
      justifyContent: "center",
    },
  },
}));

const StyledButtonLeaf = styled(Button)(({ theme, open }) => ({
  color: "#FFFFFF80",
  justifyContent: "center",
  textTransform: "none",
  letterSpacing: 0,

  marginBottom: "15px",
  borderRadius: 0,
  borderRadius: "0px",
  fontSize: "14px",
  padding: "14px 16px",
  fontWeight: 300,
  lineHeight: "20.16px",
  pointerEvents: open ? "none" : "",
  display: "flex",
  alignItems: "center",
  width: "110%",
  borderLeft: "2px solid transparent",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
  "& svg": {
    margin: "0 6px",
  },
  "&.Mui-disabled": {
    color: "#fff !important",
  },
  "&:hover, &.active": {
    color: "#FFFFFF",
    backgroundColor: "#FFFFFF08",
    borderLeft: "2px solid #806dff !important",
    borderBottom: "none !important",
    "& svg": {
      color: "#FFFFFF",
    },
    "& span": {
      color: "#FFFFFF",
      justifyContent: "center",
    },
  },
  "& li": {
    "& $title": {
      marginLeft: "30px",
    },
  },
  "&.depth-0": {
    "& $title": {
      fontWeight: 400,
      fontSize: "14px",
      whiteSpace: "pre",
    },
  },
}));

const StyledIcon = styled("span")(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: open ? "#fff" : "#FFFFFF99",
}));

const StyledTitle = styled("span")(({ theme, open }) => ({
  marginRight: "auto",
  color: open ? "#fff" : "#FFFFFF99",
  wordBreak: "break-word",
  lineHeight: "normal",
}));

const StyledCollapse = styled(Collapse)({
  margin: "0 27px",
  // border: "1px solid #474b47",
});

const NavItem = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProp,
  title,
  tabview,
  setSelectedTab,
  onMobileClose,
  ...rest
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(openProp);

  useEffect(() => {
    if (tabview === "Sniper") {
      setSelectedTab(tabview);
    }
  }, [tabview]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const isActive = router.asPath === href;
  function isGettingQuantum(value) {
    const regex = /quantum/;
    if (regex.test(value)) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  useEffect(() => {
    if (isGettingQuantum(router.route)) {
      setOpen(true);
    } else setOpen(false);
  }, [router.route]);
  if (children) {
    return (
      <StyledListItem
        className={clsx(className)}
        disableGutters
        key={title}
        {...rest}
      >
        <StyledButton open={open} onClick={handleToggle}>
          {" "}
          <Box className="displayStart">
            {Icon && <StyledIcon open={open}>{<Icon size="20" />}</StyledIcon>}
            <StyledTitle open={open}>{title}</StyledTitle>
          </Box>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledButton>
        <StyledCollapse in={open}>{children}</StyledCollapse>
      </StyledListItem>
    );
  }

  return (
    <StyledListItem
      className={clsx(className)}
      disableGutters
      key={title}
      {...rest}
    >
      <StyledButtonLeaf
        className={clsx(`depth-${depth}`, isActive && "active")}
        onClick={() => {
          if (!isActive) {
            onMobileClose();
            router.push(href);
          }
        }}
        open={isActive}
        exact
      >
        {Icon && <StyledIcon>{<Icon size="20" />}</StyledIcon>}
        <StyledTitle open={false}>{title}</StyledTitle>
        {Info && <Info />}
      </StyledButtonLeaf>
    </StyledListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
