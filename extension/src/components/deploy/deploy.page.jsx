import React, {
  useCallback,
  // useRef,
  useState,
} from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Button from "@material-ui/core/Button";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
// import Popper from "@material-ui/core/Popper";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";

const envList = ["ash1", "ash2"];
const options = ["install", "deploy", "start", "clean", "seed", "destroy"];

const Deploy = ({ url }) => {
  const [env, setEnv] = useState("ash1");
  // const [open, setOpen] = useState(false);
  // const anchorRef = useRef(null);
  // const [selectedIndex, setSelectedIndex] = useState(1);

  const [checkboxState, setCheckboxState] = useState(
    options.reduce((acc, val) => {
      acc[val] = false;

      return acc;
    }, {})
  );

  const handleCheckboxStateChange = (e) => {
    setCheckboxState({ ...checkboxState, [e.target.name]: e.target.checked });
  };

  const handleChange = useCallback((e) => {
    setEnv(e.target.value);
  }, []);

  const handleClick = () => {
    const { install, deploy, start, clean, seed, destroy } = checkboxState;
    window.open(
      `https://trilogy.devspaces.com/#env=${env},install=${install},clean=${clean},deploy=${deploy},start=${start},seed=${seed},destroy=${destroy}/${url}`
    );
  };

  // const handleMenuItemClick = (event, index) => {
  //   setSelectedIndex(index);
  //   setOpen(false);
  // };

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };
  //
  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //
  //   setOpen(false);
  // };

  return (
    <div className={"col"}>
      <div className={"mb-4"}>
        <FormControl component={"fieldset"}>
          <FormLabel component={"legend"}>Choose your env</FormLabel>

          <RadioGroup name={"env"} value={env} onChange={handleChange}>
            <div className={`row`}>
              {envList.map((envVal) => (
                <FormControlLabel
                  key={envVal}
                  control={<Radio />}
                  label={envVal}
                  value={envVal}
                />
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      </div>

      <FormGroup row>
        {options.map((option) => (
          <FormControlLabel
            option={option}
            control={<Checkbox checked={checkboxState[option]} />}
            onChange={handleCheckboxStateChange}
            name={option}
            color={"primary"}
            label={option}
          />
        ))}
      </FormGroup>

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClick}
      >
        Launch
      </Button>

      {/*<ButtonGroup
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="deploy only"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>*/}
    </div>
  );
};

export default Deploy;
