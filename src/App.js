import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import restResponse from "./data/restResponse";
import { Grid, Cell, Button } from "react-mdl";
import MaterialScoreTable from "./components/MateriaScorelTable";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      scoresList: [],
      dataListChanged: false
    };
  }

  url = "http://eec1ea6b.ngrok.io/scores";
  _asynch = null;

  getScoreListFromAPI = () => {
    this._asynch = axios
      .get(this.url) // JSON File Path

      .then(response => {
        const scoresList = response.data.scoreList;
        console.log(response.status);
        console.log(response.data);
        console.log(
          "size of scorelist before get " + this.state.scoresList.length
        );
        console.log("size of scorelist after get " + scoresList.length);
        scoresList.map(item => {
          console.log(item.id + " " + item.playerName + " " + item.score);
        });

        this.setState({
          scoresList: scoresList,
          dataListChanged: !this.state.dataListChanged
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  postScoreToAPI = scoreItem => {
    axios
      .post(this.url, scoreItem, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        console.log(response.status);
        console.log(response.data);
        console.log(
          "size of scorelist before addition " + this.state.scoresList.length
        );
        const scoresList = this.state.scoresList;
        scoresList.push(response.data);
        console.log(
          "size of scorelist after addition " + this.state.scoresList.length
        );
        scoresList.map(item => {
          console.log(item.id + " " + item.playerName + " " + item.score);
        });

        this.setState({
          scoresList: scoresList
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  putScoreToAPI = (oldScoreItem, scoreItem) => {
    axios
      .put(this.url, scoreItem, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        const scoresList = this.state.scoresList;
        console.log(response.status);
        console.log(response.data);
        console.log(
          "size of scorelist before put " + this.state.scoresList.length
        );
        scoresList.map(item => {
          console.log(item.id + " " + item.playerName + " " + item.score);
        });
        console.log("index of score item " + scoresList.indexOf(oldScoreItem));
        scoresList.splice(scoresList.indexOf(oldScoreItem), 1);
        scoresList.push(response.data);
        console.log(
          "size of scorelist after put " + this.state.scoresList.length
        );
        scoresList.map(item => {
          console.log(item.id + " " + item.playerName + " " + item.score);
        });

        this.setState({
          scoresList: scoresList
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  deleteScoreToAPI = scoreItem => {
    console.log("deleteScoreToAPI called");
    axios
      .delete(this.url + "/" + scoreItem.id, scoreItem, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        const scoresList = this.state.scoresList;
        console.log(response.status);
        console.log(response.data);
        console.log(
          "size of scorelist before delet " + this.state.scoresList.length
        );
        scoresList.map(item => {
          console.log(item.id + " " + item.playerName + " " + item.score);
        });
        console.log("index of score item " + scoresList.indexOf(scoreItem));
        scoresList.splice(scoresList.indexOf(scoreItem), 1);
        console.log(
          "size of scorelist after delete " + this.state.scoresList.length
        );
        scoresList.map(item => {
          console.log(item.id + " " + item.playerName + " " + item.score);
        });

        this.setState({
          scoresList: scoresList
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onRowAdd = (event, data) => {
    console.log("onRowAdd called");
    this.postScoreToAPI(data);
  };

  onRowDelete = (event, data) => {
    console.log("onRowDelete called");
    this.deleteScoreToAPI(data);
  };

  onRowUpdate = (event, oldData, data) => {
    console.log("onRawUpdate called");
    this.putScoreToAPI(oldData, data);
  };

  componentDidMount() {
    this.getScoreListFromAPI();
    /*axios
      .get("http://localhost:8080/scores") // JSON File Path

      .then(response => {
        const scoresList = response.data.scoreList;
        this.setState({
          scoresList: scoresList
        });
      })
      .catch(function(error) {
        console.log(error);
      });*/
  }

  render() {
    console.log(
      " render is called when size of stte scorelist is " +
        this.state.scoresList.length +
        " dataListChanged is " +
        this.state.dataListChanged
    );
    if (!this._asynch) {
      return <div />;
    } else {
      return (
        <div style={{ width: "80%", margin: "auto" }}>
          <Grid className="demo-grid-ruler">
            <Cell col={12}>
              <MaterialScoreTable
                dataListChanged={this.state.dataListChanged}
                dataList={this.state.scoresList}
                onRowAdd={this.onRowAdd}
                onRowUpdate={this.onRowUpdate}
                onRowDelete={this.onRowDelete}
              />
            </Cell>
          </Grid>
          <Grid className="demo-grid-1">
            <Cell col={4}></Cell>
          </Grid>
        </div>
      );
    }
  }
}
