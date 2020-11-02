import React, { Fragment } from "react";
import Radio from "@material-ui/core/Radio";

const ChooseEnv = ({ envList, env, setEnv }) => (
  <div>
    {envList.map((envItem, id) => (
      <Fragment key={envItem + id}>
        <Radio checked={env === id} onChange={() => setEnv(id)} value={id} />
        <span>{envItem}</span>
      </Fragment>
    ))}
  </div>
);

export default ChooseEnv;
