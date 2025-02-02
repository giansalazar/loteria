import { useState, useEffect } from 'react';
import useRobotVozFemenina from '../hooks/useRobotVozFemenina'
import cartas from '../json/cartas.json'

function Home() {
    const [intervaloId, setIntervaloId] = useState(null);
    const [pausado, setPausado] = useState(true);
    const mensajeInicial = "Hola, bienvenidos al juego de la loteria mexicana.";
    const [imagenCarta, setImagen] = useState("./baraja.webp")
    const [textoCarta, setTextoCarta] = useState("Loteria Mexicana")
    const [buttonText, setButtonText] = useState("Jugar")
    const [statusGame, setStatusGame] = useState("Jugar")
    const [historialNumCartas, setHistorialNumCartas] = useState([])
    const [elementosMezclados, setElementosMezclados] = useState([])
    const [cartaActual, setCartaActual] = useState(null)
    const { texto, setTexto } = useRobotVozFemenina(mensajeInicial);

    useEffect(() => {
        const correrCartas = () => {
            const elemento = obtenerElemento();

            if (elemento) {
                setTexto(elemento.name);
                setImagen(`./${elemento.id}.webp`);
                setTextoCarta(elemento.name);
                setCartaActual(elemento.id);
            } else {
                console.log("Todos los elementos han sido seleccionados");
                setPausado((prevPausado) => !prevPausado);
                setStatusGame(prev => prev === "Jugando" ? "En Pausa" : "Jugando");
                setButtonText("Volver a Jugar")
                setImagen('./baraja.webp')
            }
        };

        let id;

        if (!pausado) {
            id = setInterval(() => {
                correrCartas();
            }, 4000);

            // Guardar el ID del intervalo para detenerlo más tarde
            setIntervaloId(id);
        }

        // Limpieza del efecto: detener el intervalo al desmontar el componente o cuando pausado cambie
        return () => clearInterval(id);
    }, [pausado]);

    useEffect(() => {
        if (cartaActual !== null) {
            setHistorialNumCartas(prevHistorial => [...prevHistorial, cartaActual]);
        }
    }, [cartaActual]);

    const togglePausa = () => {
        setPausado((prevPausado) => !prevPausado);
        setStatusGame(prev => prev === "Jugando" ? "En Pausa" : "Jugando");
        console.log(elementosMezclados)
    };

    const iniciarJuego = () => {
        if (buttonText === "Jugar" || buttonText === "Volver a Jugar") {
            setElementosMezclados(shuffleArray(cartas.elementos.slice()));
            setButtonText("Finalizar")
            setStatusGame("Jugando")
            setTexto("Corre y se va... con...")
            setPausado((prevPausado) => !prevPausado);
            setHistorialNumCartas([])
            setCartaActual(null);
            console.log("Se juega señores")
        }else if(buttonText==="Finalizar"){
            setButtonText("Volver a Jugar")
            setStatusGame("En Pausa")
            console.log("Buenas con..." + textoCarta)
            setTexto("Buenas con... " + textoCarta)
            setHistorialNumCartas([])
            setImagen('./baraja.webp')
            setCartaActual(null);
            console.log("Fin")

            if(!pausado){
                setPausado((prevPausado) => !prevPausado);
            }
        }

    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const obtenerElemento = () => {
        if (elementosMezclados.length === 0) {
            return null; // Todos los elementos han sido seleccionados
        }
        const elemento = elementosMezclados.shift(); // Remueve y devuelve el primer elemento de la lista
        return elemento;
    }

    return (
        <>
            <div className='flex flex-col'>
                <div className='flex flex-col items-center justify-center w-[100%] h-[20vh] bg-[#499fc5]'>
                    <h1 className='text-xl font-bold pb-4 text-center text-[#333]'>La Loteria Mexicana del Gallo</h1>
                    <button className="bg-[#252b66] hover:bg-[#252b66] text-white font-bold py-2 px-4 rounded" onClick={iniciarJuego}>
                        {buttonText}
                    </button>
                </div>

                <div className='flex flex-col items-center justify-start w-[100%] h-[60vh] bg-gradient-to-tr from-blue-300 pt-8'>
                    <img src={imagenCarta} alt="Imagen de la loteria mexicana" className='w-48 h-72 shadow-xl dark:shadow-gray-800 max-[768px]:w-52 max-[768px]:h-80 mb-4 mt-4' />

                    {buttonText === "Finalizar" &&
                        <button className="bg-[#252b66] hover:bg-[#252b66] text-white font-bold py-2 px-4 rounded-full" onClick={togglePausa}>
                            {statusGame === "Jugando" ?
                                <svg className="w-6 h-6 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                                    <path fillRule="evenodd" d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg className="w-6 h-6 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
                                </svg>
                            }
                        </button>
                    }
                </div>

                <div className='flex flex-col items-center justify-start w-[100%] h-[20vh] bg-[#499fc5] overflow-x-auto'>
                    <p className='pb-2 pt-1 font-bold text-[#333]'>Cartas corridas {historialNumCartas.length} / 54</p>

                    <div className='flex flex-row items-center justify-start gap-2 overflow-scroll'>
                        {historialNumCartas ? (
                            historialNumCartas.slice().reverse().map((estado, index) => (
                                <img src={`${estado}.webp`} alt="carta de la loteria" className='w-20 h-28' key={index} />
                            ))
                        ) : ("")}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
