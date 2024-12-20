import { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Pagination, ProgressBar, Row, Table } from "react-bootstrap"
import ReactApexChart from "react-apexcharts"
import { Link } from 'react-router-dom'
import Imagesdata from '../components/common/imagesdata'
import liff from '@line/liff'
import axios from 'axios'
import Swal from 'sweetalert2'

const Home = () => {
	const liffidG = `2006433189-Bb8W3M0d`
	const lineidadmin = 'U451d817606a772eaa59b013572ad0b5f'
	const urlAPI = 'https://gift2024-api.vercel.app/api'
	const isNotLogin = false
	const [userState, setUserState] = useState(JSON.parse(JSON.stringify({ lineid: '', linename: '', linepic: '', linestatus: '', gifttolineid: '', status: '', ishas: false, userto: null })))
	const [listUser, setListUser] = useState([])
	const [isApprove, setIsApprove] = useState(false)
	
	useEffect(() => {
    fnInitLine()
  }, [])

	useEffect(() => {
		if (userState.lineid && !userState.ishas) {
			fnGetListUser()
		}
  }, [userState])

	useEffect(() => {
		if (listUser.length) {
			const user = listUser.filter((item) => item.lineid == userState.lineid)
			if (user.length) {
				setIsApprove(true)
				setUserState(JSON.parse(JSON.stringify({...userState, gifttolineid: user[0].gifttolineid || '', status: user[0].status || '', ishas: true})))
			}
		}
	}, [listUser])

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
			setUserState(JSON.parse(JSON.stringify({ ...userState, lineid: profile.userId, linename: profile.displayName, linepic: profile.pictureUrl, linestatus: profile.statusMessage })))
    })
  }
	const fnGetListUser = async () => {
		await axios.get(`${urlAPI}/fnGet`)
      .then(response => {
				console.log('response.data', response.data.data)
        setListUser(JSON.parse(JSON.stringify(response.data.data)))
      })
      .catch(error => {
        setListUser(JSON.parse(JSON.stringify([])))
      })
	}
	const fnSetStatus = (action) => {
 		Swal.fire({
			title: 'แน่ใจหรือป่าว?',
			text: `${(action ? 'คุณยังไม่พร้อมที่จะจับของขวัญ?' : 'คุณพร้อมที่จะจับของขวัญแล้ว')}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'ใช่!',
			cancelButtonText: 'ไม่!'
		}).then((result) => {
			if (result.isConfirmed) {
				const jsUserState = {...userState, status: (action ? '' : 'OK'), isreact: 'userstatus'}
				console.log('jsUserState', jsUserState)
				setUserState(JSON.parse(JSON.stringify(jsUserState)))
				fnSetStatusConfirm(jsUserState)
			}
		})
	}
	const fnSetStatusConfirm = async (data) => {
		await axios.post(`${urlAPI}/fnPost`, data, { headers: { 'Content-Type': 'application/json' } })
	}

	const fnSetInsertUser = () => {
		Swal.fire({
		 title: 'แน่ใจหรือป่าว?',
		 text: `คุณต้องการเข้าร่วมจับของขวัญ?`,
		 icon: 'warning',
		 showCancelButton: true,
		 confirmButtonColor: '#3085d6',
		 cancelButtonColor: '#d33',
		 confirmButtonText: 'เข้าร่วม!',
		 cancelButtonText: 'ไม่เข้าร่วม!'
		}).then((result) => {
			if (result.isConfirmed) {
				const jsUserState = {...userState, isreact: 'userstatus'}
				console.log('jsUserState', jsUserState)
				setUserState(JSON.parse(JSON.stringify(jsUserState)))
				fnSetInsertUserConfirm(jsUserState)
			}
		})
	}
	const fnSetInsertUserConfirm = async (data) => {
		await axios.post(`${urlAPI}/fnPost`, data, { headers: { 'Content-Type': 'application/json' } }).then(() => { fnGetListUser(); })
	}

	const fnReload = () => {
		fnGetListUser();
	}

	const fnRandomUser = () => {
		Swal.fire({
			title: 'แน่ใจหรือป่าว?',
			text: `คุณต้องการเริ่มจับฉลากแล้วหรือไม่?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'เริ่ม!',
			cancelButtonText: 'ยังไม่เริ่ม!'
		}).then((result) => {
			if (result.isConfirmed) {
				fnRandomUserConfirm()
			}
		})
	}
	const fnRandomUserConfirm = async () => {
		await axios.post(`${urlAPI}/fnPost`, { isreact: 'randomuser' }, { headers: { 'Content-Type': 'application/json' } }).then(() => { fnGetListUser(); })
	}

	const fnClear = () => {
		Swal.fire({
			title: 'แน่ใจหรือป่าว?',
			text: `คุณต้องการล้างข้อมูล?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'ล้าง!',
			cancelButtonText: 'ไม่ล้าง!'
		}).then((result) => {
			if (result.isConfirmed) {
				fnClearConfirm()
				setIsApprove(false)
			}
		})
	}
	const fnClearConfirm = async () => {
		await axios.post(`${urlAPI}/fnPost`, { isreact: 'clear' }, { headers: { 'Content-Type': 'application/json' } }).then(() => { fnGetListUser(); })
	}

  return (
    <Fragment>
      <Row>
				<Col xxl={6} className={`col-12 mb-0 ${isApprove ? 'd-none' : ''}`}>
					<Card className="custom-card bg-primary-gradient border-0 shadow-none">
						<Card.Body className="p-4">
							<div className="text-center">
								<div className="d-flex justify-content-center align-items-center text-center">
									<span className="avatar avatar-rounded mb-3 podcast-playing-now-avatar shadow">
										<img src={userState.linepic ? userState.linepic : Imagesdata("media85")} alt="" />
									</span>
								</div>
								<h6 className="fw-medium mb-1 text-fixed-white">คุณต้องการเข้าร่วมจับขอบขวัญ?</h6>
								<span className="fw-medium mb-1 text-fixed-white">ชื่อ: {userState && userState.linename ? userState.linename : '?'}</span>
								<p></p>
								<Link onClick={fnSetInsertUser} to="#"><h6 className="fw-medium text-fixed-white"><ins>เข้าร่วม</ins></h6></Link>
							</div>
						</Card.Body>
					</Card>
        </Col>
        <Col xxl={6} className={`col-12 mb-0 ${isApprove ? '' : 'd-none'}`}>
					<Card className="custom-card bg-primary-gradient border-0 shadow-none">
						<Card.Body className="p-4">
							<div className="d-flex align-items-start gap-3 mb-4">
								<div className="flex-fill">
									<span className="fw-medium d-block text-fixed-white">คุณต้องมอบของขวัญให้กับ?</span>
								</div>
								<div>
									<Link onClick={() => { fnSetStatus(`${userState.status}`); }} to="#">
										<i className={`ri-flag-fill ${userState.status ? 'text-danger' : 'text-fixed-white'} fs-4 op-5 lh-1`}></i>
									</Link>
								</div>
							</div>
							<div className="text-center mb-4">
								<div className="d-flex justify-content-center align-items-center text-center">
									<span className="avatar avatar-rounded mb-3 podcast-playing-now-avatar shadow">
										<img src={userState.linepic ? userState.linepic : Imagesdata("media85")} alt="" />
									</span>
									<i className="ri-gift-2-fill text-warning fs-4 op-5 lh-1 mx-2"></i>
									<span className="avatar avatar-rounded mb-3 podcast-playing-now-avatar shadow">
										<img src={userState.userto && userState.userto.linepic ? userState.linepic : Imagesdata("media85")} alt="" />
									</span>
								</div>
								<h6 className="fw-medium mb-1 text-fixed-white">คนที่คุณต้องมอบของขวัญให้</h6>
								<Link to="#"><h6 className="fw-medium mb-1 text-fixed-white">ชื่อ: {userState.userto && userState.userto.linename ? userState.userto.linename : '?'}</h6></Link>
								<span className="text-fixed-white op-8 fs-12">สถานะ: {userState.userto && userState.userto.linestatus ? userState.userto.linestatus : '?'}</span>
							</div>
							<div className="row justify-content-center">
								<Col xl={9}>
									<div className="d-flex align-items-center justify-content-center flex-wrap gap-3 lh-1">
										<Link className={`${userState.lineid != lineidadmin ? 'd-none' : ''}`} onClick={fnClear} to="#"> <ins className='text-fixed-white'>ล้างข้อมูล</ins> </Link>
										<Link onClick={fnReload} to="#"> <ins className='text-fixed-white'>รีโหลด</ins> </Link>
										<Link className={`${userState.lineid != lineidadmin ? 'd-none' : ''}`} onClick={fnRandomUser} to="#"> <ins className='text-fixed-white'>จับฉลาก</ins> </Link>
										<Link className={`${userState.lineid != lineidadmin ? 'd-none' : ''}`} onClick={fnReload} to="#"> <ins className='text-fixed-white'>มอบของขวัญ</ins> </Link>
									</div>
								</Col>
							</div>
						</Card.Body>
					</Card>
        </Col>
        <Col xxl={6} className={`col-12 mb-0 mt-0 ${isApprove ? '' : 'd-none'}`}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>
								รายชื่อผู้ร่วมจับของขวัญ
							</Card.Title>
						</Card.Header>
						<Card.Body>
							<ul className="list-unstyled podcast-recently-played-list">
								{
									listUser.filter((item) => item.lineid != userState.lineid).map((item, index) => (
										<li key={Math.random()}>
											<div className="d-flex align-items-center gap-2">
												<div className="lh-1">
													<span className="avatar avatar-md">
														<img src={item.linepic} alt="" />
													</span>
												</div>
												<div className="flex-fill">
													<Link to="#" className="fw-medium">{item.linename}</Link>
													<span className="d-block fs-12 text-muted">{item.linestatus}</span>
												</div>
												<div className="text-end">
													<i className={`ri-flag-fill fs-18 lh-1 fw-medium ${item.status ? 'text-gray-3' : 'text-danger'}`}></i>
												</div>
											</div>
										</li>
									))
								}
							</ul>
						</Card.Body>
					</Card>
        </Col>
      </Row>
    </Fragment>
  )
}
export default Home