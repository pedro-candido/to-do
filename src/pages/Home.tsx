import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const isTaskTitleExists = (title: string): boolean => {
    const isExists = tasks.find((item) => item.title === title) ? true : false;
    return isExists;
  };

  function handleAddTask(newTaskTitle: string) {
    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    if (isTaskTitleExists(newTaskTitle) === false) {
      setTasks((oldState) => [...oldState, task]);
    } else {
      Alert.alert("Opa, task já existente");
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newTask: Task = { ...task, done: !task.done };
        return newTask;
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks((oldState) => oldState.filter((task) => task.id !== id));
  }

  const handleEditTask = (id: number, newTaskTitle: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newTask: Task = {
          ...task,
          title: newTaskTitle,
        };

        return newTask;
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        handleEditTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
