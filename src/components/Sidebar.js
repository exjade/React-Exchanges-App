import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`

export default function Sidebar() {

    // Currencies relaciona todos los datos y setCurrencies será una función que manipula los datos de Currencies
    const [currencies, setCurrencies] = useState([])

    //useEffect - Nuestro hook para obtener datos del API
    // Es un hook que funciona bajo 2 argumentos. 
    // 1 Callback () => {} 2 Determina qué estará monitoreando
    // Tomará los datos de manera asincrona, los subirá al estado local, los renderiza en la zona de retorno. Y así veremos el listado de monedas
    useEffect(() => {
        const getCurrencies = async () => {
            if(getCurrencies){
                const res = await axios.get(API_URL)
                const data = await res.data.rates
                // Obtenemos las propiedades de objeto como un Arreglo
                const arrData = Object.keys(data)
                //Cambia el estado actual
                setCurrencies(arrData)
            } else if (!getCurrencies){
                alert('No funciona')
            }

            
          
        }

        getCurrencies()

    }, [])

    return (
        <>
            <div className=" flex max-h-screen  overflow-hidden w-96 items-center">
                <div className="grid bg-paleta-anclas w-64 ">
                    <div className="flex flex-col w-auto h-screen overflow-y-scroll leading-none">
                        <div className="flex flex-col flex-grow pt-5 pb-4">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <h1 className="text-paleta-text">
                                    ¿Cuánto vale esta moneda en USD?
                                </h1>
                            </div>
                            <div className="mt-5 flex-1 flex flex-col">
                                <nav className="flex-1 px-2 space-y-1">
                                    {
                                        currencies.map((e, i) => {
                                            return (
                                                <Link key={i} to={`/${e}`} className="bg-paleta-sidebar text-paleta-text group flex items-center px-2 py-2 text-sm font-medium ">
                                                    <svg className="mr-3 h-6 w-6 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                    </svg>
                                                    {e}
                                                </Link>
                                            )
                                        })
                                    }
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
