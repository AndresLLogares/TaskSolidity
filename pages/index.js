import React, { Fragment, useEffect, useState } from "react";
import { getWeb3, getTasks } from "../utils.js";
import Head from "next/head";
import classes from "../styles/home.module.scss";
import Form from "../components/Form";
import TaskComponent from "../components/Tasks";
import { Solidity } from "@styled-icons/simple-icons/Solidity";
import { ethers } from "ethers";

const auxFunction = (array) => {};
export default function Home() {
  const [web3, setWeb3] = useState(undefined);
  const [tasks, setTasks] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [arrayTasks, setArrayTasks] = useState([]);

  useEffect(() => {
    const fetchSmart = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const tasks = await getTasks(web3);
      setWeb3(web3);
      setTasks(tasks);
      setAccounts(accounts);
      let count = await tasks.methods.taskCounter().call();
      await auxFunction(count, tasks);
    };
  /*   fetchSmart(); */
  }, []);
  const auxFunction = async (count, contract) => {
    let aux = [];
    for (let i = 1; i <= count; i++) {
      let result = await contract.methods.Tasks(i).call();
      let id = result[0];
      let title = result[1];
      let description = result[2];
      let done = result[3];
      aux.push({ id: id, title: title, description: description, done: done });
    }
    setArrayTasks(aux);
  };
  const createTask = async (title, description) => {
    await tasks.methods
      .createTask(title, description)
      .send({ from: accounts[0] });
    let count = await tasks.methods.taskCounter().call();
    await auxFunction(count, tasks);
  };

  const modifyTask = async (id) => {
    await tasks.methods.modifyTask(id).send({ from: accounts[0] });
    let count = await tasks.methods.taskCounter().call();
    await auxFunction(count, tasks);
  };

  const deleteTask = async (id) => {
    await tasks.methods.deleteTask(id).send({ from: accounts[0] });
    let count = await tasks.methods.taskCounter().call();
    await auxFunction(count, tasks);
  };

  return (
    <div>
      <Head>
        <title>Tasks</title>
        <meta name="description" content="Created by Andres Logares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.main}>
        {!tasks || !accounts || !web3 ? (
          <div className={classes.divLoader}>
          <div className={classes.loader}><div></div></div>
          </div>
        ) : (
          <Fragment>
            <div className={classes.flexCenter}>
              <h4 className={classes.title}>
                Tasks Solidity <Solidity className={classes.icons} />
              </h4>
            </div>
            <div className={classes.flexRow}>
              <Form createTask={createTask} />
              <TaskComponent
                Tasks={arrayTasks}
                modifyTask={modifyTask}
                deleteTask={deleteTask}
              />
            </div>
          </Fragment>
        )}
      </main>
    </div>
  );
}
