import React from 'react';
import http404 from '../../images/paginaNaoEnc.gif'

export default class PageNotFound extends React.Component {
    render() {
        return(
            <div style={{textAlign:"center"}} className="content" id="content">
                <img src={http404} alt="404 Pagina não encontrada"/>
            </div>
        )
    }
}
