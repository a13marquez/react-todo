var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe("TodoApp", ()=>{
  it("Should exist", ()=>{
    expect(TodoApp).toExist();
  });

  it('should add todo to the todos states on handleAddTodo', ()=>{
    var todoText = 'test test';
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);

    todoApp.setState({todos:[]});
    todoApp.handleAddTodo(todoText);
    expect(todoApp.state.todos[0].text).toBe(todoText);
  });

  it('should toggle completed value when handleToggle is called', ()=>{
    var todoData = {
      id:11,
      text:'Test features',
      completed:false,
      createdAt: 0,
      completedAt: null
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState({todos:[todoData]});
    expect(todoApp.state.todos[0].completed).toBe(false);
    todoApp.handleToggle(11);
    expect(todoApp.state.todos[0].completed).toBe(true);
    //Expect completedAt to be a number
    expect(todoApp.state.todos[0].completedAt).toBeA('number')
  });

  it('should toggle from true to false completedAt get removed', ()=>{
    var todoData = {
      id:11,
      text:'Test features',
      completed:true,
      createdAt: 0,
      completedAt: null
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState({todos:[todoData]});
    expect(todoApp.state.todos[0].completed).toBe(true);
    todoApp.handleToggle(11);
    expect(todoApp.state.todos[0].completed).toBe(false);
    //Expect completedAt to be a number
    expect(todoApp.state.todos[0].completedAt).toBe(null)
  });

});
