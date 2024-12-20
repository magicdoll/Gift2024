
import { Fragment } from 'react'

const Pageheader = (props) => {
    return (
        <Fragment>
            <div className={`d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb`}>
                <div>
                    <h1 className="page-title fw-medium fs-18 mb-2">{props.Heading}</h1>
                </div>
                <p className="mb-0">
                    <label style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
                        {
                            props.Pages.map((ele, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center' }} >
                                    <span className={`${ele.active ? 'text-info' : 'text-muted'}`} style={{ fontWeight: ele.active ? 'bold' : 'normal' }}>{ele.title}</span>
                                    { index < props.Pages.length - 1 && ( <span style={{ margin: '0 8px' }}>{'>>'}</span> ) }
                                </li>
                            ))
                        }
                    </label>
                </p>
            </div>
        </Fragment>
    )
}

export default Pageheader