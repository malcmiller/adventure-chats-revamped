import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function CategoryCheckbox({ category, isSelected, handleCategoryChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            value={category._id}
            checked={isSelected}
            onChange={handleCategoryChange}
            inputProps={{ "aria-label": category.name }}
          />
        }
        label={category.name}
      />
    </FormGroup>
  );
}

export default CategoryCheckbox;