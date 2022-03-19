import React, { Component } from 'react';
import Modal from './components/Modal';
import axios from 'axios';
import Geocode from 'react-geocode';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const LazyLoadGoogleMaps = React.lazy(() => import('./components/GoogleMaps'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: '',
        description: '',
        location: {
          city: '',
          coordinates: {
            lat: 0,
            lng: 0,
          },
        },
        completed: false,
      },
      todoList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get('http://localhost:8000/api/todos/')
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  renderItems = () => {
    const newItems = this.state.todoList.filter(
      (item) => item.completed === this.state.viewCompleted
    );

    const handleDelete = (item) => {
      axios
        .delete(`http://localhost:8000/api/todos/${item.id}`)
        .then((res) => this.refreshList());
    };

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? 'completed-todo' : ''
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() =>
              this.setState({ activeItem: item, modal: !this.state.modal })
            }
            className="btn btn-secondary mr-2"
          >
            {' '}
            Edit{' '}
          </button>
          <button onClick={() => handleDelete(item)} className="btn btn-danger">
            Delete{' '}
          </button>
        </span>
      </li>
    ));
  };

  handleSubmit = (item) => {
    this.setState({ modal: !this.state.modal });

    Geocode.fromAddress(item.location.city)
      .then((res) => {
        item.location.coordinates = res.results[0].geometry.location;
      })
      .then(() => {
        console.log('submitted', item);
        if (item.id) {
          axios
            .put(`http://localhost:8000/api/todos/${item.id}/`, item)
            .then((res) => this.refreshList());
        } else {
          axios
            .post('http://localhost:8000/api/todos/', item)
            .then((res) => this.refreshList());
        }
      })
      .catch((e) => console.error(e));
  };

  createItem = () => {
    const item = {
      title: '',
      description: '',
      location: {
        city: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },
      completed: false,
    };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add task
                </button>
              </div>

              <div className="my-5 tab-list">
                <span
                  onClick={() => this.setState({ viewCompleted: true })}
                  className={this.state.viewCompleted ? 'active' : ''}
                >
                  Complete
                </span>
                <span
                  onClick={() => this.setState({ viewCompleted: false })}
                  className={this.state.viewCompleted ? '' : 'active'}
                >
                  Incomplete
                </span>
              </div>

              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>

        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={() => this.setState({ modal: !this.state.modal })}
            onSave={this.handleSubmit}
          />
        ) : null}

        <React.Suspense
          fallback={
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
              <CircularProgress />
            </Box>
          }
        >
          <LazyLoadGoogleMaps />
        </React.Suspense>
      </main>
    );
  }
}
export default App;
