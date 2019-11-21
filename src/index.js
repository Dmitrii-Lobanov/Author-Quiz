import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from "./AddAuthorForm";
//import registerServiceWorker from './registerServiceWorker';
import { shuffle, sample } from 'underscore';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Mark_Twain_photo_portrait%2C_Feb_7%2C_1871%2C_cropped_Repair.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'The Adventures of Huckleberry Finn',
      'The Adventures of Tom Sawyer',
      'The Prince and the Pauper',
      'A Connecticut Yankee in King Arthurs Court'
    ]
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Joseph_Conrad.PNG',
    imageSource: 'Wikimedia Commons',
    books: [
      'Lord Jim',
      'Nostromo',
      'The Shadow Line',
      'The Rover'
    ]
  },
  {
    name: 'J. K. Rowling',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Jk-rowling-crop.JPG',
    imageSource: 'Wikimedia Commons',
    books: [
      'Harry Potter and the Sorcerers Stone'
    ]
  },
  {
    name: 'Stephen King',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'The Shining',
      'It'
    ]
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Dickens_Gurney_head.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'David Copperfield',
      'A Tale of Two Cities'
    ]
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'https://commons.wikimedia.org/wiki/File:Shakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: [
      'Hamlet',
      'Macbeth',
      'Romeo and Juliet'
    ]
  }
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find(author =>
      author.books.some(title =>
        title == answer))
  }
}

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  }
}

function reducer(state, action) {
  return state;
}

let store = Redux.createStore(reducer);
let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(book => book == answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App() {
  return (
  <ReactRedux.Provider store={store}>
    <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={() => {
      state = resetState();
      render();
    }} />
  </ReactRedux.Provider>
  )}

const AuthorWrapper = withRouter(({ history }) =>
  <AddAuthorForm onAddAuthor={author => {
    authors.push(author);
    history.push('/');
  }} />
);

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root'));
}
render();

//registerServiceWorker();
