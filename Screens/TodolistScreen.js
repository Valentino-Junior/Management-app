import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function TodolistScreen() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const navigation = useNavigation();

  const handleAddTask = () => {
    const trimmedTask = task.trim();
    if (trimmedTask) {
      if (editingTaskIndex !== null) {
        // Edit existing task
        const updatedTasks = tasks.map((item, index) => (index === editingTaskIndex ? trimmedTask : item));
        setTasks(updatedTasks);
        setEditingTaskIndex(null);
      } else {
        // Add new task
        setTasks([...tasks, trimmedTask]);
      }
      setTask('');
    }
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>To-Do List</Text>
      </View>
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
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
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
