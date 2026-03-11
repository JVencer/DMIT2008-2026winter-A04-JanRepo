import { useState } from 'react';

// MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function TodoList() {

  /* [stateVariable, stateVariableSetter] = useState(defaultValue)

      [variable, function] -> think [noun, verb]

      The setter is the *only* thing allowed to change the value of the state variable.

      When the setter function fires (i.e. data in the state variable changes), the component
      automatically re-renders.
  */
  const [todoText, setTodoText] = useState("")
  const [todoList, setTodoList] = useState([])

  const onTodoTextChange = (event) => {
    // Call the state variable's setter with a new value to write to that variable.
    setTodoText(event.target.value)
    console.log(event.target.value)
  }

  const onAddTodoClick = () => {
    console.log("clicked!")
    // Take the existing todo list and append the new item to it;
    // we can't just e.g. .push to the array because state variables are immutable,
    // and the setter just overwrites the value of the variable, so we need to 
    // prepare the array first.
    const newTodos = [...todoList, todoText] // -> on 'add' click, add text input text as a new element to the list
    setTodoList(newTodos)
    // Campsite rules: reset the input field after submission
    setTodoText("")
  }


  return <Box sx={{ flexGrow: 1 }}>

      <Grid container spacing={2}>

          {/* Updating Grid to the new component API:
              - we don't need to specify an 'item' prop; Grid components are now items by default
              - we don't use "xs" (old shorthand/prop for horizontal size); we just use 'size'
          */}
          <Grid size={12}>
            <Typography variant="h2" component="h2">
              Our Todo List
            </Typography>
          </Grid>

          <Grid size={10}>
              <TextField
                  id="standard-basic"
                  label="New Todo Item"
                  variant="standard"
                  sx={{ width: '100%' }}
                  onChange={onTodoTextChange}
                  value={todoText}
              />
          </Grid>

          <Grid size={2}>
            <Button
              variant="contained"
              onClick={onAddTodoClick}
            >Add Todo</Button>
          </Grid>

          <Grid size={12}>

            <List sx={{ width: '75%' }}>
              {
                todoList.map(
                  (todo, index) => {
                    return <ListItem key={index}>
                      <ListItemText>
                        <Typography>{todo}</Typography>
                      </ListItemText>
                    </ListItem>
                  }
                )
              }
            </List>

          </Grid>

    </Grid>
  </Box>
}
