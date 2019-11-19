import React, { useState, useEffect } from "react";
import BarcodeReader from "react-barcode-reader";

import "./style.scss";

const BarcodeWrapper = ({ addNewValue }) => {
  const [result, setResult] = useState("No result");
  const [error, setError] = useState(true);

  const handleScan = data => {
    console.log("Received data: ", data);
    addNewValue(data);
    setResult(data);
    setError(false);
  };

  const handleError = error => {
    console.log("FIRED ERROR: ", error);
    setResult("TOO SLOW, TRY AGAIN");
    setError(true);
  };

  return (
    <div>
      <BarcodeReader onError={handleError} onScan={handleScan} />
      <div
        className={
          "uk-margin-medium-top uk-margin-medium-bottom uk-margin-medium-left uk-margin uk-text-large " +
          (error ? "uk-text-danger" : "uk-text-success")
        }
      >
        {`Barcode Output: ${result}`}
      </div>
    </div>
  );
};

const dataList = [...Array(1)].map((el, index) => [
  `delete`,
  `Scanned_UPC ${index}`,
  `item_name ${index}`,
  `completed ${index}`
]);

function App() {
  const [dataNew, setDataNew] = useState(dataList);

  const deleteHandler = id => {
    console.log("DELETING: ", id);
    const newD = dataNew.filter((item, index) => index !== id && item);

    setDataNew(newD);
  };

  const addBarcodeValue = value => {
    const obj = ["delete", value, "test", "test"];
    console.log("OBJ: ", obj);
    console.log("addBarcodeValue: ", dataNew);
    setDataNew(c => [...c, obj]);
  };

  useEffect(() => {
    console.log("dataNew: ", dataNew);
  }, [dataNew]);

  return (
    <div className="App uk-margin-top">
      <nav>
        <button className="uk-button uk-button-default uk-margin-medium-left uk-margin-medium-right">
          Create New Manifest
        </button>
        <button className="uk-button uk-button-default">Manage Manifest</button>
      </nav>

      <main>
        <div>
          <BarcodeWrapper addNewValue={addBarcodeValue} />
        </div>
        <div className="table-wrapper">
          <table className="uk-table uk-table-small uk-table-divider uk-table-hover">
            <thead>
              <tr>
                <th className="uk-width-small"></th>
                <th className="uk-width-small">UPC</th>
                <th className="uk-width-small">Item Name</th>
                <th className="uk-width-small">Completed</th>
              </tr>
            </thead>
            <tbody>
              {dataNew.map((pEl, ind) => (
                <tr key={ind}>
                  {pEl.map((cEl, idx) => (
                    <td
                      key={idx}
                      className={
                        idx === 1 || idx === 2 ? "uk-divider-vertical" : ""
                      }
                    >
                      {idx === 0 ? (
                        <button
                          className="uk-button uk-button-danger"
                          onClick={() => deleteHandler(ind)}
                        >
                          {cEl}
                        </button>
                      ) : (
                        cEl
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
