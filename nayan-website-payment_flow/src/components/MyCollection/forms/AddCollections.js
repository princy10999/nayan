import React, { useState } from "react";
import Style from "../MyCollection.module.scss";

const AddCollections = (props) => {
  const initialFormState = { id: null, name: "" };
  const [addCollection, setAddCollection] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setAddCollection({ ...addCollection, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!addCollection.name) return;

        props.addCollection(addCollection);
        setAddCollection(initialFormState);
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
            value={addCollection.name}
            onChange={handleInputChange}
            className={Style.form_control}
            autoComplete="off"
          />
          <button type="submit" className={Style.create_btn}>
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCollections;
