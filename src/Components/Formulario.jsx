import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../Hooks/useSelectMonedas'
import { monedas } from '../Data/monedas'


const InputSubmit  = styled.input `
    background-color: #66A2FE;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #518be1;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
    
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elije tu moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elije tu Criptomoneda',criptos )

    useEffect(() => {
        const consultarAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName,
                }
                return objeto
            } )

            setCriptos(arrayCriptos)
        }
        consultarAPI()

    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        
        if([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        } 

        setError(false)
        setMonedas({
            moneda, criptomoneda
        })
    }

  return (
    <>
        {error && <Error>Todos los campos son obligatorios</Error>}

            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas/>
                <SelectCriptomoneda/>
                <InputSubmit
                    type="submit" 
                    value='Cotizar'
                />
            </form>
    </>
  )
}

export default Formulario