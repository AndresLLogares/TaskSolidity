import React, { Fragment } from "react";
import classes from "../styles/tasks.module.scss";
import { Toggle2Off } from "@styled-icons/bootstrap/Toggle2Off";
import { Toggle2On } from "@styled-icons/bootstrap/Toggle2On";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
const TasksComponent = ({ Tasks, modifyTask, deleteTask }) => {
  const handleButton = (id) => {
    modifyTask(id);
  };

  const handleDelete = (id) => {
    deleteTask(id);
  };
  return (
    <main className={classes.main}>
      <div className={classes.divCenter}>
        <h4 className={classes.title}>Tasks</h4>
      </div>
      {Tasks &&
        Tasks.map((item, index) => (
          <div key={item.id} className={item.title ? classes.eachTask : classes.none}>
            {item.title !== "" ? (
              <Fragment>
                <div className={classes.divTask}>
                  <div className={classes.divDelete}>
                    <button
                      className={classes.buttonDelete}
                      onClick={() => handleDelete(item.id)}
                    >
                      <Delete className={classes.iconDelete} />{" "}
                    </button>
                  </div>
                  <p className={classes.text}>{item.title}</p>
                  <p className={classes.text}>{item.description}</p>
                  <p className={classes.text}>
                    {item.done ? "Completed" : "Not completed"}
                  </p>
                </div>
                {item.done ? (
                  <button
                    onClick={() => handleButton(item.id)}
                    className={classes.button}
                  >
                    <Toggle2On className={classes.icon} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleButton(item.id)}
                    className={classes.button}
                  >
                    <Toggle2Off className={classes.icon} />{" "}
                  </button>
                )}
              </Fragment>
            ) : null}
          </div>
        ))}
    </main>
  );
};

export default TasksComponent;
