import { useState, useEffect } from "react"

const Formulario = (props) => {
    const [materiaA, setMateriaA] = useState(0);
    const [materiaB, setMateriaB] = useState(0);
    const [materiaC, setMateriaC] = useState(0);
    const [nome, setNome] = useState ('');

    useEffect(() => {
        console.log("O componente iniciou");

        return () => {
            console.log("o componente finalizou")
        }
    }, []);

    useEffect(() => {
        console.log("O estado nome mudou");
    }, [nome]);

    useEffect(() => {
        console.log("materia A mudou para: " + materiaA);
    }, [materiaA]);

    const alteraNome = (evento) => {
        // setNome(evento.target.value);
        setNome(estadoAnterior => {
            // console.log(estadoAnterior);

            return evento.target.value;
        })
    }

    const renderizaResultado = () => {
        const soma = materiaA + materiaB + materiaC;
        const media = soma / 3;
        // console.log(media);

        if (media >= 6){
            return (
                <p>Olá {nome}, você foi aprovado</p>
            )
        } else {
            return (
                <p>Olá {nome}, você foi reprovado</p>
            )
        }
    }

    return (
        <form>
            <ul>
                {[1,2,3,4,5].map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <input type="text" placeholder="Seu nome" onChange={alteraNome} />
            <input type="number" placeholder="Nota matéria A" onChange={({target}) => setMateriaA(parseInt(target.value))}/>
            <input type="number" placeholder="Nota matéria B" onChange={({target}) => setMateriaB(parseInt(target.value))}/>
            <input type="number" placeholder="Nota matéria C" onChange={({target}) => setMateriaC(parseInt(target.value))}/>
            {renderizaResultado()}
        </form>
    )
}

export default Formulario 