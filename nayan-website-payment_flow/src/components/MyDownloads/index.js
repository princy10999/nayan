import React, { useState } from "react";
import Style from "./MyDownload.module.scss";
import EditDownload from "./EditDownload";
import Downloads from "./Downloads";
import { Fragment } from "react";
import Assets from "../Layout/CommonLayout/Asset";
import { Pagination } from "react-bootstrap";


function MyDownload() {
  const collectionData = [
    {
      id: "1",
      itemImage: Assets.productimg01,
      name: "Mango Tree",
      datevalue: "Nov 2, 2021",
    },
    {
      id: "2",
      itemImage: Assets.productimg01,
      name: "Mangow Tree",
      datevalue: "Nov 2, 2021",
    },
    {
      id: "3",
      itemImage: Assets.productimg01,
      name: "Mango Tree",
      datevalue: "Nov 2, 2021",
    },
    {
      id: "4",
      itemImage: Assets.productimg01,
      name: "Mango Tree",
      datevalue: "Nov 2, 2021",
    },
    {
      id: "5",
      itemImage: Assets.productimg01,
      name: "Mango Tree",
      datevalue: "Nov 2, 2021",
    },
    {
      id: "6",
      itemImage: Assets.productimg01,
      name: "Mango Tree",
      datevalue: "Nov 2, 2021",
    },
  ];

  const initialFormState = { id: null, name: "" };

  // Setting state
  const [collections, setCollections] = useState(collectionData);
  const [currentCollections, setCurrentCollections] =
    useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const deleteUser = (id) => {
    setEditing(false);

    setCollections(
      collections.filter(
        (collectionDataDelete) => collectionDataDelete.id !== id
      )
    );
  };

  const editRow = (collectionDataEdit) => {
    setEditing(true);
    setCurrentCollections({
      id: collectionDataEdit.id,
      name: collectionDataEdit.name,
      itemImage: collectionDataEdit.itemImage,
      datevalue: collectionDataEdit.datevalue,
    });
  };

  const updateCollection = (id, updatedCollection) => {
    setEditing(false);

    setCollections(
      collections.map((user) => (user.id === id ? updatedCollection : user))
    );
  };

  return (
    <div className={Style.grayBg}>
      <section className={Style.my_downloads}>
        <div className="container">
          <h2 className={Style.sectitle}>My Downloads</h2>
        </div>
        <div className={Style.add_collections}>
          <div className="container">
            {editing ? (
              <Fragment>
                <EditDownload
                  editing={editing}
                  setEditing={setEditing}
                  currentCollections={currentCollections}
                  updateCollection={updateCollection}
                />
              </Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <div>
        <Downloads
          collections={collections}
          editRow={editRow}
          deleteUser={deleteUser}
        />
      </div>
     
    </div>
  );
}
export default MyDownload;
