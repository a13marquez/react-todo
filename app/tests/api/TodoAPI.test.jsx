var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', ()=>{
  beforeEach(()=>{
    localStorage.removeItem('todos')
  });
  it('should exist',()=>{
    expect('TodoAPI').toExist();
  }),

  describe('setTodos', () => {
    it('should set valid todos array', ()=>{
      var todos = [{
        id:23,
        test: 'test all files',
        completed:false
      }];
      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);
    });

    it('should not set valid todos array', ()=>{
      var badTodos = {a:'b'};
      TodoAPI.setTodos(badTodos);

      expect(localStorage.getItem('todos')).toEqual(null);
    });
  });

  describe('getTodos', () => {
    it ('should return empty array for bad localstorage data', ()=>{
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([])
    });

    it('should return todos if valid array ind localstorage', ()=>{
      var todos = [{
        id:23,
        test: 'test all files',
        completed:false
      }];
      localStorage.setItem('todos', JSON.stringify(todos));

      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });
  });

  describe('filterTodos', () => {
    var todos = [{
      id:1,
      text: 'Some text here',
      completed:true
    },{
      id:2,
      text: 'Other text here',
      completed:false
    },
    {
      id:3,
      text: 'Some text here',
      completed:true
    }];

    it('should return all items if showCompleted is true', ()=>{
      var filterTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filterTodos.length).toBe(3);
    });
    it('should return only not completed items if showCompleted is false', ()=>{
      var filterTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filterTodos.length).toBe(1);
    });
    it('should short by completed status', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true,'');
      expect(filteredTodos[0].completed).toBe(false);
    });
    it('should filter todos by searchText', ()=>{
      var filterTodos = TodoAPI.filterTodos(todos, true, 'some');
      expect(filterTodos.length).toBe(2);
    });

    it('should return all todos if searchText is empty', ()=>{
      var filterTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filterTodos.length).toBe(3);
    });

  });
});