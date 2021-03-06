import React, {useState, useMemo} from 'react';
import camera from '../../assets/download.svg';
import './style.css';
import api from '../../services/api';


export default function New({ history }){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
        ()=>{
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        },[thumbnail]
    );

    async function handleSubmit(event){
        event.preventDefault();
    
        const user_id = localStorage.getItem('user');

        const data = new FormData();
        
        data.append('thumbnail',thumbnail);
        data.append('techs',techs);
        data.append('price',price);
        data.append('company',company);
        
        await api.post('/spots',data,{
            headers : { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit} action="">
            <label 
                id="thumbnail"
                style={{
                backgroundImage : `url(${preview})`
                }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                    
                <input 
                type="file"
                onChange={event => setThumbnail(event.target.files[0])}
                />
                <img src={camera} alt="Select img"
               
                />
            </label>

            <label htmlFor="company">EMPRESA*</label>
            <input 
            id="company"
            placeholder="Sua empresa incrivel"
            value={company}
            onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="company">TECNOLOGIAS* <span>(Separadas por vírgulas)</span></label>
            <input 
            id="techs"
            placeholder="Quais tecnologias usam?"
            value={techs}
            onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="company">VALOR DA DIÁRIA* <span>(Em branco para GRATUITO)</span></label>
            <input 
            id="price"
            placeholder="Valor cobrado por dia" 
            value={price}
            onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    );
}