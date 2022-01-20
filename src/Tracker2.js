import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import './Tracker.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useHistory } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const button = {
    marginLeft: '-1vw',
    alignItems: 'center',
    width: '44vw',
    backgroundColor: '#0950D5',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    height: '56px',
    marginTop: '2%',
    marginBottom: '2%'
}

const AddBtn = {
    backgroundColor: '#0950D5', color: '#88898F', height: '80%', alignItems: 'center', backgroundColor: '#0950D5',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
}

function Tracker2() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const [list, setList] = useState({ name: '', amount: '', mode_of_transaction: '', date: '', description: '' });
    const [items, setItems] = useState([]);
    const [editSingleItem, setEditSingleItem] = useState('Add');
    let income = 0, expense = 0;

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setList({ ...list, [name]: value })
    }

    const addToList = (e) => {
        e.preventDefault();
        let price = parseInt(list.amount)
        if (list.name && list.amount && list.mode_of_transaction && list.description) {
            const newRequirement = { ...list, id: new Date().getTime().toString() };
            setItems([...items, newRequirement]);
            setList({ name: '', amount: '', mode_of_transaction: 'Mode', date: '', description: '' })
            setEditSingleItem('Add');
        }

    }

    items.forEach((item) => {
        if (item.amount > 0) {
            income = income + parseInt(item.amount);
        }
        else {
            income = income - parseInt(-1 * item.amount);
            expense = expense + parseInt(-1 * item.amount);
        }
    })



    const deleteItem = (id) => {
        const newList = items.filter((singleItems) => singleItems.id !== id);
        setItems(newList);
    }

    const editItem = (id) => {
        setEditSingleItem('Edit');
        const filteredItems = items.filter(filterItem => filterItem.id !== id);
        const selectedItem = items.find(findItem => findItem.id === id);
        console.log(selectedItem);
        setList({ name: selectedItem.name, amount: selectedItem.amount, mode_of_transaction: selectedItem.mode_of_transaction, date: selectedItem.date, description: selectedItem.description })
        setItems(filteredItems);
    }

    return (
        <div>
            <div className="createList" style={{ width: '100vw', marginTop: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Grid container sx={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Grid item md={12}>
                        <p style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '900', color: '#454C59', textAlign: 'center' }}>Total amount left   <FaRupeeSign /> {income}</p>
                    </Grid>
                    <Grid item md={12} sx={{ width: '100%' }}>
                        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid item md={5} >
                                <p style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: '#0EC576', textAlign: 'center', }}>Income</p>
                                <p style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: '#454C59', textAlign: 'center' }}><FaRupeeSign /> {income}</p>
                            </Grid>
                            <Grid item md={2}></Grid>
                            <Grid item md={5}>
                                <p style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: '#EA4C89', textAlign: 'center' }}>Expense</p>
                                <p style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: '#454C59', textAlign: 'center' }}><FaRupeeSign /> {expense}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Card sx={{ width: '90vw', backgroundColor: 'white' }}>
                    <CardContent>
                        <Grid container spacing={3} columns={16}>
                            <Grid item md={3} xs={16}>
                                <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif' }} required id="name" label="Item" name="name" value={list.name} onChange={handleChange} />
                            </Grid>
                            <Grid item md={3} xs={16}>
                                <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif' }} required id="amount" label="Amount" name="amount" value={list.amount} onChange={handleChange} />
                            </Grid>

                            <Grid item md={3} xs={16}>
                                <Box sx={{ minWidth: '95%', fontFamily: 'Readex Pro, sans-serif', marginTop: '6%' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                                        <Select
                                            required id="mode_of_transaction" label="Mode" name="mode_of_transaction" value={list.mode_of_transaction} onChange={handleChange}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'cash'}>Cash</MenuItem>
                                            <MenuItem value={'card'}>Card</MenuItem>
                                            <MenuItem value={'online'}>Online</MenuItem>
                                            <MenuItem value={'others'}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item md={3} xs={16}>
                                <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif' }} type='date' required id="date" name="date" value={list.date} onChange={handleChange} />
                            </Grid>
                            <Grid item md={3} xs={16}>
                                <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif' }} required id="description" label="Details" name="description" value={list.description} onChange={handleChange} />
                            </Grid>
                            <Grid item md={1} mt={2} xs={16} >
                                <Button onClick={addToList} style={AddBtn} sx={{ width: '100%' }}>{editSingleItem}</Button>
                            </Grid>
                        </Grid>
                        <p style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: '#454C59' }}>Your Transactions</p>
                        {/* {
                            items.map((itemInList) => {
                                return <>
                                    <Grid container spacing={3} columns={16} mb={2} key={itemInList.id}>
                                        <Grid item md={3}>
                                            <p className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'}>{itemInList.name}</p>
                                        </Grid>
                                        <Grid item md={3} >
                                            <p className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'}>{itemInList.amount}</p>
                                        </Grid>
                                        <Grid item md={3}>
                                            <p className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'}>{itemInList.mode_of_transaction}</p>
                                        </Grid>
                                        <Grid item md={3}>
                                            <p className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'}>{itemInList.date}</p>
                                        </Grid>
                                        <Grid item md={3}>
                                            <p className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'}>{itemInList.description}</p>
                                        </Grid>
                                        <Grid item md={1} mt={2} sx={{ width: '100%' }}>
                                            <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Grid item md={12} mt={2} sx={{ width: '40px' }}>
                                                    <EditIcon sx={{ width: '20px', height: '20px', marginRight: '5px', color: '#0EC576' }} onClick={() => editItem(itemInList.id)} />
                                                    <DeleteIcon sx={{ width: '20px', height: '20px', color: '#EA4C89' }} onClick={() => deleteItem(itemInList.id)} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            })
                        } */}
                        <TableContainer component={Paper} sx={{ marginTop: '5%', width: '98%' }}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableBody>
                                    {items.map((itemInList) => {
                                        return <StyledTableRow key={itemInList.id}>
                                            <StyledTableCell component="th" scope="row" className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'} style={{ width: '10%' }}> {itemInList.name}</StyledTableCell>
                                            <StyledTableCell align="left" className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'} style={{ width: '10%' }}>{itemInList.amount}</StyledTableCell>
                                            <StyledTableCell align="left" className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'} style={{ width: '10%' }}>{itemInList.mode_of_transaction}</StyledTableCell>
                                            <StyledTableCell align="left" className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'} style={{ width: '10%' }}>{itemInList.date}</StyledTableCell>
                                            <StyledTableCell align="left" className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'} style={{ width: '10%' }}>{itemInList.description}</StyledTableCell>
                                            <StyledTableCell align="left" className={itemInList.amount > 0 ? 'income listItems' : 'expense listItems'} style={{ width: '10%' }}><EditIcon sx={{ width: '20px', height: '20px', marginRight: '5px', color: '#0EC576' }} onClick={() => editItem(itemInList.id)} />
                                                <DeleteIcon sx={{ width: '20px', height: '20px', color: '#EA4C89' }} onClick={() => deleteItem(itemInList.id)} /></StyledTableCell>
                                        </StyledTableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export default Tracker2


