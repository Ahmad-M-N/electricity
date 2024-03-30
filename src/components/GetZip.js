import { Button, TextField} from '@mui/material';
import Stack from '@mui/material/Stack';
import { margin } from '@mui/system';
import {DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses} from '@mui/x-data-grid';
import {useState} from 'react';
import { key } from '../constants';
import {ThemeProvider } from '@mui/material/styles';
import {MyTheme} from './MyTheme'

const GetZip = () => {


    const columns = 
        [
            {field: 'this_zip', headerName: 'Zip', width: 200},
            {field: 'state_name', headerName: 'State', width: 200},
            {field: 'yearly_usage', headerName: 'Est. Yearly Usage', width: 200},
            {field: 'maxBill', headerName: 'Maximum Bill', width: 200},
            {field: 'minBill', headerName: 'Minimum Bill', width: 200}
        ]

    const [zips,setZips]=useState([]);
    const [zip,setZip]=useState('')

    const fetchData = () => {
        fetch ('https://apis.wattbuy.com/v3/electricity/estimation?zip='+zip, 
        {
            method: 'GET',
            headers: 
                {
                    accept: 'application/json',
                    'x-api-key': key
                }
        })
        .then(response => response.json())
        .then(responseData => {
            setZips([
                {
                    ['this_zip']:zip,
                    ['state_name']:responseData.state_name,
                    ['maxBill']:responseData.est_bill_amount.max, 
                    ['minBill']:responseData.est_bill_amount.min,
                    ['yearly_usage']:responseData.est_usage
                },...zips])   
        })
        .catch(err => console.error(err));
    }

    function CustomToolbar(){
        return (
            <GridToolbarContainer className={gridClasses.toolbarContainer}>
                <GridToolbarExport/>
            </GridToolbarContainer>
        )
    }
    
    return (
        <div>
            <Stack mt={4} lineHeight={3} alignItems="center" justifyContent="center" verticalAlign="middle">
            <div id="zipBox" style={{height:140, width:'30%', horizontalAlign:'middle'}}>()
                <TextField 
                    name='ZipCode' label="Enter ZipCode" color='secondary'
                    value={zip} onChange={e=> setZip(e.target.value)}
                />
                <br/>
                <ThemeProvider theme={MyTheme}>
                <Button color='primary' variant='contained' onClick={fetchData}>Look Up</Button>
                </ThemeProvider>
            </div>
            </Stack>
            <Stack alignItems="center" justifyContent="center">
                <div style={{ height: 340, width: '60%'}}>
                    <p id="exportText">Click Export to download or print table</p>
                    <DataGrid                         
                        rows={zips}
                        columns={columns}
                        disableRowSelectionOnClick={true}
                        getRowId={row=> row.this_zip}
                        components={{Toolbar: CustomToolbar}}
                    />
                </div>
            </Stack>
        </div>
    );
}

export default GetZip;