import { useScreenWidth } from "./../../hooks/useScreenWidth";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type Items = {
  id: number;
  name: string;
};

interface BaseAutocompleteProps {
  items: Items[];
}

export function BaseAutocomplete({ items }: BaseAutocompleteProps) {
  const screenWidth = useScreenWidth();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Autocomplete
      multiple
      freeSolo
      limitTags={screenWidth < 768 ? 2 : 4}
      disableCloseOnSelect
      options={items}
      getOptionLabel={(tags) => (typeof tags === "string" ? tags : tags.name)}
      sx={{ width: screenWidth < 768 ? "100%" : "513px" }}
      renderInput={(params) => (
        <TextField {...params} label="Buscar tags" placeholder="" />
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
    />
  );
}
