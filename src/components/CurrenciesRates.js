import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    useParams  // recibir los parametros determinados de la URL
}
    from 'react-router-dom';
import { Line } from 'react-chartjs-2'; // Gráficos en React JS

export default function CurrenciesRates() {

    // Estado que guarde los datos del comportamiento de la moneda
    const [data, setData] = useState({}) // Será un OBJETO porque obtendremos un objeto del API
    // Estado que me permita saber sí se está cargando o no (Cuando haga la llamada asincrona necesito saber sí ya termino de cargarla o la sigue cargando ). 
    const [loading, setLoading] = useState(true) // Valor boolean - Mientras no lleguen los datos se seguirá cargando
    // Estado que determine las fechas de inicio y fin en la cual quiero saber el comportamiento de la moneda
    const [date, setDate] = useState({
        startDate: "2021-07-01",
        endDate: "2021-08-01"
    })

    // Obtener el parametro de la moneda
    const { currency } = useParams(); // Sí nosotros accedemos a currency podemos obtener ese dato sin problema


    // Vamos a hacer la llamada una vez que se renderize el componente | cur = currency
    useEffect(() => {
        const getRates = async (cur) => {
            const res = await axios.get(`
            https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${cur}
            `)
            // console.log(res)

            //Conjunto de datos que vienen de la respuesta
            const rates = res.data.rates;
            // Las propiedades (fechas) 2021-07-01: {MXN: 20.00689}
            const labels = Object.keys(rates);

            // Map recorre cada elemento
            const dataValues = Object.keys
                (rates).map((e) => {
                    return rates[e][cur]
                })

            setData({
                labels,
                datasets: [{
                    label: `Un dolar, vale en ${cur}:`,
                    borderColor: "#000a8b",
                    pointBackgroundColor: "#f42534",
                    pointRadius: 7,
                    data: dataValues

                }]
            })
            setLoading(false)

        }
        getRates(currency)
    }, [currency, date]) // estaremos monitoreando 2 valores | Sí hay algún cambio en los valores, useEffect se ejecutará

    //Permite hacer los cambios de fecha deacuerdo a los campos de texto que yo escriba
    // Capturar los valores de los campos de fechas y subiros al estado
    const handleDate = (e) => {
        console.log(e.target)
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <div className="w-full">
                <div className="w-80 px-10 pb-10 pt-5">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">Escoge una fecha de inicio</label>
                    <input
                        type="date"
                        onChange={(e) => handleDate(e)}
                        value={date.startDate}
                        name="startDate"
                        className="flex-1 block w-full border-2 min-w-0 rounded text-sm border-gray-300"
                    />
                    <label htmlFor="date" className="text-sm font-medium text-gray-700 mt-10">Escoge una fecha de término</label>
                    <input
                        type="date"
                        onChange={(e) => handleDate(e)}
                        value={date.endDate}
                        name="endDate"
                        className="flex-1 block w-full border-2 min-w-0 rounded text-sm border-gray-300"
                    />
                </div>
                <div className="px-7">
                    {
                        loading ?
                            <h1>Cargando...</h1>
                            :
                            <Line data={data}
                                options={{
                                    responsive: true,
                                }}
                            />
                    }
                </div>
            </div>
        </>
    )
}
