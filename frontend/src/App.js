import React, { Component } from 'react';
import Modal from './components/Modal';
import axios from 'axios';
import Geocode from 'react-geocode';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import FormData from 'form-data';

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
          name: '',
          lat: null,
          lng: null,
        },
        // selectedFile: null,
        completed: false,
      },
      modal: false,
      todoList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get('api/todos/')
      .then((res) => {
        console.log('res.data', res.data);
        this.setState({ todoList: res.data });
      })
      .catch((err) => console.log(err));
  };

  renderItems = () => {
    const newItems = this.state.todoList.filter(
      (item) => item.completed === this.state.viewCompleted
    );

    const handleDelete = async (item) => {
      axios
        .delete(`api/todos/${item.id}`)
        .then(() => axios.delete(`api/locations/${item.location.id}`))
        .then(() => this.refreshList());
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

  handleSubmit = async (item) => {
    if (item.location.name) {
      const res = await Geocode.fromAddress(item.location.name);
      if (res.results[0].geometry.location) {
        item.location.lat = res.results[0].geometry.location.lat;
        item.location.lng = res.results[0].geometry.location.lng;
      }

      const response = await axios.post('api/locations/', item.location);

      if (response.status === 201) {
        item.location = response.data.id;
      }
    } else {
      item.location = null;
    }

    // if (item.selectedFile) {
    //   const formData = new FormData();
    //   formData.append('myFile', item.selectedFile, item.selectedFile.name);

    //   item.selectedFile = formData;
    //   await axios.post('http://localhost:8080/upload', formData);
    // }

    console.log('item', item);
    if (item.id) {
      await axios.put(`api/todos/${item.id}/`, item);
    } else {
      await axios.post('api/todos/', item);
    }

    this.refreshList();
    this.setState({ modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button
                  onClick={() => this.setState({ modal: !this.state.modal })}
                  className="btn btn-primary"
                >
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
          <LazyLoadGoogleMaps todoList={this.state.todoList} />
        </React.Suspense>
      </main>
    );
  }
}
export default App;
