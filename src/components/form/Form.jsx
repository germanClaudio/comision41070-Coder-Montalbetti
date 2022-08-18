import React, { useState } from 'react'
import { Alert, Button, Card, FormControl, Input, InputAdornment, InputLabel } from '@mui/material'
import { useCartContext } from '../../context/CartContext'
import { AccountCircle } from '@mui/icons-material'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Swal from 'sweetalert2';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { addDoc, collection, documentId, query, getFirestore, getDocs, writeBatch, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from "firebase/storage"

import { Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css'

const form = () => {

    const { cartList, finalEmptyCart, getCartTotal, getItemTotal, dateOrderCreated, dateOrderPrinted } = useCartContext()
    const [completeName, setCompleteName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailRepeat, setEmailRepeat] = useState('');
    const [flag, setFlag] = useState(true);

    const dateOrderPrintedPDF = dateOrderPrinted();

    // Create a root reference
    const storage = getStorage();
    const metadata = {
        contentType: 'application/pdf',
      };
    const filePath = `ordersPDF/LaChauffer_Order_${dateOrderPrintedPDF}.pdf`
    const fileName = `LaChauffer_Order_${dateOrderPrintedPDF}.pdf`

    const storageRef = ref(storage, filePath);
    
    // Generate pdf file, save on user's pc and open new tab with it
    const generatePdf = () => {
        let pdf = new jsPDF("p", "pt", "a4");

        const file = pdf.html(document.getElementById("orderPDF"), {
                callback: function(pdf) {
                    pdf.output('save', fileName);
                }
            });
       
       uploadBytes(storageRef, file, metadata).then(() => { //snapshot
            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Your Order has been saved on FireStore',
                showConfirmButton: false,
                timer: 1750
              })
          });
        }

    const handleInfo = (event) => {
        event.preventDefault(); // prevent page refresh
        let formFieldName = '';

        const swalFire = () => {
            Swal.fire({
                icon: 'error',
                title: `${formFieldName} can't be empty!`,
                text: `Please check ${formFieldName} field!`,
                footer: `Pay attention!!!`,
                showCancelButton: false,
                confirmButtonColor: '#3030d6',
                confirmButtonText: 'Check!',
            })
        }

        if (completeName == null || completeName == "" || completeName == undefined || completeName.length === 0) {
            formFieldName = 'Name'
            swalFire();

        } else if (phone == null || phone == "" || phone == undefined || phone.length === 0) {
            formFieldName = 'Phone'
            swalFire();

        } else if (email == null || email == "") {
            formFieldName = 'Emails'
            swalFire();
        }

        else if (email == undefined && email.split("").filter((x) => x === "@").length !== 1 || email.indexOf(".") === -1) {
            Swal.fire({
                icon: 'error',
                title: `Email should contain a @ and at least one dot!`,
                text: `Please check email's fields!`,
                footer: `Pay attention!!!`,
                showCancelButton: false,
                confirmButtonColor: '#3030d6',
                confirmButtonText: 'Check!',
            })

        } else if (email !== emailRepeat) {
            Swal.fire({
                icon: 'error',
                title: `Emails must be the same!`,
                text: `Please check email's fields!`,
                footer: `Pay attention!!!`,
                showCancelButton: false,
                confirmButtonColor: '#3030d6',
                confirmButtonText: 'Check!',
            })

        } else {
            setFlag(false)
        }

    }

    //  clear all input values in the form
    const resetForm = () => {
        setCompleteName('')
        setPhone('')
        setEmail('')
        setEmailRepeat('')
    }


    const generateOrder = async () => {
        const order = {};
        order.buyer = { name: completeName, phone: phone, email: email }

        order.items = cartList.map(product => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: product.quantity
            }
        })

        const orderItems = order.items
        const showOrdersAction = orderItems.map(
            function(product)
                {return '<li className="list-group-item list-group-item-success">' + product.title 
                               + ' - Unit Price: $' + product.price 
                               + ' - Qty.: ' + product.quantity 
                               + ' - Sub-Total: $' + (product.quantity * product.price) + '</li>'
                }).join(' ')
        
        const orderBuyer = order.buyer;        
        const showOrderBuyer = () => {
            return '<li className="list-group-item list-group-item-secondary">Name: ' + orderBuyer.name + '</li>'
                 + '<li className="list-group-item list-group-item-secondary">Phone: ' + orderBuyer.phone + '</li>'
                 + '<li className="list-group-item list-group-item-secondary">Em@il: ' + orderBuyer.email + '</li>'
        }
        
        order.total = getCartTotal().toFixed(2);
        order.itemTotal = getItemTotal();
        order.date = dateOrderCreated();

        if (order.total != 0 && order.itemTotal != 0) {

            const db = getFirestore();
            const queryOrders = collection(db, 'orders')
            
            addDoc(queryOrders, order)
                .then((resp) => 
                    (Swal.fire({
                                icon: 'success',
                                title: `Your Order # ${resp.id}<br>has been generated succesfully!!`,
                                width: 775,
                                html: ` <div id="orderPDF" className="my-2 mx-1"><br>
                                            <img className="imgHomePage" src="/src/logoLaChauffer.png" alt="Logo Perfumes" width="150" height="120" title="La Chauffer"/><br><br>
                                            Order Id#: <strong>${resp.id}</strong><br>
                                            <hr>
                                            Total Qty. Items: ${order.itemTotal} <br><br> 
                                            <ul className="list-group">${showOrdersAction} </ul><br>
                                            Total Order Price: <strong>$${order.total}</strong><br>
                                            ${dateOrderCreated()} <br>
                                            <hr>
                                            Buyer: <ul className="list-group">${showOrderBuyer()}</ul>

                                        </div>`,
                               
                                footer: `Thanks you for your choise, Enjoy it!`,
                                showCancelButton: true,
                                confirmButtonColor: '#2d572C',
                                confirmButtonText: 'Print Order',
                                cancelButtonText: 'Done!',
                                cancelButtonColor: '#2d2C57',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                            }))).then((result) => {
                                if (result.isConfirmed) {
                                    generatePdf();
                            }})

                .catch(err => console.log(err))
            
            //Update stock products in Cart
            const queryCollectionStock = collection(db, 'items')

            const queryUpdateStock = query(
                queryCollectionStock,
                where(documentId(), 'in', cartList.map(item => item.id))
            )
            const batch = writeBatch(db);

            await getDocs(queryUpdateStock)
                .then(resp => resp.docs.forEach(res => batch.update(res.ref, {
                    stock: res.data().stock - cartList.find(item => item.id === res.id).quantity } )))
                .catch(err => console.log(err))
                .finally(() => finalEmptyCart());

            batch.commit();
        }
    }

    return (

        <Card sx={{
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            flexDirection: 'column',
            height: 'auto',
            width: '35%',
            backgroundColor: '#fbf0fb',
        }}
            elevation={24}
        >
                    <Form>
                        <Alert variant="filled" severity="info">
                            Fill the form order to complete your Shopping!
                        </Alert>

                        <FormControl disabled={!flag} variant="standard"
                            sx={{
                                margin: 3,
                                width: 300
                            }}
                        >
                            <InputLabel htmlFor="inputName">
                                Name
                            </InputLabel>
                            <Input
                                id="inputName"
                                name='name'
                                value={completeName}
                                onChange={(event) => setCompleteName(event.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl disabled={!flag} variant="standard"
                            sx={{
                                margin: 3,
                                width: 300
                            }}
                        >
                            <InputLabel htmlFor="inputPhone">
                                Phone
                            </InputLabel>
                            <Input
                                id="inputPhone"
                                name='phone'
                                value={phone}
                                type="numeric"
                                pattern="[0-9]*"
                                onChange={(event) => setPhone(event.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PhoneIphoneIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl disabled={!flag} variant="standard"
                            sx={{
                                margin: 3,
                                width: 300
                            }}
                        >
                            <InputLabel htmlFor="inputEmail">
                                Em@il
                            </InputLabel>
                            <Input
                                id="inputEmail"
                                name='email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl disabled={!flag} variant="standard"
                            sx={{
                                margin: 3,
                                width: 300
                            }}
                        >
                            <InputLabel htmlFor="inputEmailRepeat">
                                Repeat Em@il
                            </InputLabel>
                            <Input
                                id="inputEmailRepeat"
                                name='emailRepeat'
                                value={emailRepeat}
                                onChange={(event) => setEmailRepeat(event.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <br />

                        {flag ?
                            <Button size="small" variant="contained" color="primary" onClick={handleInfo}
                                sx={{
                                    mx: 2,
                                    my: 2,
                                    p: 1,
                                    width: 125
                                }}
                                elevation={24}
                            >
                                Check Info
                                <CheckCircleOutlineIcon />
                            </Button>

                            :

                            <Button size="small" variant="contained" color="success" onClick={generateOrder}
                                sx={{
                                    mx: 2,
                                    my: 2,
                                    p: 1,
                                    width: 125
                                }}
                                elevation={24}
                            >
                                Get Order
                                <DoneAllIcon />
                            </Button>
                        }
                        <Button disabled={!flag} type="reset" size="small" variant="contained" color="secondary" onClick={resetForm}
                            sx={{
                                mx: 2,
                                my: 2,
                                p: 1,
                                width: 125
                            }}
                            elevation={24}
                        >
                            Reset
                            <RestartAltIcon />
                        </Button>
                    </Form>
        </Card>

    )
}

export default form
