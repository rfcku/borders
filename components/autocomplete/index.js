import { useEffect } from 'react';
import { Text, Input, Card, Grid } from "@nextui-org/react";
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/system';

const Label = styled('label')({
  display: 'block',
});

const Listbox = styled('ul')(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  overflow: 'auto',
  maxHeight: 200,
  borderRadius: 10,
  marginTop: 5,
'& .autocomplete-option': {
    borderBottom: '1px solid rgba(0,0,0,.15)',
    cursor: 'pointer',
    ':hover': {
        backgroundColor: 'rgba(0,0,0,.25)'
    },
  },
  '& li:active': {
    backgroundColor: '#2977f5',
  },
}));


export default function UseAutocomplete({options, onSelect}) {
    const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
  } = useAutocomplete({
    id: 'autoComplete',
    options,
    getOptionLabel: (option) => option.label,
  });
  useEffect(() => {
    if (value) onSelect(value.label)
  }, [value, onSelect])
  return (
    <div>
      <div {...getRootProps()}>
        <Input 
        {...getInputProps()} 
        placeholder="Search ...." 
        clearable
        />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
            <Card>
                <Grid.Container gap={1}>
                    {groupedOptions.map((option, index) => (
                    <Grid xs={12} key={options.label} className="autocomplete-option">
                        <Text {...getOptionProps({ option, index })}>{option.label}</Text>
                    </Grid>
                ))}
            </Grid.Container>
            </Card>
        </Listbox>
      ) : null}
    </div>
  );
}
