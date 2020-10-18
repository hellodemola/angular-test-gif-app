import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import {Pane} from 'evergreen-ui'

function Single () {
    return(
        <>
        <Row className='justify-content-center'>
          <Col md={4}>
          <Pane>
            <div class='border'>
              <img scr='' alt='img'/>
            </div>
          </Pane>
          </Col>
          <Col md={6}>
            <div className='border'>
              GIF name
            </div>
            <div className='border'>
              GIF name
            </div>
            <div className='border'>
              GIF name
            </div>
            <div className='border'>
              GIF name
            </div>
          </Col>
        </Row>
        

       </>
    )
}

export default Single;