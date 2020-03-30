import React from "react";
import MaterialTable from "material-table";
import restResponse from "../data/restResponse";

export default function MaterialScoreTable(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "playerName" },
      { title: "Score", field: "score", type: "numeric" }
    ],
    data: props.dataList,
    dataListChanged: props.dataListChanged
  });

  console.log("size of data inside table " + state.data.length);

  return (
    <MaterialTable
      title="Andres Score"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                props.onRowAdd(null, newData);
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),

        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  props.onRowUpdate(null, oldData, newData);
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                props.onRowDelete(null, oldData);
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
