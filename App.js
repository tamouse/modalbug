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
      <View style={styles.topBarContainer}>
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
    <View style={styles.resultsContainer}>
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

        <View style={styles.subContainer}>
          <Modal isOpen={this.state.searchOpen} position={'top'} swipeToClose={false} backButtonClose={true}>
            <ResultsModal/>
          </Modal>
        </View>
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

  topBarContainer: {
    position: 'absolute',
    top: 0,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white'
  },

  subContainer: {
    position: 'absolute',
    top: 50,
    bottom: 0,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'tomato'
  },

  searchContainer: {
    flex: 1
  },

  search: {
    color: 'black'
  },

  cancelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cancel: {
    color: 'blue',
  },

  resultsContainer: {
    flex: 1,
    backgroundColor: 'azure',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  }
});
