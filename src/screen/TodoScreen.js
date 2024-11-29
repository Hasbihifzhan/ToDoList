import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Fallback from '../components/Fallback';

console.log(Date.now().toString);

const TodoScreen = () => {
  // init local states
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  // handle add todo
  const handleAddTodo = () => {
    // structure of a single todo item
    // {
    //   id:
    //   title:
    // }

    if (todo === '') {
      return;
    }

    setTodoList([...todoList, {id: Date.now().toString(), title: todo}]);
    setTodo('');
  };

  // Handle Delete
  const handleDeleteTodo = id => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);

    setTodoList(updatedTodoList);
  };

  // Handle Edit

  const handleEditTodo = todo => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  // Handle Update

  const handleUpdateTodo = () => {
    const UpdatedTodos = todoList.map(item => {
      if (item.id === editedTodo.id) {
        return {...item, title: todo};
      }

      return item;
    });
    setTodoList(UpdatedTodos);
    setEditedTodo(null);
    setTodo('');
  };

  // render todo
  const renderTodos = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#1e90ff',
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 1,
          shadowRadius: 3,
        }}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 800, flex: 1}}>
          {item.title}
        </Text>
        const myIcon1 ={' '}
        <Icon
          name="pencil"
          size={20}
          color="#fff"
          marginHorizontal={20}
          onPress={() => handleEditTodo(item)}
        />
        const myIcon2 ={' '}
        <Icon
          name="trash-can"
          size={20}
          color="#fff"
          marginHorizontal={10}
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };
  return (
    <View style={{marginHorizontal: 16}}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: '#1e90ff',
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginTop: 10,
        }}
        placeholder="Add a task"
        value={todo}
        onChangeText={userText => setTodo(userText)}
      />

      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: 'center',
          }}
          onPress={() => handleUpdateTodo()}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: 'center',
          }}
          onPress={() => handleAddTodo()}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      {/* R ender todo list */}

      <FlatList data={todoList} renderItem={renderTodos} />

      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
