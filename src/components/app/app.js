import React, {Component} from "react";

import AppHeader from "../app-header/";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink tea"),
      this.createTodoItem("Eat meat"),
      this.createTodoItem("Sleep a lot")
    ],
    filterFlag: "All",
    searchText: ""
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {  
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id );

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    })
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return {
        todoData: newArray
      }
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id );

    const oldItem = arr[idx];
    const newItem = {...oldItem, 
      [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });  
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  doneFilter = () => {
    this.setState(({ filterFlag }) => {
      return {
        filterFlag: "Done"
      }
    });
  };

  activeFilter = () => {
    this.setState(({ filterFlag }) => {
      return {
        filterFlag: "Active"
      }
    });
  };

  allFilter = () => {
    this.setState(({ filterFlag }) => {
      return {
        filterFlag: "All"
      }
    });
  };

  setSearch = (text) => {
    this.setState(({ searchText }) => {
      return {
        searchText: text
      }
    });
  }

  search = (items, term) => {
    if(term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    });
  }

  render() {

    let visibleItems = []

    const { todoData, filterFlag, searchText } = this.state;

    const doneCount = todoData
      .filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    switch(filterFlag) {
      case "Active": 
        visibleItems  = todoData.filter((el) => el.done === false);
        break;
      case "Done":
        visibleItems = todoData.filter((el) => el.done === true);
        break;
      case "All":
        visibleItems = todoData;
        break;
      default:
        break;
    }

     visibleItems = this.search(visibleItems, searchText);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearch={this.setSearch}/>
          <ItemStatusFilter
            onDoneFilter={ this.doneFilter }
            onActiveFilter={ this.activeFilter }
            onAllFilter={this.allFilter} />
        </div>
  
        <TodoList 
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
          />
          <ItemAddForm 
            onItemAdded = { this.addItem }/>
      </div>
    );
  }
};