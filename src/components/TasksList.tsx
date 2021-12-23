import React from "react";
import { FlatList, StyleSheet } from "react-native";

import TaskListItem from "./TaskListItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (id: number, newTaskTitle: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  handleEditTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskListItem
            done={item.done}
            id={item.id}
            index={index}
            title={item.title}
            key={item.title}
            removeTask={removeTask}
            toggleTaskDone={toggleTaskDone}
            handleEditTask={handleEditTask}
          />
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
