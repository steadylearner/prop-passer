// refer this to test with Jest later
// Syntax is very similar

import React from 'react';
import { shallow } from 'enzyme';
import { MarkdownPreview } from '../';

describe('MarkdownPreview', () => {
  it('should display markdown', () => {
    const text = '# Title';
    const wrapper = shallow(<MarkdownPreview value={text} />);
    expect(wrapper.html()).toBe('<div><h1>Title</h1>\n</div>');
  });
  it('should sanitize the HTML verify it not to be equal', () => {
    const test = '<h1>Title</h1>';
    const wrapper = shallow(<MarkdownPreview value={test} markedOptions={{ sanitize: true }} />);
    expect(wrapper.html())
      .not.toBe(test); // "<div><p>&lt;h1&gt;Title&lt;/h1&gt;</p></div>"
  });  
});



