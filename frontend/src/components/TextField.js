import { InputMask } from '@react-input/mask'
import './TextField.css'

function TextField({mask, placeholder, replacement, titulo, tipo, id, largura, dadosSelect, step, setValue, value, visualizacao, required=true, pattern='.*'}) {
    const digitou = (event) => {
        setValue(event.target.value)
    }

    return (    
        <div className="d-flex flex-column mb-3" style={{width: largura, fontSize: '18px', fontWeight: 'bold'}}>
            <label style={{color: '#667085'}}htmlFor={id}>{titulo}</label>
            {tipo === 'select' ? (
                <select className="rounded-1 border-1" id={id} readOnly={visualizacao}>
                <option value=""  className="placeHolderColor" disabled selected>{placeholder}</option>
                {dadosSelect.map((dado, index) => {
                    var selectValue = []
                    {Object.values(dado).map((valor) => {
                        selectValue.push(valor)
                    })}  
                    return <option key={index} value={dado.cod}>{selectValue.join(" - ")}</option>
                })}
                </select>
            ) : tipo === 'textarea' ? (
                <textarea type={tipo} value={value} readOnly={visualizacao} step={step} onChange={digitou} className="rounded-3 border-1 form-control mt-1" id={id} placeholder={placeholder} required={required}/>
            ) : mask ?
             (<InputMask required={required} pattern={pattern} mask={mask} type={tipo} replacement={replacement} value={value} readOnly={visualizacao} step={step} onChange={digitou} className="rounded-3 border-1 form-control mt-1" id={id} placeholder={placeholder}/>) 
                :
             (<input type={tipo} pattern={pattern} value={value} readOnly={visualizacao} step={step} onChange={digitou} className="rounded-3 border-1 form-control mt-1" id={id} placeholder={placeholder} required={required}/>) }
             </div>
    )
}

export default TextField