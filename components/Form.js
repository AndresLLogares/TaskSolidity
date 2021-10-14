import React, { useState } from "react";
import classes from "../styles/form.module.scss";
import { Subtitles } from "@styled-icons/material-sharp/Subtitles";
import { TextDescription } from "@styled-icons/fluentui-system-filled/TextDescription";
const Form = ({ createTask }) => {
  const [tasksInput, setTaskInput] = useState({
    title: "",
    description: "",
  });

  const handlInputChange = (event) => {
    setTaskInput({ ...tasksInput, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask(tasksInput.title, tasksInput.description);
    setTaskInput({
      title: "",
      description: "",
    });
  };

  return (
    <main className={classes.main}>
      <div className={classes.divCenter}>
        <h4 className={classes.title}>Create a new task</h4>
      </div>
      <form onSubmit={handleSubmit} className={classes.divCenter}>
        <div className={classes.eachInput}>
          <label className={classes.label}>
            <Subtitles className={classes.icons} /> Title{" "}
          </label>
          <input
            value={tasksInput.title}
            required={true}
            type="text"
            name="title"
            onChange={handlInputChange}
            className={classes.input}
          />
        </div>
        <div className={classes.eachInput}>
          <label className={classes.label}>
            <TextDescription className={classes.icons} />
            Description
          </label>
          <input
            value={tasksInput.description}
            required={true}
            type="text"
            name="description"
            onChange={handlInputChange}
            className={classes.input}
          />
        </div>
        <div className={classes.divCenter}>
          <button type="submit" className={classes.buttonSubmit}>
            Submit
          </button>
        </div>
      </form>
    </main>
  );
};

export default Form;
