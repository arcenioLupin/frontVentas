import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Panel, PanelGroup } from 'react-bootstrap'
import logo from '../../images/logo_progresis.jpg'
import { USER, PATH } from '../../constants'

const HREF_LINK = '#'

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = { openNav: false }
  }

  onHandleMenuClick = e => {
    if (e.className.contains('collapse in')) {
      e.ClassName = e.ClassName.replace('collapse in', 'collapse')
    }
  }

  componentWillMount () {
    if (!USER && !window.location.pathname.endsWith('login')) {
      this.props.history.push({ pathname: '/login' })
      window.location.reload()
    }
  }

  goTo = url => {
    this.props.history.push(url)
    window.location.reload()
  }

  showResponsiveMenu () {
    this.setState({ openNav: !this.state.openNav })
  }

  renderList = list => {
    if (list) {
      return list.map(item => {
        const parent = item.esPadre
        return (
          <li role='menuitem' key={item.nombre} className='show-menu-children'>
            {item.url.startsWith('/') ? (
              <a onClick={() => this.goTo(item.url)}>
                {item.nombre}
                {parent ? <i className='ion-plus -h6 ml-2' /> : null}
              </a>
            ) : (
              <a onClick={() => this.goTo(`${PATH}${item.url}`)}>
                {item.nombre}
                {parent ? <i className='ion-plus -h6 ml-2' /> : null}
              </a>
            )}
            {parent ? <ul>{this.renderList(item.hijoOpcionList)}</ul> : null}
          </li>
        )
      })
    }
    return null
  }

  renderSubmenu = hijos =>
    hijos.map(hijo => (
      <div className='nav-column' key={hijo.nombre}>
        <h3>{hijo.nombre}</h3>
        {hijo.esPadre && <ul>{this.renderList(hijo.hijoOpcionList)}</ul>}
      </div>
    ))

  renderMenu = items =>
    items.map(item => (
      <li role='menuitem' key={item.nombre}>
        <a href={HREF_LINK}>{item.nombre}</a>
        {item.esPadre && (
          <div className='mega-menu' aria-hidden='true' role='menu'>
            {this.renderSubmenu(item.hijoOpcionList)}
          </div>
        )}
      </li>
    ))

  render () {
    const { items } = this.props
    return (
      <div>
        <header className='header clearfix'>
       
          <div className='wrapper'>     
            <div className='hidden-sm-down hidden-xs hidden-sm'>
              <div className='header-main-logo'>
                <img src={logo} alt='Progresis' />
              </div>
              {USER !== null? ( 
              <div className='menu-wrapper' role='navigation'>
               
                  <ul className='nav megaMenu' role='menubar'>
                    <li role='menuitem' className='show-menu-children'>
                      <a href={HREF_LINK}>
                        {USER !== null? USER.usuario.usuarioUser:''}
                        <i className='ion-arrow-down-b ml-2' />
                      </a>
                      <ul className='dropdown-menu dropdown-menu-default'>
                        <li>
                          <a
                            href={HREF_LINK}
                            onClick={() =>
                              this.goTo(`${PATH}#login/cambiarContrasenia`)
                            }
                          >                  
                                <i className='icon-calendar' />} Cambiar contraseña                         
                          </a>
                        </li>
                      </ul>
                    </li>
                    
                    <li className='nav-search' role='menuitem'>
                      <form>
                        <label htmlFor='Buscar' />
                        <input
                          id='search'
                          type='text'
                          title='Buscar...'
                          placeholder='Buscar...'
                        />
                        <input type='submit' value='..' />
                      </form>
                    </li>
                    <li
                      className='dropdown dropdown-extended quick-sidebar-toggler'
                      role='menuitem'
                    >
                      <a
                        href={HREF_LINK}
                        className='dropdown-toggle'
                        onClick={() => this.props.openLogout()}
                      >
                        <i className='icon-logout' />
                        <span className='sr-only'>Salir del sistema</span>
                      </a>
                    </li>
                  </ul>
         
              </div>
              ):<div></div>}
            </div>
          
          
           {/* <div className='hidden-sm-up visible-sm visible-xs'>
              <div className='header-main-logo'>
                <img src={logo} alt='logo' />
              </div>
              <button
                className='btn-clean header-hamburger collapsed'
                onClick={() => this.showResponsiveMenu()}
              >
                Menu
                <i className='ion-navicon ml-2' />
              </button>
              <Panel
                className='menuMob'
                collapsible
                expanded={this.state.openNav}
                style={{
                  borderColor: 'transparent',
                  boxShadow: '0 0 0 white',
                  border: '0'
                }}
              >
                <PanelGroup accordion defaultActiveKey={1}>
                  <Panel header='React 1 header' key={1}>
                    React 1 body
                    <PanelGroup accordion defaultActiveKey={2}>
                      <Panel header='React 2 header' key={2}>
                        React 2 body
                      </Panel>
                    </PanelGroup>
                  </Panel>
                  <Panel header='React 3 header' key={3}>
                    React 3 body
                  </Panel>
                </PanelGroup>
              </Panel>
              </div>*/}
          </div>
        </header>
      </div>
    )
  }
}

export default withRouter(Nav)
