import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import { } from 'jest';
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: [
      'The Adventures of Huckleberry Finn',
      'The Adventures of Tom Sawyer',
      'The Prince and the Pauper',
      'A Connecticut Yankee in King Arthurs Court'
    ],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Mark_Twain_photo_portrait%2C_Feb_7%2C_1871%2C_cropped_Repair.jpg',
      imageSource: 'Wikimedia Commons',
      books: [
        'David Copperfield',
        'A Tale of Two Cities'
      ]
    },
  },
  highlight: 'none'
}

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <AuthorQuiz {...state} onAnswerSelected={() => { }} />,
      div
    );
  });

  describe("When no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => { }} />);
    });

    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    })
  });

  describe("When the first answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />
      );
      wrapper.find('.answer').first().simulate('click');
    });

    it("onAnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("Should receive The Shining", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith('The Shining');
    })
  });
});