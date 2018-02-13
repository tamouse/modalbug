import React from 'react';
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox'

class SearchBar extends React.Component {

  state = {
    text: ''
  }

  render() {
    const {open, cancel, showCancel} = this.props
    return (
      <View style={styles.rowContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            ref="input"
            onFocus={open}
            onChangeText={text => {
              this.setState({text})
            }}
            style={styles.search}
            value={this.state.text}
            placeholder="Search"
          />
        </View>
        {showCancel && <CancelButton cancel={cancel}/>}
      </View>
    )
  }
}

SearchBar.propTypes = {
  open: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  showCancel: PropTypes.bool
}

const CancelButton = props => {
  const {cancel} = props
  return (
    <TouchableOpacity onPress={cancel} style={styles.cancelContainer}>
      <Text style={styles.cancel}>Cancel</Text>
    </TouchableOpacity>
  )
}
CancelButton.propTypes = {
  cancel: PropTypes.func.isRequired
}

const ResultsModal = () => {
  return (
    <View style={styles.container}>
      <Text>Results would show up here if there were any</Text>
    </View>
  )
}

export default class App extends React.Component {
  state = {
    searchOpen: false,
    showCancel: false,
  }

  openSearch = () => this.setState({searchOpen: true})
  cancelSearch = () => this.setState({searchOpen: false})

  render() {
    return (
      <View style={styles.container}>
        <SearchBar open={this.openSearch} cancel={this.cancelSearch} showCancel={this.state.searchOpen}/>

        <Modal isOpen={this.state.searchOpen}>
          <Text>hello world</Text>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },

  searchContainer: {
    flex: 1
  },

  search: {
    color: 'black'
  },

  cancelContainer: {
    flex: 1,
  },

  cancel: {
    color: 'blue',
  },
});
