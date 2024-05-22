import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const UserSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userToFind, setUserToFind] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    console.log('Search query:', query);
    try {
      const response = await fetch(`https://clubhouse-6uml.onrender.com/api/search/user:${query}`);
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      const data = await response.json();
      setUserToFind(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
});

export default UserSearchBar;
