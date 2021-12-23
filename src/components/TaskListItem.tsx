import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { ItemWrapper } from "./ItemWrapper";
import { Task } from "./TasksList";
import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen.png";
import closeIcon from "../assets/icons/close.png";

import Icon from "react-native-vector-icons/Feather";

interface ITaskListItemProps extends Task {
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (id: number, newTaskTitle: string) => void;
}

const TaskListItem = ({
  id,
  done,
  title,
  index,
  toggleTaskDone,
  removeTask,
  handleEditTask,
}: ITaskListItemProps) => {
  const [isTaskBeingEdited, setIsTaskBeingEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = () => {
    setIsTaskBeingEdited(true);
  };

  const handleCancelEditing = () => {
    setNewTitle(title);
    setIsTaskBeingEdited(false);
  };

  const handleSubmitEditing = () => {
    handleEditTask(id, newTitle);
    setIsTaskBeingEdited(false);
  };

  useEffect(() => {
    if (textInputRef.current) {
      if (isTaskBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isTaskBeingEdited]);

  const handleRemoveTask = (id: number) => {
    Alert.alert("Remover item", "Tem certeza que deseja remover este item?", [
      {
        text: "Sim",
        onPress: () => removeTask(id),
      },
      {
        text: "Não",
      },
    ]);
  };

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(id)}
          //TODO - use onPress (toggle task) prop
        >
          <View
            testID={`marker-${index}`}
            style={done ? styles.taskMarkerDone : styles.taskMarker}
            //TODO - use style prop
          >
            {done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <TextInput
            //TODO - use style prop
            style={done ? styles.taskTextDone : styles.taskText}
            editable={isTaskBeingEdited}
            value={newTitle}
            onChangeText={setNewTitle}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.taskIcons}>
        {isTaskBeingEdited ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => handleCancelEditing()}
            style={styles.closeButton}
          >
            <Image source={closeIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => handleStartEditing()}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => handleRemoveTask(id)}
          disabled={isTaskBeingEdited ? true : false}
          style={isTaskBeingEdited && styles.trashEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  taskIcons: {
    flexDirection: "row",
    paddingRight: 24,
    width: 100,
    justifyContent: "space-between",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
  },
  trashEditing: {
    opacity: 0.2,
  },
});

export default TaskListItem;
