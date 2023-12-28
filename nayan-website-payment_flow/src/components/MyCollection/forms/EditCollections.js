import React, { useState, useEffect } from "react";
import Style from "../MyCollection.module.scss";

const EditCollections = (props) => {
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
        <label /* for="media_upload"  */className={Style.add_btn}>
          <span class="icon-plus"></span>
        </label>
        {/* <input type="file" name="media_upload" id="media_upload" /> */}
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

export default EditCollections;
