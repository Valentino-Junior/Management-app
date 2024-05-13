import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FeaturesScreen() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  const handleAddTask = () => {
    if (editingTaskIndex !== null) {
      // Edit existing task
      const updatedTasks = tasks.map((item, index) => (index === editingTaskIndex ? task : item));
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }
    setTask('');
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setEditingTaskIndex(index);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Button title={editingTaskIndex !== null ? "Edit Task" : "Add Task"} onPress={handleAddTask} color="#841584" />
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleEditTask(index)} style={styles.iconButton}>
                <Ionicons name="pencil" size={24} color="#841584" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(index)} style={styles.iconButton}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
  },
  task: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
});


