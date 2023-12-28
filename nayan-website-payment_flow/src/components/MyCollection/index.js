import React, { useState } from "react";
import Style from "./MyCollection.module.scss";
import AddCollections from "./forms/AddCollections";
import EditCollections from "./forms/EditCollections";
import Collections from "./Collections";
import { Fragment } from "react";


function MyCollection() {
  const collectionData = [
    { id: 1, name: 'Trees' },

    
  ];

  const initialFormState = { id: null, name: "" };

  // Setting state
  const [collections, setCollections] = useState(collectionData);
  const [currentCollections, setCurrentCollections] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addCollection = (collectionDataAdd) => {
    collectionDataAdd.id = collections.length + 1;
    setCollections([...collections, collectionDataAdd]);
  };

  const deleteUser = (id) => {
    setEditing(false);

    setCollections(collections.filter((collectionDataDelete) => collectionDataDelete.id !== id));
  };

  const editRow = (collectionDataEdit) => {
    setEditing(true);
    setCurrentCollections({ id: collectionDataEdit.id, name: collectionDataEdit.name });
  };


  const updateCollection = (id, updatedCollection) => {
		setEditing(false)

		setCollections(collections.map(user => (user.id === id ? updatedCollection : user)))
	}



  return (
    <div className={Style.grayBg}>
      <section className={Style.my_collection}>
        <div className="container">
          <h2 className={Style.sectitle}>My Collection</h2>
        </div>
          <div className={Style.add_collections}>
            <div className="container">
              {editing ? (
                <Fragment>
                  <EditCollections
                    editing={editing}
                    setEditing={setEditing}
                    currentCollections={currentCollections}
                    updateCollection={updateCollection}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <AddCollections addCollection={addCollection} />
                </Fragment>
              )}
            </div>
          </div>
      </section>
      <div>
        <Collections
          collections={collections}
          editRow={editRow}
          deleteUser={deleteUser}
        />
      </div>
    </div>
  );
}
export default MyCollection;
