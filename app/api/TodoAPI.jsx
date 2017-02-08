var $ = require('jquery');

module.exports = {
  setTodos: function (todos) {
     if($.isArray(todos)){
       localStorage.setItem('todos', JSON.stringify(todos));
       return todos;
     }
  },
  getTodos: function(){
    var stringTodos = localStorage.getItem('todos');
    var todos = [];

    try {
      todos = JSON.parse(stringTodos);
    }  catch(e){

    }
    return $.isArray(todos) ? todos : [];
  },
  filterTodos: function(todos, showCompleted, searchText){

    var filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo)=>{
      return !todo.completed || showCompleted;
    });
    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo)=>{
      var todoText = todo.text.toLowerCase();
      return searchText.length === 0 || todoText.indexOf(searchText) > -1
    })
    // Short with non complete first
    filteredTodos.sort((todoA, todoB)=>{
      ;
      if (!todoA.completed && todoB.completed){
        return -1; //todoA before todoB
      } else if (todoA.completed && !todoB.completed){
        return 1; //todoA after todoB
      } else {
        return 0;
      }
    })

    return filteredTodos
  }
};
