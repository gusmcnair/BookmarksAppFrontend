import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';
import {Link} from 'react-router-dom';
import BookmarksContext from '../BookmarksContext'



export default class BookmarkItem extends React.Component {
  static contextType = BookmarksContext;

  deleteBookmarkRequest(bookmarkId) {
    fetch(`http://localhost:8000/api/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          return response
        }
      })
      .then(data => {
        this.context.deleteBookmark(bookmarkId)
      })
      .catch(error => {
        console.error(error)
      })
  }

  render(){
  return (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={this.props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {this.props.title}
          </a>
        </h3>
        <Rating value={this.props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {this.props.description}
      </p>
      <div className='BookmarkItem__buttons'>
      <button
              className='BookmarkItem__description'>
            <Link to={`/edit/${this.props.id}`}>
              Edit
            </Link>
            </button>
            {' '}
            <button
              className='BookmarkItem__description'
              onClick={() =>
                this.deleteBookmarkRequest(this.props.id)
              }
            >
              Delete
            </button>
          </div>
    </li>
    )}
}
