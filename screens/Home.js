import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db,firebase_auth } from '../firebaseConfig';
import Login from './Login';

const Home = ({navigation}) => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null); // Lưu trữ ID của todo đang được chỉnh sửa

  // Lấy dữ liệu todo từ Firestore
  const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todoList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
        console.log(querySnapshot.docs)
  
    setTodos(todoList);
  };
  const handleSignOut = async()=>{
    try{
        await firebase_auth.signOut();
        console.log("ra rồi")
        navigation.navigate(Login)
    } catch(e){
        console.log(e);
    }
  }

  // Hàm thêm hoặc cập nhật todo
  const handleSave = async () => {
    if (editId) {
      const todoDoc = doc(db, "todos", editId);
      await updateDoc(todoDoc, { text: input });
      setEditId(null);
    } else {
      // Nếu không có ID, thực hiện thêm mới
      await addDoc(collection(db, "todos"), {
        text: input
      });
    }
    setInput(''); // Xóa input sau khi lưu
    fetchTodos(); // Tải lại danh sách
  };

  // Hàm chỉnh sửa todo
  const handleEdit = (id, text) => {
    setEditId(id); // Đặt ID của todo cần chỉnh sửa
    setInput(text); // Đặt nội dung của todo cần chỉnh sửa vào input
  };

  // Hàm xóa todo
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    fetchTodos(); // Tải lại danh sách sau khi xóa
  };

  // Tải danh sách todos khi component được render lần đầu
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập công việc..."
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <Button
        title={editId ? "Cập nhật" : "Thêm"}
        onPress={handleSave}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleEdit(item.id, item.text)}>
                <Text style={styles.editButton}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button
        title="Đăng xuất khỏi trái đất"
        onPress={handleSignOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  todoText: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default Home;
