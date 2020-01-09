import React from 'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config'

export default class BookmarkEdit extends React.Component {
    static contextType = BookmarksContext;

    constructor(props){
        super(props)
        this.state = {
            id: '',
            title: '',
            url: '',
            description: '',
            rating: 1,
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const {bookmarkId} = this.props.match.params
        const {id, title, url, description, rating} = this.state
        const newBookmark = {
            id, 
            title,
            url,
            description,
            rating}
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(newBookmark),
            headers: {
                'content-type': 'application/json',
              }
        })
        .then(response => {
            if(response.ok){
                return response;
            }
        })
        .then(
            response => this.context.updateBookmark(newBookmark),
            this.resetFields(newBookmark),
            this.props.history.goBack(),
        
        )
        .catch(err => console.log(err))
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            title: newFields.title || '',
            url: newFields.url || '',
            description: newFields.description || '',
            rating: newFields.rating || '',
        })
    }

    componentDidMount(){
        const bookmarkId = this.props.match.params.bookmarkId
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'GET'
        })
        .then(response => {
            if (response.ok){
                return response.json();
            }
        })
        .then(response =>  
        this.setState({
            id: response.id,
            url: response.url,
            title: response.title,
            description: response.description,
            rating: response.rating
        }),
        )
        .catch(err => console.log(err))
    }

    handleChange = (value, id) => {
        this.setState({
            [id]: value
        })
    }

    render(){
        const {id, title, url, description, rating} = this.state;
        return(
            <form>
                <label htmlFor='id'>ID</label>
                <input name='id' id='id' type='number' value={id} onChange={e => this.handleChange(e.target.value, e.target.id)}/><br/>
                <label htmlFor='title'>Title</label>
                <input name='title' id='title' type='text' value={title} onChange={e => this.handleChange(e.target.value, e.target.id)}/><br/>
                <label htmlFor='url'>URL</label>
                <input name='url' id='url' type='url' value={url} onChange={e => this.handleChange(e.target.value, e.target.id)}/><br/>
                <label htmlFor='description'>Description</label>
                <input name='description' id='description' type='text' value={description} onChange={e => this.handleChange(e.target.value, e.target.id)}/><br/>
                <label htmlFor='rating'>Rating</label>
                <input name='rating' id='rating' type='number' min= '1' max='5' value={rating} onChange={e => this.handleChange(e.target.value, e.target.id)}/><br/>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}