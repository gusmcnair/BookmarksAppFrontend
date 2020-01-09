import React, { Component } from 'react';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import { Route } from 'react-router-dom';
import BookmarksContext from './BookmarksContext.js';
import BookmarkEdit from './BookmarkEdit/BookmarkEdit'

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {

  constructor(){
    super()
    this.state = {
      page: 'list',
      bookmarks: [],
      error: null,
    };
  }

  changePage = (page) => {
    this.setState({ page })
  }

  setBookmarks = (newList) => {
    this.setState({
      bookmarks: newList,
      error: null,
      page: 'list',
    })
  }

  updateBookmark = (updatedBookmark) => {
    console.log(updatedBookmark)
    this.setState({
      bookmarks: this.state.bookmarks.map(bookmark =>
        (bookmark.id !== updatedBookmark.id) ? bookmark : updatedBookmark)
    })
  }

  deleteBookmark = (deleteBookmarkId) => {
    console.log(deleteBookmarkId)
    this.setState({
      bookmarks: this.state.bookmarks.filter(bookmark => (bookmark.id != deleteBookmarkId))
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      /*headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }*/
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(newList => {this.setBookmarks(newList)})
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark,
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
            <Route
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route
              path='/edit/:bookmarkId'
              component={BookmarkEdit}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
