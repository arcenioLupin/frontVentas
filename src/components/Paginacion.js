import React from "react";

const HREF_LINK = '#';

const Paginacion = props => (
  <div className="pageHead-rowContainer">
    <div className="pageHead-tableConf wrapper">
      <div />
      <div className="pageHead-tableConf-pagCols">
        <nav className="pag">
          <p className="pag-label">
            <span>{props.paginas ? 1 + 10 * (props.pagina - 1) : 0}</span>
            <span> -</span>
            <span> {props.cantidad + 10 * (props.pagina - 1)}</span>
            <span> de</span>
            <span> {props.paginas}</span>
          </p>
          <div className="pag-arrows">
            <a
              href={HREF_LINK}
              className="btn btn-default pag-link checkDeGrillaCerrar"
              title="Anterior"
              onClick={props.backPag}
            >
              <i className="ion-chevron-left" />
            </a>
            <a
              href={HREF_LINK}
              className="btn btn-default pag-link checkDeGrillaCerrar"
              title="Siguiente"
              onClick={props.nextPag}
            >
              <i className="ion-chevron-right" />
            </a>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

export default Paginacion;
