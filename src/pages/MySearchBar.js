import React from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class MySearchBar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;

    return (
      <SearchBar
        placeholder="게시물을 검색해보세요"
        onChangeText={this.updateSearch}
        value={search}
        placeholderTextColor={'#8E8D8D'}
        leftIconContainerStyle={{backgroundColor: '#F5F5F7'}}
        inputContainerStyle={{backgroundColor: '#F5F5F7'}}
        searchIcon={{color: 'black'}}
        clearIcon={{color: 'black'}}
        inputStyle={{
          backgroundColor: '#F5F5F7',
          color: 'black',
        }}
        containerStyle={{
          // backgroundColor: 'none',
          backgroundColor: '#F5F5F7',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
      />
    );
  }
}
