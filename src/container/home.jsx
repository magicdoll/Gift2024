import { Fragment, useEffect } from 'react';
import { Button, Card, Col, Dropdown, Pagination, ProgressBar, Row, Table } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';
import Imagesdata from '../components/common/imagesdata';
import liff from '@line/liff'
import axios from 'axios'

const Home = () => {
	const liffidG = '2006433189-Bb8W3M0d'
	const isNotLogin = false

	useEffect(() => {
    fnInitLine()
  }, [])

	const fnInitLine = () => {
    liff.init({ liffId: liffidG }, () => {
      if (!liff.isLoggedIn() && !isNotLogin) {
        liff.login()
      }
      else if (!isNotLogin) {
        fnSetUserinfo()
      }
    })
  }
	const fnSetUserinfo = () => {
    liff.getProfile().then(profile => {
      console.log('profile', profile)
    })
  }

  return (
    <Fragment>
      <Row>
        <Col xxl={12} className="col-12 mb-0">
            <Card className="custom-card bg-primary-gradient border-0 shadow-none">
                <Card.Body className="p-4">
                    <div className="d-flex align-items-start gap-3 mb-4">
                        <div className="flex-fill">
                            <span className="fw-medium d-block text-fixed-white">คุณต้องมอบของขวัญให้กับ?</span>
                        </div>
                        <div>
                            <Link to="#">
                                <i className="ri-heart-fill text-fixed-white fs-4 op-5 lh-1"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        <span className="avatar avatar-rounded mb-3 podcast-playing-now-avatar shadow">
                            <img src={Imagesdata("media85")} alt="" />
                        </span>
                        <Link to="#"><h6 className="fw-medium mb-1 text-fixed-white">Line Name: </h6></Link>
                        <span className="text-fixed-white op-8 fs-12">Status: </span>
                    </div>
                    <div className="row justify-content-center">
                        <Col xl={9}>
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 lh-1">
                                <Link to="#">
                                    <i className="ri-repeat-2-fill fs-5 text-fixed-white"></i>
                                </Link>
                                <Link to="#">
                                    <i className="ri-skip-back-fill fs-5 text-fixed-white"></i>
                                </Link>
                                <Link to="#">
                                    <i className="ri-play-fill fs-2 text-fixed-white"></i>
                                </Link>
                                <Link to="#">
                                    <i className="ri-skip-forward-fill fs-5 text-fixed-white"></i>
                                </Link>
                                <Link to="#">
                                    <i className="ri-shuffle-fill fs-5 text-fixed-white"></i>
                                </Link>
                            </div>
                        </Col>
                    </div>
                </Card.Body>
            </Card>
        </Col>
        <Col xxl={12} className="col-12 mb-0 mt-0">
            <Card className="custom-card">
                <Card.Header>
                    <Card.Title>
                        รายชื่อผู้ร่วมจับของขวัญ
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ul className="list-unstyled podcast-recently-played-list">
                        <li>
                            <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                    <span className="avatar avatar-md">
                                        <img src={Imagesdata("media61")} alt="" />
                                    </span>
                                </div>
                                <div className="flex-fill">
                                    <Link to="#" className="fw-medium">Tech Talk</Link>
                                    <span className="d-block fs-12 text-muted">John Smith</span>
                                </div>
                                <div className="text-end">
                                    <Link to="#" className="fw-medium text-gray-3"><i className="ri-heart-fill fs-18 lh-1"></i></Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="d-flex align-items-center gap-2">
                                <div className="lh-1">
                                    <span className="avatar avatar-md">
                                        <img src={Imagesdata("media59")} alt="" />
                                    </span>
                                </div>
                                <div className="flex-fill">
                                    <Link to="#" className="fw-medium">Science Explorers</Link>
                                    <span className="d-block fs-12 text-muted">Emily Johnson</span>
                                </div>
                                <div className="text-end">
                                    <Link to="#" className="fw-medium text-danger"><i className="ri-heart-fill fs-18 lh-1"></i></Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Fragment>
  )
}
export default Home