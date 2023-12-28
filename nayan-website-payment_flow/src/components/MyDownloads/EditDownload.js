import React, { useState, useEffect } from "react";
import Style from "./MyDownload.module.scss";

const EditDownload = (props) => {
  const [editCollection, setEditCollection] = useState(props.currentCollections);

  useEffect(() => {
    setEditCollection(props.currentCollections);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditCollection({ ...editCollection, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateCollection(editCollection.id, editCollection);
      }}
    >
      <div className={Style.add_wrapper}>
        <div className={Style.input_holder}>
          <input
            type="text"
            name="name"
            value={editCollection.name}
            onChange={handleInputChange}
            className={Style.form_control}
          />
          <button type="submit" className={Style.create_btn}>
            Update
          </button>

          <button
            onClick={() => props.setEditing(false)}
            className={Style.create_btn}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditDownload;
