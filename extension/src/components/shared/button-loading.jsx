import React from "react";
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";

const ButtonLoading = ({ handleClick, children, type, loading, style }) => {
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="primary"
      style={style}
      type={type || "button"}
      disabled={loading}
    >
      {!loading && children}
      {loading && <CircularProgress size={20} />}
    </Button>
  );
};

export default ButtonLoading;
